export class Card{

    constructor(cardData,cardTemplateId,handleCardClick,currentUserId,sumbitHandler,api){

        this.cardData = cardData;
        this.api = api;
    
        this.cardTemplateId = cardTemplateId;
        this._handleCardClick = handleCardClick;

        //метод сбора инфы
        this.sumbitHandler = sumbitHandler;

        this.cardElement = this._makeCard();
        this._makeEventListeners();
        this.elementLike = this.cardElement.querySelector(".element__like");
        this.itemElementCard =this.cardElement.querySelector('.directors__item');

        this.liked = false;

        this.likesCounter =  this.cardElement.querySelector('.element__likes-click');

        this._ownerId = cardData.owner._id;// ид владельца карточки
        this._userId = currentUserId;//мои ид 
        this.idCard = cardData._id // ид карт

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
       
        // // Выбираем  элементы с классом like
        const likesCounter = cardElement.querySelector('.element__likes-click');
        likesCounter.textContent =  this.cardData.likes.length;

        image.src = this.cardData.link;
        image.alt = this.cardData.name;
        title.textContent = this.cardData.name;
        this.isLiked()
        return cardElement;

    }
    _openImagePopup(){
        this._handleCardClick(this.cardData);

    }
    //переключает стиль для сердечко
    _like(){
        this.elementLike.classList.toggle("element__like_active");
    }
    //пробегаеться по лайкам если средих них мои и красит его в черный если да
    isLiked(){
        this.cardData.likes.forEach((like)=>{
            if(like._id === this._userId){
                this.liked = true;
                this._like();
            }
        })
    }
    //запрос на количество лайков с сервера 
    counterLike(){
        if(!this.liked ){
            this.api.plusLike(this.idCard)
            .then(res =>{
                this.likesCounter.textContent = res.likes.length;
                this.liked=true;
            })
        }else{
            this.api.munesLike(this.idCard)
            .then(res =>{
                this.likesCounter.textContent = res.likes.length;
                this.liked =false;
            })
        }
        this._like();
    }

    openPopupConfirm(){
        this.sumbitHandler(this.itemElementCard,this.idCard)
    }
    //метод едлемента удаления


    _makeEventListeners(){
        const elementLike = this.cardElement.querySelector(".element__like");
        const basketIconDelet = this.cardElement.querySelector('.element__backet');
        const previewImg = this.cardElement.querySelector('.element__image')
 


        elementLike.addEventListener("click", () => this.counterLike());
        //сюда передаю вопрос удалить или нет
        basketIconDelet.addEventListener("click", () => this.openPopupConfirm());
        
        previewImg.addEventListener("click", () => this._openImagePopup());
    }

    getElement(){
        return this.cardElement;
    }
}