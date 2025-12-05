export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
    modal.addEventListener('click', closeByClick);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    modal.removeEventListener('click', closeByClick);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

function closeByClick(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget);
    }
}