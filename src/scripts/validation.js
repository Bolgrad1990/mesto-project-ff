const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, options) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(options.inactiveButtonClass);

    // if(input1.value === '' || input2.value === '' ){

    // }
    
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
}

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) {
    console.error(`Элемент ошибки для ${inputElement.id} не найден`);
    return;
  }

  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, options) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    
  } else {
    inputElement.setCustomValidity("");
  }

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
  const inputList = Array.from(document.querySelectorAll(options.formSelector));
  inputList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, options);
  })
}


export const clearValidation = (formElement, options) => {
  if (!options || typeof options.inputSelector === 'undefined') {
    console.error('Invalid options object passed to clearValidation. Ensure inputSelector is defined.');
    return;
  }
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector)); 
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
    
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options);
    inputElement.value = ''; 
  });
  toggleButtonState(inputList, buttonElement, options)
 }
