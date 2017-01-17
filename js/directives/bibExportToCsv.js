import omit from 'lodash.omit';

export default function maExportToCsvButton ($stateParams, Papa, notification, AdminDescription, entryFormatter, ReadQueries) {
    return {
        restrict: 'E',
        scope: {
            entity: '&',
            label: '@',
            datastore: '&'
        },
        link: (scope) => {
            scope.label = scope.label || 'EXPORT';
            scope.downloading = false;
            scope.datastore = scope.datastore();
            scope.entity = scope.entity();
            const exportView = scope.entity.exportView();
            const listView = scope.entity.listView();
            if (exportView.fields().length === 0) {
                let exportFields = listView.exportFields();
                if (exportFields === null) {
                    exportFields = listView.fields();
                }
                exportView.fields(exportFields);
                exportView.filters(listView.filters());
                exportView.name(listView.name()); // to enable reuse of sortField
            }
            scope.has_export = exportView.fields().length > 0;

            scope.exportToCsv = function () {
                let rawEntries;
                scope.downloading = true;

                ReadQueries.getAll(exportView, -1, $stateParams.search, $stateParams.sortField, $stateParams.sortDir)
                    .then(response => {
                        rawEntries = response.data;
                        return rawEntries;
                    })
                    .then(function (entries) {
                        const results = [];
                        for (var i = entries.length - 1; i >= 0; i--) {
                            results[i] = omit(entries[i].plain(), 'totalcount');
                        }
                        const csv = Papa.unparse(results, listView.exportOptions());

                        const blobName = `${scope.entity.name()}.csv`;

                        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // Manage IE11+ & Edge
                            const blob = new Blob([csv], { type: 'text/csv' });
                            scope.downloading = false;
                            return window.navigator.msSaveOrOpenBlob(blob, blobName);
                        }

                        const fakeLink = document.createElement('a');
                        document.body.appendChild(fakeLink);

                        const windowUrl = window.URL || window.webkitURL;
                        if (windowUrl && typeof windowUrl.createObjectURL === 'function') {
                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = windowUrl.createObjectURL(blob);
                            fakeLink.setAttribute('href', url);
                            fakeLink.setAttribute('download', blobName);
                            scope.downloading = false;
                            fakeLink.click();
                            windowUrl.revokeObjectURL(url);
                            return;
                        }

                        fakeLink.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(csv));
                        fakeLink.setAttribute('download', blobName);
                        scope.downloading = false;
                        fakeLink.click();
                    }, function (error) {
                        notification.log(error.message, {addnCls: 'humane-flatty-error'});
                        scope.downloading = false;
                    });
            };
        },
        template:
`<span ng-if="has_export">
    <a class="btn btn-default" ng-click="exportToCsv()">
        <span ng-if="!downloading" class="glyphicon glyphicon-download" aria-hidden="true"></span>
        <span ng-if="downloading" class="glyphicon glyphicon-repeat normal-right-spinner" aria-hidden="true"></span>
        &nbsp;<span class="hidden-xs" translate="{{ ::label }}"></span>
    </a>
</span>`
    };
}

maExportToCsvButton.$inject = ['$stateParams', 'Papa', 'notification', 'AdminDescription', 'EntryFormatter', 'ReadQueries'];
