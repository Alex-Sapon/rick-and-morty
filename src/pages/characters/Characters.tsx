import {ChangeEvent, useEffect, useState} from 'react';
import {useActions, useAppSelector, useDebounce} from '../../hooks';
import {charactersActions} from './charactersReducer';
import {Pagination} from '../../components/pagination';
import Logo from '../../assets/img/logo_name.png';
import {Preloader} from '../../components/preloader';
import {CharacterCard} from './characterCard';
import {
    selectCharacterCount,
    selectCharacterFilterGender,
    selectCharacterFilterName,
    selectCharacterFilterNextPage,
    selectCharacterFilterPage,
    selectCharacterFilterPrevPage,
    selectCharacterFilterSpecies,
    selectCharacterFilterStatus,
    selectCharacterIsLoading,
    selectCharacterResults
} from './selectors';
import {genderOptions, speciesOptions, statusOptions} from './data';
import {Input} from '../../components/input';

export const Characters = () => {
    const {fetchCharacters, changeCharactersFilter} = useActions(charactersActions);

    const characters = useAppSelector(selectCharacterResults);
    const count = useAppSelector(selectCharacterCount);
    const gender = useAppSelector(selectCharacterFilterGender);
    const name = useAppSelector(selectCharacterFilterName);
    const species = useAppSelector(selectCharacterFilterSpecies);
    const status = useAppSelector(selectCharacterFilterStatus);
    const page = useAppSelector(selectCharacterFilterPage);
    const nextPage = useAppSelector(selectCharacterFilterNextPage);
    const prevPage = useAppSelector(selectCharacterFilterPrevPage);
    const isLoading = useAppSelector(selectCharacterIsLoading);

    const [value, setValue] = useState(name || '');

    const onGenderSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        changeCharactersFilter({gender: e.target.value, species, status, page, name});
    }

    const onSpeciesSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        changeCharactersFilter({species: e.target.value, page, name, status, gender});
    }

    const onStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        changeCharactersFilter({status: e.target.value, name, species, gender, page});
    }

    const onPrevPageClick = () => {
        if (prevPage) {
            const valuePrevPage = Number(prevPage.replace(/\D/ig, ''));
            if (!!valuePrevPage) {
                changeCharactersFilter({page: valuePrevPage, gender, name, species, status})
            }
        }
    }

    const onNextPageClick = () => {
        if (nextPage) {
            const valueNextPage = Number(nextPage.replace(/\D/ig, ''));
            if (!!valueNextPage) {
                changeCharactersFilter({page: valueNextPage, species, status, gender, name});
            }
        }
    }

    const onResetClick = () => {
        setValue('');
        changeCharactersFilter({page: 1, gender: '', name: '', status: '', species: ''});
    }

    const debouncedValue = useDebounce<string>(value, 600);

    useEffect(() => {
        changeCharactersFilter({name: debouncedValue, gender, page: 1, species, status});
    }, [debouncedValue, changeCharactersFilter, gender, species, status])

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters, gender, name, species, status, page])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <>
            <div className="lg:h-[200px] lg:mb-[20px] mx-[auto]  md:mb-[20px]">
                <img className="mx-[auto]" src={Logo} alt="Rick_and_Morty"/>
            </div>
            <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 mb-5">
                <Input
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    className=""
                    valueSpan="."
                    placeholder="Filter by name..."
                />
                <div className="flex flex-col w-[100%]">
                    <span className="col-span-1 p-1 text-gray-500 font-bold">Species</span>
                    <select
                        value={species}
                        onChange={onSpeciesSelect}
                        className="h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    >
                        {speciesOptions.map(({id, value}) => <option key={id} value={value}>{value}</option>)}
                    </select>
                </div>
                <div className="flex flex-col w-[100%]">
                    <span className="col-span-1 p-1 text-gray-500 font-bold">Gender</span>
                    <select
                        value={gender}
                        onChange={onGenderSelect}
                        className="h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    >
                        {genderOptions.map(({id, value}) => <option key={id} value={value}>{value}</option>)}
                    </select>
                </div>
                <div className="flex flex-col w-[100%]">
                    <span className="col-span-1 p-1 text-gray-500 font-bold">Status</span>
                    <select
                        value={status}
                        onChange={onStatusSelect}
                        className="h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    >
                        {statusOptions.map(({id, value}) => <option key={id} value={value}>{value}</option>)}
                    </select>
                </div>
            </div>
            <button
                onClick={onResetClick}
                className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none mb-5"
            >
                Reset filter
            </button>
            <div className="min-h-[52vh]">
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {characters?.map(character => <CharacterCard key={character.id} {...character}/>)}
                </ul>
            </div>
            <Pagination
                page={page!}
                paginateBack={onPrevPageClick}
                paginateFront={onNextPageClick}
                postsPerPage={20}
                totalPosts={count ? count : 1}
            />
        </>
    )
}
