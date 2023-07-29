import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpened]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
    }
    return (
        <PopupWithForm name="add" title="Новое место" onSubmit={handleSubmit} isOpened={props.isOpened} onClose={props.onClose} buttonText={props.btnName}>
            <input
                id="place"
                className="popup__input popup__input_type_place"
                placeholder="Название"
                name="place"
                type="text"
                minLength='2'
                maxLength='30'
                value={name}
                onChange={handleChangeName}
                required />
            <span id="placeError" className="popup__error"></span>
            <input
                id="link"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                name="link"
                type="url"
                value={link}
                onChange={handleChangeLink}
                required />
            <span id="linkError" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;