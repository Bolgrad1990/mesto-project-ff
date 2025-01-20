import "../pages/index.css";
import { createCard, cardRemove } from "./card";
import { openPopup, closePopup, closePopupByOverlay } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
         getUserData,
         getAllCards, 
         addNewCard,
         enterProfile, 
         cardDelete,
         updateAvatar
        } from "./api";
//import { data } from "autoprefixer";

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar')
const removePopupImage = popupImg.querySelector('.popup__close');

const popupCapture = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardContainer = document.querySelector('.places__list');

const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonOpenCard = document.querySelector('.profile__add-button');


 
const removePopupProfile = popupProfile.querySelector('.popup__close');
const removePopupCard = popupCard.querySelector('.popup__close');
const removePopupAvatar = popupAvatar.querySelector('.popup__close')

const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput =  formProfile.querySelector('[name="name"]');
const jobInput = formProfile.querySelector('[name="description"]');

const formCard = document.querySelector('[name="new-place"]');
const nameCard =  formCard.querySelector('[name="place-name"]');
const linkCard = formCard.querySelector('[name="link"]');

const formAvatar = document.querySelector('[name="edit-avatar"]');
const imageAvatar = document.querySelector('.profile__avatar');
const imageProfile = document.querySelector('.profile__image');
const inputAvatar = formAvatar.querySelector('[name="avatar"]')


const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

let userId;

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',  
  errorClass: 'popup__error_visible'
});

buttonOpenCard.addEventListener('click', () => {
  openPopup(popupCard);
})

buttonOpenProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = titleProfile.textContent;          
  jobInput.value = descriptionProfile.textContent; 
})

imageAvatar.addEventListener('click', () => {
  openPopup(popupAvatar)
})

removePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
 })

 removePopupCard.addEventListener('click', () => {
  closePopup(popupCard)
 })
 
 removePopupImage.addEventListener('click', () => {
  closePopup(popupImg)
 })

 removePopupAvatar.addEventListener('click', () => {
  closePopup(popupAvatar)
 })

 function openPopupImg(capture, caption) {  
  popupCapture.src = capture;
  popupCapture.alt = caption;
  popupCaption.textContent = caption;
  openPopup(popupImg);
}

function profileFormSubmit(evt) {
  evt.preventDefault(); 
   console.log('evt', evt)
   const btnSave = evt.target.querySelector('.popup__button');
   btnSave.textContent = 'Сохранение...';
 
  enterProfile({name:nameInput.value, about:jobInput.value, avatar: imageProfile.value}).then((result) => {
    titleProfile.textContent = result.name;
    descriptionProfile.textContent = result.about;
    imageProfile.style.backgroundImage = `url(${result.avatar})`

    console.log(result.avatar)
    
    closePopup(popupProfile);
    clearValidation(popupProfile);
  });
}
formProfile.addEventListener('submit', profileFormSubmit);

function avatarFormSubmit(evt) {
  evt.preventDefault(); 
  const btnSave = evt.target.querySelector('.popup__button');
  console.log(btnSave)
  btnSave.textContent = 'Сохранение...';
 
  updateAvatar(inputAvatar.value).then((result) => {
    imageProfile.style.backgroundImage = `url(${result.avatar})`
    
    closePopup(popupAvatar);
    clearValidation(popupAvatar);
    console.log('updateAvatar', result)
   })//.then(() => {
  //    enterProfile({name:nameInput.value, about:jobInput.value, avatar: imageProfile.value})
  // })
}
formAvatar.addEventListener('submit', avatarFormSubmit);

function handleFormSave(evt) {
  evt.preventDefault(); 
  const name = nameCard.value;
  const link = linkCard.value; 

  addNewCard({ name, link }).then((result) => {
    const cardElement = createCard(result, cardRemove, openPopupImg, userId);
    cardContainer.prepend(cardElement);
    formCard.reset();
    closePopup(popupCard)
  });
}

formCard.addEventListener('submit', handleFormSave);

Promise.all([getAllCards(), getUserData()])
 .then(([dataCards, dataUser]) => {
    userId = dataUser._id;
    titleProfile.textContent = dataUser.name;
    descriptionProfile.textContent = dataUser.about;
    imageProfile.style.backgroundImage = `url(${dataUser.avatar})`;

    dataCards.forEach((item) => { 
    const cardElement = createCard(item, cardRemove, openPopupImg, userId);
    cardContainer.append(cardElement);   
  })
})

popups.forEach((item) => {
  item.addEventListener('click', closePopupByOverlay);
})






