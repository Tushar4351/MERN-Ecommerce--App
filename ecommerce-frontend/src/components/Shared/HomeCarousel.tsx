import  { useState, useEffect } from 'react';
import image1 from "../../assets/images/bg-1.jpg"
import image2 from "../../assets/images/bg-2.jpg"
const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(currentSlide === 1 ? 0 : 1);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [currentSlide]);

    return (

        <div id="default-carousel" className="mt-16 px-5 w-full " data-carousel="slide">
            <div className="relative h-[10rem] sm:h-[20rem] md:h-[30rem] overflow-hidden rounded-xl ">
               
            <div className={`duration-700 ease-in-out ${currentSlide === 0 ? 'block' : 'hidden'}`} data-carousel-item>
                    <img src={image1} className="absolute block w-full rounded-xl carousel-image" alt="..." />
                </div>
                <div className={`duration-700 ease-in-out ${currentSlide === 1 ? 'block' : 'hidden'}`} data-carousel-item>
                    <img src={image2} className="absolute block w-full rounded-xl carousel-image" alt="..." />
                </div>
               
            </div>
            <div className="absolute z-30 flex mt-5 -translate-x-1/2 left-1/2 space-x-3 rtl:space-x-reverse">
                {Array.from({ length: 2 }, (_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-green-150' : 'bg-gray-300'}`}
                        aria-current={index === currentSlide ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                        data-carousel-slide-to={index}
                    />
                ))}
            </div>
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-[20rem] sm:h-[30rem] px-10 md:mt-14 cursor-pointer group focus:outline-none" data-carousel-prev onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-[20rem] sm:h-[30rem] px-10 md:mt-14 cursor-pointer group focus:outline-none" data-carousel-next onClick={() => setCurrentSlide(currentSlide === 1 ? 0 : 1)}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
