function getUsers() {
  return fetch('https://randomuser.me/api/?results=10&inc=login,name,email')
    .then(data => data.json())
    .then(users => {
      const usersNormalized = users.results.map(user => normalizeUser(user));
      localStorage.setItem('users', JSON.stringify(usersNormalized));
      return usersNormalized;
    });
}

function getUserById(id) {
  return Promise.resolve().then(() => {
    const userList = JSON.parse(localStorage.getItem('users'));
    return userList.find(user => user.id === id);
  });
}

function getStubUsers() {
  const users = [
    {
      id: 'asd',
      firstName: 'a',
      lastName: 'b',
      email: 'f'
    }
  ]
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(users);
    }, 10000);
  });
}

function normalizeUser(obj) {
  return {
    id: obj.login.uuid,
    firstName: obj.name.first,
    lastName: obj.name.last,
    email: obj.email
  }
}

const api = {
  get: getUsers,
  getUserById
}