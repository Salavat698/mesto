export class FormValidate{
  constructor(vConfig,validationConfig){
    this.vConfig = vConfig;
    this.validationConfig = validationConfig;
  }
  _showInputError(input){
    const errorElement = this.validationConfig.querySelector(`#${input.id}--error`);
    input.classList.add(this.vConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this.vConfig.errorClass);
  }

  _hideInputError(input){
    const errorElement =  this.validationConfig.querySelector(`#${input.id}--error`);
    input.classList.remove(this.vConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.vConfig.errorClass);
  }

  resetFormState(){
    const inputList = Array.from(this.validationConfig.querySelectorAll(this.vConfig.inputSelector));
    inputList.forEach(input =>{
      this._hideInputError(input)
    });
    const activeBtnPopup = this.validationConfig.querySelector(this.vConfig.submitButtonSelector);
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
      const inputs = Array.from(this.validationConfig.querySelectorAll(this.vConfig.inputSelector));
      const button = this.validationConfig.querySelector(this.vConfig.submitButtonSelector);
      inputs.forEach(input =>{
        input.addEventListener('input',()=>{
          this._validateInput(input);
          this._toggleButtonState(inputs,button);
        })
      })
  }

  enableValidation(){
    this._setInputListeners();
    this.validationConfig.addEventListener('submit',(e)=>{
      this._preventFormSubmit(e)
    });
  }

  _preventFormSubmit(e){
    e.preventDefault();
  }

}