"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const scrollToFeatures = () => {
        window.location.href = "/#app-features";
    };


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
        <div
            className={`sticky top-0 z-50 transition-transform duration-300 will-change-scroll ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="container-2xl mx-auto py-4 px-4 md:px-[96px] bg-white text-black font-inter dark:bg-[#18181a] border-b-[1px] dark:text-white dark:border-[#b4b4b4] mb-5">
                <header className="w-full">
                    <nav className="flex flex-wrap justify-between items-center mx-auto">
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
                                            priority
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/">
                                        <p className={`text-[28px] font-afacad font-semibold text-[#53535C] dark:text-white`}>Pype AI</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:w-2/4 lg:1/4 md:block">
                            <div className="flex flex-wrap gap-14 items-center justify-end">
                                <div>
                                    <button onClick={scrollToFeatures}>
                                        <p className="text-[15px] font-medium tracking-tight">Features</p>
                                    </button>
                                </div>
                                <div>
                                    <Link href="https://app.pypeai.com/" className="text-[14px] shadow-xl py-3 px-4 custom-launch-app-btn rounded-[10px] dark:border-white dark:border dark:hover:bg-gray-300" target="_blank">
                                        <span className="text-gray-300">Launch App</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    );
}
