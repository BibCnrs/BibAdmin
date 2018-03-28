import bibPassword from './bibPassword';
import bibImage from './bibImage';
import bibRevueLinks from './bibRevueLinks';
import bibExportToCsv from './bibExportToCsv';

export default function (app) {
    app.directive('bibPassword', bibPassword);
    app.directive('bibImage', bibImage);
    app.directive('bibRevueLinks', bibRevueLinks);
    app.directive('bibExportToCsv', bibExportToCsv);
}
