class List {
  constructor(selector) {
    this.selector = selector;
    this.activeEl = null;
    this.elements = [];
  }

  setElements(elements) {
    this.elements = elements;
  }

  getElementHTML(element) {
    return `<li data-id='${element.id}' class='css-list-element js-list-element ${element.id}'>${element.getHTML()}</li>`;
  }

  getListHTML() {
    return `<ul class='css-list'>${this.elements.map(element => this.getElementHTML(element)).join('')}</ul>`;
  }

  toggleActiveClass(id) {
    if(id) document.getElementsByClassName(`js-list-element ${id}`)[0].classList.toggle('active');
  }

  activate(id) {
    this.toggleActiveClass(this.activeEl);
    this.activeEl = id;
    this.toggleActiveClass(id);
  }

  handleClickElement(event) {
    const id = event.currentTarget.dataset.id;
    this.activate(id);
  }

  setHandleEvent() {
    [].forEach.call(document.getElementsByClassName('js-list-element'), element => {
      element.addEventListener('click', this.handleClickElement.bind(this));
    });
  }

  render() {
    document.querySelector(this.selector).innerHTML = this.getListHTML();
    this.setHandleEvent();
  }
}