public class MobileBrandController {
    @auraEnabled
    public static void saveMobileBrand(Mobile_Brand__c mobileOrder){
        System.debug('MobileBrandController::saveMobileBrand');
        if(mobileOrder!=null){
            System.debug('MobileBrandController::saveMobileBrand');
            insert mobileOrder;
        }
    }
    
    @AuraEnabled
    public static wrapperClass getPickListValuesIntoMap(){
        wrapperClass returnwrapperClass = new  wrapperClass ();        
        Schema.DescribeFieldResult picklist = Mobile_Brand__c.Mobile_Color__c.getDescribe();
        List<Schema.PicklistEntry> ple = picklist.getPicklistValues();
        returnwrapperClass.pickList = new List<String>();
        for( Schema.PicklistEntry pickListVal : ple){
            returnwrapperClass.pickList.add(pickListVal.getValue());
        } 
      
        Schema.DescribeFieldResult multiPicklist = Mobile_Brand__c.Inside_Box__c.getDescribe();
        List<Schema.PicklistEntry> mple = multiPicklist.getPicklistValues();
        for( Schema.PicklistEntry multipick : mple){
            MultiPickValue val = new MultiPickValue();
            val.value = multipick.getValue();
            val.label = multipick.getLabel();
            returnwrapperClass.multipickList.add(val);
            System.debug('Values in Rating are: '+ returnwrapperClass.multipickList);
        } 
   
        return returnwrapperClass;    
    }
    
    public class MultiPickValue{
        @AuraEnabled
        public String label{get;set;}
        @AuraEnabled
        public String value{get;set;}
    }
    public class wrapperClass{
        @AuraEnabled public List<MultiPickValue> multipickList = new List<MultiPickValue>();
        @AuraEnabled public List<String> pickList{get;set;}
    }
}