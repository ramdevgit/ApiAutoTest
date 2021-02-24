global class batch_AccountUpdate  implements Database.batchable<Account>{
  
    global  Iterable<Account> start(Database.BatchableContext bc){ 
    
      	AccountIterable accIterable = new AccountIterable();
        accIterable.accountList = [SELECT Id, Name, AccountSource FROM Account];
        return accIterable.accountList;
   }     
   
    public void execute(Database.BatchableContext info, List<Account> scope){
        List<Account> accsToUpdate = new List<Account>();
        System.debug('scope::'+ scope.size());
       
        for(Account a : scope){ 
            
            a.AccountSource = 'web';
            accsToUpdate.add(a);
            
        } 
        update accsToUpdate; 
        System.debug('accToUpdate::'+ accsToUpdate);
    } 
    
   public void finish(Database.BatchableContext info){     
   } 
}