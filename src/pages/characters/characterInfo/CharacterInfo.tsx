import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useActions, useAppSelector} from '../../../hooks/hooks';
import {charactersActions} from '../charactersReducer';
import {Preloader} from '../../../components/preloader/Preloader';
import {getId} from '../../../assets';

export const CharacterInfo = () => {
    const {fetchCharactersItem} = useActions(charactersActions);

    const navigate = useNavigate();

    const {
        gender,
        name,
        image,
        species,
        status,
        episode,
        location,
        origin,
        type
    } = useAppSelector(state => state.charactersPage.character);

    const isLoading = useAppSelector(state => state.charactersPage.isLoading);

    const {id} = useParams<'id'>();

    useEffect(() => {
        if (id) {
            fetchCharactersItem(id);
        }
    }, [id, fetchCharactersItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="relative pb-8 min-h-[88vh]">
            <span className="flex items-center cursor-pointer absolute left-0" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                </svg>
                <span className="ml-2 font-bold text-lg">GO BACK</span>
            </span>
            <div className="h-[300px] mb-6">
                <img className="bg-gray-300 h-[100%] mx-[auto] rounded-lg shadow-md bg-cover bg-center" src={image} alt="LogoCard"/>
            </div>
            <h2 className="font-bold text-5xl text-center mb-5">{name}</h2>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-gray-500 font-medium text-lg mb-3 p-2">Informations</h3>
                    <ul className="grid gap-3">
                        <div className="flex flex-col rounded p-2 border-2 border-gray-300">
                            <b>Gender</b>
                            <span className="text-gray-500">{gender}</span>
                        </div>
                        <div className="flex flex-col rounded p-2 border-2 border-gray-300">
                            <b>Status</b>
                            <span className="text-gray-500">{status}</span>
                        </div>
                        <div className="flex flex-col rounded p-2 border-2 border-gray-300">
                            <b>Specie</b>
                            <span className="text-gray-500">{species}</span>
                        </div>
                        <div className="flex items-center justify-between rounded p-2 border-2 border-gray-300">
                            <div className="flex flex-col">
                                <b>Origin</b>
                                <span className="text-gray-500 flex justify-between">{origin ? origin.name : ''}</span>
                            </div>
                            <NavLink to={`/locations/${getId(origin?.url)}`}>
                                <button className="bg-[#3d4451] transition-all rounded">
                                    <svg className="h-6 w-6 fill-amber-50 md:h-7 md:w-7"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                                    </svg>
                                </button>
                            </NavLink>
                        </div>
                        <div className="flex flex-col rounded p-2 border-2 border-gray-300">
                            <b>Type</b>
                            <span className="text-gray-500">{type ? type : 'no type'}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded p-2 border-2 border-gray-300 bg-base-100">
                            <div className="flex flex-col">
                                <b>Location</b>
                                <span className="text-gray-500 flex justify-between">
                                    {location ? location.name : ''}
                                </span>
                            </div>
                            <NavLink to={`/locations/${getId(location?.url)}`}>
                                <button className="bg-[#3d4451] transition-all rounded">
                                    <svg className="h-6 w-6 fill-amber-50 hover:h-7-w-7 md:h-7 md:w-7"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                                    </svg>
                                </button>
                            </NavLink>
                        </div>
                    </ul>
                </div>
                <div>
                    <h3 className="text-gray-500 font-medium text-lg mb-3 p-2">Episodes</h3>
                    <ul>
                        {episode?.map(({id, episode, name, air_date}) =>
                            <div key={id}>
                                <p>{episode}</p>
                                <p>{name}</p>
                                <p>{air_date}</p>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}