import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__card">
                    <div className="profile__image">
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                        <div className="profile__overlay" onClick={props.onEditAvatar}>
                            <button className="profile__avataredit" type="button" aria-label="сменить" name="change"></button>
                        </div>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <p className="profile__info-profession">{currentUser.about}</p>
                        <button className="profile__info-button" onClick={props.onEditProfile} type="button" aria-label="Изменить" name="edit"></button>
                    </div>
                </div>
                <button className="profile__info-addbutton" onClick={props.onAddPlace} type="button" aria-label="Добавить" name="add"></button>
            </section>
            <section className="cards">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>)
}

export default Main;