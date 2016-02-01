import 'whatwg-fetch';

window.login = function login(e) {
    if (e) {
        e.prevenDefault();
    }

    fetch(`${__HOST__}/login`, {
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
            window.location.href = "./unauthorized.html";
        }
        return response.json();
    })
    .then(function (response) {
        window.sessionStorage.setItem('token', response.token);
        window.location.href = "./index.html";
    });

    return false;
}
