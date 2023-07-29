import { usePopupClose } from "../hooks/usePopupClose";
import affirmative from '../images/Affirmative.svg'
import negative from '../images/Negative.svg'

function InfoTooltip({ onClose, isOpened, data }) {
  usePopupClose(isOpened, onClose);

  return (
    <div className={`popup popupInfo ${isOpened ? 'popup_opened' : ''}`} id="popupInfo">
      <div className="popup__container">
        <button className="popup__close" type="button" name="close" aria-label="Закрыть" onClick={onClose} />
        <img className="popup__info-image" src={data.link ? affirmative : negative} alt='mark' />
        <h2 className="popup__info-title">{data.title}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;