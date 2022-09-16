import {Pagination} from '../../components/pagination';
import {useActions, useAppSelector, useDebounce} from '../../hooks/hooks';
import {ChangeEvent, useEffect, useState} from 'react';
import Logo from '../../assets/img/bg-locations.png';
import {locationsActions} from './locationsReducer';
import {InfoCard} from '../../components/InfoCard';

export const Locations = () => {
    const {fetchLocations, changeLocationsFilter} = useActions(locationsActions);

    const [value, setValue] = useState('');

    const locations = useAppSelector(state => state.locationsPage.data.results);
    const count = useAppSelector(state => state.locationsPage.data.info?.count);
    const prevPage = useAppSelector(state => state.locationsPage.data.info?.prev);
    const nextPage = useAppSelector(state => state.locationsPage.data.info?.next);
    const name = useAppSelector(state => state.locationsPage.filter.name);
    const dimension = useAppSelector(state => state.locationsPage.filter.dimension);
    const type = useAppSelector(state => state.locationsPage.filter.type);
    const page = useAppSelector(state => state.locationsPage.filter.page);

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

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
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

    return (
        <div>
            <div className="h-[81vh]">
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
                            value={type}
                            onChange={onTypeSelect}
                            className="w-[240px] h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        >
                            <option value=""/>
                            <option value="Planet">Planet</option>
                            <option value="Cluster">Cluster</option>
                            <option value="Space station">Space station</option>
                            <option value="Microverse">Microverse</option>
                            <option value="TV">TV</option>
                            <option value="Resort">Resort</option>
                            <option value="Fantasy town">Fantasy town</option>
                            <option value="Dream">Dream</option>
                            <option value="Dimension">Dimension</option>
                            <option value="Menagerie">Menagerie</option>
                            <option value="Customs">Customs</option>
                            <option value="Dwarf planet (Celestial Dwarf)">Dwarf planet (Celestial Dwarf)</option>
                            <option value="Miniverse">Miniverse</option>
                            <option value="Teenyverse">Teenyverse</option>
                            <option value="Box">Box</option>
                            <option value="Spacecraft">Spacecraft</option>
                            <option value="Artificially generated world">Artificially generated world</option>
                            <option value="Machine">Machine</option>
                            <option value="Arcade">Arcade</option>
                            <option value="Spa">Spa</option>
                            <option value="Quadrant">Quadrant</option>
                            <option value="Quasar">Quasar</option>
                            <option value="Mount">Mount</option>
                            <option value="Liquid">Liquid</option>
                            <option value="Convention">Convention</option>
                            <option value="Woods">Woods</option>
                            <option value="Diegesis">Diegesis</option>
                            <option value="Non-Diegetic Alternative Reality">Non-Diegetic Alternative Reality</option>
                            <option value="Nightmare">Nightmare</option>
                            <option value="Asteroid">Asteroid</option>
                            <option value="Acid Plant">Acid Plant</option>
                            <option value="Reality">Reality</option>
                            <option value="Death Star">Death Star</option>
                            <option value="Base">Base</option>
                            <option value="Elemental Rings">Elemental Rings</option>
                            <option value="Human">Human</option>
                            <option value="Country">Country</option>
                            <option value="Space">Space</option>
                            <option value="Hell">Hell</option>
                            <option value="Police Department">Police Department</option>
                            <option value="Consciousness">Consciousness</option>
                            <option value="Memory">Memory</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <span className="col-span-1 p-1 text-gray-500 font-bold">Dimension</span>
                        <select
                            value={dimension}
                            onChange={onDimensionSelect}
                            className="w-[240px] h-[45px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        >
                            <option value=""/>
                            <option value="Dimension C-137">Dimension C-137</option>
                            <option value="Dimension 5-126">Dimension 5-126</option>
                            <option value="Dimension C-500A">Dimension C-500A</option>
                            <option value="Dimension K-83">Dimension K-83</option>
                            <option value="Dimension J19ζ7">Dimension J19ζ7</option>
                            <option value="Dimension K-22">Dimension K-22</option>
                            <option value="Dimension D-99">Dimension D-99</option>
                            <option value="Dimension D716">Dimension D716</option>
                            <option value="Dimension D716-B">Dimension D716-B</option>
                            <option value="Dimension D716-C">Dimension D716-C</option>
                            <option value="Dimension J-22">Dimension J-22</option>
                            <option value="Dimension C-352">Dimension C-35</option>
                            <option value="Dimension C-137">Dimension C-137</option>
                            <option value="Pizza Dimension">Pizza Dimension</option>
                            <option value="Phone Dimension">Phone Dimension</option>
                            <option value="Chair Dimension">Chair Dimension</option>
                            <option value="Fascist Dimension">Fascist Dimension</option>
                            <option value="Wasp Dimension">Wasp Dimension</option>
                            <option value="Tusk Dimension">Tusk Dimension</option>
                            <option value="Magic Dimension">Magic Dimension</option>
                            <option value="Merged Dimension">Merged Dimension</option>
                            <option value="Fascist Shrimp Dimension">Fascist Shrimp Dimension</option>
                            <option value="Fascist Teddy Bear Dimension">Fascist Teddy Bear Dimension</option>
                            <option value="Post-Apocalyptic Dimension">Post-Apocalyptic Dimension</option>
                            <option value="Eric Stoltz Mask Dimension">Eric Stoltz Mask Dimension</option>
                            <option value="Evil Rick's Target Dimension">Evil Rick's Target Dimension</option>
                            <option value="Replacement Dimension">Replacement Dimension</option>
                            <option value="Cromulon Dimension">Cromulon Dimension</option>
                            <option value="Cronenberg Dimension">Cronenberg Dimension</option>
                            <option value="Giant Telepathic Spiders Dimension">Giant Telepathic Spiders Dimension
                            </option>
                            <option value="Testicle Monster Dimension">Testicle Monster Dimension</option>
                            <option value="Fantasy Dimension">Fantasy Dimension</option>
                            <option value="Testicle Monster Dimension">Testicle Monster Dimension</option>
                            <option value="Unknown dimension">Unknown dimension</option>
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
                    {locations.map(location => <InfoCard key={location.id} path="locations" {...location}/>)}
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

