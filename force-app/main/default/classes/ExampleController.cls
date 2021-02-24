public with sharing class ExampleController {
   public List<Account> Account_List{get;set;}
     
    public ExampleController (){
      Account_List = new List<Account>();
      Account_List = [select Id, Name from Account limit 5];
      
    } 
}