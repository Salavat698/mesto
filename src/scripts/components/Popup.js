export default class Popup {
    constructor(popupSelector) {
      this.popupSelector = popupSelector;
      this.popup = document.querySelector(this.popupSelector)
    }
  
    open() {
      this.popup.classList.add('popup_active');
      document.addEventListener('keyup',(evt) => this._handleEscClose(evt))
      
    }
  
    close = () => {
      this.popup.classList.remove('popup_active');
      document.removeEventListener('keyup',(evt) => this._handleEscClose(evt))
    }
  
    _handleEscClose(evt) {
      evt.preventDefault();
      if(evt.key === 'Escape') {
        this.close()
      }
    }
  
    setEventListeners() {
      this.popup.querySelector('.popup__close').addEventListener('click', () => {
        this.close()
      })
      
    }
  }