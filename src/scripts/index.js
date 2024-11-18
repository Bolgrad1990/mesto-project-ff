import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import { openPopup, closePopup, closePopupByOverlay } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import { getInitialCards } from "./api";

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const removePopupImage = popupImg.querySelector('.popup__close');

const popupCapture = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardContainer = document.querySelector('.places__list');

const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonOpenCard = document.querySelector('.profile__add-button');
const removePopupProfile = popupProfile.querySelector('.popup__close');
const removePopupCard = popupCard.querySelector('.popup__close');

const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput =  formProfile.querySelector('[name="name"]');
const jobInput = formProfile.querySelector('[name="description"]');

const formCard = document.querySelector('[name="new-place"]');
const nameCard =  formCard.querySelector('[name="place-name"]');
const linkCard = formCard.querySelector('[name="link"]');

const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',  
  errorClass: 'popup__error_visible'
});

//clearValidation(formProfile, options)

buttonOpenCard.addEventListener('click', () => {
  openPopup(popupCard);
})

buttonOpenProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = titleProfile.textContent;          
  jobInput.value = descriptionProfile.textContent; 
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

 function openPopupImg(capture, caption) {  
  popupCapture.src = capture;
  popupCapture.alt = caption;
  popupCaption.textContent = caption;
  openPopup(popupImg);
}

function profileFormSubmit(evt) {
  evt.preventDefault(); 
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closePopup(popupProfile);
  clearValidation(popupProfile);
}
formProfile.addEventListener('submit', profileFormSubmit);

function handleFormSave(evt) {
  evt.preventDefault(); 
  const name = nameCard.value;
  const link = linkCard.value;
  const item = { name, link };

  const cardElement = createCard(item, deleteCard, openPopupImg, likeCard);
  cardContainer.prepend(cardElement);
  formCard.reset();
  closePopup(popupCard)
}

formCard.addEventListener('submit', handleFormSave);

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard, openPopupImg, likeCard);
  cardContainer.append(cardElement);
  getInitialCards()
})

popups.forEach((item) => {
  item.addEventListener('click', closePopupByOverlay);
})