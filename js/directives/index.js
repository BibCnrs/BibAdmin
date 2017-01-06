import bibPassword from './bibPassword';
import bibImage from './bibImage';

export default function (app) {
    app.directive('bibPassword', bibPassword);
    app.directive('bibImage', bibImage);
}
