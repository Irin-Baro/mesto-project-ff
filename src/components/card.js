import { addLike, removeLike, deleteCard } from '../api.js';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

export function createCard(data, currentUserId, callbacks) {
    const cardElement = cardTemplate.cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    likeCount.textContent = data.likes.length;

    if (data.owner._id !== currentUserId) {
        deleteButton.style.display = 'none';
    }

    const isLiked = data.likes.some(like => like._id === currentUserId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    deleteButton.addEventListener('click', () => callbacks.deleteCallback(cardElement, data._id));
    likeButton.addEventListener('click', () => callbacks.likeCallback(likeButton, data._id, likeCount));
    cardImage.addEventListener('click', () => callbacks.imageCallback(data));
    
    return cardElement;
}

export function handleDeleteCard(cardElement, cardId) {
    return deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => console.error('Ошибка при удалении карточки:', err));
}

export function handleLike(likeButton, cardId, likeCount) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    
    if (isLiked) {
        return removeLike(cardId)
            .then((updatedCard) => {
                likeButton.classList.remove('card__like-button_is-active');
                likeCount.textContent = updatedCard.likes.length;
            })
            .catch(err => console.error('Ошибка при снятии лайка:', err));
    } else {
        return addLike(cardId)
            .then((updatedCard) => {
                likeButton.classList.add('card__like-button_is-active');
                likeCount.textContent = updatedCard.likes.length;
            })
            .catch(err => console.error('Ошибка при установке лайка:', err));
    }
}