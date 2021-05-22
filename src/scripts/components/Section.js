export default class Section {
    //передаем массив карточек, функцию, и селектор секци
    constructor({data, rendererItem}, containerSelector) {
      this.data = data;
      this.rendererItem = rendererItem
      this.container = document.querySelector(containerSelector);
    }
  // метод обходит карточки и вызывает метод добавления в разметку
    renderer() {
      this.data.reverse().forEach( data => {
        this.addItem(this.rendererItem(data))
      });
    }
  
    addItem(element) {
      this.container.prepend(element);
    }
  }