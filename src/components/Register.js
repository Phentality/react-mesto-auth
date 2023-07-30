import React from 'react';
import { Link } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';

function Register(props) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        Auth.register(email, password).then(() => {
            props.openAffirmativePopup();
        })
            .catch((err) => {
                console.log(err);
                props.openNegativePopup();
            })
    }

    return (
        <div className='reg'>
            <p className='reg__title'>Регистрация</p>
            <form className='reg__form' onSubmit={handleSumbit}>
                <input
                    className='reg__input'
                    id='email' name='email'
                    placeholder="Email"
                    type='email'
                    value={formValue.email}
                    onChange={handleChange}
                    required />
                <input
                    className='reg__input'
                    id='password'
                    name='password'
                    placeholder="Пароль"
                    type='password'
                    value={formValue.password}
                    onChange={handleChange}
                    required />
                <button className="reg__button" type="submit" aria-label="Зарегистрироваться" name="signin" value="">Зарегистрироваться</button>
            </form>
            <div className='reg__signin'>
                <Link to="/signin" className='reg__login-link'>Уже зарегистрированы? Войти</Link>
            </div>
        </div>)
}

export default Register;