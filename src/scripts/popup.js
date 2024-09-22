export const popupProfile = document.querySelector('.popup_type_edit');
export const popupCard = document.querySelector('.popup_type_new-card');
export const popupImg = document.querySelector('.popup_type_image');
export const popupCapture = document.querySelector('.popup__image')
export const popupCaption = document.querySelector('.popup__caption')

export const removePopupImage = popupImg.querySelector('.popup__close');

export const popup = document.querySelector('.popup')


export function openPoup(popup){
  popup.classList.add('popup_is-opened', 'popup_is-animated');
}
export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
}

 removePopupImage.addEventListener('click', () => {
  closePopup(popupImg)
 })
 
 popupProfile.addEventListener('click', (evt) => {
  if(evt.currentTarget === evt.target) {
    closePopup(popupProfile);
  }
})
popupCard.addEventListener('click', (evt) => {
  if(evt.currentTarget === evt.target) {
    closePopup(popupCard);
  }
})

popupImg.addEventListener('click', (evt) => {
  if(evt.currentTarget === evt.target) {
    closePopup(popupImg);
  }
})
