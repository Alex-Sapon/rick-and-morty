import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useActions, useAppSelector} from '../../../hooks';
import {charactersActions} from '../reducer/charactersReducer';
import {Preloader} from '../../../components/preloader';
import {getId} from '../../../assets';
import {
    selectCharacterEpisode,
    selectCharacterGender,
    selectCharacterImage,
    selectCharacterIsLoading,
    selectCharacterLocation,
    selectCharacterName,
    selectCharacterOrigin,
    selectCharacterSpecies,
    selectCharacterStatus,
    selectCharacterType
} from '../selectors';
import {EpisodeCard} from '../../episodes/episodeCard/EpisodeCard';

export const CharacterInfo = () => {
    const {fetchCharactersItem} = useActions(charactersActions);

    const navigate = useNavigate();

    const gender = useAppSelector(selectCharacterGender);
    const name = useAppSelector(selectCharacterName);
    const image = useAppSelector(selectCharacterImage);
    const species = useAppSelector(selectCharacterSpecies);
    const status = useAppSelector(selectCharacterStatus);
    const episode = useAppSelector(selectCharacterEpisode);
    const location = useAppSelector(selectCharacterLocation);
    const origin = useAppSelector(selectCharacterOrigin);
    const type = useAppSelector(selectCharacterType);
    const isLoading = useAppSelector(selectCharacterIsLoading);

    const {id} = useParams<'id'>();

    useEffect(() => {
        if (id && Number(id)) {
            fetchCharactersItem(id);
        }
    }, [id, fetchCharactersItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="pb-8 min-h-[88vh]">
            <div className="flex items-center cursor-pointer mb-5" onClick={() => navigate(-1)}>
                <span className="sm:pb-1 font-medium sm:text-2xl rotate-180">&#10140;</span>
                <span className="ml-2 font-bold sm:text-lg">GO BACK</span>
            </div>
            <div className="h-[300px] mb-4">
                <img className="bg-gray-300 h-[100%] mx-[auto] rounded-lg shadow-md bg-cover bg-center" src={image}
                     alt="LogoCard"/>
            </div>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-5 md:px-40">{name}</h2>
            <div className="grid gap-8 md:grid-cols-2">
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
                            <div className="flex flex-col mr-5">
                                <b>Origin</b>
                                <span className="text-gray-500 flex justify-between">{origin ? origin.name : ''}</span>
                            </div>
                            <NavLink to={origin?.url ? `/locations/${getId(origin?.url)}` : ''}>
                                <button className="rounded bg-[#3d4451]">
                                    <span className="text-white font-medium text-xl px-2">&#10095;</span>
                                </button>
                            </NavLink>
                        </div>
                        <div className="flex flex-col rounded p-2 border-2 border-gray-300">
                            <b>Type</b>
                            <span className="text-gray-500">{type ? type : 'no type'}</span>
                        </div>
                        <div
                            className="flex items-center justify-between p-2 rounded p-2 border-2 border-gray-300 bg-base-100">
                            <div className="flex flex-col mr-5">
                                <b>Location</b>
                                <span className="text-gray-500 flex justify-between">
                                    {location ? location.name : ''}
                                </span>
                            </div>
                            <NavLink to={location?.url ? `/locations/${getId(location?.url)}` : ''}>
                                <button className="rounded bg-[#3d4451]">
                                    <span className="text-white text-xl px-2">&#10095;</span>
                                </button>
                            </NavLink>
                        </div>
                    </ul>
                </div>
                <div>
                    <h3 className="text-gray-500 font-medium text-lg mb-3 p-2">Episodes</h3>
                    <ul className="sm:h-[47vh] sm:overflow-hidden sm:overflow-y-auto items-start sm:pr-2">
                        {episode?.map(episodeItem => <EpisodeCard key={episodeItem.id} {...episodeItem}/>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
