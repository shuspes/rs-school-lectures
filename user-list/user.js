class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getHTML() {
    return `<span>${this.firstName} ${this.lastName}</span>`;
  }
}