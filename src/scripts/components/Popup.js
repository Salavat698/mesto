export default class Popup {
    constructor(popupSelector) {
      this.popupSelector = popupSelector;
      this.popup = document.querySelector(this.popupSelector)
      this._handleEscClose = this._handleEscClose.bind(this)

 


    }

    _handleEscClose(evt) {
      evt.preventDefault();
      if(evt.key === 'Escape') {
        this.close()
      }
    }

    open() {
      this.popup.classList.add('popup_active');
      document.addEventListener('keyup',this._handleEscClose)
      
    }
  
    close() {
      this.popup.classList.remove('popup_active');
      document.removeEventListener('keyup',this._handleEscClose)
    }


    setEventListeners() {
      this.popup.querySelector('.popup__close').addEventListener('click', () => {
        this.close()
      })
      
    }
  }