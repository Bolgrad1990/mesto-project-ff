
export function openPopup(popup){
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      const openPopup = document.querySelector('.popup_is-opened')
      closePopup(openPopup)
    }
  })
}
export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      const openPopup = document.querySelector('.popup_is-opened')
      closePopup(openPopup)
    }
  })
}
 
export function closePopupByOverlay () {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
