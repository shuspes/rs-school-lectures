class User {
  constructor(observable, id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.observable = observable;
  }

  handleUser() {
    this.observable.trigger('User:open', this.id);    
  }

  createElement() {
    let user = document.createElement("span");
    user.innerHTML = `${this.firstName} ${this.lastName}`;
    user.addEventListener('click', this.handleUser.bind(this));
    return user;
  }

  getElement() {
    return this.createElement();
  }
}