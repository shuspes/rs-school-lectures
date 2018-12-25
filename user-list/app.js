class App {
  constructor(api, listClass, userClass, detailsClass, observable) {
    this.api = api;
    this.list = new listClass('.js-user-list', observable);
    this.details = new detailsClass(api, observable, '.js-user-detail-container');
    this.userClass = userClass;
    this.observable = observable;
  }

  createLayout() {
    const layout = `<div class='css-user-list js-user-list'></div><div class='css-user-detail-container js-user-detail-container'></div>`;
    document.getElementById('app').innerHTML = layout;

  }

  getUsers() {
    return this.api.get();
  }

  createUserList() {
    return this.getUsers()
      .then(users => users.map(user => new this.userClass(this.observable, user.id, user.firstName, user.lastName, user.email)))
      .then(users => this.list.setElements(users));
  }

  init() {
    this.createLayout();
    this.createUserList()
      .then(() => this.list.render());
  }
}

const observable = new Observable();
const app = new App(api, List, User, Details, observable);
app.init();