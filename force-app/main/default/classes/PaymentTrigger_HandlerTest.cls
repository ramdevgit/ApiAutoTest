@isTest
public class PaymentTrigger_HandlerTest {
    
    @testSetup static void setup(){
		
        List<Payment__c> paymentList = new List<Payment__c>();
        List<Opportunity> oppList = new List<Opportunity>();
        
        oppList.add( new Opportunity(Name='LaptopOrder', CloseDate = Date.today() + 10 , StageName ='Prospecting'));
        oppList.add( new Opportunity(Name='Tab', CloseDate = Date.today() + 10 , StageName ='Prospecting'));
        try{
                if(oppList.size() > 0){
                	insert oppList;
            	}
        }
        
        catch(Exception e){
            System.debug(':::setup:::Line Number '+ e.getLineNumber());
            System.debug(':::setup::: '+ e.getMessage());
        }
        
        System.debug(':::oppList:::' + oppList);
        
        for(Integer i=0; i < 10; i++ ){
            
            Payment__c pay = new Payment__c();
            pay.Opportunity__c = oppList[0].Id;
            pay.Amount__c = 10000;
            pay.PaymentDate__c = Date.today() - 30;
           	pay.Status__c = 'Failed';
            
            if(i==5){
                 pay.PaymentDate__c = Date.today() + 30;
                 pay.Status__c = 'Pending'; 
            }        	
            
            paymentList.add(pay);
        }
        
        try{
        	if(paymentList.size() > 0){
               	insert paymentList;
            }
        }
        
        catch(Exception e){
            System.debug(':::setup:::Line Number '+ e.getLineNumber());
            System.debug(':::setup::: '+ e.getMessage());
        }
       
        System.debug('::paymenList:::' + paymentList);
    }
    
    @isTest static void testInsertPaymentUpdateOpportunity(){
        
        Map<Id, Payment__c> paymentMap = new Map<Id, Payment__c>([SELECT Id, Name, Amount__c, PaymentDate__c, Status__c FROM Payment__c  ]);
        System.debug(':::paymentMap' + paymentMap);
        PaymentTrigger_Handler.insertPaymentUpdateOpportunity(paymentMap);
    }

}