({
    loadedChartjs : function(component, event, helper) {
        console.log('loadedChartjs:::::');
        var datasets = [{
                    backgroundColor: 'green',
                    label: 'Team A',
                    data: [100, 20, 30, 400]
                }, {
                    backgroundColor: 'red',
                    label: 'Team B',
                    data: [300, 53, 500, 500]
                }];
        var labels = ['January', 'February', 'March', 'April'];
        var type = 'bar';
        helper.drawChart(component, type, labels, datasets);
        
    },
    
    
    
    handleClick: function(component, event, helper){
        console.log('handleClick:::::', event.getSource().get("v.value"));
        var type = event.getSource().get("v.value");
         var datasets = [{
                    backgroundColor: 'green',
                    label: 'Team A',
                    data: [100, 20, 30, 400]
                }, {
                    backgroundColor: 'red',
                    label: 'Team B',
                    data: [300, 53, 500, 500]
                }];
        var labels = ['January', 'February', 'March', 'April'];
        helper.drawChart(component, type, labels, datasets);
    }
    
})