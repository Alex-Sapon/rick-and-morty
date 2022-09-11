import React from 'react';
import './App.scss';
import {Header} from '../header/Header';
import {Characters} from '../characters';
import {Footer} from '../footer/Footer';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Locations} from '../locations/Locations';

function App() {
    return (
        <main className="flex flex-col">
            <Header/>
            <section className="container max-w-5xl mx-auto px-2 grow">
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/characters'}/>}/>
                    <Route path={'/characters'} element={<Characters/>}/>
                    <Route path={'/locations'} element={<Locations/>}/>
                    <Route path={'/episodes'} element={<Characters/>}/>
                </Routes>
            </section>
            <Footer/>
        </main>
    );
}

export default App;
