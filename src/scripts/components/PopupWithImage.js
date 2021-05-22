import Popup from './Popup.js'

 export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    this.caption = this.popup.querySelector('.preview__signature');
    this.image = this.popup.querySelector('.preview__img');
    this.caption.textContent = data.name;
    this.image.src = data.link;
    this.image.alt = data.name;
    super.open();
  }
}