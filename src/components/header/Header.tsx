import React from 'react';
import Logo from '../../assets/img/logo.png';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../enums';

export const Header = () => {
    const active = (navData: {isActive: boolean}): string => {
        return navData.isActive ? 'ml-5 py-1 border-b-2 border-b-black hover:border-b-2' : 'py-1 ml-5 hover:border-b-2';
    }

    return (
        <header className="h-[60px] flex justify-between p-2 shadow-md flex-none sticky top-0 bg-white z-10 relative">
            <div className="container max-w-5xl mx-auto px-2 flex justify-between items-center">
                <NavLink to={PATH.CHARACTERS} className="w-[46px] h-[49px] block">
                    <img src={Logo} alt="Logo" className="h-[100%]"/>
                </NavLink>
                <nav className="text-lg font-bold">
                    <NavLink to={PATH.CHARACTERS} className={active}>Characters</NavLink>
                    <NavLink to={PATH.LOCATIONS} className={active}>Locations</NavLink>
                    <NavLink to={PATH.EPISODE} className={active}>Episodes</NavLink>
                </nav>
            </div>
        </header>
    )
}