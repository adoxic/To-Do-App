import SubmitApp from './components/SubmitApp.js';

const root = document.getElementById('root');
const submitApp = new SubmitApp();

const dom = submitApp.renderDOM();

root.appendChild(dom);