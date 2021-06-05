export class FormValidator{
  constructor(validationConfig,form){
    this.validationConfig = validationConfig;
    this.form = form;
  } 
  _showInputError(input){
    const errorElement = this.form.querySelector(`#${input.id}--error`);
    input.classList.add(this.validationConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this.validationConfig.errorClass);
  }

  _hideInputError(input){
    const errorElement =  this.form.querySelector(`#${input.id}--error`);
    input.classList.remove(this.validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.validationConfig.errorClass);
  }

  resetFormState(){
    const inputList = Array.from(this.form.querySelectorAll(this.validationConfig.inputSelector));
    inputList.forEach(input =>{
      this._hideInputError(input)
    });
    const activeBtnPopup = this.form.querySelector(this.validationConfig.submitButtonSelector);
    activeBtnPopup.classList.add(this.validationConfig.inactiveButtonClass);
    activeBtnPopup.disabled = true;
  }


  _hasInvalidInputs(inputs){
    return inputs.every(input => input.validity.valid);
  }

  _toggleButtonState(inputs,button){
    if (!this._hasInvalidInputs(inputs)) {
      button.classList.add(this.validationConfig.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this.validationConfig.inactiveButtonClass);
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
      const inputs = Array.from(this.form.querySelectorAll(this.validationConfig.inputSelector));
      const button = this.form.querySelector(this.validationConfig.submitButtonSelector);
      inputs.forEach(input =>{
        input.addEventListener('input',()=>{
          this._validateInput(input);
          this._toggleButtonState(inputs,button);
        })
      })
  }

  enableValidation(){
    this._setInputListeners();
    this.form.addEventListener('submit',(e)=>{
      this._preventFormSubmit(e)
    });
  }

  _preventFormSubmit(e){
    e.preventDefault();
  }

}