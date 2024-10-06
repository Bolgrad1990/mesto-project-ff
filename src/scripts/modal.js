function closePopupOnEsc (evt) {
  if(evt.key === 'Escape'){
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup(openPopup);
  }
}

export function openPopup(popup){
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', closePopupOnEsc)
}

export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc)
}
 
export function closePopupByOverlay () {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}