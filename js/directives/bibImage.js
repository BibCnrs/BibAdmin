const bibImage = (readImageAsDataUrl) => {
    return {
        restrict: 'E',
        template: (
`<div class="image-input">
    <div class="">
        <input
            type="file"
            accept="image/*"
        />
    </div>
    <div ng-if="entry.values[field.name()]">
        <img src="{{entry.values[field.name()]}}" />
    </div>
</div>`
        ),
        link: function ($scope, $element) {
            $element.bind('change', function (changeEvent) {
                readImageAsDataUrl(changeEvent.target.files[0])
                .then(result => {
                    $scope.entry.values[$scope.field.name()] = result;
                    $scope.$digest();
                });
            });
        }
    };
};

bibImage.$inject = ['readImageAsDataUrl'];

export default bibImage;
