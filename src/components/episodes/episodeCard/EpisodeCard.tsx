import {Link, useNavigate, useParams} from 'react-router-dom';
import {useActions, useAppSelector} from '../../../hooks/hooks';
import {useEffect} from 'react';
import {Preloader} from '../../preloader/Preloader';
import {episodeActions} from '../episodesReducer';

export const EpisodeCard = () => {
    const {fetchEpisodeItem} = useActions(episodeActions);

    const navigate = useNavigate();

    const {id} = useParams<'id'>();

    const isLoading = useAppSelector(state => state.episodesPage.isLoading);
    const episode = useAppSelector(state => state.episodesPage.episode.episode);
    const name = useAppSelector(state => state.episodesPage.episode.name);
    const airDate = useAppSelector(state => state.episodesPage.episode.air_date);
    const characters = useAppSelector(state => state.episodesPage.episode.characters);

    useEffect(() => {
        if (Number(id)) {
            fetchEpisodeItem({id: Number(id)});
        }
    }, [id, fetchEpisodeItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="relative pb-8">
            <span className="flex items-center cursor-pointer absolute left-0" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                </svg>
                <span className="ml-2 font-bold text-lg">GO BACK</span>
            </span>
            <h2 className="font-bold text-4xl text-center mb-10 text-[#081F32]">{name}</h2>
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
            <ul className="grid grid-cols-4 gap-5">
                {characters?.map(({id, name, image, species}) =>
                    <div key={id}
                         className="rounded shadow-md cursor-pointer transition duration-700 ease-in-out hover:shadow-2xl">
                        <Link to={`/characters/${id}`}>
                            <img src={image} alt="Photo" className="h-[190px] w-[100%] object-cover rounded-t"/>
                            <div className="p-4">
                                <h3 className="font-medium text-[#081F32]">{name}</h3>
                                <p className="font-medium text-[#6E798C]">{species}</p>
                            </div>
                        </Link>
                    </div>
                )}
            </ul>
        </div>
    )
}