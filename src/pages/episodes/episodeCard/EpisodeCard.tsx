import {NavLink} from 'react-router-dom';
import {Episode} from '../../../api';

export const EpisodeCard = ({id, episode, name, air_date}: Episode) => (
    <div className="flex items-center justify-between p-2 rounded mb-3 border-2 border-gray-300 bg-base-100">
        <div className="flex flex-col mr-5">
            <b>{episode}</b>
            <span className="text-gray-500">{name}</span>
            <span className="text-gray-500">{air_date}</span>
        </div>
        <NavLink to={`/episode/${id}`}>
            <button className="rounded bg-[#3d4451]">
                <span className="text-white font-medium text-xl px-2">&#10095;</span>
            </button>
        </NavLink>
    </div>
)