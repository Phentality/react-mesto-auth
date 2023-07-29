import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpened]);


  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" onSubmit={handleSubmit} isOpened={props.isOpened} onClose={props.onClose} buttonText={props.btnName}>
      <input
        id="name"
        className="popup__input popup__input_type_name"
        placeholder="Введите имя"
        name="name"
        type="text"
        value={name || ''}
        onChange={handleChangeName}
        minLength='2'
        maxLength='40'
        required />
      <span id="nameError" className="popup__error"></span>
      <input
        id="profession"
        className="popup__input popup__input_type_profession"
        placeholder="Введите профессию"
        name="profession"
        type="text"
        value={description || ''}
        onChange={handleChangeDescription}
        minLength='2'
        maxLength='200'
        required />
      <span id="professionError" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;