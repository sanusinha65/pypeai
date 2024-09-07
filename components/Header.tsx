"use client"
import Image from "next/image";
import Link from "next/link";
import { Afacad as FontAfacad, Inter as FontInter } from "next/font/google";
import { useState, useEffect } from "react";

const fontAfacad = FontAfacad({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-afacad",
});
const fontInter = FontInter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
});


export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY) {
                    setShowHeader(false);
                } else {
                    setShowHeader(true);
                }

                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);


    return (
        <>
            <header
                className={`container-2xl mx-auto py-4 px-4 md:px-[96px] h-[73px] bg-white text-black ${fontInter.className} dark:bg-[#18181a] border-b-[1px] dark:text-white dark:border-[#b4b4b4] transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                    } fixed top-0 left-0 right-0 z-50`}
            >
                <nav className="flex flex-wrap justify-between  items-center mx-auto container-2xl">
                    <div className="w-full md:flex md:w-2/4 lg:3/4">
                        <div className="justify-between items-center flex flex-wrap gap-4">
                            <div className="w-[81px] h-[42px]">
                                <Link href="/">
                                    <Image
                                        src="/logo.png"
                                        width={81}
                                        height={42}
                                        alt="Logo"
                                        className="w-[81px] h-[42px]"
                                        unoptimized
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link href="/">
                                    <p className={`text-[28px] ${fontAfacad.className} font-semibold text-[#53535C] dark:text-white`}>Pype AI</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:w-2/4 lg:1/4 md:block">
                        <div className="flex flex-wrap gap-14 items-center justify-end">
                            <div>
                                <Link href="/">
                                    <p className="text-[15px] font-[500] tracking-tight">Features</p>
                                </Link>
                            </div>
                            <div>
                                <Link href="https://app.pypeai.com/" className="text-[14px] py-3 px-4 custom-launch-app-btn rounded-[10px] dark:border-white dark:border ">
                                    <span className="text-gray-300">Launch App</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
