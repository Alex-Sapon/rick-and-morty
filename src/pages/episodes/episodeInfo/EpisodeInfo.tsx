import {useNavigate, useParams} from 'react-router-dom';
import {useActions, useAppSelector} from '../../../hooks';
import {useEffect} from 'react';
import {Preloader} from '../../../components/preloader';
import {episodeActions} from '../episodesReducer';
import {CharacterCard} from '../../characters/characterCard';
import {
    selectEpisode, selectEpisodeAirDate, selectEpisodeCharacters, selectEpisodeIsLoading, selectEpisodeName
} from '../selectors';

export const EpisodeInfo = () => {
    const {fetchEpisodeItem} = useActions(episodeActions);

    const navigate = useNavigate();

    const {id} = useParams<'id'>();

    const isLoading = useAppSelector(selectEpisodeIsLoading);
    const episode = useAppSelector(selectEpisode);
    const name = useAppSelector(selectEpisodeName);
    const airDate = useAppSelector(selectEpisodeAirDate);
    const characters = useAppSelector(selectEpisodeCharacters);

    useEffect(() => {
        if (id) {
            fetchEpisodeItem(id);
        }
    }, [id, fetchEpisodeItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="pb-8 min-h-[88vh]">
            <div className="flex items-center cursor-pointer mb-5" onClick={() => navigate(-1)}>
                <span className="pb-1 font-medium text-2xl rotate-180">&#10140;</span>
                <span className="ml-2 font-bold text-lg">GO BACK</span>
            </div>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-7 md:mb-10 text-[#081F32]">{name}</h2>
            <div className="grid grid-cols-2 gap-5 text-center mb-7">
                <div className="">
                    <h3 className="text-[#081F32] text-lg"><b>Episode</b></h3>
                    <p className="text-[#6E798C] font-medium">{episode}</p>
                </div>
                <div>
                    <h3 className="text-[#081F32] text-lg"><b>The air date of the episode</b></h3>
                    <p className="text-[#6E798C] font-medium">{airDate}</p>
                </div>
            </div>
            <h3 className="text-[#6E798C] font-medium text-2xl mb-3 p-2">Cast</h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {characters?.map(character => <CharacterCard key={character.id} {...character}/>)}
            </ul>
        </div>
    )
}
