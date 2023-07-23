import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'cards__like_active' : 'cards__like'}`
  );

  return (
    <div className="cards__card">
      <img className="cards__image" src={card.link} onClick={handleClick} alt={card.name} />
      <div className="cards__container">
        <h2 className="cards__text">{card.name}</h2>
        <div className="cards__like-container">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Лайк" name="like"></button>
          <h3 className="cards__likes">{card.likes.length}</h3>
        </div>
      </div>
      {isOwn && <button className="cards__delete" onClick={handleCardDelete} type="button" aria-label="Удалить" name="delete" value="" />}
    </div>
  )
}

export default Card;