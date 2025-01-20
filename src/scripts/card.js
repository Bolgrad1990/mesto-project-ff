import {likesAddCount, likesDelete, cardDelete} from "./api"
const cardTemplate = document.querySelector('#card-template').content;

export function cardRemove(card) { 
  card.remove()
}

export function makeLikeCard(evt, cardId, likesNumber) {
    //evt.target.classList.toggle('card__like-button_is-active'); 
   const btnLike = evt.target;

   //console.log(cardId)

   if (btnLike.classList.contains('card__like-button_is-active')) {
      likesDelete(cardId) 
      .then((data) => {
      btnLike.classList.remove('card__like-button_is-active');
      likesNumber.textContent = data.likes.length;
    })
      .catch((err) => {
      console.log(`Ошибка установки лайка: ${err}`);
    })
   } else { 
      likesAddCount(cardId)
     .then((data) => {
      btnLike.classList.add('card__like-button_is-active');
      likesNumber.textContent = data.likes.length;
    })
     .catch((err) => {
      console.log(`Ошибка удаления лайка: ${err}`);
    })
   } 
}

// @todo: Функция создания карточки 
export function createCard( item, clickDeleteCard, openPopupImg, cardId ) {
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

  if (item.likes.some((like) => {
       like._id === cardId;
    }
  ))  {
      numberLike.classList.add('card__like-button_is-active');
    } 
  
    else {
      buttonDel.addEventListener('click', () => {     
        cardDelete(item._id).then(() => {
        clickDeleteCard(cardElement, item._id);
       })
    })
  }

      buttonLike.addEventListener('click', (evt) => {
      makeLikeCard(evt, item._id, numberLike)
    });

  cardImg.addEventListener('click', () => {
      openPopupImg(item.link, item.name)
     })
  return cardElement;
}