const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

export function createCard(data, callbacks) {
    const cardElement = cardTemplate.cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    deleteButton.addEventListener('click', () => callbacks.deleteCallback(cardElement));
    likeButton.addEventListener('click', () => callbacks.likeCallback(likeButton));
    cardImage.addEventListener('click', () => callbacks.imageCallback(data));
    
    return cardElement;
}

export function handleDeleteCard(cardElement) {
    cardElement.remove();
}

export function handleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}