const hasInvalidInput = (inputList) => {
  return inputList.some((formElement) => {
    return !formElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, options) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
}

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.inactiveButtonClass);
}

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.inactiveButtonClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, options) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement,inputElement,inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}
 const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    })
  })
}

export const enableValidation = (options) => {
  // const inputError = form.querySelector(options.inputErrorClass)
  const inputList = Array.from(document.querySelectorAll(options.formSelector));
  inputList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, options);
  })
}

export const clearValidation = (formElement, option) => {

}