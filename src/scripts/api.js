const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'ab110fa4-3c8e-4438-9600-a9b0eded5efd',
    'Content-Type': 'application/json'
  }
}

/*export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}*/
/*export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    headers: {
      authorization: 'ab110fa4-3c8e-4438-9600-a9b0eded5efd'
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    });
}*/

export const loadCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
}

export const addNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
}


/*export const loadUserData = () => {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    headers: {
      authorization: 'ab110fa4-3c8e-4438-9600-a9b0eded5efd'
    }
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data);
  });
}*/

export const enterProfile = ( name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => res.json())
  .catch((err) => {
    console.log(err)
  })
}


  


