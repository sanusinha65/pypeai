import React, { useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

interface ImageScrollerProps {
    images: string[]; // Array of image URLs
}

const ImageScroller: React.FC<ImageScrollerProps> = ({ images }) => {
    const splideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (splideRef.current) {
            const splide = new Splide(splideRef.current, {
                type: 'loop',
                perPage: 5,
                perMove: 1,
                gap: '1rem',
                pagination: false,
                arrows: false,
                height: '67px', // Ensure the height does not exceed 100px
                width: '100%',  // Set width to full container width
                autoScroll: {
                    speed: 0.5,
                },
            });
            splide.mount({ AutoScroll });
        }
    }, []);

    return (
        <div className="relative w-full overflow-hidden">
            <div ref={splideRef} className="splide w-full" style={{
                maskImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.65) 22.5%, rgba(255, 255, 255, 0.7) 77.5%, rgba(255, 255, 255, 0) 100%)',
                maskSize: '100% 100%',
                maskPosition: '0% 0%',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 22.5%, rgba(255, 255, 255, 0.8) 77.5%, rgba(255, 255, 255, 0) 100%)',
                WebkitMaskSize: '100% 100%',
                WebkitMaskPosition: '0% 0%',
                WebkitMaskRepeat: 'no-repeat',
            }}>
                <div className="splide__track overflow-hidden">
                    <ul className="splide__list flex">
                        {images.map((image, index) => (
                            <li key={index} className="splide__slide flex-shrink-0 w-[150px]">
                                <img
                                    src={image}
                                    alt={`Image ${index}`}
                                    className="w-full h-[67px] object-contain"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageScroller;
