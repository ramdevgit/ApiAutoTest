global class AccountIterable implements Iterator<Account>{
    
    public List<Account> accountList {get;set;}
    public Integer i {get;set;}
    
    public AccountIterable(){
        accountList = [select Id, Name, AccountSource From Account LIMIT 100];
        i=0;
    }
    
    global boolean hasNext(){
        if(i >= accountList.size()){
            return false;
        }else{
            return true;
        }
    }

    global Account next(){
        if(i == accountList.size()){return null;}
        i++;
        return accountList[i-1];
    }
    
}