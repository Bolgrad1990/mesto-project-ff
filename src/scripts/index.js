import "../pages/index.css";

import { initialCards,
         cardTemplate,
         createCard,
         deleteCard,
         likeCard
 } from "./cards";

import { popupProfile, 
         popupCard, 
         popupImg,                             
         openPoup, 
         closePopup
         } from "./popup";


const cardContainer = document.querySelector('.places__list');

const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonOpenCard = document.querySelector('.profile__add-button');
const removePopupProfile = popupProfile.querySelector('.popup__close');
const removePopupCard = popupCard.querySelector('.popup__close');

// Находим форму в DOM

const formProfile = document.forms[0];
const nameInput =  formProfile.querySelector('[name="name"]');
const jobInput = formProfile.querySelector('[name="description"]');

const formCard = document.forms[1];


const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

buttonOpenCard.addEventListener('click', () => {
  openPoup(popupCard);
})

buttonOpenProfile.addEventListener('click', () => {
  openPoup(popupProfile);
  nameInput.value = 'Жак-Ив Кусто';          
  jobInput.value = 'Исследователь океана'; 
})

removePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile)
 })

 removePopupCard.addEventListener('click', () => {
  closePopup(popupCard)
 })

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent  = jobInput.value;
  closePopup(popupProfile)
  lik
}

formProfile.addEventListener('submit', handleFormSubmit);

  // создание карточки по кнопке "Сохранить"

export function handleFormSave(evt) {
  evt.preventDefault(); 
  const nameCard =  formCard.querySelector('[name="place-name"]').value;
  const linkCard = formCard.querySelector('[name="link"]').value;

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = nameCard;

  const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = linkCard;
    cardImg.alt = nameCard;

  cardContainer.prepend(cardElement);
  closePopup(popupCard)
}

formCard.addEventListener('submit', handleFormSave);

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape'){
    console.log(closePopup)
    closePopup(popupProfile) || closePopup(popupCard) || closePopup(popupImg);
  }
})

//Вывести карточки на страницу

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  cardContainer.append(cardElement);
})












