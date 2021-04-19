const profileEditBtn = document.querySelector('.profile__edit-btn');//кнопка редаетирование
const popupEditProfile = document.querySelector('.popup_profile');//сам блок попап
const popupCloseProfile = document.querySelector('.popup__close_profile');//крестик на попап закрытие
const formElement = document.querySelector('.popup__container_profile'); // Воспользуйтесь методом querySelector()
const nameInput = popupEditProfile.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
const workInput =  popupEditProfile.querySelector('#work-input');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');// создал переменную для тега с классом profile__name
const profileWork = document.querySelector('.profile__work');// создал переменную для тега с классомprofile__work
const popupClosePreview = document.querySelector('.popup__close_preview');
const popupPreviewBox = document.querySelector('.popup_preview');
const profileAddBtn = document.querySelector('.profile__add-btn');// переменная кнопки добавить фото-карточки
const popupAddCards = document.querySelector('.popup_add-cards');//сам блок попап открыть
const popupCloseCards =  document.querySelector('.popup__close-cards');//сам блок попап закрыть по крестику
const popupSaveBtnCards = document.querySelector('.popup__save-btn-cards');//кнопка создать попап
const formElementCards = document.querySelector('.popup__container_cards'); //сама форма попап
const cardsContainer = document.querySelector('.element'); //контейнер где будут лежат все карточки
const cardTemplate = document.querySelector('#card-template').content;// беру сам темплейт 
const vConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

const popupProfile = document.querySelector('.popup_profile');
//закрытие оверлей
const allPopaps = document.querySelectorAll('.popup')

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
function enableEscListener() {
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
// очищение формы при открытие
const resetFormState = (formElement, vConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(vConfig.inputSelector));
  inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, vConfig);
  })
  
  // ОБРАТИТЕ ВНИМАНИЕ !!!
  //ВЫ указали --> (из комментарий) "тут еще нужно деактивировать кнопку сабмита"
  //Что я и сделал ,но потом заметил ошибку по 3 попап !
  //Если указать деактивирование  в resetFormState то он на вход берет 3 попапа.
  // и так как у нас нету элемента button в preview(это 3 попап) то он не сможет его отработать!
  // и нашел решение в 188 строке ! P.S Очень надеюсь Вас он удовлетворить =)...


  //САМ КОД (который оказался не валидный) : 
  // const activeBtnPopup = formElement.querySelector(".popup__save-btn");
  // activeBtnPopup.classList.add(vConfig.inactiveButtonClass);
  // activeBtnPopup.disabled = true;
}



function openPopup(popup){
  popup.classList.add('popup_active');
  resetFormState(popup,vConfig)
  enableEscListener()

};
function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keyup', handleEscListener);
};


function addPopup(){
    nameInput.value = profileName.textContent;
    workInput.value = profileWork.textContent;
    openPopup(popupEditProfile);
    
}


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileWork.textContent = workInput.value; 
    closePopup(popupEditProfile);
}

//ОБРАБОТКА ПОПАП ФОТО-КАРТ
//массив добавляем в контейнер
initialCards.forEach(function (initialCard) {
  const cardElement = createCard(initialCard);
  cardsContainer.append(cardElement);
});

//все функций

//переключатель для лайка
function toggleLike(likeElement) {
  likeElement.classList.toggle("element__like_active");
}

// удаление элмента (целая карточка)
function deletBacket (deletElement){
  deletElement.remove();
}

//создание карточек,клонирование,наполняем содержимое в ней же делаю функций замыкания для лайка,удаление,вызов привью
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".element__image").src = cardData.link;
  cardElement.querySelector('.element__image').alt = cardData.name;
  cardElement.querySelector(".element__place-travel").textContent = cardData.name;

  //функция замыкания лайки
  const elementLike = cardElement.querySelector(".element__like");
  elementLike.addEventListener("click", function () {
    toggleLike(elementLike);
  });
  //функция замыкания удаление
  const itemElementCard = cardElement.querySelector('.directors__item');
  const basketIconDelet = cardElement.querySelector('.element__backet');
  basketIconDelet.addEventListener("click", () => deletBacket(itemElementCard));

  //функция привью
  const previewImg = cardElement.querySelector('.element__image')
  //открываю закрываю привью
  
  previewImg.addEventListener('click',function(){
    openPopup(popupPreviewBox);
    // присваеваю значение из карточек для привью
    const previewImgPopup = document.querySelector('.preview__img');
    previewImgPopup.src = previewImg.src;
    previewImgPopup.alt = document.querySelector(".element__place-travel").textContent;
    const previewSignature = document.querySelector('.preview__signature');
    previewSignature.textContent = document.querySelector(".element__place-travel").textContent;
});
  return cardElement;//возращает одну карту с набором функций
}


//ДОБАВЛЕНИЕ КАРТОЧКИ в основной контейнер
function formSubmitCards(evt) {
  evt.preventDefault();
  const inputName = document.querySelector('.popup__input-description');
  const inputDescription = document.querySelector('.popup__input-images');
  const cardElement = createCard({ name: inputName.value, link: inputDescription.value });
  
  cardsContainer.prepend(cardElement);
  formElementCards.reset();
  
  closePopup(popupAddCards);

}

//обработчики событий
popupClosePreview.addEventListener('click',function(){
  closePopup(popupPreviewBox);
});
formElementCards.addEventListener('submit',formSubmitCards);

profileAddBtn.addEventListener('click',function(){
  openPopup(popupAddCards);

  // Проверяю состояние кнопки с вызовом функций toggleButtonState 
  const button = popupAddCards.querySelector(vConfig.submitButtonSelector);
  const inputs = Array.from(popupAddCards.querySelectorAll(vConfig.inputSelector));
  toggleButtonState(button, vConfig, inputs);
});
popupCloseCards.addEventListener('click',function(){
  closePopup(popupAddCards); 
});
formElement.addEventListener('submit', formSubmitHandler);
profileEditBtn.addEventListener('click', addPopup);
popupCloseProfile.addEventListener('click', function(e){
  closePopup(popupEditProfile);
});


