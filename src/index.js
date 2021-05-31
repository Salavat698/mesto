import {Card} from './scripts/components/Card.js';
import {FormValidate} from './scripts/components/FormValidate.js';
import{closePopup} from './scripts/utils/utils.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithDelet from './scripts/components/PopupWithConfirm.js';
import UserInfo from './scripts/components/UserInfo.js';
import './pages/index.css'
import {profileEditBtn,
  initialCards,
  formElement,
  profileAddBtn,
  popupAddCards,
  formElementCards,
  inputName,
  inputDescription,
  validationConfig,
} from './scripts/utils/constants.js'
// console.log(inputName)//разобраться
import {Api} from './scripts/components/Api.js'
import PopupWithConfirm from './scripts/components/PopupWithConfirm.js'


// экземпляр юзера
const userInfoProfile = new UserInfo({name:'.profile__name', about:'.profile__work',avatar:'.profile__avatar'});

let currentUserId;

// запрос на  о пользователе с сервера
const api= new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '43b98874-8a2f-4742-91c1-202875e69e98',
})

Promise.all([api.user(), api.cards()])
    .then(([userData, userCard]) => {

      currentUserId = userData._id
      userInfoProfile.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar
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



// //экземпляр формы Профиля
const popupFormProfile = new PopupWithForm('.popup_profile', editFormSumbutHadler);
popupFormProfile.setEventListeners();

// функция которую буду опрокидывать в PopupFormProfile
function editFormSumbutHadler(dataFormPoup){
  popupFormProfile.showTextSave(true)
  api.updateUser({
    name: dataFormPoup.name,
    about: dataFormPoup.work,
  }
  ).then((dataFormServer) =>{
    userInfoProfile.setUserInfo(dataFormServer)
    popupFormProfile.showTextSave(false)
  })
  
}

//открывание профиле Профиля
profileEditBtn.addEventListener('click', function(){
  popupFormProfile.open();
  const data = userInfoProfile.getUserInfo()
  inputName.value = data.name
  inputDescription.value = data.about

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
  const cardElement = new Card(data,'#card-template',handleCardClick,currentUserId,PopupWithDeleteCard.sumbitHandler,api);
  
  return cardElement.getElement();
}
//экземпляр карточек
const popupFormCards = new PopupWithForm('.popup_add-cards', formAddCardSubmitHandler);
popupFormCards.setEventListeners();


// //отправка формы для карточек
function formAddCardSubmitHandler() {
  popupFormCards.showTextSave(true)
  api.postCards({
    name:inputName.value,
    link:inputDescription.value
  }
  ).then((serverCard) =>{
    cardsSection.addItem(creatCard(serverCard))
    popupFormCards.showTextSave(false)
  })

  formElementCards.reset();
  closePopup(popupAddCards);
}

// удаления карточки из сервера
const PopupWithDeleteCard = new PopupWithConfirm('.popup_delet',api)
PopupWithDeleteCard.setEventListeners();
// создание попапа превью
const popupImage = new PopupWithImage('.popup_preview');
popupImage.setEventListeners();

// функция передачи данных для открытия первью карточки
function handleCardClick (data) {
  return popupImage.open(data);
}



// // открывание карточек
profileAddBtn.addEventListener('click',function(){
  popupFormCards.open();
  validatorEditProfile.resetFormState()//очищение формы при открытий
});



//валидаций профиля
const validatorEditProfile = new FormValidate(validationConfig,formElementCards);
validatorEditProfile.enableValidation();
//валидаций карт
const validatorAddCard = new FormValidate(validationConfig,formElement);
validatorAddCard.enableValidation();
