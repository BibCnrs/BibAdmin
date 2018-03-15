const bibRevueLinks = (proxifyUrl) => {
    return {
        restrict: 'E',
        template: (
`<div class="row">
    <ma-reference-many-field
        entry="entry"
        field="field"
        value="value"
        datastore="datastore"
    ></ma-reference-many-field>
    <p>Liens </p>
    <ul>
        <li ng-repeat="id in value">
            <a href="{{proxifyUrl(gateById[id], entry.values.url)}}" target="_blank">
                Lien via ezproxy : {{gateById[id]}}
            </a>
        </li>
    </ul>
</div>`
        ),
        link: (scope) => {
            scope.proxifyUrl = proxifyUrl;
            scope.gateById = scope.datastore
                .getEntries(scope.field.targetEntity().uniqueId + '_choices')
                .reduce(
                    (acc, { values: { id, gate } }) => ({ ...acc, [id]: gate }),
                    {}
                );
        }
    };
};

bibRevueLinks.$inject = ['proxifyUrl'];

export default bibRevueLinks;
