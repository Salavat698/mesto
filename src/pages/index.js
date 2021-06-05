import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidate.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';
import {
  profileEditBtn,
  formElement,
  profileAddBtn,
  formElementCards,
  inputName,
  inputDescription,
  validationConfig,
  profileConfig,
  nameInput,
  workInput
} from '../scripts/utils/constants.js'

import {Api} from '../scripts/components/Api.js'
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js'
import {closePopup,closeByOverlayClick,popups} from '../scripts/utils/utils.js';


// экземпляр юзера
const userInfoProfile = new UserInfo(profileConfig);

let currentUserId;

// запрос на  о пользователе с сервера
const api= new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '43b98874-8a2f-4742-91c1-202875e69e98',
})

const containerElement = document.querySelector('.element');

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, userCard]) => {

      currentUserId = userData._id
      userInfoProfile.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      })

      const cardsSection = new Section({
        items: userCard,
        renderer: (items) => {
          const cardElement = createCard(items);
          cardsSection.addItem(cardElement);
        }
    }, containerElement);
    cardsSection.render();


    })
    .catch((err) => {
        console.log(`Вот, что произошло. ${err}`);
    });

// валидаций авaтара
const avatarElementPopup = document.querySelector('.popup__container-avatar')
const validatorAvatar = new FormValidator(validationConfig,avatarElementPopup);
validatorAvatar.enableValidation();

// Avatar
const avatarEditBtn = document.querySelector('.profile__avatar-edit')
const avatarEditPopup = new PopupWithForm ('.popup_avatar',handleLoadUserAvatar)
avatarEditPopup.setEventListeners();

function handleLoadUserAvatar (inputData) {
  avatarEditPopup.showTextSave(true)

  api.updateAvatar(inputData.avatar)
  .then((res)=>{
    userInfoProfile.setUserAvatar(res.avatar);
    avatarEditPopup.close()
  })
    
  .catch((err)=>{
    console.log(err)
  })
  .finally(()=>{
    avatarEditPopup.showTextSave(false);
  })
}

//открываю Автар попап
avatarEditBtn.addEventListener('click',function() {
  avatarEditPopup.open()
  validatorAvatar.resetFormState()
})

// //экземпляр формы Профиля
const popupFormProfile = new PopupWithForm('.popup_profile', editFormSubmitHandler);
popupFormProfile.setEventListeners();

// функция которую буду опрокидывать в PopupFormProfile
function editFormSubmitHandler(dataFormPoup){
  popupFormProfile.showTextSave(true)
  api.updateUser({
    name: dataFormPoup.name,
    about: dataFormPoup.work,
  }
  ).then((dataFormServer) =>{
    userInfoProfile.setUserInfo(dataFormServer)
    popupFormProfile.close()
  })
  .catch((res)=>{
    console.log(`"Вот что произошло":${res}`)
  })
  .finally(()=>{
    popupFormProfile.showTextSave(false)
  })
  
}

//валидаций профиля
const validatorAddCard = new FormValidator(validationConfig,formElement);
validatorAddCard.enableValidation();

//открывание профиле Профиля
profileEditBtn.addEventListener('click', function(){
  popupFormProfile.open();
  const data = userInfoProfile.getUserInfo()
  nameInput.value = data.name
  workInput.value = data.about
  validatorAddCard.resetFormState()
});

// Section экземпляр
const cardsSection = new Section({
  items: [],
    render: (items) => {
      items.reverse().forEach(item => {
          const cardElement = createCard(item);
          cardsSection.addItem(cardElement);
      })
  }
}, containerElement);




// // функция создания карточек
function createCard(data) {
  const cardElement = new Card(
    data,
    '#card-template',
    handleCardClick,
    currentUserId,
    popupWithDeleteCard.sumbitHandler,
    likeCard,
    
  );
  return cardElement.getElement();
}

function likeCard(card){
  
  api.like(card.getId(),card.getIsLiked())
  .then(res => {
    card.updateLikesInfo(res.likes)
  })
}


//экземпляр карточек
const popupFormCards = new PopupWithForm('.popup_add-cards', formAddCardSubmitHandler);
popupFormCards.setEventListeners();

// //отправка формы для карточек
function formAddCardSubmitHandler() {
  popupFormCards.showTextSave(true)
  api.addCard({
    name:inputName.value,
    link:inputDescription.value
  }
  ).then((serverCard) =>{
    cardsSection.addItem(createCard(serverCard))
    popupFormCards.close()
  })
  .catch((res)=>{
    console.log(`"Вот что произошло":${res}`)
  })
  .finally(()=>{
    popupFormCards.showTextSave(false)
  })
  formElementCards.reset();
}

// удаления карточки из сервера
const popupWithDeleteCard = new PopupWithConfirm('.popup_delet',removeCardHandler)
popupWithDeleteCard.setEventListeners();

function removeCardHandler(){
  const cardElement =popupWithDeleteCard.getCardElement();
  const ownerId =popupWithDeleteCard.getOwnerId();

  api.deleteCard(ownerId)
  .then(() =>{
    cardElement.remove();
    popupWithDeleteCard.close();
  })
  .catch(err =>{
    console.log(err)
  })
}

// создание попапа превью
const popupImage = new PopupWithImage('.popup_preview');
popupImage.setEventListeners();

// функция передачи данных для открытия первью карточки
function handleCardClick (data) {
  return popupImage.open(data);
}

// открывание карточек
profileAddBtn.addEventListener('click',function(){
  popupFormCards.open();
  formElementCards.reset();
  validatorEditProfile.resetFormState()//очищение формы при открытий
});

 //валидаций карт
 const validatorEditProfile = new FormValidator(validationConfig,formElementCards);
 validatorEditProfile.enableValidation();