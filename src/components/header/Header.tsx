import React from 'react';
import Logo from '../../assets/img/logo.png';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../enums';

export const Header = () => {
    const active = (navData: { isActive: boolean }): string => {
        return navData.isActive ? 'py-1 border-b-2 border-b-black hover:border-b-2' : 'py-1 hover:border-b-2';
    }

    return (
        <header className="h-[60px] flex justify-between p-2 shadow-md flex-none sticky top-0 bg-white z-10 relative">
            <div className="container max-w-5xl mx-auto px-2 flex justify-center sm:justify-between items-center">
                <NavLink to={PATH.CHARACTERS} className="w-[45px] h-[45px] hidden sm:block">
                    <img src={Logo} alt="Logo" className="h-[100%] object-cover"/>
                </NavLink>
                <nav className="text-md sm:text-lg font-bold">
                    <NavLink to={PATH.CHARACTERS} className={active}>Characters</NavLink>
                    <NavLink to={PATH.LOCATIONS} style={{margin: '0 1.4rem'}} className={active}>Locations</NavLink>
                    <NavLink to={PATH.EPISODE} className={active}>Episodes</NavLink>
                </nav>
            </div>
        </header>
    )
}
