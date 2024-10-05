import { openPopup, popupImg } from "./popup";

const cardTemplate = document.querySelector('#card-template').content;

export function deleteCard(evt) {
  const evtTarg = evt.target.closest('.card');
  evtTarg.remove();
}

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');  
  }
}

// @todo: Функция создания карточки
export function createCard(item, deleteCard, openPopupImg ) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const buttonDel = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');
  
  cardElement.querySelector('.card__title').textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;

  buttonDel.addEventListener('click', () => {
    deleteCard(cardElement);
  })
  function deleteCard(card) { 
    card.remove()
  }
  buttonLike.addEventListener('click', likeCard);

  cardImg.addEventListener('click', () => {
    openPopupImg(item.link, item.name)
  })
  return cardElement;
}
