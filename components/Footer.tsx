import { Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="container-2xl mx-auto py-6 px-4 md:py-10 md:px-24 bg-gray-50 text-black font-inter dark:bg-[#18181a] dark:text-white border-t dark:border-[#b4b4b4]">
            <div className="flex flex-wrap justify-between items-center">
                <div className="w-full md:w-2/3 text-center md:text-start">
                    <p className="text-sm font-medium">
                        © Singularity Corp Pvt. Ltd. 2024. All rights reserved. Privacy Policy.
                    </p>
                </div>
                <div className="w-full md:w-1/3 flex justify-center md:justify-end pt-5 md:pt-0">
                    <Link href="https://www.linkedin.com/company/pype-networks/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}