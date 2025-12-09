const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (!errorElement) {
      console.error(`Элемент ошибки для ${inputElement.id} не найден`);
      return;
    }
    
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};
  
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    if (!errorElement) return;
    
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

const checkInputByRegex = (inputElement, value) => {
    if (inputElement.hasAttribute('data-error')) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
        return nameRegex.test(value);
    }
    return true;
};

const getCustomErrorMessage = (inputElement, defaultMessage) => {
    return inputElement.dataset.error || defaultMessage;
};

const checkInputLength = (inputElement, value) => {
    const minLength = inputElement.minLength;
    const maxLength = inputElement.maxLength;
    
    if (minLength > 0 && maxLength > 0) {
        if (value.length < minLength || value.length > maxLength) {
        return `Должно быть от ${minLength} до ${maxLength} символов`;
        }
    }
    return null; 
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const value = inputElement.value.trim();
    
    if (inputElement.validity.valueMissing) {
        showInputError(formElement, inputElement, 'Вы пропустили это поле.', validationConfig);
        return false;
    }

    if (!checkInputByRegex(inputElement, value)) {
        const customErrorMessage = getCustomErrorMessage(inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
        showInputError(formElement, inputElement, customErrorMessage, validationConfig);
        return false;
    }
    
    const lengthError = checkInputLength(inputElement, value);
    if (lengthError) {
        showInputError(formElement, inputElement, lengthError, validationConfig);
        return false;
    }
    
    if (inputElement.name === 'link' && inputElement.validity.typeMismatch) {
        showInputError(formElement, inputElement, 'Введите адрес сайта.', validationConfig);
        return false;
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
        return false;
    }

    hideInputError(formElement, inputElement, validationConfig);
    return true;
};
  
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
        checkInputValidity(formElement, inputElement, validationConfig);
    });
};
  
export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
};
  
export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });
    
    if (buttonElement) {
        toggleButtonState(inputList, buttonElement, validationConfig);
    }
};