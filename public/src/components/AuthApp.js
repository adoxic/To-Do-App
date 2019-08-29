import Component from '../Component.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import { signUp as userSignUp, signIn as userSignIn } from '../services/list-api.js';

import store from '../services/store.js';

function success(user) {
    console.log('success', user.token);
    store.setToken(user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './index.html';
}

class AuthApp extends Component {
    onRender(dom) {
        const errors = dom.querySelector('.errors');
        const main = dom.querySelector('main');

        const signUp = new SignUp({
            onSignUp: newUser => {
                errors.textContent = '';
                console.log('new user', newUser);

                return userSignUp(newUser)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        console.log(err);
                        errors.textContent = err;
                    });
            }
        });
        
        main.appendChild(signUp.renderDOM());
        
        const signIn = new SignIn({
            onSignIn: credentials => {
                errors.textContent = '';

                return userSignIn(credentials)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });

        main.appendChild(signIn.renderDOM());

    }
    renderHTML() {
        return /*html*/ `
        <div>
            <main>
                <p class="errors"></p>
            <main>
        </div>
        `;
    }
}

export default AuthApp;

