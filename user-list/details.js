class Details {
  constructor(api, observable, selector) {
    this.api = api;
    this.selector = selector;
    this.user = {};
    this.observable = observable;

    observable.on('User:open', this.openUser.bind(this));
  }

  openUser(id) {
    this.api.getUserById(id)
      .then(user => {
        this.user = user;
        this.render();
      });
  }

  closeDetails() {
    this.user = {};
    document.querySelector(this.selector).innerHTML = '';
    this.observable.trigger('User:close');
  }

  render() {
    const container = document.querySelector(this.selector);
    const content = `<div class='css-user-detail'><p class='js-user-detail-close'>X</p><p>${this.user.firstName}</p><p>${this.user.email}</p></div>`;
    container.innerHTML = content;

    container.querySelector('.js-user-detail-close').addEventListener('click', this.closeDetails.bind(this));
  }
}