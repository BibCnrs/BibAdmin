import bibPassword from './bibPassword';
import bibImage from './bibImage';
import bibRevueLinks from './bibRevueLinks';

export default function (app) {
    app.directive('bibPassword', bibPassword);
    app.directive('bibImage', bibImage);
    app.directive('bibRevueLinks', bibRevueLinks);
}
