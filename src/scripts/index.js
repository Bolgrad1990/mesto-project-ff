import "../pages/index.css";
import { initialCards } from "./cards";
import { popupProfile, 
         popupCard, 
         popupImg, 
         popupCapture, 
         popupCaption,  
         removePopupImage, 
         openPoup, 
         closePopup, 
         popup
         } from "./popup";


const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonOpenCard = document.querySelector('.profile__add-button');

const removePopupProfile = popupProfile.querySelector('.popup__close');
const removePopupCard = popupCard.querySelector('.popup__close');

// Находим форму в DOM
const formProfile = document.forms[0];
const nameInput =  formProfile.querySelector('[name="name"]');
const jobInput = formProfile.querySelector('[name="description"]');

const formCard = document.forms[1];

//const formCard = document.forms[1];
//const nameCard =  formCard.querySelector('[name="place-name"]');
//const linkCard = formCard.querySelector('[name="link"]');

//const inputProfile = popupProfile.querySelector('.popup__input_type_name');
//const inputDescription = popupProfile.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

//const titleCard = document.querySelector('.card__title')
const imageCard = document.querySelector('.card__image');
//console.log(titleCard)
//console.log(imageCard)

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
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleFormSubmit);


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

// @todo: Функция создания карточки

function createCard(item, deleteCard) {
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
  // создание карточки по кнопке "Сохранить"

function handleFormSave(evt) {
  evt.preventDefault(); 
  const nameCard =  formCard.querySelector('[name="place-name"]').value;
  const linkCard = formCard.querySelector('[name="link"]').value;
///////------------------------------------------------
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = nameCard;

  const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = linkCard;
    cardImg.alt = nameCard;
// -----------------------------------------------------------
  cardContainer.prepend(cardElement);
  closePopup(popupCard)
}

formCard.addEventListener('submit', handleFormSave);



// функция лайка карточки 

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');  
  }
}

// Функция удаления карточки

function deleteCard(evt) {
  const evtTarg = evt.target.closest('.card');
  evtTarg.remove();
}

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

  // добавление карточки по клику на кнопку "сохранить"

//const buttonAddCard = popupCard.querySelector('.popup__button');
/*const handleClick = () => {
    const placeName = popupCard.querySelector('.popup__input_type_card-name');
    const urlName = popupCard.querySelector('.popup__input_type_url')
    const cardElement = createCard({popupCard, placeName, urlName})
    placeName.name = title; 
    urlName.src = link;
    console.log(cardElement);
    cardContainer.prepend(cardElement);
  };*/

//buttonAddCard.addEventListener('click', handleClick);










