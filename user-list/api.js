function getUsers() {
  return fetch('https://randomuser.me/api/?results=100&inc=login,name,email')
    .then(data => data.json())
    .then(users => users.results.map(user => normalizeUser(user)));
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
  get: getUsers
}