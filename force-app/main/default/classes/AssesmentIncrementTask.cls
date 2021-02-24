public  class AssesmentIncrementTask {

    public AssesmentIncrementTask(){
        
       Integer x;
       try{
           x=0/0;
        }
        catch(Exception e){
            System.debug('Exception '+ e.getMessage());
        }
       
        String name='Ramesh';
        Integer[] numbers = new Integer[]{5,10,15,20};
        increment(x, numbers,name );
        System.debug(x +' numbers'+ numbers);
        List<Contact> contactList = [SELECT Id, Name FROM Contact WHERE Name LIKE '%G%' ] ;
        System.debug(contactList);
        
        
   } 
  public static  void increment(Integer x, List<Integer> values,String name ){
        for(Integer i=0; i < values.size(); i++ ){
			values[i] += 5;
            
        }
        x = 53;
      System.debug('x' + x + 'Name' +name);
      
    }
}