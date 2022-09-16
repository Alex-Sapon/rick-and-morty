import React from 'react';
import './App.scss';
import {Header} from '../header';
import {Characters, CharacterInfo} from '../../pages/characters';
import {Footer} from '../footer';
import {Routes, Route, Navigate} from 'react-router-dom';
import {LocationsInfo, Locations} from '../../pages/locations';
import {Episodes, EpisodeInfo} from '../../pages/episodes';
import {PATH} from '../../enums';

export const App = () => {
    return (
        <>
            <Header/>
            <section className="container max-w-5xl mx-auto mt-8 px-2 grow">
                <Routes>
                    <Route path={PATH.HOME} element={<Navigate to={PATH.CHARACTERS}/>}/>
                    <Route path={PATH.CHARACTERS} element={<Characters/>}/>
                    <Route path={PATH.CHARACTERS_CARD} element={<CharacterInfo/>}/>
                    <Route path={PATH.LOCATIONS} element={<Locations/>}/>
                    <Route path={PATH.LOCATION_CARD} element={<LocationsInfo/>}/>
                    <Route path={PATH.EPISODE} element={<Episodes/>}/>
                    <Route path={PATH.EPISODE_CARD} element={<EpisodeInfo/>}/>
                </Routes>
            </section>
            <Footer/>
        </>
    )
}
