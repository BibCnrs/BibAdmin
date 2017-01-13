import bibPassword from './bibPassword';
import bibImage from './bibImage';
import bibExportToCsv from './bibExportToCsv';

export default function (app) {
    app.directive('bibPassword', bibPassword);
    app.directive('bibImage', bibImage);
    app.directive('bibExportToCsv', bibExportToCsv);
}
