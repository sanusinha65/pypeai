"use client";

import FeatureCard from "@/components/FeatureCard";
import ImageScroller from "@/components/ImageScroller";
import Image from "next/image";
import { ChartBar, Code, LayoutDashboard, ScreenShare, Server, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [images, setImages] = useState<string[]>([
    "/Aakhya-logo.png",
    "/eight-logo.png",
    "/samunnati-logo.png"
  ]);

  return (
    <div className="font-inter">
      <section className="max-w-screen-md mx-auto pt-10 text-center">
        <div className="flex flex-col">
          <div className="mx-auto max-w-screen-sm">
            <div className="mb-[98px] px-4 md:px-6">
              <p className="text-[40px] md:text-[56px] font-medium md:font-bold tracking-tight leading-[1.15em] text-[#1c1c1c] dark:text-gray-300">
                Build, Evaluate and Improve Prompts
                <br />
                <span className="text-[#183060] dark:text-[#3871c0]">10x faster</span>
              </p>
              <br />
              <p className="text-[#53535C] dark:text-gray-400">
                Empower your team to build, evaluate, and deploy high-performing prompts for LLM-based applications. Pype streamlines collaboration, version control, and performance analysis, helping you deliver reliable AI solutions faster.
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl px-4 md:px-0 mb-5">
          <iframe
            className="w-full h-64 md:h-[500px] rounded-2xl hover:scale-[99%] hover:shadow-xl transition-all duration-300 ease-in-out"
            src="https://www.youtube.com/embed/-y_KrosGWaU?si=gKfUW_1ZMo3e5e2v"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="flex md:flex-wrap justify-center mt-5 md:mt-24 pb-5 md:pb-10">
          <div className="w-1/2 md:w-52 custom-launch-app-btn text-center text-[14px] mx-2 py-3 px-4  rounded-[10px] dark:border-white dark:border">
            <Link href="https://app.pypeai.com/">
              <span className="text-gray-300">Launch App</span>
            </Link>
          </div>
          <div className="w-1/2 md:w-52 bg-blue-700 hover:bg-blue-600 text-center text-[14px] mx-2 py-3 px-4  rounded-[10px] transition-all duration-300 ease-in-out dark:border-white dark:border">
            <Link href="https://app.pypeai.com/" className="flex flex-wrap items-center justify-center">
              <span className="text-white font-medium">Book a demo {'->'}</span>
            </Link>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-200">Helping individuals and teams at the world's best companies</p>
      </section>

      <section className="container-xl px-4 md:px-24 mx-auto pt-5 md:pt-24">
        <ImageScroller images={images} />
      </section>

      <section className="max-w-screen-md mx-auto pt-10 pb-10 text-center">
        <div className="inline-block ">
          <div className="flex flex-wrap justify-center items-center border border-gray-600 rounded-2xl py-1.5 px-3 custom-box-shadow dark:border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              color="rgb(83, 83, 92)"
              className="dark:text-white"
              style={{ width: '18px', height: '18px' }}
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[13px] ml-2 font-medium text-[#53535C] dark:text-gray-200">Features</span>
          </div>
        </div>
      </section>
      <section className="container-xl px-4 md:px-24 mx-auto pt-10 pb-24">
        <div className="text-center pb-10">
          <p className="text-[30px] font-medium">Turbocharge your LLM apps development</p>
        </div>
        <div className="flex flex-wrap -mx-6">
          <div className="w-full md:w-1/2 px-6">
            <FeatureCard
              icon={<UsersRound size="60px" className="text-[#53535C] dark:text-gray-200" />}
              title="Team Collaboration"
              description="Collaborate on a Notion-like interface to define your LLM app requirements. Attach docs, data, and examples to ensure your prompts achieve high precision results."
            />

            <FeatureCard
              icon={<Server size="60px" className="text-[#53535C] dark:text-gray-200" />}
              title="Effortless deployment"
              description="Integrate Pype SDK in 4 lines of code."
              image={<Image src="/pype-deployement.webp" width={651} height={353} alt="Pype Development" />}
            />

            <FeatureCard
              icon={<LayoutDashboard size="60px" className="text-[#53535C] dark:text-gray-200 "/>}
              title="Monitor deployed prompts"
              description="Robust observability tools provide real-time metrics— cost, latency, requests, accuracy and 10+ metrics."
              image={<Image src="/deployement.webp" width={1024} height={531} alt="Pype Development" />}
            />
          </div>
          <div className="w-full md:w-1/2 px-6">
            <FeatureCard
              icon={<ScreenShare size="60px" className="text-[#53535C] dark:text-gray-200" />}
              title="Accelerated prompt development"
              description="Autogenerate your prompts and test examples. Compare selected prompts across models, parameters and prompt techniques."
            />

            <FeatureCard
              icon={<ChartBar size="60px" className="text-[#53535C] dark:text-gray-200" />}
              title="Evaluate and Auto Optimize prompts"
              description="Evaluate and pick the best performing prompt. Auto-Tune prompts to improve accuracy and consistency of the results."
              image={<Image src="/report.webp" width={512} height={380} alt="Reports" />}
            />

            <FeatureCard
              icon={<Code size="60px" className="text-[#53535C] dark:text-gray-200" />}
              title="No expertise required"
              description="No need to learn 50+ prompting techniques to improve prompts."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
