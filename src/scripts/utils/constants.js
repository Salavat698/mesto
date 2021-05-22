export{profileEditBtn,
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
    validationConfig,
}


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
const popupPreviewBox = document.querySelector('.popup_preview');
const inputName = document.querySelector('.popup__input-description');
const inputDescription = document.querySelector('.popup__input-images');
const elementImagePrewiev = document.querySelector('.element__image');
const  validationConfig= {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input--error'
};