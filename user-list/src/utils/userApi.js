function normalizeUser(obj) {
  return {
    id: obj.login.uuid,
    firstName: obj.name.first,
    lastName: obj.name.last,
    email: obj.email,
  };
}

function get() {
  return fetch('https://randomuser.me/api/?results=10&inc=login,name,email')
    .then(data => data.json())
    .then((users) => {
      const usersNormalized = users.results.map(user => normalizeUser(user));
      localStorage.setItem('users', JSON.stringify(usersNormalized));
      return usersNormalized;
    });
}

function getById(id) {
  return Promise.resolve().then(() => {
    const userList = JSON.parse(localStorage.getItem('users'));
    return userList.find(user => user.id === id);
  });
}

export default {
  get,
  getById,
};
