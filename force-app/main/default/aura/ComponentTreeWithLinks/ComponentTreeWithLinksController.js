({
	init: function (cmp) {
        var items = [{
            "label": "Goto Nested Tree",
            "name": "1",
            "href": "#c:TreeComponent"
        }, {
            "label": "Goto Tree with onselect",
            "name": "2",
            "href": "#c:TreeComponentWithOnselectHandler"
        }, {
            "label": "Goto Deeply Nested Tree",
            "name": "3",
            "href": "#c:DeeplyNestedTree"
        }, {
            "label": "Goto Tree with links",
            "name": "3",
            "href": "#ramsoftsquare:exampleTreeNavigation"
        }];
        cmp.set('v.items', items);
    }
})