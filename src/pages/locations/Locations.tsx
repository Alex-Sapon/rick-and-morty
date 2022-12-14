import {Pagination} from '../../components/pagination';
import {useActions, useAppSelector, useDebounce} from '../../hooks';
import {ChangeEvent, useEffect, useState} from 'react';
import Logo from '../../assets/img/bg-locations.png';
import {locationsActions} from './reducer/locationsReducer';
import {InfoCard} from '../../components/InfoCard';
import {dimensionOptions, typeOptions} from './data';
import {
    selectLocationCount,
    selectLocationError,
    selectLocationFilterDimension,
    selectLocationFilterName,
    selectLocationFilterPage,
    selectLocationFilterType,
    selectLocationIsLoading,
    selectLocationNextPage,
    selectLocationPrevPage,
    selectLocationResults
} from './selectors';
import {Input} from '../../components/input';
import {Preloader} from '../../components/preloader';

export const Locations = () => {
    const {fetchLocations, changeLocationsFilter} = useActions(locationsActions);

    const locations = useAppSelector(selectLocationResults);
    const count = useAppSelector(selectLocationCount);
    const prevPage = useAppSelector(selectLocationPrevPage);
    const nextPage = useAppSelector(selectLocationNextPage);
    const name = useAppSelector(selectLocationFilterName);
    const dimension = useAppSelector(selectLocationFilterDimension);
    const type = useAppSelector(selectLocationFilterType);
    const page = useAppSelector(selectLocationFilterPage);
    const isLoading = useAppSelector(selectLocationIsLoading);
    const error = useAppSelector(selectLocationError);

    const [value, setValue] = useState(name || '');

    const onPrevPageClick = () => {
        if (prevPage) {
            const valuePrevPage = Number(prevPage.replace(/\D/ig, ''));
            if (!!valuePrevPage) {
                changeLocationsFilter({page: valuePrevPage, name, dimension, type})
            }
        }
    }

    const onNextPageClick = () => {
        if (nextPage) {
            const valueNextPage = Number(nextPage.replace(/\D/ig, ''));
            if (!!valueNextPage) {
                changeLocationsFilter({page: valueNextPage, name, dimension, type});
            }
        }
    }

    const onTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        changeLocationsFilter({page, name, dimension, type: e.currentTarget.value});
    }

    const onDimensionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        changeLocationsFilter({page, name, dimension: e.currentTarget.value, type});
    }

    const onResetClick = () => {
        setValue('');
        changeLocationsFilter({page: 1, name: '', dimension: '', type: ''});
    }

    const debouncedValue = useDebounce<string>(value, 600);

    useEffect(() => {
        changeLocationsFilter({page: 1, name: debouncedValue, dimension, type});
    }, [debouncedValue, changeLocationsFilter, dimension, type])

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations, page, name, dimension, type])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <>
            <div className="min-h-[81vh]">
                <div className="h-[200px] mb-[20px] mx-[auto]">
                    <img className="mx-[auto]" src={Logo} alt="Rick_and_Morty"/>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                    <Input
                        value={value}
                        onChange={e => setValue(e.currentTarget.value)}
                        className="w-[100%]"
                        valueSpan="."
                        placeholder="Filter by name..."
                    />
                    <div className="flex flex-col w-[100%]">
                        <span className="col-span-1 p-1 text-gray-500 font-bold">Type</span>
                        <select
                            value={type}
                            onChange={onTypeSelect}
                            className="h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        >
                            {typeOptions.map(({id, value}) => <option key={id} value={value}>{value}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <span className="col-span-1 p-1 text-gray-500 font-bold">Dimension</span>
                        <select
                            value={dimension}
                            onChange={onDimensionSelect}
                            className="h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        >
                            {dimensionOptions.map(({id, value}) => <option key={id} value={value}>{value}</option>)}
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={onResetClick}
                    className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none mb-5">
                    Reset filter
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {locations.map(location => <InfoCard key={location.id} path="locations" {...location}/>)}
                </div>
                {error && <div className="text-red-600 font-bold text-xl text-center my-3">{`Error! ${error}!`}</div>}
            </div>
            <Pagination
                page={page!}
                paginateBack={onPrevPageClick}
                paginateFront={onNextPageClick}
                postsPerPage={20}
                totalPosts={count || 1}
            />
        </>
    )
}
