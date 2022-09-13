import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useActions, useAppSelector} from '../../../hooks/hooks';
import {charactersActions} from '../charactersReducer';
import {Preloader} from '../../preloader/Preloader';

export const CharacterCard = () => {
    const {fetchCharactersItem} = useActions(charactersActions);

    const navigate = useNavigate();

    const {
        gender,
        name,
        image,
        species,
        status,
        url,
        episode,
        location,
        origin,
        type
    } = useAppSelector(state => state.charactersPage.character);

    const isLoading = useAppSelector(state => state.charactersPage.isLoading);

    const {id} = useParams<'id'>();

    useEffect(() => {
        if (Number(id)) {
            fetchCharactersItem({id: Number(id)});
        }
    }, [id, fetchCharactersItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="relative h-[88vh]">
            <span className="flex items-center cursor-pointer absolute left-0" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="ml-2 font-bold text-lg">GO BACK</span>
            </span>
            <div className="h-[300px] mb-6">
                <img className="h-[100%] mx-[auto] rounded-full border-4 border-gray-400" src={image} alt="LogoCard"/>
            </div>
            <h2 className="font-bold text-5xl text-center mb-5">{name}</h2>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-gray-500 font-medium text-lg mb-3 p-2">Informations</h3>
                    <ul className="border border-2 border-emerald-500">
                        <p className="flex flex-col p-2 border-b-2 border-b-emerald-500">
                            <b>Gender</b>
                            <span className="text-gray-500">{gender}</span>
                        </p>
                        <p className="flex flex-col p-2 border border-b-2 border-b-emerald-500">
                            <b>Status</b>
                            <span className="text-gray-500">{status}</span>
                        </p>
                        <p className="flex flex-col p-2 border-b-2 border-b-emerald-500">
                            <b>Specie</b>
                            <span className="text-gray-500">{species}</span>
                        </p>
                        <p className="flex flex-col p-2 border-b-2 border-b-emerald-500">
                            <b>Origin</b>
                            <span className="text-gray-500 flex justify-between">
                                {origin ? origin.name : ''}
                                <svg className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </p>
                        <p className="flex flex-col p-2 border-b-2 border-b-emerald-500">
                            <b>Type</b>
                            <span className="text-gray-500">{type ? type : "no type"}</span>
                        </p>
                        <p className="flex flex-col p-2">
                            <b>Location</b>
                            <span className="text-gray-500 flex justify-between">
                                {location ? location.name : ''}
                                <svg className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </p>
                    </ul>
                </div>
                <div>
                    <h3 className="text-gray-500 font-medium text-lg mb-3 p-2">Episodes</h3>
                    <ul>
                        {episode?.map((item, i) =>
                            <p key={i}>{item}</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}