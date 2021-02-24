({
    init: function (cmp) {
        //console.log('TreeComponentController::items', JSON.parse(JSON.stringify(cmp.get("v.items"))));
        var items = [{
            "label": "Western Sales Director",
            "name": "1",
            "expanded": true,
            "items": [{
                "label": "Western Sales Manager",
                "name": "2",
                "metatext": "TamilSelvan",
                "expanded": true,
                "items" :[{
                    "label": "CA Sales Rep",
                    "metatext": "Harish",
                    "name": "3",
                    "expanded": true,
                    "items" :[
                        {"label": "Laptop",
                         "name": "laptop",
                         "expanded": true
                        },
                        {"label": "Desktop",
                         "name": "desktop",
                         "expanded": true
                        },
                        {"label": "Tab",
                         "name": "tab",
                         "expanded": true
                        }
                    ]
                }, {
                    "label": "OR Sales Rep",
                    "name": "4",
                    "metatext": "Joshep",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }]
            }]
        }, {
            "label": "Eastern Sales Director",
            "name": "5",
            "expanded": true,
            "items": [{
                "label": "Easter Sales Manager",
                "name": "6",
                "expanded": true,
                "items" :[{
                    "label": "NY Sales Rep",
                    "name": "7",
                    "metatext": "Aadhavan",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }, {
                    "label": "MA Sales Rep",
                    "name": "8",
                    "metatext": "Rakesh",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }]
            }]
        }, {
            "label": "International Sales Director",
            "name": "9",
            "metatext": "Naveen",
            "expanded": true,
            "items": [{
                "label": "Asia Sales Manager",
                "name": "10",
                "expanded": true,
                "items" :[{
                    "label": "Sales Rep1",
                    "name": "11",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }, {
                    "label": "Sales Rep2",
                    "name": "12",
                    "metatext": "Prakash",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }]
            }, {
                "label": "Europe Sales Manager",
                "name": "13",
                "metatext": "Vivek",
                "expanded": false,
                "items" :[{
                    "label": "Sales Rep1",
                    "name": "14",
                    "metatext": "Manikandan",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }, {
                    "label": "Sales Rep2",
                    "name": "15",
                    "metatext": "Gobal",
                    "expanded": true,
                    "items" :[{"label": "Laptop",
                               "name": "laptop",
                               "expanded": true
                              },
                              {"label": "Desktop",
                               "name": "desktop",
                               "expanded": true
                              },
                              {"label": "Tab",
                               "name": "tab",
                               "expanded": true
                              }]
                }]
            }]
        }];
        if(cmp.get("v.items") == null){
        	cmp.set('v.items', items);
        }
        
    },
    selectNested: function(cmp, event, helper){
        
        var rootItem = cmp.get('v.items');
        console.log('rootItem', rootItem[event.target.id]);
        console.log('selectedItem', event.target.id);
        cmp.set("v.items", rootItem[event.target.id].items);
        //cmp.set("v.showNestedItem", true);
        
    },
    pushItems: function(cmp, event, helper){
        cmp.set("v.items", cmp.get('v.items') );
    }
})