import { createCard, handleDeleteCard, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';
import './pages/index.css';

const placesWrap = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

// Формы
const profileEditForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

// Элементы профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы форм
const profileNameInput = profileEditForm.elements['name'];
const profileDescriptionInput = profileEditForm.elements['description'];
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements['link'];

// Объект с колбэками для карточек
const cardCallbacks = {
    deleteCallback: handleDeleteCard,
    likeCallback: handleLike,
    imageCallback: openImagePopup
};

// Функция открытия попапа с изображением
function openImagePopup(cardData) {
    imageModalImage.src = cardData.link;
    imageModalImage.alt = cardData.name;
    imageModalCaption.textContent = cardData.name;
    openModal(imageModal);
}

// Функция заполнения формы профиля
function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

// Функция для отрисовки карточки
function renderCard(cardData, method = 'prepend') {
    const cardElement = createCard(cardData, cardCallbacks);
    placesWrap[method](cardElement);
}

// Редактирование профиля
profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
});

// Добавление новой карточки
addCardButton.addEventListener('click', () => {
    openModal(addCardModal);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    
    renderCard(newCardData); 
    
    addCardForm.reset();
    closeModal(addCardModal);
});

// Инициализация начальных карточек
initialCards.forEach((data) => {
    renderCard(data, 'append');
});