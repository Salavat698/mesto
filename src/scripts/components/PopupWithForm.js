import Popup from './Popup.js'


export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this.form = this.popup.querySelector('.popup__container');
  }

  _getInputValues() {
    const values = {};
    const inputs = Array.from(this.form.querySelectorAll('.popup__input'));
    inputs.forEach(input => {
      values[input.name] = input.value
    })
    return values
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', () => {
      this.submitHandler(this._getInputValues())
      this.close()
    });
  }

  close() {
    this.form.reset();
    super.close();
  }
}