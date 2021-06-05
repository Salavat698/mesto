import Popup from './Popup.js'

 export default class PopupWithConfirm extends Popup {
  constructor(popupSelector,removeCardHandler) {
    super(popupSelector)
    this._removeCardHandler = removeCardHandler;
    this.deletBtn = document.querySelector('.popup__btn-yes');
    //форма вопрос удаления
    this.formDelet = document.querySelector('.popup__container-delet')
  }

  setEventListeners() {
  
    super.setEventListeners()
    this.formDelet.addEventListener('click',(evt)=>{
      evt.preventDefault();
      this._removeCardHandler();
    })
  }
  getCardElement(){
    return this.cardEl;
  }

  getOwnerId(){
    return this.id;
  }

  sumbitHandler = (cardEl,id) =>{
    this.cardEl = cardEl;
    this.id = id;
    this.open();
  }


}