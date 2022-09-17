import React from 'react';
import './App.scss';
import {Header} from '../header';
import {Characters, CharacterInfo} from '../../pages/characters';
import {Footer} from '../footer';
import {Routes, Route, Navigate} from 'react-router-dom';
import {LocationsInfo, Locations} from '../../pages/locations';
import {Episodes, EpisodeInfo} from '../../pages/episodes';
import {PATH} from '../../enums';
import {ButtonTop} from '../buttonTop';

export const App = () => (
    <>
        <Header/>
        <section className="container max-w-5xl mx-auto mt-8 px-4 grow">
            <Routes>
                <Route path={PATH.HOME} element={<Navigate to={PATH.CHARACTERS}/>}/>
                <Route path={PATH.CHARACTERS} element={<Characters/>}/>
                <Route path={PATH.CHARACTERS_INFO} element={<CharacterInfo/>}/>
                <Route path={PATH.LOCATIONS} element={<Locations/>}/>
                <Route path={PATH.LOCATION_INFO} element={<LocationsInfo/>}/>
                <Route path={PATH.EPISODE} element={<Episodes/>}/>
                <Route path={PATH.EPISODE_INFO} element={<EpisodeInfo/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<div>Page not found</div>}/>
            </Routes>
        </section>
        <Footer/>
        <ButtonTop/>
    </>
)
