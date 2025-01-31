import {likesAddCount, likesDelete, cardDelete} from "./api"
const cardTemplate = document.querySelector('#card-template').content;

export function cardRemove(card, cardId) { 
  cardDelete(cardId).then(() => {
    card.remove()
  })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`);
  });
}

export function makeLikeCard(evt, cardId, likesNumber) {
   const btnLike = evt.target;

   if (btnLike.classList.contains('card__like-button_is-active')) {
      likesDelete(cardId, btnLike) 
      .then((data) => {
        btnLike.classList.remove('card__like-button_is-active')
        likesNumber.textContent = data.likes.length;
    })
      .catch((err) => {
      console.log(`Ошибка установки лайка: ${err}`);
    })
   } else { 
      likesAddCount(cardId, btnLike)
     .then((data) => {
      btnLike.classList.add('card__like-button_is-active')
      likesNumber.textContent = data.likes.length;
    })
     .catch((err) => {
      console.log(`Ошибка удаления лайка: ${err}`);
    })
   } 
}

// @todo: Функция создания карточки 
export function createCard( item, clickDeleteCard, openPopupImg, handleLikeClick, cardId ) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const buttonDel = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const numberLike = cardElement.querySelector('.card__like-number');
  
  cardElement.querySelector('.card__title').textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;

  numberLike.textContent = item.likes.length;
  cardElement._id = item._id;   
 
  if (item.owner._id !== cardId) {
       buttonDel.style.display = 'none';
  } 

  if (item.likes.some((like) => like._id === cardId)) {
    buttonLike.classList.add('card__like-button_is-active');
  } 
      buttonDel.addEventListener('click', () => {     
      clickDeleteCard(cardElement, item._id)
    }) 

      buttonLike.addEventListener('click', (evt) => {
      handleLikeClick(evt.target, item._id, buttonLike.classList.contains('card__like-button_is-active'))
    });

      cardImg.addEventListener('click', () => {
      openPopupImg(item.link, item.name)
     })
  return cardElement;
}
