import {Card} from './Card.js';
import {initialCards} from './initial-сards.js';
import {openPopup} from './popup-modal.js';
import {FormValidate} from './FormValidate.js';

const profileEditBtn = document.querySelector('.profile__edit-btn');//кнопка редаетирование
const popupEditProfile = document.querySelector('.popup_profile');//сам блок попап
const popupCloseProfile = document.querySelector('.popup__close_profile');//крестик на попап закрытие
const formElement = document.querySelector('.popup__container_profile'); // Воспользуйтесь методом querySelector()
const nameInput = popupEditProfile.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
const workInput =  popupEditProfile.querySelector('#work-input');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');// создал переменную для тега с классом profile__name
const profileWork = document.querySelector('.profile__work');// создал переменную для тега с классомprofile__work
const popupClosePreview = document.querySelector('.popup__close_preview');
// const popupPreviewBox = document.querySelector('.popup_preview');
const profileAddBtn = document.querySelector('.profile__add-btn');// переменная кнопки добавить фото-карточки
const popupAddCards = document.querySelector('.popup_add-cards');//сам блок попап открыть
const popupCloseCards =  document.querySelector('.popup__close-cards');//сам блок попап закрыть по крестику
const popupSaveBtnCards = document.querySelector('.popup__save-btn-cards');//кнопка создать попап
const formElementCards = document.querySelector('.popup__container_cards'); //сама форма попап
const cardsContainer = document.querySelector('.element'); //контейнер где будут лежат все карточки
const allPopaps = document.querySelectorAll('.popup')
const popupPreviewBox = document.querySelector('.popup_preview');

const vConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};


//слышатель кнопки открывание карточек
profileAddBtn.addEventListener('click',function(){
  openPopup(popupAddCards);
  const validFormCard = new FormValidate(vConfig,formElementCards);
  validFormCard.enableValidation();//запуск валидаций
  validFormCard.resetFormState()//очищение формы при открытий
});


//слушатель кнопки профиле
profileEditBtn.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;
  openPopup(popupEditProfile);
  const validFormCard = new FormValidate(vConfig,formElement);
  validFormCard.enableValidation();//запуск валидаций
  validFormCard.resetFormState()//очищение формы при открытий
});






// закрывает по оверулей клик
function closeOwer(allPopap){
  allPopap.forEach(itemPopup =>{
    //закрываю по оверу
    itemPopup.addEventListener('click',(e)=>{
      if(e.target === e.currentTarget){
        closePopup(itemPopup)
      };
    });
  });
};
closeOwer(allPopaps);

//слушатель на документ 
export function enableEscListener() {
  document.addEventListener('keyup', handleEscListener);
}

// определяем что это нужное событие
function handleEscListener (e) {
  e.preventDefault();
  isEscEvt(e, closePopup);
}

//при нужном событии активный попап передается в функцию закрытия попапа
function isEscEvt(e, action) {
  if (e.key === 'Escape') {
  const popupActiv = document.querySelector('.popup_active');
  action(popupActiv);
  }
}

function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keyup', handleEscListener);
};

//массив добавляем в контейнер
initialCards.forEach(function (initialCard) {
  const cardElement = new Card(initialCard);
  cardsContainer.append(cardElement.getElement());
});

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileWork.textContent = workInput.value; 
    closePopup(popupEditProfile);
}


//ДОБАВЛЕНИЕ КАРТОЧКИ в основной контейнер
function formSubmitCards(evt) {
  evt.preventDefault();
  const inputName = document.querySelector('.popup__input-description');
  const inputDescription = document.querySelector('.popup__input-images');
  const cardElement = new Card({ name: inputName.value, link: inputDescription.value });
  
  cardsContainer.prepend(cardElement.getElement());
  formElementCards.reset();
  
  closePopup(popupAddCards);

}

//обработчики событий
popupClosePreview.addEventListener('click',function(){
  closePopup(popupPreviewBox);
});
formElementCards.addEventListener('submit',formSubmitCards);


popupCloseCards.addEventListener('click',function(){
  closePopup(popupAddCards); 
});
formElement.addEventListener('submit', function(e){
  formSubmitHandler(e);
  
});

popupCloseProfile.addEventListener('click', function(e){
  closePopup(popupEditProfile);
});


