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
                className="fixed z-90 w-[50px] h-[50px] right-10 bottom-10 flex items-center justify-center drop-shadow-md rounded-full bg-indigo-500 text-white text-3xl font-medium"
            >&#129049;</button>
        </div>
    )
}
