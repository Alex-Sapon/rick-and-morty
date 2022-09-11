import React from 'react';
import './App.scss';
import {Header} from '../header/Header';
import {Characters} from '../characters';

function App() {
    return (
        <>
            <Header/>
            <main className="container max-w-5xl mx-auto px-2">
                <Characters/>
            </main>
        </>
    );
}

export default App;
