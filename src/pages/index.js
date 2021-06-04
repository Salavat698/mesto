import {Card} from '../scripts/components/Card.js';
import {FormValidate} from '../scripts/components/FormValidate.js';
import{closePopup} from '../scripts/utils/utils.js';
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



// экземпляр юзера
const userInfoProfile = new UserInfo(profileConfig);

let currentUserId;

// запрос на  о пользователе с сервера
const api= new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '43b98874-8a2f-4742-91c1-202875e69e98',
})

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
          const cardElement = creatCard(items);
          cardsSection.addItem(cardElement);
        }
    }, '.element');
    cardsSection.render();


    })
    .catch((err) => {
        console.log(`Вот, что произошло. ${err}`);
    });

// валидаций авaтара
const avatarElementPopup = document.querySelector('.popup__container-avatar')
const validatorAvatar = new FormValidate(validationConfig,avatarElementPopup);
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
const validatorAddCard = new FormValidate(validationConfig,formElement);
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
}, '.element');

// функция создания карточек
function creatCard(data) {
  const cardElement = new Card(
    data,
    '#card-template',
    handleCardClick,
    currentUserId,
    popupWithDeleteCard.sumbitHandler,
    // handleLikeClick
    api
    );
  return cardElement.getElement();
}
// ПЫТАСЮ ВЫТАЩИТЬ ДАННЫЕ ИД КАРТЫ ЧЕТ НЕ ВЫХОДИТ!
// И про сделать запрос здесь я правильно делаю, то есть Вы это имели ввиду?
// и да наставнику уже написал ....
//   // const idCard = creatCard.idCard();
//   // console.log(idCard)


// function handleLikeClick(){
//   likesCounter =  document.querySelector('.element__likes-click');
//   // const idCard = creatCard.idCard();
//   // console.log(idCard)
//   const liked = false
//   if(!liked ){
//     api.addLike(idCard)
//     .then(res =>{
//         likesCounter.textContent = res.likes.length;
//         liked=true;
//     })
//     .catch(err =>{
//         console.log(err)
//       })
// }else{
//     this.api.removeLike(idCard)
//     .then(res =>{
//         likesCounter.textContent = res.likes.length;
//         liked =false;
//     })
//     .catch(err =>{
//         console.log(err)
//       })
// }
// this._like();
// }
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
    cardsSection.addItem(creatCard(serverCard))
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
const popupWithDeleteCard = new PopupWithConfirm('.popup_delet',hendlerRemoveDeletCard)
popupWithDeleteCard.setEventListeners();

function hendlerRemoveDeletCard(){
  const cardElement =popupWithDeleteCard.cardElement();
  const idOwen =popupWithDeleteCard.idOwen();

  api.deleteCard(idOwen)
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
 const validatorEditProfile = new FormValidate(validationConfig,formElementCards);
 validatorEditProfile.enableValidation();