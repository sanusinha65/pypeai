const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

const SITE_ROOT = process.env.SITE_ROOT || "https://developers.qodex.ai";
const REPO_ROOT = process.cwd();
const DOCS_PATH = path.join(REPO_ROOT, "docs");
const OUTPUT_FILE = path.join(REPO_ROOT, "sitemapDates.js");

/**
 * Batch git log parser – build a map of filePath → last commit Date
 */
function buildGitTimestamps() {
  try {
    const gitCommand = `git log --name-only --format="%ci"`;
    const output = execSync(gitCommand, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
      maxBuffer: 1024 * 1024 * 50, // allow large output (50MB)
    });

    const timestamps = {};
    let currentDate = null;

    for (const line of output.split("\n")) {
      if (/^\d{4}-\d{2}-\d{2}/.test(line)) {
        currentDate = line.trim();
      } else if (line.trim() !== "" && currentDate) {
        const filePath = path.resolve(REPO_ROOT, line.trim());
        if (!timestamps[filePath]) {
          timestamps[filePath] = new Date(currentDate);
        }
      }
    }

    return timestamps;
  } catch (e) {
    console.error("⚠️ Git batch failed:", e.message);
    return {};
  }
}

async function getLastModifiedDate(filePath, gitTimestamps) {
  try {
    if (gitTimestamps[filePath]) {
      return gitTimestamps[filePath];
    }

    // Fallback to file system stat
    const stat = await fsp.stat(filePath);
    return stat.mtime;
  } catch (error) {
    console.log(`Error getting date for ${filePath}:`, error.message);
    return new Date();
  }
}

async function listProjects() {
  try {
    const entries = await fsp.readdir(DOCS_PATH, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

async function listMdxFiles(project) {
  const projectRoot = path.join(DOCS_PATH, project);
  const files = [];

  async function walk(dir) {
    try {
      const entries = await fsp.readdir(dir, { withFileTypes: true });

      const promises = entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === "node_modules" || entry.name === ".git") {
            return;
          }
          await walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
          files.push(fullPath);
        }
      });

      await Promise.all(promises);
    } catch {
      // silently ignore
    }
  }

  await walk(projectRoot);
  return files;
}

async function generate() {
  if (process.env.SKIP_SITEMAP === "true") {
    console.log("⏭️  Skipping sitemap generation (SKIP_SITEMAP=true)");
    return;
  }

  const buildStart = new Date();
  console.log("🕒 Build started at:", buildStart.toISOString());

  const startTime = Date.now();
  let newestChange = new Date(0);
  const projects = await listProjects();
  console.log(`📦 Found ${projects.length} projects`);

  // Build git timestamps once
  console.log("🔍 Fetching git timestamps in batch...");
  const gitTimestamps = buildGitTimestamps();

  const allFiles = [];

  const projectPromises = projects.map(async (project) => {
    try {
      const mdxFiles = await listMdxFiles(project);
      console.log(`📄 Found ${mdxFiles.length} MDX files in ${project}`);

      const projectFiles = [];
      let projectNewestChange = new Date(0);

      const filePromises = mdxFiles.map(async (filePath) => {
        const lastmod = await getLastModifiedDate(filePath, gitTimestamps);
        if (!lastmod) return null;

        if (lastmod > projectNewestChange) projectNewestChange = lastmod;

        const rel = path
          .relative(path.join(DOCS_PATH, project), filePath)
          .replace(/\\/g, "/");
        const slug = rel.replace(/\.mdx$/, "");

        if (slug === "introduction") return null;

        const loc = `${SITE_ROOT}/${project}/${slug}`;
        console.log("   ✅", loc, "→", lastmod.toISOString());

        return {
          loc,
          lastmod: lastmod.toISOString(),
          priority: "0.7",
        };
      });

      const fileResults = await Promise.all(filePromises);
      projectFiles.push(...fileResults.filter(Boolean));

      // Add project root
      const projectIntroFiles = mdxFiles.filter((f) =>
        f.endsWith("introduction.mdx")
      );
      const projectLastmod =
        projectIntroFiles.length > 0
          ? await getLastModifiedDate(projectIntroFiles[0], gitTimestamps)
          : new Date();

      if (projectLastmod && projectLastmod > projectNewestChange)
        projectNewestChange = projectLastmod;

      console.log("   📌", `${SITE_ROOT}/${project}`, "→", projectLastmod.toISOString());

      projectFiles.push({
        loc: `${SITE_ROOT}/${project}`,
        lastmod: projectLastmod
          ? projectLastmod.toISOString()
          : new Date().toISOString(),
        priority: "0.8",
      });

      return { projectFiles, projectNewestChange };
    } catch (error) {
      console.error(`Error processing project ${project}:`, error.message);
      return { projectFiles: [], projectNewestChange: new Date(0) };
    }
  });

  const projectResults = await Promise.all(projectPromises);

  for (const { projectFiles, projectNewestChange } of projectResults) {
    allFiles.push(...projectFiles);
    if (projectNewestChange > newestChange) {
      newestChange = projectNewestChange;
    }
  }

  // Add homepage
  const homeLastmod = newestChange > new Date(0) ? newestChange : new Date();
  console.log("🏠 Homepage lastmod →", homeLastmod.toISOString());

  allFiles.unshift({
    loc: `${SITE_ROOT}/`,
    lastmod: homeLastmod.toISOString(),
    priority: "1.0",
  });

  const staticPagesWithDates = allFiles
    .map(
      ({ loc, lastmod, priority }) =>
        `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`
    )
    .join("");

  const output = `export const staticPagesWithDates = "${staticPagesWithDates}";\n`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");

  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  console.log(
    `✅ Generated ${OUTPUT_FILE} with ${allFiles.length} URLs in ${duration.toFixed(
      2
    )}s`
  );
  console.log("🕒 Build finished at:", new Date().toISOString());
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});