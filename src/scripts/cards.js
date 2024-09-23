export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
export const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки

export function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonOpenImage = cardElement.querySelector('.card__image'); 
 
  buttonOpenImage.addEventListener('click', () => {
    popupCapture.src = item.link;
    popupCapture.alt = item.name;
    popupCaption.textContent = item.name;
    openPoup(popupImg)
  })
  
  cardElement.querySelector('.card__title').textContent = item.name;
  const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = item.link;
    cardImg.alt = item.name;

  const buttonDel = cardElement.querySelector('.card__delete-button');
  buttonDel.addEventListener('click', deleteCard);

  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', likeCard)

  return cardElement;
}

export function deleteCard(evt) {
  const evtTarg = evt.target.closest('.card');
  evtTarg.remove();
}

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');  
  }
}