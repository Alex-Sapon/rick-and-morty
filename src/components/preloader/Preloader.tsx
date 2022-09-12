import img from '../../assets/img/preloader.gif';

export const Preloader = () => {
    return (
        <div className="flex items-center justify-center">
            <img src={img} alt="Spinner" className="mt-[35%]"/>
        </div>
    )
}