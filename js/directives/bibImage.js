const bibImage = (readImageAsDataUrl) => {
    return {
        restrict: 'E',
        template: (
`<div class="row">
    <div class="col-md-2">
        <a class="btn btn-default" ng-click="selectFile()">
            <span translate="BROWSE"></span>
        </a>
    </div>
    <div class="col-md-2" ng-if="entry.values[field.name()]">
        <img src="{{entry.values[field.name()]}}" />
    </div>
    <input
        type="file"
        accept="image/*"
        style="display:none"
    />
</div>`
        ),
        link: function (scope, element) {
            const input = element.find('input')[0];
            scope.selectFile = function () {
                input.click();
            };
            element.bind('change', function (changeEvent) {
                readImageAsDataUrl(changeEvent.target.files[0])
                .then(result => {
                    scope.entry.values[scope.field.name()] = result;
                    scope.$digest();
                });
            });
        }
    };
};

bibImage.$inject = ['readImageAsDataUrl'];

export default bibImage;
