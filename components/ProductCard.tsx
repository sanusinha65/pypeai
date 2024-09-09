import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    basePrice?: string;
    actualPrice: string;
    linkUrl: string;
    width:number;
    height:number;
    currency:string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    imageSrc,
    imageAlt,
    basePrice,
    actualPrice,
    linkUrl,
    width,
    height,
    currency
}) => {
    return (
        <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-full dark:bg-[#18181a] dark:border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out">
            <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                <Image
                    src={imageSrc}
                    width={width}
                    height={height}
                    alt={imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                    priority
                />
            </div>
            <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-800 dark:text-gray-200">
                    {title}
                </h4>
                <p className="text-base mt-4">
                    {basePrice && (
                        <span className="font-light text-slate-700 dark:text-gray-300 text-sm">
                            <s>{currency} {basePrice}</s>
                        </span>
                    )}
                    &nbsp;
                    <span className="font-medium text-red-700 dark:text-red-700">
                        {currency} {actualPrice}
                    </span>
                </p>
            </div>
            <div className="flex justify-center p-6 pt-2 gap-7">
                <Link
                    href={linkUrl}
                    className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;