import {Link} from 'react-router-dom';
import {setStatusStyles} from '../../../assets';
import {Character} from '../../../api';

export const CharacterCard = ({id, name, image, species, status}: Character) => (
    <Link to={`/characters/${id}`}
          className="rounded shadow-md cursor-pointer transition duration-700 ease-in-out hover:shadow-2xl">
        <img src={image} alt="Card" className="h-[220px] w-[100%] object-cover rounded-t"/>
        <div className="p-4">
            <h3 className="font-bold text-[#081F32] mb-1">{name}</h3>
            <p className="text-[#6E798C] mb-2">{species}</p>
            <span className={`${setStatusStyles(status)} px-2 py-0.5 rounded`}>{status}</span>
        </div>
    </Link>
)
