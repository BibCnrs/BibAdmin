import 'babel-polyfill';
import 'whatwg-fetch';

window.login = function login(event) {
    if (event) {
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    }

    fetch(`${__BIBAPI_HOST__}login`, {
        mode: 'cors',
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        })
    }).then(function(response) {
        if (response.status === 401) {
            window.location.href = `${__BIBADMIN_HOST__}/unauthorized.html`;
        }
        return response.json();
    })
    .then(function (response) {
        window.sessionStorage.setItem('token', response.token);
        window.location.href = `${__BIBADMIN_HOST__}/index.html`;
    });

    return false;
};
