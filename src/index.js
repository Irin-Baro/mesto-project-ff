import { createCard, handleDeleteCard, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { 
    getUserInfo, 
    getInitialCards, 
    updateUserInfo, 
    addNewCard,
    updateAvatar 
} from './api.js';
import './pages/index.css';

let currentUserId = null; 

const placesWrap = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

const profileAvatar = document.querySelector('.profile__image');
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const avatarEditModal = document.querySelector('.popup_type_avatar');

const profileEditForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const avatarEditForm = document.forms['edit-avatar']; 

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileNameInput = profileEditForm.elements['name'];
const profileDescriptionInput = profileEditForm.elements['description'];
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements['link'];
const avatarUrlInput = avatarEditForm.elements['avatar-url']; 

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function renderLoading(isLoading, buttonElement) {    
    const updateText = 'Сохранение...';

    if (isLoading) {
        buttonElement.dataset.originalText = buttonElement.textContent;
        buttonElement.textContent = updateText;
        buttonElement.disabled = true;
    } else {
        if (buttonElement.dataset.originalText) {
            buttonElement.textContent = buttonElement.dataset.originalText;
        }
        buttonElement.disabled = false;
    }
}

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
    const cardElement = createCard(cardData, currentUserId, cardCallbacks);
    placesWrap[method](cardElement);
}

const cardCallbacks = {
    deleteCallback: handleDeleteCard,
    likeCallback: handleLike,
    imageCallback: openImagePopup
};

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        currentUserId = userData._id;
        
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.src = userData.avatar;
        profileAvatar.alt = userData.name;
        
        cards.forEach(cardData => {
            renderCard(cardData, 'append');
        });
    })
    .catch(err => console.error('Ошибка при загрузке данных:', err));

profileEditButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const submitButton = profileEditForm.querySelector('.popup__button');
    renderLoading(true, submitButton);
    
    updateUserInfo(profileNameInput.value, profileDescriptionInput.value)
        .then((userData) => {
            profileName.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(profileEditModal);
        })
        .catch(err => console.error('Ошибка при обновлении профиля:', err))
        .finally(() => {
            renderLoading(false, submitButton);
        });
});

addCardButton.addEventListener('click', () => {
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
    openModal(addCardModal);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const submitButton = addCardForm.querySelector('.popup__button');
    renderLoading(true, submitButton);
    
    addNewCard(cardNameInput.value, cardLinkInput.value)
        .then((newCard) => {
            renderCard(newCard);
            addCardForm.reset();
            clearValidation(addCardForm, validationConfig);
            closeModal(addCardModal);
        })
        .catch(err => console.error('Ошибка при добавлении карточки:', err))
        .finally(() => {
            renderLoading(false, submitButton);
        });
});

avatarEditButton.addEventListener('click', () => {
    avatarEditForm.reset();
    clearValidation(avatarEditForm, validationConfig);
    openModal(avatarEditModal);
});

avatarEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const submitButton = avatarEditForm.querySelector('.popup__button');
    renderLoading(true, submitButton);
    
    updateAvatar(avatarUrlInput.value)
        .then((userData) => {
            profileAvatar.src = userData.avatar;
            closeModal(avatarEditModal);
        })
        .catch(err => console.error('Ошибка при обновлении аватара:', err))
        .finally(() => {
            renderLoading(false, submitButton);
        });
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

avatarEditModal.querySelector('.popup__close').addEventListener('click', () => {
    clearValidation(avatarEditForm, validationConfig);
    closeModal(avatarEditModal);
});

imageModal.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(imageModal);
});
