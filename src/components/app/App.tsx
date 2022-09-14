import React from 'react';
import './App.scss';
import {Header} from '../header/Header';
import {Characters} from '../characters';
import {Footer} from '../footer/Footer';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Locations} from '../locations/Locations';
import {CharacterCard} from '../characters/characterCard/CharacterCard';
import {LocationsCard} from '../locations/locationsCard/LocationsCard';
import {PATH} from '../../enums';
import {Episodes, EpisodeCard} from '../episodes';

export const App = () => {
    return (
        <main className="flex flex-col">
            <Header/>
            <section className="container max-w-5xl mx-auto mt-8 px-2 grow">
                <Routes>
                    <Route path={PATH.HOME} element={<Navigate to={PATH.CHARACTERS}/>}/>
                    <Route path={PATH.CHARACTERS} element={<Characters/>}/>
                    <Route path={PATH.CHARACTERS_CARD} element={<CharacterCard/>}/>
                    <Route path={PATH.LOCATIONS} element={<Locations/>}/>
                    <Route path={PATH.LOCATION_CARD} element={<LocationsCard/>}/>
                    <Route path={PATH.EPISODE} element={<Episodes/>}/>
                    <Route path={PATH.EPISODE_CARD} element={<EpisodeCard/>}/>
                </Routes>
            </section>
            <Footer/>
        </main>
    );
}
