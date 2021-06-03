export{
    popupEditProfile,
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
}
const profileConfig ={name:'.profile__name', about:'.profile__work',avatar:'.profile__avatar'}
const nameInput = document.querySelector('#name-input');
const workInput =  document.querySelector('#work-input');

const profileEditBtn = document.querySelector('.profile__edit-btn');//кнопка редаетирование
const popupEditProfile = document.querySelector('.popup_profile');//сам блок попап
const formElement = document.querySelector('.popup__container_profile'); // Воспользуйтесь методом querySelector()
const profileAddBtn = document.querySelector('.profile__add-btn');// переменная кнопки добавить фото-карточки
const formElementCards = document.querySelector('.popup__container_cards'); //сама форма попап
const inputName = document.querySelector('.popup__input-description');
const inputDescription = document.querySelector('.popup__input-images');
const  validationConfig= {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input--error'
};