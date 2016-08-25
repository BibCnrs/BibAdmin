import generatePassword from './generatePassword';

export default function (app) {
    app.service('generatePassword', generatePassword);
}
