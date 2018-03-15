import generatePassword from './generatePassword';
import readImageAsDataUrl from './readImageAsDataUrl';
import proxifyUrl from './proxifyUrl';

export default function (app) {
    app.service('generatePassword', generatePassword);
    app.service('readImageAsDataUrl', readImageAsDataUrl);
    app.service('proxifyUrl', proxifyUrl);
}
