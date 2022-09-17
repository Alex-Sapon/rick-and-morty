import img from '../../assets/img/preloader.gif';

export const Preloader = () => (
    <div className="flex items-center justify-center h-[88vh]">
        <img src={img} alt="Spinner"/>
    </div>
)