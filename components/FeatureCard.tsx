import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    image?: React.ReactNode; 
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, image }) => {
    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 w-full p-10 rounded-2xl dark:bg-[#18181a] dark:text-gray-200">
            <div className="mb-6">
                {icon}
            </div>
            <div className="flex items-center mb-4">
                <h5 className="text-slate-800 text-xl font-semibold dark:text-gray-300">
                    {title}
                </h5>
            </div>
            <p className="block text-slate-600 leading-normal font-medium mb-4 dark:text-gray-400">
                {description}
            </p>
            {image && (
                <div className="mt-5">
                    {image}
                </div>
            )}
        </div>
    );
};

export default FeatureCard;
