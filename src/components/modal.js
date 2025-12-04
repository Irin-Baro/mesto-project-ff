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
  
  export function fillProfileForm(modal, name, description) {
    const nameInput = modal.querySelector('.popup__input_type_name');
    const descInput = modal.querySelector('.popup__input_type_description');
    nameInput.value = name;
    descInput.value = description;
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