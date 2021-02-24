({
	drawChart: function(component, type, labels, datasets){
        console.log('drawChart::::');
         new Chart(document.getElementById("pie-chart"), {
            type: type,
            data: {
                labels: labels,
                datasets: datasets 
            },
            options: {
                title: {
                    display: false,
                    text: 'Total Progress by Months'
                }
            }
        });
        
    }
})