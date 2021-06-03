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
          // А в чем проблема если запросы оставить здесь ? сделать приватными методами.
          // Если переносить щас в index.js 
          // У меня нету там значений таких как 
          //  this.cardEl , this.id
          // ЭТО снова переделывать такой обьем работы !? или я чет не так понял =( ...
      this.api.deleteCard( this.id)
      .then(() =>{
        this.cardEl.remove()
        this.close()
      })
      .catch(err =>{
        console.log(err)
      })
     
    })
  }

  sumbitHandler = (cardEl,id) =>{
    this.cardEl = cardEl;
    this.id = id;
    this.open();
  }


}