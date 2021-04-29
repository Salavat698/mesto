import {enableEscListener} from './index.js';

export  function openPopup(popup){
    popup.classList.add('popup_active');
    enableEscListener()
  };