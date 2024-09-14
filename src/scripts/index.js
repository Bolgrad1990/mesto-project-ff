import "../pages/index.css";
import { initialCards } from "./cards";

const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const popup = document.querySelector('.popup')
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonOpenCard = document.querySelector('.profile__add-button');


const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

const popupCapture = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

const inputNameProfile = popupProfile.querySelector('.popup__input_type_name');
const inputDescriptionProfile = popupProfile.querySelector('.popup__input_type_description');

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
    popupClose(popupProfile) || popupClose(popupCard) || popupClose(popupImg);
  }
})

popup.addEventListener('click', (evt) => {
  if(evt.target === popup) {
    popupClose(popupProfile);
    //popupClose(popupCard)
  }
})
// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  cardContainer.append(cardElement);
})

  // добавление карточки по клику на кнопку "сохранить"

const buttonAddCard = popupCard.querySelector('.popup__button');
const handleClick = () => {
    const placeName = popupCard.querySelector('.popup__input_type_card-name');
    const urlName = popupCard.querySelector('.popup__input_type_url')
    const cardElement = createCard({popupCard,placeName, urlName})
    placeName.name = title; 
    urlName.src = link;
    console.log(cardElement);
    cardContainer.prepend(cardElement);
  };

buttonAddCard.addEventListener('click', handleClick);

  //Отккрытите и закрытие попапов*****************

/*const popup = document.querySelector('.popup');*/
const removePopupProfile = popupProfile.querySelector('.popup__close');
const removePopupCard = popupCard.querySelector('.popup__close');
const removePopupImage = popupImg.querySelector('.popup__close')

function openPoup(popup){
  popup.classList.add('popup_is-opened', 'popup_is-animated');
}

function popupClose(popup){
  popup.classList.remove('popup_is-opened');
}

buttonOpenProfile.addEventListener('click', () => {
  openPoup(popupProfile);
  inputNameProfile.value = 'Жак-Ив Кусто';
  inputDescriptionProfile.value = 'Исследователь океана';
})

buttonOpenCard.addEventListener('click', () => {
  openPoup(popupCard);
})


removePopupProfile.addEventListener('click', () => {
  popupClose(popupProfile)
 })

 removePopupCard.addEventListener('click', () => {
  popupClose(popupCard)
 })

 removePopupImage.addEventListener('click', () => {
  popupClose(popupImg)
 })

 // функция открытия попапа с картинкой

 /*const buttonCloseImg = popupImgContent.querySelector('.popup__close')

  buttonOpenImage.addEventListener('click', () => {
    cardImg.src = item.link
    cardImg.alt = item.name
    
    console.log(popupImg)
  })
  
  buttonCloseImg.addEventListener('click', (evt) => {
    popupClose(popupImg)
  })*/

/*popup.addEventListener('click', (evt) => {
   if(evt.target === popup) {
    popup.classList.remove('popup_is-opened');
   }
})*/



