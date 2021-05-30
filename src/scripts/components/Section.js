export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._itemsArr = items;
        this._renderer = renderer;
        this._containerSection = document.querySelector(containerSelector);
    }
    render() {
        this._itemsArr.reverse().forEach( item => this._renderer(item))
    }
    addItem(item) {
        this._containerSection.prepend(item);
    }
}
