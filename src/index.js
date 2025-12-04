
import { createCard, handleDeleteCard, handleLike } from './components/card.js';
import { openModal, closeModal, fillProfileForm } from './components/modal.js';
import { initialCards } from './components/cards.js';
import './pages/index.css';

// DOM узлы
const placesWrap = document.querySelector(".places__list");
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

// Формы
const profileEditForm = profileEditModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

// Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Функция открытия попапа с изображением
function openImagePopup(cardData) {
  imageModalImage.src = cardData.link;
  imageModalImage.alt = cardData.name;
  imageModalCaption.textContent = cardData.name;
  openModal(imageModal);
}

// 1. Редактирование профиля
profileEditButton.addEventListener('click', () => {
  fillProfileForm(profileEditModal, profileName.textContent, profileDescription.textContent);
  openModal(profileEditModal);
});

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const nameInput = profileEditForm.querySelector('.popup__input_type_name');
  const descriptionInput = profileEditForm.querySelector('.popup__input_type_description');
  
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  
  closeModal(profileEditModal);
});

// 2. Добавление новой карточки
addCardButton.addEventListener('click', () => {
  openModal(addCardModal);
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const nameInput = addCardForm.querySelector('.popup__input_type_card-name');
  const linkInput = addCardForm.querySelector('.popup__input_type_url');
  
  const newCardData = {
    name: nameInput.value,
    link: linkInput.value
  };
  
  const newCard = createCard(
    newCardData,
    handleDeleteCard,
    handleLike,
    openImagePopup
  );
  
  placesWrap.prepend(newCard);
  addCardForm.reset();
  closeModal(addCardModal);
});

// 4. Инициализация начальных карточек
initialCards.forEach((data) => {
  const card = createCard(
    data,
    handleDeleteCard,
    handleLike,
    openImagePopup
  );
  placesWrap.append(card);
});