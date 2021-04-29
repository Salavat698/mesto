import {openPopup} from './popup-modal.js';
export class Card{

    constructor(cardData){
        this.cardData = cardData;
        this.cardElement = this._makeElement();
        this._makeEventListeners();
        this.elementLike = this.cardElement.querySelector(".element__like");
        this.itemElementCard =this.cardElement.querySelector('.directors__item');
    }
    _preview(){
        const popupPreviewBox = document.querySelector('.popup_preview');
        openPopup(popupPreviewBox);

        const previewImgPopup = document.querySelector('.preview__img');
        previewImgPopup.src = this.cardData.link;
        previewImgPopup.alt = this.cardData.name;
        const previewSignature = document.querySelector('.preview__signature');
        previewSignature.textContent = this.cardData.name;
    }

    _like(){
       
        this.elementLike.classList.toggle("element__like_active");
   
    }
    _remove(){
        this.itemElementCard.remove();
    }
    _makeEventListeners(){
        const elementLike = this.cardElement.querySelector(".element__like");
        const basketIconDelet = this.cardElement.querySelector('.element__backet');
        const previewImg = this.cardElement.querySelector('.element__image')
        


        elementLike.addEventListener("click", () => this._like());
        basketIconDelet.addEventListener("click", () => this._remove());

        previewImg.addEventListener("click", () => this._preview());
    }
 
    _makeElement(){
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.cloneNode(true);
        
        const image = cardElement.querySelector('.element__image');
        const title = cardElement.querySelector(".element__place-travel");
        image.src = this.cardData.link;
        image.alt = this.cardData.name;
        title.textContent = this.cardData.name;

        return cardElement;

    }
  

    getElement(){
        return this.cardElement;
    }
}