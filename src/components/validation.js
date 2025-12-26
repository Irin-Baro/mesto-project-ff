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

const disableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, validationConfig);
    } else {
        enableSubmitButton(buttonElement, validationConfig);
    }
};

const checkInputByRegex = (inputElement, value) => {
    if (inputElement.hasAttribute('data-error')) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
        return nameRegex.test(value);
    }
    return true;
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const value = inputElement.value.trim();
    
    if (inputElement.validity.valueMissing) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
        return false;
    }

    if (inputElement.hasAttribute('data-error') && !checkInputByRegex(inputElement, value)) {
        showInputError(formElement, inputElement, inputElement.dataset.error, validationConfig);
        return false;
    }
    
    if (inputElement.name === 'link' && inputElement.validity.typeMismatch) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
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
        disableSubmitButton(buttonElement, validationConfig); 
    }
};