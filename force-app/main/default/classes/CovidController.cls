public with sharing class CovidController {
    public CovidController() {

    }
    @AuraEnabled
    public static string getCovidStatistics(){

        List<CovidWrapper> covidWrapperList = new List<CovidWrapper>();
       
        HttpRequest req = new HttpRequest();
            
        req.setMethod('GET');
        req.setHeader('Content-Type','application/json');
        req.setEndpoint('https://api.covid19india.org/state_district_wise.json');    
               
        Http http = new Http();
        HTTPResponse res = http.send(req);
        CaseTimeSeries caseTime = new CaseTimeSeries();            
        if(res.getStatusCode() == 200) {            
                           
            if(String.isNotBlank(res.getBody())) {
                System.debug('res::'+ res.getBody());
                
                caseTime = (CaseTimeSeries)System.JSON.deserialize(res.getBody(), CaseTimeSeries.class);
                System.debug('caseTime::'+ caseTime.cases_time_series);
               
            }                 
        }
        Map<String, Object> listJson = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        System.debug('listJson.keys'+ listJson.keyset().size());
        for(String key: listJson.keyset()){
            System.debug('key::'+ key +'object:'+ listJson.get(key));
        }
         return JSON.serialize(listJson);
    }        
    
    public class CaseTimeSeries{
        
        @AuraEnabled
        public List<CovidWrapper> cases_time_series = new List<CovidWrapper>();
    }
   
    public class CovidWrapper{

        @AuraEnabled
        public Integer dailyconfirmed{get;set;}
        @AuraEnabled
        public Integer dailydeceased{get;set;}
        @AuraEnabled
        public Integer dailyrecovered{get;set;}
        @AuraEnabled
        public String dateOf{get;set;}
        @AuraEnabled
        public Integer totalconfirmed{get;set;}
        @AuraEnabled
        public Integer totaldeceased{get;set;}
        @AuraEnabled
        public Integer totalrecovered{get;set;}
       
    }

}