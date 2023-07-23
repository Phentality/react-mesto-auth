class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _chechRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      methods: 'GET',
      headers: this._headers
    })
      .then(this._chechRes);
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      methods: 'GET',
      headers: this._headers
    })
      .then(this._chechRes)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._chechRes);
  }

  changeAvatar(src) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: src
      })
    })
      .then(this._chechRes);
  }

  addCard(place, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: link
      })
    })
      .then((res) => {
        return res;
      })
      .then(this._chechRes);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: id
      })
    })
      .then(this._chechRes);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({
          _id: id
        })
      })
        .then(this._chechRes)
    }
    else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify({
          _id: id
        })
      })
        .then(this._chechRes)
    }
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'cdd543ff-2e3f-4e99-8d7a-65b42fe9625f',
    'Content-Type': 'application/json'
  }
});

export default api;

