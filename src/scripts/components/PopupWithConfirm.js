import Popup from './Popup.js'

 export default class PopupWithConfirm extends Popup {
  constructor(popupSelector,hendlerRemoveDeletCard) {
    super(popupSelector)
    this.hendlerRemoveDeletCard = hendlerRemoveDeletCard;
    this.deletBtn = document.querySelector('.popup__btn-yes');
    //форма вопрос удаления
    this.formDelet = document.querySelector('.popup__container-delet')
  }

  setEventListeners() {
  
    super.setEventListeners()
    this.formDelet.addEventListener('click',(evt)=>{
      evt.preventDefault();
      this.hendlerRemoveDeletCard();
    })
  }
  cardElement(){
    return this.cardEl;
  }

  idOwen(){
    return this.id;
  }

  sumbitHandler = (cardEl,id) =>{
    this.cardEl = cardEl;
    this.id = id;
    this.open();
  }


}