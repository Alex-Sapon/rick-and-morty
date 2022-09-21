import {useEffect, useState} from 'react';

export const ButtonTop = () => {
    const [showButton, setShowButton] = useState(false);

    const onScrollToTopClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        const onScrollTopClick = () => {
            window.scrollY > 400 ? setShowButton(true) : setShowButton(false);
        }

        window.addEventListener('scroll', onScrollTopClick);

        return () => {
            window.removeEventListener('scroll', onScrollTopClick);
        }
    }, [])

    return (
        <div className={`${showButton ? 'block' : 'hidden'}`}>
            <button
                onClick={onScrollToTopClick}
                className="fixed z-90 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] right-5 sm:right-10 bottom-5 sm:bottom-10 flex items-center justify-center drop-shadow-md rounded-full bg-indigo-500 text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
            </button>
        </div>
    )
}
