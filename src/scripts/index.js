// @todo: Темплейт карточки
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
// @todo: Функция создания карточки


function createCard(item, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.src = item.link;
  cardImg.alt = item.name;

  const buttonDel = cardElement.querySelector('.card__delete-button');
  buttonDel.addEventListener('click', deleteCard);
 
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const evtTarg = evt.target.closest('.card');
  evtTarg.remove();
}

// @todo: Вывести карточки на страницу
//const addBtn = document.querySelector('.profile__add-button')
//  addBtn.addEventListener('click', createCard);

  initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard);
    cardContainer.append(cardElement);
  })