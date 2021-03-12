let profileEditBtn = document.querySelector('.profile__edit-btn');//кнопка редаетирование
let popup = document.querySelector('.popup');//сам блок попап
let popupClose = document.querySelector('.popup__close');//крестик на попап закрытие
// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = popup.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
let workInput =  popup.querySelector('#work-input');// Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');// создал переменную для тега с классом profile__name
let profileWork = document.querySelector('.profile__work');// создал переменную для тега с классомprofile__work

function addPopup(){
    nameInput.value = profileName.textContent;
    workInput.value = profileWork.textContent;
    popup.classList.add('popup_active');
}

function closePopup(){
    popup.classList.remove('popup_active');
    
}
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;// передаю значение с полей nameInput для profileName
    profileWork.textContent = workInput.value; // передаю значение с полей nameInput для profileName
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
profileEditBtn.addEventListener('click', addPopup); // принажатие на кнопку редактирование добавляю класс popup_active для popup
popupClose.addEventListener('click', closePopup);  // принажатие на кнопку закрытие удаляю класс popup_active из popup