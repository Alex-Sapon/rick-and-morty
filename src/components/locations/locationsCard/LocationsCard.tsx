import {useActions, useAppSelector} from '../../../hooks/hooks';
import {locationsActions} from '../locationsReducer';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Preloader} from '../../preloader/Preloader';
import {PATH} from '../../../enums';

export const LocationsCard = () => {
    const {fetchLocations, changeLocationsFilter, fetchLocationsItem} = useActions(locationsActions);

    const navigate = useNavigate();

    const {id} = useParams<'id'>();

    const isLoading = useAppSelector(state => state.locationsPage.isLoading);
    const name = useAppSelector(state => state.locationsPage.location.name);
    // const id = useAppSelector(state => state.locationsPage.location.id);
    const type = useAppSelector(state => state.locationsPage.location.type);
    const residents = useAppSelector(state => state.locationsPage.location.residents);
    const dimension = useAppSelector(state => state.locationsPage.location.dimension);
    const url = useAppSelector(state => state.locationsPage.location.url);
    const created = useAppSelector(state => state.locationsPage.location.created);

    useEffect(() => {
        if (Number(id)) {
            fetchLocationsItem({id: Number(id)});
        }
    }, [id, fetchLocationsItem])

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
            <h2 className="font-bold text-4xl text-center mb-5">{dimension}</h2>
            <h3 className="text-gray-500 font-medium text-lg mb-3 p-2">Residents</h3>
            <ul className="grid grid-cols-4 gap-5">
                {residents?.map(({id, name, image, species, url, episode}) =>
                    <div key={id} className="rounded shadow-md h-[270px] cursor-pointer transition duration-700 ease-in-out hover:shadow-2xl">
                        <NavLink to={`/characters/${id}`}>
                            <img src={image} alt="Photo" className="h-[190px] w-[100%] object-cover rounded-t"/>
                        </NavLink>
                        <div className="p-4">
                            <h3 className="font-medium">{name}</h3>
                            <p>{species}</p>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    )
}