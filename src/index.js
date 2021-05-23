import {Card} from './scripts/components/Card.js';
import {initialCards} from './scripts/utils/initial-сards.js';
import {FormValidate} from './scripts/components/FormValidate.js';
import{openPopup,closePopup} from './scripts/utils/utils.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import Popup from './scripts/components/Popup.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import UserInfo from './scripts/components/UserInfo.js';
import './pages/index.css'
import {profileEditBtn,
  popupEditProfile,
  popupCloseProfile,
  formElement,
  nameInput,
  workInput,
  profileName,
  profileWork,
  popupClosePreview,
  profileAddBtn,
  popupAddCards,
  popupCloseCards,
  formElementCards,
  cardsContainer,
  popupPreviewBox,
  inputName,
  inputDescription,
  elementImagePrewiev,
  validationConfig,} from './scripts/utils/constants.js'


//валидаций профиля
const validatorEditProfile = new FormValidate(validationConfig,formElementCards);
validatorEditProfile.enableValidation();
//валидаций карт
const validatorAddCard = new FormValidate(validationConfig,formElement);
validatorAddCard.enableValidation();

// массив добавляем в контейнер через класс
const sectionCard = new Section({
  data: initialCards,
  rendererItem:function({name,link}){
    const cardElement = new Card({name,link},'#card-template',handleCardClick);
    return cardElement.getElement();
  }
}, '.element')
sectionCard.renderer();


//отправка формы для карточек
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = new Card({
    name:inputName.value,
    link:inputDescription.value
  },'#card-template',handleCardClick);
  sectionCard.addItem(cardElement.getElement())
  formElementCards.reset();
  closePopup(popupAddCards);
}

// function submitHandlerCard(values) {
//   const sectionCard = new Section({
//     data: values, 
//     rendererItem: (values) => {
//       const card = creatCard(values)
//       return sectionCard.addItem(card)
//     }
//   }, '.cards');
//   return sectionCard.renderer();
// };
formElementCards.addEventListener('submit',formAddCardSubmitHandler);


// создание попапа превью
const popupImage = new PopupWithImage('.popup_preview');
popupImage.setEventListeners();

// функция передачи данных для открытия первью карточки
function handleCardClick (data) {
  return popupImage.open(data);
}

//экземпляр карточек
const popupFormCards = new PopupWithForm('.popup_add-cards', formAddCardSubmitHandler);
popupFormCards.setEventListeners();

// // открывание карточек
profileAddBtn.addEventListener('click',function(){
  popupFormCards.open();
  validatorEditProfile.resetFormState()//очищение формы при открытий
});



// экземпляр юзера
const userInfoProfile = new UserInfo({name:'.profile__name', commit:'.profile__work'});

// //экземпляр формы
const popupFormProfile = new PopupWithForm('.popup_profile', editFormSumbutHadler);
popupFormProfile.setEventListeners();

// функция которую буду опрокидывать в PopupFormProfile
function editFormSumbutHadler(data){
  userInfoProfile.setUserInfo(data);
}
//открывание профиле
profileEditBtn.addEventListener('click', function(){
  popupFormProfile.open();
  userInfoProfile.getUserInfo()
  validatorAddCard.resetFormState()//очищение формы при открытий
});



