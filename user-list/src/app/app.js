export default class App {
  constructor(api, ListClass, UserClass, DetailsClass, observable) {
    this.api = api;
    this.list = new ListClass('.js-user-list', observable);
    this.details = new DetailsClass(api, observable, '.js-user-detail-container');
    this.UserClass = UserClass;
    this.observable = observable;
  }

  // eslint-disable-next-line class-methods-use-this
  createLayout() {
    const layout = `<div class='css-user-list js-user-list'></div>
      <div class='css-user-detail-container js-user-detail-container'></div>`;
    document.getElementById('app').innerHTML = layout;
  }

  getUsers() {
    return this.api.get();
  }

  createUserList() {
    return this.getUsers()
      .then(users => users.map(user => this.createUserClass(user)))
      .then(users => this.list.setElements(users));
  }

  createUserClass(user) {
    return new this.UserClass(this.observable, user.id, user.firstName, user.lastName, user.email);
  }

  init() {
    this.createLayout();
    this.createUserList()
      .then(() => this.list.render());
  }
}
