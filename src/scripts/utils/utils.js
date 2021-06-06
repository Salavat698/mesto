


//слушатель на документ 
function enableEscListener() {
    document.addEventListener('keyup', handleEscListener);
  };
// определяем что это нужное событие
function handleEscListener (e) {
  e.preventDefault();
  isEscEvt(e, closePopup);
  
}
// открыть попап
function openPopup(popup){
    popup.classList.add('popup_active');
    enableEscListener()
 };
//закрытие по ESC
 function isEscEvt(e, action) {
  if (e.key === 'Escape') {
  const popupActiv = document.querySelector('.popup_active');
  action(popupActiv);
  const formElementCards = document.querySelector('.popup__container_cards'); //сама форма попап
  formElementCards.reset();
  }
}
//закрытие попап
function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keyup', handleEscListener);
};

// закрывает по оверулей клик
const popups = document.querySelectorAll('.popup')

function closeByOverlayClick(popups){
  popups.forEach(itemPopup =>{
    //закрываю по оверу
    itemPopup.addEventListener('click',(e)=>{
      if(e.target === e.currentTarget){
        closePopup(itemPopup)
      };
    });
  });
};
closeByOverlayClick(popups);