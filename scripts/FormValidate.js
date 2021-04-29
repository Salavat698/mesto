export class FormValidate{
  constructor(vConfig,FormValidate){
    this.vConfig = vConfig;
    this.FormValidate = FormValidate;
  }

  _showInputError(input){
    const errorElement = this.FormValidate.querySelector(`#${input.id}--error`);
    input.classList.add(this.vConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this.vConfig.errorClass);
  }

  _hideInputError(input){
    const errorElement =  this.FormValidate.querySelector(`#${input.id}--error`);
    input.classList.remove(this.vConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.vConfig.errorClass);
  }

  resetFormState(){
    const inputList = Array.from(this.FormValidate.querySelectorAll(this.vConfig.inputSelector));
    inputList.forEach(input =>{
      this._hideInputError(input)
    });
    const activeBtnPopup = this.FormValidate.querySelector(this.vConfig.submitButtonSelector);
    activeBtnPopup.classList.add(this.vConfig.inactiveButtonClass);
    activeBtnPopup.disabled = true;
  }


  _hasInvalidInputs(inputs){
    return inputs.every(input => input.validity.valid);
  }

  _toggleButtonState(inputs,button){
    if (!this._hasInvalidInputs(inputs)) {
      button.classList.add(this.vConfig.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this.vConfig.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _validateInput(input){

    if (input.validity.valid) {
      this._hideInputError(input);
      
    } else {
      this._showInputError(input);
    }
  }
  
  _setInputListeners(){
      const inputs = Array.from(this.FormValidate.querySelectorAll(this.vConfig.inputSelector));
      const button = this.FormValidate.querySelector(this.vConfig.submitButtonSelector);
      inputs.forEach(input =>{
        input.addEventListener('input',()=>{
          this._validateInput(input);
          this._toggleButtonState(inputs,button);
        })
      })
  }

  enableValidation(){
    this._setInputListeners();
    this.FormValidate.addEventListener('submit',(e)=>{
      this._preventFormSubmit(e)
    });
  }

  _preventFormSubmit(e){
    e.preventDefault();
  }

}

// function showInputError(formElement, input, vConfig) {
//     const errorElement = formElement.querySelector(`#${input.id}--error`);
//     input.classList.add(vConfig.inputErrorClass);
//     errorElement.textContent = input.validationMessage;
//     errorElement.classList.add(vConfig.errorClass);
// }

// function hideInputError(formElement, input, vConfig) {
//     const errorElement = formElement.querySelector(`#${input.id}--error`);
//     input.classList.remove(vConfig.inputErrorClass);
//     errorElement.textContent = '';
//     errorElement.classList.remove(vConfig.errorClass);
// }


// function validateInput(formElement, input, vConfig) {
  
//   if (input.validity.valid) {
//     hideInputError(formElement, input, vConfig)
//   } else {
//     showInputError(formElement, input, vConfig);
//   }
// }

// function hasInvalidInputs(inputs) {
//   return inputs.every(input => input.validity.valid);
// }

// function toggleButtonState(button, vConfig, inputs) {
//   if (!hasInvalidInputs(inputs)) {
//     button.classList.add(vConfig.inactiveButtonClass);
//     button.disabled = true;
//   } else {
//     button.classList.remove(vConfig.inactiveButtonClass);
//     button.disabled = false;
//   }
  
// }

// function setInputListeners(formElement, vConfig) {
//   const inputs = Array.from(formElement.querySelectorAll(vConfig.inputSelector));
//   const button = formElement.querySelector(vConfig.submitButtonSelector);
//   inputs.forEach(input => {
//     input.addEventListener('input', e => {
//       validateInput(formElement, input, vConfig);
//       toggleButtonState(button, vConfig, inputs);
//     });
//   });
// }

// //сама функция валидаций
// function enableValidation(vConfig) {
//   const forms = Array.from(document.querySelectorAll(vConfig.formSelector));
//   forms.forEach(form => {
//     form.addEventListener('submit', preventFormSubmit);
//     setInputListeners(form, vConfig);
//   });
// }

// //отмена стандартсной формы отправки
// function preventFormSubmit(e) {
//     e.preventDefault();
//   }


// enableValidation({
//     formSelector: '.popup__container',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__save-btn',
//     inactiveButtonClass: 'popup__save-btn_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__input-error'
//   });