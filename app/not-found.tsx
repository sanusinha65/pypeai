import { CircleX } from "lucide-react"
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#18181a]">
            <CircleX size="60" className="text-red-600"  />
            <p className="pt-3 text-[40px] font-bold font-afacad">Error 404: Page Not Found</p>
        </div>
    );
}