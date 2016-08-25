const bibPassword = (generatePassword) => {
    return {
        restrict: 'E',
        templateUrl: '/js/directives/templates/bibPassword.html',
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
