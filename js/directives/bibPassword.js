const bibPassword = (generatePassword) => {
    return {
        restrict: 'E',
        template: (
`<div class="input-group">
    <input
        id="{{ field.name() }}"
        name="{{ field.name() }}"
        class="{{ field.getCssClasses() }} form-control"
        placeholder="{{field.validation().minlength}} characters minimum"
        type="text"
        ng-model="entry.values[field.name()]"
        ng-required="field.validation().required"
        maxlength="{{ field.validation().maxlength }}"
        onClick="select()"
    >
    <span class="input-group-btn">
        <button class="btn btn-default" ng-click="generatePassword($event)">
            Generate
        </button>
    </span>
</div>`
        ),
        link: function ($scope, $element) {
            $scope.generatePassword = function ($event) {
                $event.preventDefault();
                const input = $element.find('input');
                input.val(generatePassword(10));
                input[0].select();
            };
        }
    };
};

bibPassword.$inject = ['generatePassword'];

export default bibPassword;
