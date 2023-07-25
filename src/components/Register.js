import React from 'react';
import {Link} from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className='reg'>
            <p className='reg__title'>Регистрация</p>
            <form className='reg__form'>
                <input className='reg__input' id='email' name='email' placeholder="Email" type='email' value={email}  required />
                <input className='reg__input' id='password' name='password' placeholder="Пароль" type='password' value={password}  required  />
                <button className="reg__button" type="submit" aria-label="Зарегистрироваться" name="signin" value="">Зарегистрироваться</button>
            </form>
            <div className='reg__signin'>
                <Link to="/signin" className='reg__login-link'>Уже зарегистрированы? Войти</Link>
            </div>
        </div>)
}

export default Register;