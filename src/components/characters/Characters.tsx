import {useEffect} from 'react';
import {useActions} from '../../hooks/hooks';
import {charactersAsyncActions} from '../../store/reducer';

export const Characters = () => {
    const {fetchCharacters} = useActions(charactersAsyncActions);

    useEffect(() => {
        fetchCharacters();
    }, [])

    return (
        <div>
            <img className="h=[200px] mb=[15px] mx-[auto] my-6" src="img/logo_name.png" alt="Rick_and_Morty"/>
            <div className="flex justify-between items-center mb-16">
                <label className="relative block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg className="h-5 w-5 fill-slate-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 15H14.71L14.43 14.73C15.41 13.59 16 12.11 16 10.5C16 6.91 13.09 4 9.5 4C5.91 4 3 6.91 3 10.5C3 14.09 5.91 17 9.5 17C11.11 17 12.59 16.41 13.73 15.43L14 15.71V16.5L19 21.49L20.49 20L15.5 15ZM9.5 15C7.01 15 5 12.99 5 10.5C5 8.01 7.01 6 9.5 6C11.99 6 14 8.01 14 10.5C14 12.99 11.99 15 9.5 15Z" fill="black" fill-opacity="0.54"/>
                        </svg>
                    </span>
                    <input
                        className="w-[240px] h-[50px] placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Filter by name..."
                        type="text"
                        name="search"
                    />
                </label>
                <select
                    value="Species"
                    className="w-[240px] h-[50px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                >
                    <option>Species</option>
                </select>
                <select
                    className="w-[240px] h-[50px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                >
                    <option>Gender</option>
                </select>
                <select
                    className="w-[240px] h-[50px] bg-white border border-slate-300 rounded-md py-1 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                >
                    <option>Status</option>
                </select>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {new Array(7).fill(null).map((item, i) =>
                    <div key={i} className="h-[245px] rounded shadow-md">
                        <img src="" alt="Photo" className="h-[168px] object-cover"/>
                        <div className="p-4">
                            <h3 className="font-medium">Rick Sanchez</h3>
                            <p>Human</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}


