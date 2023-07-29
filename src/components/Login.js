import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';

function Login(props) {
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
    const navigate = useNavigate();

    const handleSumbit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        Auth.authorize(formValue.email, formValue.password).then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                setFormValue({ email: '', password: '' });
                navigate('/', { replace: true });
                localStorage.setItem('email', formValue.email);
                props.handleLogin();
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='login'>
            <p className='login__title'>Вход</p>
            <form className='login__form' onSubmit={handleSumbit}>
                <input
                    className='login__input'
                    id='email'
                    name='email'
                    placeholder="Email"
                    type='email'
                    value={formValue.email}
                    onChange={handleChange}
                    required />
                <input
                    className='login__input'
                    id='password'
                    name='password'
                    placeholder="Пароль"
                    type='password'
                    value={formValue.password}
                    onChange={handleChange}
                    required />
                <button className="login__button" type="submit" aria-label="Войти" name="signin" value="">Войти</button>
            </form>
        </div>)
}

export default Login;