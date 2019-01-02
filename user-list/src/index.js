import Observable from './utils/observable';
import api from './utils/userApi';

import App from './app';
import List from './list';
import User from './user';
import Details from './details';

const appContainer = document.createElement('div');
appContainer.id = 'app';
document.querySelector('body').appendChild(appContainer);

const observable = new Observable();
const app = new App(api, List, User, Details, observable);
app.init();
