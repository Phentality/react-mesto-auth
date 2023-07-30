import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import * as Auth from '../utils/Auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoData, setInfoData] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleImageClick(card) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c => c._id !== card._id)));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  const [isLoading, setIsLoading] = React.useState(false);
  function handleUpdateUser(data) {
    function makeRequest() {
      return api.editProfile(data.name, data.about)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.changeAvatar(data.avatar)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }
  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api.addCard(data.name, data.link)
        .then((newCard) => setCards([newCard, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  const handleLogin = () => {
    setLoggedIn(true);
    setEmail(localStorage.getItem('email'));
  }

  const isInfoAffirmativeOpen = () => {
    setInfoData({
      link: true,
      title: 'Вы успешно зарегистрировались!'
    })
    setIsInfoPopupOpen(true);
  }

  const isInfoNegativePopup = () => {
    setInfoData({
      link: false,
      title: 'Что-то пошло не так! Попробуйте ещё раз.'
    })
    setIsInfoPopupOpen(true);
  }

  const navigate = useNavigate();

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        Auth.checkToken(jwt).then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, []);

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} />
        <Routes>
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} component={Main} cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleImageClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Register openAffirmativePopup={isInfoAffirmativeOpen} openNegativePopup={isInfoNegativePopup} />} />
          <Route path="*" element={!loggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />} />
        </Routes>
        <EditProfilePopup btnName={isLoading ? 'Сохранение...' : 'Сохранить'} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup btnName={isLoading ? 'Сохранение...' : 'Сохранить'} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup btnName={isLoading ? 'Создание...' : 'Создать'} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} buttonText="Да" />
        <ImagePopup onClose={closeAllPopups} isOpened={isImagePopupOpen} card={selectedCard} />
        <InfoTooltip onClose={closeAllPopups} isOpened={isInfoPopupOpen} data={infoData} />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
