export default class List {
  constructor(selector, observable) {
    this.selector = selector;
    this.activeEl = null;
    this.elements = [];
    this.observable = observable;

    observable.on('User:close', this.activate.bind(this, null));
    observable.on('User:open', this.activate.bind(this));
  }

  setElements(elements) {
    this.elements = elements;
  }

  // eslint-disable-next-line class-methods-use-this
  getListElement(element) {
    const listElement = document.createElement('li');
    const user = element.getElement();
    listElement.className = `css-list-element js-list-element ${element.id}`;
    listElement.appendChild(user);
    return listElement;
  }

  getList() {
    const list = document.createElement('ul');
    const listElements = this.elements.map(element => this.getListElement(element));
    list.className = 'css-list';
    listElements.forEach(element => list.appendChild(element));
    return list;
  }

  // eslint-disable-next-line class-methods-use-this
  toggleActiveClass(id) {
    if (id) document.getElementsByClassName(`js-list-element ${id}`)[0].classList.toggle('active');
  }

  activate(id) {
    this.toggleActiveClass(this.activeEl);
    this.activeEl = id;
    this.toggleActiveClass(id);
  }

  render() {
    const list = this.getList();
    document.querySelector(this.selector).appendChild(list);
  }
}
