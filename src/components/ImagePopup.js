import { usePopupClose } from "../hooks/usePopupClose";
function ImagePopup({ onClose, isOpened, card }) {
  usePopupClose(isOpened, onClose)
  return (
    <div className={`popup popupImage popup__image-overlay ${isOpened ? 'popup_opened' : ''}`} id="popupImage">
      <div className="popup__view">
        <img className="popup__image" src={card.link} alt={card.name} />
        <button className="popup__close" type="button" name="close" aria-label="Закрыть" onClick={onClose}></button>
        <h3 className="popup__name">{card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;
