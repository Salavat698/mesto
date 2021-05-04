import{openPopup} from './utils/utils.js';

const popupPreviewBox = document.querySelector('.popup_preview');
const previewSignature = document.querySelector('.preview__signature');
const previewImgPopup = document.querySelector('.preview__img');

export class Card{

    constructor(cardData,cardTemplateId){
        this.cardData = cardData;
        this.cardTemplateId = cardTemplateId;

        this.cardElement = this._makeCard();
        this._makeEventListeners();
        this.elementLike = this.cardElement.querySelector(".element__like");
        this.itemElementCard =this.cardElement.querySelector('.directors__item');

    }
   
    _makeCard(){
        const cardTemplate = document.querySelector(this.cardTemplateId).content;
        const cardElement = cardTemplate.cloneNode(true);
        const image = cardElement.querySelector('.element__image');
        const title = cardElement.querySelector(".element__place-travel");
        
        image.src = this.cardData.link;
        image.alt = this.cardData.name;
        title.textContent = this.cardData.name;

        return cardElement;

    }
    _openImagePopup(){
        
        openPopup(popupPreviewBox);
        previewImgPopup.src = this.cardData.link;
        previewImgPopup.alt = this.cardData.name;
        previewSignature.textContent = this.cardData.name;
    }

    _like(){
       
        this.elementLike.classList.toggle("element__like_active");
   
    }
    _deleteCard(){
        this.itemElementCard.remove();
    }
    _makeEventListeners(){
        const elementLike = this.cardElement.querySelector(".element__like");
        const basketIconDelet = this.cardElement.querySelector('.element__backet');
        const previewImg = this.cardElement.querySelector('.element__image')

        elementLike.addEventListener("click", () => this._like());
        basketIconDelet.addEventListener("click", () => this._deleteCard());
        previewImg.addEventListener("click", () => this._openImagePopup());
    }

    getElement(){
        return this.cardElement;
    }
}