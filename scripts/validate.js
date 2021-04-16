function showInputError(formElement, input, vConfig) {
    const errorElement = formElement.querySelector(`#${input.id}--error`);
    console.log(errorElement)
    input.classList.add(vConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(vConfig.errorClass);
}

function hideInputError(formElement, input, vConfig) {
    const errorElement = formElement.querySelector(`#${input.id}--error`);
    input.classList.remove(vConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(vConfig.errorClass);
}

function validateInput(formElement, input, vConfig) {
  
  if (input.validity.valid) {
    hideInputError(formElement, input, vConfig)
  } else {
    showInputError(formElement, input, vConfig);
  }
}

function hasInvalidInputs(inputs) {
  return inputs.every(input => input.validity.valid);
}

function toggleButtonState(button, vConfig, inputs) {
  if (!hasInvalidInputs(inputs)) {
    button.classList.add(vConfig.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(vConfig.inactiveButtonClass);
    button.disabled = false;
  }
}

function setInputListeners(formElement, vConfig) {
  const inputs = Array.from(formElement.querySelectorAll(vConfig.inputSelector));
  const button = formElement.querySelector(vConfig.submitButtonSelector);
  inputs.forEach(input => {
    input.addEventListener('input', e => {
      validateInput(formElement, input, vConfig);
      toggleButtonState(button, vConfig, inputs);
    });
  });
}

//сама функция валидаций
function enableValidation(vConfig) {
  const forms = Array.from(document.querySelectorAll(vConfig.formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', preventFormSubmit);
    setInputListeners(form, vConfig);
  });
}

//отмена стандартсной формы отправки
function preventFormSubmit(e) {
    e.prevetnDefault();
  }


enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error'
  });