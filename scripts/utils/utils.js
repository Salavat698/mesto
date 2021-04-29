export {enableEscListener,openPopup,handleEscListener,isEscEvt,closePopup}


//слушатель на документ 
function enableEscListener() {
    document.addEventListener('keyup', handleEscListener);
  };
// определяем что это нужное событие
function handleEscListener (e) {
  e.preventDefault();
  isEscEvt(e, closePopup);
}
function openPopup(popup){
    popup.classList.add('popup_active');
    enableEscListener()
 };

 function isEscEvt(e, action) {
  if (e.key === 'Escape') {
  const popupActiv = document.querySelector('.popup_active');
  action(popupActiv);
  }
}
function closePopup(popup){
  popup.classList.remove('popup_active');
  document.removeEventListener('keyup', handleEscListener);
};