import {useActions, useAppSelector} from '../../../hooks';
import {locationsActions} from '../locationsReducer';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Preloader} from '../../../components/preloader';
import {CharacterCard} from '../../characters/characterCard';
import {
    selectLocationDimension,
    selectLocationIsLoading,
    selectLocationName,
    selectLocationResidents,
    selectLocationType
} from '../selectors';

export const LocationsInfo = () => {
    const {fetchLocationsItem} = useActions(locationsActions);

    const navigate = useNavigate();

    const {id} = useParams<'id'>();

    const isLoading = useAppSelector(selectLocationIsLoading);
    const name = useAppSelector(selectLocationName);
    const type = useAppSelector(selectLocationType);
    const residents = useAppSelector(selectLocationResidents);
    const dimension = useAppSelector(selectLocationDimension);

    useEffect(() => {
        if (id && Number(id)) {
            fetchLocationsItem(id);
        }
    }, [id, fetchLocationsItem])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className="pb-8 min-h-[88vh]">
            <div className="flex items-center cursor-pointer mb-2" onClick={() => navigate(-1)}>
                <span className="pb-1 font-medium text-2xl rotate-180">&#10140;</span>
                <span className="ml-2 font-bold text-lg">GO BACK</span>
            </div>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-7 md:mb-10 text-[#081F32]">{name}</h2>
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
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative">
                {residents?.length
                    ? residents.map(resident => <CharacterCard key={resident.id} {...resident}/>)
                    : <div className="text-3xl absolute top-5 left-[50%] translate-x-[-50%]">Residents not found...</div>
                }
            </ul>
        </div>
    )
}
