import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const valueRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: valueRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onSubmit={handleSubmit} isOpened={props.isOpened} onClose={props.onClose} buttonText={props.btnName}>
      <input
        id="avatar"
        ref={valueRef}
        className="popup__input popup__input_type_avatar"
        placeholder="Ссылка на аватарку"
        name="avatar"
        type="url"
        required />
      <span id="avatarError" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;