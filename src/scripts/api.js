const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'ab110fa4-3c8e-4438-9600-a9b0eded5efd',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Что-то пошло не так: ${res.status}`); 
}

//----------------запрос  данных пользователя   ----------

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(handleResponse)
}

// ---------запрос всех крточек с сервера-------------

export const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
}

// ------------передача данных создания новой карточки ------------ 

export const addNewCard = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(handleResponse)
}

// ------------передача данных профиля ----------------

export const enterProfile = ({name, about, avatar}) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
      avatar
    })
  })

  .then(handleResponse)
}

 // --------запросы  установки  и снятия лайков

export const likesAddCount = (cardId, btnLike) => {
 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
  // .then((data) => {
  //   btnLike.classList.add('card__like-button_is-active');
  //   return data;
  // })
}


export const likesDelete = (cardId, btnLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  // .then((data) => {
  //   btnLike.classList.remove('card__like-button_is-active');
  //   return data;
  // })
}

// ---------------удаление карточки -----------

export const cardDelete = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

// ---------------- обновление аватара ---------

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
       avatar
      })
  })
  .then(handleResponse)
}

  


