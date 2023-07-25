import React from 'react';
import {Link} from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className='login'>
            <p className='login__title'>Вход</p>
            <form className='login__form'>
                <input className='login__input' id='email' name='email' placeholder="Email" type='email' value={email}  required />
                <input className='login__input' id='password' name='password' placeholder="Пароль" type='password' value={password}  required  />
                <button className="login__button" type="submit" aria-label="Войти" name="signin" value="">Войти</button>
            </form>
        </div>)
}

export default Login;