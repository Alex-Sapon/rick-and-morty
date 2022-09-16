import {useActions, useAppSelector} from '../../../hooks/hooks';
import {locationsActions} from '../locationsReducer';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Preloader} from '../../../components/preloader/Preloader';
import {CharacterCard} from '../../../components/characterCard';

export const LocationsInfo = () => {
    const {fetchLocationsItem} = useActions(locationsActions);

    const navigate = useNavigate();

    const {id} = useParams<'id'>();

    const isLoading = useAppSelector(state => state.locationsPage.isLoading);
    const name = useAppSelector(state => state.locationsPage.location.name);
    const type = useAppSelector(state => state.locationsPage.location.type);
    const residents = useAppSelector(state => state.locationsPage.location.residents);
    const dimension = useAppSelector(state => state.locationsPage.location.dimension);

    useEffect(() => {
        if (id) {
            fetchLocationsItem(id);
        }
    }, [id, fetchLocationsItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="relative pb-8 min-h-[88vh]">
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
                    <h3 className="text-[#081F32] text-lg"><b>Type</b></h3>
                    <p className="text-[#6E798C] font-medium">{type}</p>
                </div>
                <div>
                    <h3 className="text-[#081F32] text-lg"><b>Dimension</b></h3>
                    <p className="text-[#6E798C] font-medium">{dimension}</p>
                </div>
            </div>
            <h3 className="text-[#6E798C] font-medium text-2xl mb-3 p-2">Residents</h3>
            <ul className="grid grid-cols-4 gap-5">
                {residents?.map(resident => <CharacterCard key={resident.id} {...resident}/>)}
            </ul>
        </div>
    )
}
