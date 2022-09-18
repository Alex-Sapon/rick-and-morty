import Logo from '../../assets/img/logo_eyes.png';
import {useEffect, useState} from 'react';
import {useActions, useAppSelector, useDebounce} from '../../hooks';
import {episodeActions} from './reducer/episodesReducer';
import {Pagination} from '../../components/pagination';
import {InfoCard} from '../../components/InfoCard';
import {Preloader} from '../../components/preloader';
import {Input} from '../../components/input';
import {
    selectEpisodeCount,
    selectEpisodeError,
    selectEpisodeFilterName,
    selectEpisodeFilterPage,
    selectEpisodeIsLoading,
    selectEpisodeNextPage,
    selectEpisodePrevPage,
    selectEpisodeResults
} from './selectors';

export const Episodes = () => {
    const {fetchEpisode, changeEpisodeFilter} = useActions(episodeActions);

    const episodes = useAppSelector(selectEpisodeResults);
    const prevPage = useAppSelector(selectEpisodePrevPage);
    const nextPage = useAppSelector(selectEpisodeNextPage);
    const count = useAppSelector(selectEpisodeCount);
    const name = useAppSelector(selectEpisodeFilterName);
    const page = useAppSelector(selectEpisodeFilterPage);
    const isLoading = useAppSelector(selectEpisodeIsLoading);
    const error = useAppSelector(selectEpisodeError);

    const [value, setValue] = useState(name || '');

    const onPrevPageClick = () => {
        if (prevPage) {
            const valuePrevPage = Number(prevPage.replace(/\D/ig, ''));
            if (!!valuePrevPage) {
                changeEpisodeFilter({page: valuePrevPage, name})
            }
        }
    }

    const onNextPageClick = () => {
        if (nextPage) {
            const valueNextPage = Number(nextPage.replace(/\D/ig, ''));
            if (!!valueNextPage) {
                changeEpisodeFilter({page: valueNextPage, name});
            }
        }
    }

    const debouncedValue = useDebounce<string>(value, 600);

    useEffect(() => {
        changeEpisodeFilter({page: 1, name: debouncedValue});
    }, [debouncedValue, changeEpisodeFilter])

    useEffect(() => {
        fetchEpisode();
    }, [fetchEpisode, page, name])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div>
            <div className="min-h-[81vh]">
                <div className="h-[200px] mb-[30px] mx-[auto]">
                    <img className="mx-[auto] h-[100%]" src={Logo} alt="Rick_and_Morty"/>
                </div>
                <div className="mb-[40px]">
                    <Input
                        value={value}
                        onChange={e => setValue(e.currentTarget.value)}
                        className="sm:w-[500px] mx-auto"
                        valueSpan="."
                        placeholder="Filter by name or episode..."
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {episodes.map(episode => <InfoCard key={episode.id} path="episode" {...episode}/>)}
                </div>
                {error && <div className="text-red-600 font-bold text-xl text-center my-3">{`Error! ${error}!`}</div>}
            </div>
            <Pagination
                page={page!}
                paginateBack={onPrevPageClick}
                paginateFront={onNextPageClick}
                postsPerPage={20}
                totalPosts={count!}
            />
        </div>
    )
}
