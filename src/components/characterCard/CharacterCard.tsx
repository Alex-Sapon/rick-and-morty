import {Link} from 'react-router-dom';
import {setStatusStyles} from '../../assets';
import {Character} from '../../api/api';

export const CharacterCard = ({id, name, image, species, status}: Character) => (
    <div className="rounded shadow-md cursor-pointer transition duration-700 ease-in-out hover:shadow-2xl">
        <Link to={`/characters/${id}`}>
            <img src={image} alt="Card" className="h-[200px] w-[100%] object-cover rounded-t"/>
            <div className="p-4">
                <h3 className="font-medium text-[#081F32] mb-2">{name}</h3>
                <div className="flex items-start justify-between">
                    <p className="text-[#6E798C] mr-2">{species}</p>
                    <span className={`${setStatusStyles(status)} px-1 rounded`}>{status}</span>
                </div>
            </div>
        </Link>
    </div>
)
