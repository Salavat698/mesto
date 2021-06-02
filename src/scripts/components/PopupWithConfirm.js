import Popup from './Popup.js'

 export default class PopupWithConfirm extends Popup {
  constructor(popupSelector,api) {
    super(popupSelector)
    this.api = api;
    this.deletBtn = document.querySelector('.popup__btn-yes');
    //форма вопрос удаления
    this.formDelet = document.querySelector('.popup__container-delet')
  }

  setEventListeners() {
  
    super.setEventListeners()
    this.formDelet.addEventListener('click',(evt)=>{
      evt.preventDefault();
      this.api.deleteCards( this.id)
      .then(() =>{
        this.cardEl.remove()
      })
      .catch(err =>{
        console.log(err)
      })
      this.close()
    })
  }

  sumbitHandler = (cardEl,id) =>{
    this.cardEl = cardEl;
    this.id = id;
    this.open();
  }


}