import { createCard, handleDeleteCard, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';
import { enableValidation, clearValidation } from './components/validation.js';
import './pages/index.css';

const placesWrap = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

const profileEditForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileNameInput = profileEditForm.elements['name'];
const profileDescriptionInput = profileEditForm.elements['description'];
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements['link'];

const cardCallbacks = {
    deleteCallback: handleDeleteCard,
    likeCallback: handleLike,
    imageCallback: openImagePopup
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };


enableValidation(validationConfig);

function openImagePopup(cardData) {
    imageModalImage.src = cardData.link;
    imageModalImage.alt = cardData.name;
    imageModalCaption.textContent = cardData.name;
    openModal(imageModal);
}

function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileEditForm, validationConfig);
}

function renderCard(cardData, method = 'prepend') {
    const cardElement = createCard(cardData, cardCallbacks);
    placesWrap[method](cardElement);
}

profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    if (profileEditForm.checkValidity()) {
        profileName.textContent = profileNameInput.value;
        profileDescription.textContent = profileDescriptionInput.value;
        closeModal(profileEditModal);
    }
});

addCardButton.addEventListener('click', () => {
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
    openModal(addCardModal);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (addCardForm.checkValidity()) {
        const newCardData = {
            name: cardNameInput.value,
            link: cardLinkInput.value
        };

        renderCard(newCardData); 
        addCardForm.reset();

        clearValidation(addCardForm, validationConfig);
        closeModal(addCardModal);
    }
});

profileEditModal.querySelector('.popup__close').addEventListener('click', () => {
    clearValidation(profileEditForm, validationConfig);
    closeModal(profileEditModal);
});

addCardModal.querySelector('.popup__close').addEventListener('click', () => {
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
    closeModal(addCardModal);
});


initialCards.forEach((data) => {
    renderCard(data, 'append');
});