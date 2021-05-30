import Popup from './Popup.js'

 export default class PopupWithDelet extends Popup {
  constructor(popupSelector,onSumbit) {
    super(popupSelector)
    this.onSumbit = onSumbit
  }

  setEventListeners() {
    super.setEventListeners()
    const deletBtn = this.popup.querySelector('.popup__btn-yes');
    deletBtn.addEventListener('click',()=>{
      this.onSumbit()
      super.close()
    })
    super.open();
  }
}