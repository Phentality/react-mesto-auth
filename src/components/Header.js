import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoPath from '../images/logo.svg'


function Header() {
    const navigate = useNavigate();
    function signOut(){
      localStorage.removeItem('jwt');
      navigate('/signin', {replace: true});
    }
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Лого" />
            <button onClick={signOut} className='header__button'>Выйти</button>
        </header>)
}

export default Header;