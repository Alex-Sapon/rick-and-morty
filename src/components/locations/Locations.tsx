import {Pagination} from '../pagination/Pagination';
import {useActions, useAppSelector, useDebounce} from '../../hooks/hooks';
import {ChangeEvent, useEffect, useState} from 'react';
import Logo from '../../assets/img/bg-locations.png';
import {locationsActions} from './locationsReducer';

export const Locations = () => {
    const {fetchLocations} = useActions(locationsActions);

    const [value, setValue] = useState('');

    const locations = useAppSelector(state => state.locationsPage.data.results);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const onGenderSelect = (e: ChangeEvent<HTMLSelectElement>) => {

    }

    const onSpeciesSelect = (e: ChangeEvent<HTMLSelectElement>) => {

    }

    const onStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {

    }

    const onResetClick = () => {
        setValue('');

    }

    const debouncedValue = useDebounce<string>(value, 600);

    useEffect(() => {

    }, [debouncedValue])

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations])

    return (
        <div>
            <div className="h-[200px] mb-[20px] mx-[auto]">
                <img className="mx-[auto]" src={Logo} alt="Rick_and_Morty"/>
            </div>
            <div className="flex justify-around items-center mb-5">
                <div className="flex flex-col">
                    <span className="col-span-1 p-1 text-transparent font-bold">.</span>
                    <label className="relative block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg className="h-5 w-5 fill-slate-300" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.5 15H14.71L14.43 14.73C15.41 13.59 16 12.11 16 10.5C16 6.91 13.09 4 9.5 4C5.91 4 3 6.91 3 10.5C3 14.09 5.91 17 9.5 17C11.11 17 12.59 16.41 13.73 15.43L14 15.71V16.5L19 21.49L20.49 20L15.5 15ZM9.5 15C7.01 15 5 12.99 5 10.5C5 8.01 7.01 6 9.5 6C11.99 6 14 8.01 14 10.5C14 12.99 11.99 15 9.5 15Z"
                                fill="black" fillOpacity="0.54"/>
                        </svg>
                    </span>
                        <input
                            value={value}
                            onChange={onValueChange}
                            className="w-[325px] h-[45px] placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Filter by name..."
                            type="text"
                            name="search"
                        />
                    </label>
                </div>
                <div className="flex flex-col">
                    <span className="col-span-1 p-1 text-gray-500 font-bold">Type</span>
                    <select
                        value={'species'}
                        onChange={onSpeciesSelect}
                        className="w-[240px] h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    >
                        <option value=""/>
                        <option value="Human">Human</option>
                        <option value="Humanoid">Humanoid</option>
                        <option value="Robot">Robot</option>
                        <option value="Alien">Alien</option>
                        <option value="Disease">Disease</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <span className="col-span-1 p-1 text-gray-500 font-bold">Dimension</span>
                    <select
                        value={'gender'}
                        onChange={onGenderSelect}
                        className="w-[240px] h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    >
                        <option value=""/>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Genderless">Genderless</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
            </div>
            <button
                onClick={onResetClick}
                className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none mb-5">
                Reset filter
            </button>
            <div className="grid grid-cols-4 gap-5">
                {locations.map(({id, name, created, type, url, residents, dimension}) =>
                    <div key={id} className="text-center min-h-[128px] rounded shadow-md flex flex-col items-center justify-center bg-[#FAFAFA] p-4">
                        <h3 className="leading-5 font-medium text-lg mb-1">{name}</h3>
                        <p className="text-gray-400 font-medium">{dimension}</p>
                    </div>
                )}
            </div>
            <Pagination
                page={1}
                paginateBack={() => {
                }}
                paginateFront={() => {
                }}
                postsPerPage={20}
                totalPosts={12}
            />
        </div>
    )
}

