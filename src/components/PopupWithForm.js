import { usePopupClose } from "../hooks/usePopupClose";
function PopupWithForm({ isOpened, onClose, name, title, onSubmit, buttonText, children }) {
  usePopupClose(isOpened, onClose)
  return (
    <div className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" name="close" aria-label="Закрыть" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" id={name} name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit" aria-label="Сохранить" name="save" value="">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;

