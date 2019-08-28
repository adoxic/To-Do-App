import AuthApp from './components/AuthApp.js';

const root = document.getElementById('root');
const app = new AuthApp();

const dom = app.renderDOM();

root.appendChild(dom);