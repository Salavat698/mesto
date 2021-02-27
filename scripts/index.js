let profileEditBtn = document.querySelector('section.profile button.profile__edit-btn');
let popup = document.querySelector('section.popup');
let popupClose = document.querySelector('section.popup button.popup__close')

profileEditBtn.onclick = function(){
    popup.style.display="flex";
}
popupClose.onclick = function(){
    popup.style.display="none";
}

window.onclick = function(event){
    if(event.target == popup){
        popup.style.display="none"; // ФУНКЦИЯ ЗАКРЫТИЯ POPUP ВНЕ ЕГО РАМКИ
    }
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name'); // Воспользуйтесь инструментом .querySelector()
let workInput =  document.querySelector('.popup__work');// Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');// создал переменную для тега с классом profile__name
let profileWork = document.querySelector('.profile__work');// создал переменную для тега с классомprofile__work

let popupSaveBtn = document.querySelector('.popup__save-btn');// создаю переменную для кнопки сохранить с классом popup__save-btn

popupSaveBtn.onclick = function(){
    popup.style.display="none";
}
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;// передаю значение с полей nameInput для profileName
    profileWork.textContent = workInput.value; // передаю значение с полей nameInput для profileName
    }



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);