class App {
  constructor(api, listClass, userClass) {
    this.api = api;
    this.list = new listClass('.js-user-list');
    this.userClass = userClass;
  }

  createLayout() {
    const layout = `<div class='css-user-list js-user-list'></div><div class='css-user-detail'></div>`;
    document.getElementById('app').innerHTML = layout;

  }

  getUsers() {
    return this.api.get();
  }

  createUserList() {
    return this.getUsers()
      .then(users => users.map(user => new this.userClass(user.id, user.firstName, user.lastName, user.email)))
      .then(users => this.list.setElements(users));
  }

  init() {
    this.createLayout();
    this.createUserList()
      .then(() => this.list.render());
  }
}

const app = new App(api, List, User);
app.init();