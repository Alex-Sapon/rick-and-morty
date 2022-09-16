import {Link} from 'react-router-dom';
import {Episode, Location} from '../../api/api';

type InfoCardType = Partial<Location> & Partial<Episode> & {
    path: string
}

export const InfoCard = ({id, name, air_date, episode, type, path}: InfoCardType) => {
    return (
        <Link to={`/${path}/${id}`}>
            <div
                className="cursor-pointer text-center h-[115px] rounded shadow-md flex flex-col items-center justify-center bg-[#FAFAFA] p-3 transition duration-700 ease-in-out hover:shadow-2xl">
                <h3 className="leading-5 font-medium mb-1 text-[#081F32]">{name}</h3>
                {type && <p className="font-medium text-[#6E798C]">{type}</p>}
                {air_date && episode &&
                    <>
                        <p className="font-medium text-[#6E798C]">{air_date}</p>
                        <p className="font-medium text-[#6E798C]">{episode}</p>
                    </>
                }
            </div>
        </Link>
    )
}