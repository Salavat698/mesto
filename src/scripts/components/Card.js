import PopupWithDelet from './PopupWithDelet.js'
export class Card{

    constructor(cardData,cardTemplateId,handleCardClick,currentUserId){

        
        this.cardData = cardData;
        this.cardTemplateId = cardTemplateId;
        this._handleCardClick = handleCardClick;

        

        this.cardElement = this._makeCard();
        this._makeEventListeners();
        this.elementLike = this.cardElement.querySelector(".element__like");
        this.itemElementCard =this.cardElement.querySelector('.directors__item');

        
        this._ownerId =this.cardData.owner._id;//ид  карты
        this._userId = currentUserId;//ид мои
 
        this.removeDeleteButton ()
    }
    //проверка на ид и удаляет корзину удаления
    removeDeleteButton () {
        this.basketIconDeletBtn = this.cardElement.querySelector('.element__backet');
        if (this._ownerId !== this._userId) {
          this.basketIconDeletBtn.remove();
        }
      }

    _makeCard(){
        const cardTemplate = document.querySelector(this.cardTemplateId).content;
        const cardElement = cardTemplate.cloneNode(true);
        const image = cardElement.querySelector('.element__image');
        const title = cardElement.querySelector(".element__place-travel");

        // Выбираем  элементы с классом like
        const likes = cardElement.querySelector('.element__likes-click');
        likes.textContent =  this.cardData.likes.length;


        image.src = this.cardData.link;
        image.alt = this.cardData.name;
        title.textContent = this.cardData.name;

        return cardElement;

    }
    _openImagePopup(){
        this._handleCardClick(this.cardData);

    }
 
    _like(){
       
        this.elementLike.classList.toggle("element__like_active");
   
    }
    _deleteCard(){
        const popupFormDelet = new PopupWithDelet('.popup__delet');
        this.itemElementCard.remove();
        popupFormDelet.close();
    }

    //попап вопрос об удаления
    _deletQuestionPopup(){
         //экземпляр формы удаления
        const popupFormDelet = new PopupWithDelet('.popup__delet',()=>{
            this.itemElementCard.remove()
        });
        popupFormDelet.open();
        popupFormDelet.setEventListeners();

    }

    _makeEventListeners(){
        const elementLike = this.cardElement.querySelector(".element__like");
        const basketIconDelet = this.cardElement.querySelector('.element__backet');
        const previewImg = this.cardElement.querySelector('.element__image')

    //    //кнопка ответа ДА
    //     const deletBtn = document.querySelector('.popup__btn-yes');
    //     deletBtn.addEventListener("click", () => this._deleteCard());

        elementLike.addEventListener("click", () => this._like());
        //сюда передаю вопрос удалить или нет
        basketIconDelet.addEventListener("click", () => this._deletQuestionPopup());
        
        previewImg.addEventListener("click", () => this._openImagePopup());
    }

    getElement(){
        return this.cardElement;
    }
}