export class Card{

    constructor(cardData,handleCardClick,currentUserId,sumbitHandler,handlerLike){

        this.cardData = cardData;
        this.handlerLike = handlerLike;
        this.cardTemplateId = '#card-template';
        this._handleCardClick = handleCardClick;
        //метод сбора инфы
        this.sumbitHandler = sumbitHandler;
        this.cardElement = this._makeCard();
        this._makeEventListeners();
        this.itemElementCard =this.cardElement.querySelector('.directors__item');
        this.likesCounter =  this.cardElement.querySelector('.element__likes-click');
        this._ownerId = cardData.owner._id;// ид владельца карточки
        this._userId = currentUserId;//мои ид 
        this.idCard = cardData._id // ид карт
        this.liked = false;
        this.removeDeleteButton ()
        this.isLikedState()
    }
    
   
        //пробегаеться по лайкам если средих них мои и красит его в черный если да
    isLikedState(){
        this.cardData.likes.forEach((like)=>{
            if(like._id === this._userId){
                this.liked = true;
                this.elementLike.classList.toggle("element__like_active");
            }
        })
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
        const title = cardElement.querySelector('.element__place-travel');
        this.likesCounter = cardElement.querySelector('.element__likes-click');
        this.elementLike = cardElement.querySelector(".element__like");
      
        this.likesCounter.textContent =  this.cardData.likes.length;
        image.src = this.cardData.link;
        image.alt = this.cardData.name;
        title.textContent = this.cardData.name;
        
        this.isLiked = this.cardData.likes.some(like => like._id === this._userId)
        if(this.isLiked){
            this.elementLike.classList.add('element__like_active');
        }
        return cardElement;

    }
    _openImagePopup(){
        this._handleCardClick(this.cardData);
    }
    //переключает стиль для сердечко
    _like(){
        this.handlerLike(this)
    }
    getId(){
        return this.cardData._id
    }
    getIsLiked(){
        return this.isLiked
    }
    updateLikesInfo(likes){
        this.cardData.likes = likes;
        this.isLiked = this.cardData.likes.some(like => like._id === this._userId);
        if(this.isLiked){
            this.elementLike.classList.add('element__like_active');
            this.likesCounter.textContent =  this.cardData.likes.length;
        }else{
            this.elementLike.classList.remove('element__like_active');
            this.likesCounter.textContent =  this.cardData.likes.length;
        }
    }
    //метод едлемента удаления
    openPopupConfirm(){
        this.sumbitHandler(this.itemElementCard,this.idCard)
    }

    _makeEventListeners(){
        const elementLike = this.cardElement.querySelector(".element__like");//cам лайк ДОМ
        const basketIconDelet = this.cardElement.querySelector('.element__backet');
        const previewImg = this.cardElement.querySelector('.element__image')
 
        elementLike.addEventListener("click", () =>this._like());
        basketIconDelet.addEventListener("click", () => this.openPopupConfirm());
        previewImg.addEventListener("click", () => this._openImagePopup());
    }

    getElement(){
        return this.cardElement;
    }
}