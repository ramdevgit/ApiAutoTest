import { LightningElement, track} from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCovidStatistics from '@salesforce/apex/CovidController.getCovidStatistics';
import {getValueFromObject} from 'c/utils';


export default class ChartExample extends LightningElement {

    @track isChartJsInitialized;
    chart;
    countryData;

    @track stateOptions;

    
    
    handleChange(event) {
        
        console.log('handleChange:::', event.detail.name, event.detail.value);
        this.getStateGenrateChart(event.detail.value);
        
    }

    getStateGenrateChart(state){

        console.log('getStateGenrateChart::', state);
        let covideKeys = Object.keys(this.countryData);
        let covidDataList = Object.values(this.countryData);
        console.log('keys:',covideKeys, 'values::', covidDataList);
       
        console.log('covie19:success::out:', getValueFromObject(this.countryData, state));
        var stateData = getValueFromObject(this.countryData,  state);
        stateData = stateData.districtData;
        console.log('state::districts::', Object.keys(stateData));
        let coviddatas = [];
        
        for (let key in stateData) { 
        
            if (stateData.hasOwnProperty(key)) {

                let data = stateData[key]; 
                coviddatas.push(getValueFromObject(data, 'active'));
                console.log('inside:push::', key, data, getValueFromObject(data, 'active')); 
           } 
       } 
       
       this.generateChart(Object.keys(stateData), coviddatas);
       
    } 
  
    generateChart(labels, datas){
        console.log('succcusss:drawChart:', labels, 'datas::',datas);
      
            var barChartData = {
                //labels: ["Jan","Feb","March","April","May","Jun","July","August","Sep","Oct","Nov","Dec"],
                labels: labels,
                datasets: [
    
                {   
                    label: "Credit",
                    backgroundColor: "#6B8A70",
                    borderWidth: 1,
                    data: [10,40,50,50,70,90,50,100,20,30,70,80]
                  },
                  {
                    label: "Debit",
                    backgroundColor: "#F5A623",
                    borderWidth: 1,
                    data: [20.30,20.30,20.30,60.30,70.30,20.30,20.30,90.30,20.30,40.30,30.30,20.30]
                  },
                ]
              };
              let covidChartData =  {
                //labels: ["Jan","Feb","March","April","May","Jun","July","August","Sep"],
                labels: labels,
                datasets : [
                    {
                        label: "Covid 19 Positive Cases",
                        backgroundColor: "#F5A623",
                        borderWidth: 1,
                        data: datas
                      }
                ]
               
            };
    
              var dataSet = {
                type: "bar",
                data: covidChartData,
                options: {
                  legend:{
                    display:true,
                    position:"top",
                    labels: {
                      boxWidth:20
                  }
    
                  },tooltips:{enabled:true},
                  cutoutPercentage: 75,
                  responsive: true,
                  title: {
                    display: true,
                   // text: "DPD Assessment"
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                        suggestedMax: 90
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Covid 19 based on months'
                      }
                    }],
                    xAxes: [{
    
                        barPercentage: 0.5,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
    
                    }]
                  },
                //onClick: graphClickEvent
                }
              };

              
              window.Chart.platform.disableCSSInjection = true;

              //this.template.querySelector('div.chart').removeChild();
              const canvas = document.createElement('canvas');
              this.template.querySelector('div.chart').appendChild(canvas);
              const ctx = canvas.getContext('2d');
              this.chart = new window.Chart(ctx, dataSet);

              //const ctx = this.template.querySelector("canvas.chart").getContext("2d");
              //const ctx = document.getElementById("chart");
              console.log('before::this.chart:::');
              //this.chart = new window.Chart(ctx, dataSet);
              //this.chart = new window.Chart(ctx, dataSet);
              console.log('after::this.chart:::');
    }

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs + '/Chart.js')
        ]).then(() => {
            console.log('succcusss::');
            getCovidStatistics({})
            .then((result) =>{
                this.countryData = JSON.parse(result);
                let options = [];
                Object.keys(this.countryData).forEach(key =>{
                    console.log('key::', key);
                    options.push({'label': key, 'value': key});
                });
                
                this.stateOptions = options;
            }).catch(error =>{
                    console.log('covid19::error', error.message);
            });
           
        }).catch(error => {

            console.log('catch::error:::::', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}