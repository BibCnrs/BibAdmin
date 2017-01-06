import generatePassword from './generatePassword';
import readImageAsDataUrl from './readImageAsDataUrl';

export default function (app) {
    app.service('generatePassword', generatePassword);
    app.service('readImageAsDataUrl', readImageAsDataUrl);
}
