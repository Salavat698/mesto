import {Card} from './Card.js';
import {initialCards} from './initial-сards.js';
import {FormValidate} from './FormValidate.js';
import{enableEscListener,openPopup,handleEscListener,isEscEvt,closePopup} from './utils/utils.js';

const profileEditBtn = document.querySelector('.profile__edit-btn');//кнопка редаетирование
const popupEditProfile = document.querySelector('.popup_profile');//сам блок попап
const popupCloseProfile = document.querySelector('.popup__close_profile');//крестик на попап закрытие
const formElement = document.querySelector('.popup__container_profile'); // Воспользуйтесь методом querySelector()
const nameInput = popupEditProfile.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
const workInput =  popupEditProfile.querySelector('#work-input');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');// создал переменную для тега с классом profile__name
const profileWork = document.querySelector('.profile__work');// создал переменную для тега с классомprofile__work
const popupClosePreview = document.querySelector('.popup__close_preview');
const profileAddBtn = document.querySelector('.profile__add-btn');// переменная кнопки добавить фото-карточки
const popupAddCards = document.querySelector('.popup_add-cards');//сам блок попап открыть
const popupCloseCards =  document.querySelector('.popup__close-cards');//сам блок попап закрыть по крестику
const formElementCards = document.querySelector('.popup__container_cards'); //сама форма попап
const cardsContainer = document.querySelector('.element'); //контейнер где будут лежат все карточки
const popups = document.querySelectorAll('.popup')
const popupPreviewBox = document.querySelector('.popup_preview');
const inputName = document.querySelector('.popup__input-description');
const inputDescription = document.querySelector('.popup__input-images');

const  validationConfig= {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};
const validatorEditProfile = new FormValidate(validationConfig,formElementCards);
validatorEditProfile.enableValidation();//запуск валидаций профиля

//слышатель кнопки открывание карточек
profileAddBtn.addEventListener('click',function(){
  openPopup(popupAddCards);
  validatorEditProfile.resetFormState()//очищение формы при открытий
});

const validatorAddCard = new FormValidate(validationConfig,formElement);
validatorAddCard.enableValidation();//запуск валидаций карт
//слушатель кнопки профиле
profileEditBtn.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;
  openPopup(popupEditProfile);
  validatorAddCard.resetFormState()//очищение формы при открытий
});


// закрывает по оверулей клик
function closeBeOverlayClick(allPopap){
  allPopap.forEach(itemPopup =>{
    //закрываю по оверу
    itemPopup.addEventListener('click',(e)=>{
      if(e.target === e.currentTarget){
        closePopup(itemPopup)
      };
    });
  });
};
closeBeOverlayClick(popups);


//закртыие по esc
enableEscListener();


//массив добавляем в контейнер
initialCards.forEach(function (initialCard) {
  const cardElement = new Card(initialCard,'#card-template');
  cardsContainer.append(cardElement.getElement());
});



function createCard (){
  const cardElement = new Card({ name: inputName.value, link: inputDescription.value },'#card-template');
  cardsContainer.prepend(cardElement.getElement());
}

function formEditProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileWork.textContent = workInput.value; 
  closePopup(popupEditProfile);
}
//ДОБАВЛЕНИЕ КАРТОЧКИ в основной контейнер
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  createCard();
  formElementCards.reset();
  closePopup(popupAddCards);
}

//обработчики событий
popupClosePreview.addEventListener('click',function(){
  closePopup(popupPreviewBox);
});
formElementCards.addEventListener('submit',formAddCardSubmitHandler);


popupCloseCards.addEventListener('click',function(){
  closePopup(popupAddCards);
  formElementCards.reset();
});
formElement.addEventListener('submit', function(e){
  formEditProfileSubmitHandler(e);
  
});

popupCloseProfile.addEventListener('click', function(e){
  closePopup(popupEditProfile);
});


