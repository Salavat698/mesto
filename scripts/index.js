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

function openPopup(popup){
  popup.classList.add('popup_active');
};

function closePopup(popup){
  popup.classList.remove('popup_active');
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
});
popupCloseCards.addEventListener('click',function(){
  closePopup(popupAddCards);
});
formElement.addEventListener('submit', formSubmitHandler);
profileEditBtn.addEventListener('click', addPopup);
popupCloseProfile.addEventListener('click', function(e){
  closePopup(popupEditProfile);
});