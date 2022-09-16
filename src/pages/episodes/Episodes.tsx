import Logo from '../../assets/img/logo_eyes.png';
import {ChangeEvent, useEffect, useState} from 'react';
import {useActions, useAppSelector, useDebounce} from '../../hooks/hooks';
import {episodeActions} from './episodesReducer';
import {Pagination} from '../../components/pagination';
import {InfoCard} from '../../components/InfoCard';

export const Episodes = () => {
    const {fetchEpisode, changeEpisodeFilter} = useActions(episodeActions);

    const [value, setValue] = useState('');

    const episodes = useAppSelector(state => state.episodesPage.data.results);
    const prevPage = useAppSelector(state => state.episodesPage.data.info?.prev);
    const nextPage = useAppSelector(state => state.episodesPage.data.info?.next);
    const count = useAppSelector(state => state.episodesPage.data.info?.count);
    const name = useAppSelector(state => state.episodesPage.filter.name);
    const page = useAppSelector(state => state.episodesPage.filter.page);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

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

    return (
        <div>
            <div className="h-[81vh]">
                <div className="h-[200px] mb-[30px] mx-[auto]">
                    <img className="mx-[auto] h-[100%]" src={Logo} alt="Rick_and_Morty"/>
                </div>
                <div className="flex justify-around items-center mb-[40px]">
                    <div className="flex flex-col">
                        <label className="relative block">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg className="h-5 w-5 fill-slate-300" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.5 15H14.71L14.43 14.73C15.41 13.59 16 12.11 16 10.5C16 6.91 13.09 4 9.5 4C5.91 4 3 6.91 3 10.5C3 14.09 5.91 17 9.5 17C11.11 17 12.59 16.41 13.73 15.43L14 15.71V16.5L19 21.49L20.49 20L15.5 15ZM9.5 15C7.01 15 5 12.99 5 10.5C5 8.01 7.01 6 9.5 6C11.99 6 14 8.01 14 10.5C14 12.99 11.99 15 9.5 15Z"
                                        fill="black" fillOpacity="0.54"/>
                                </svg>
                            </span>
                            <input
                                value={value}
                                onChange={onValueChange}
                                className="w-[500px] h-[45px] placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                placeholder="Filter by name or episode..."
                                type="text"
                                name="search"
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {episodes.map(episode => <InfoCard key={episode.id} path="episode" {...episode}/>)}
                </div>
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
