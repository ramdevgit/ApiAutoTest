public class ViewLaptopCustomers{
    
    public List<Laptop_Customer__c> laptopCustomers{set;get;}
    
    
    public void ViewLaptopCustomers(){
       laptopCustomers=[SELECT Id,Name,Customer_Name__c,Email_Id__c,Phone_Number__c,Address_City__c FROM Laptop_Customer__c];
    }
    
    public void getLaptopCustomers(){
        laptopCustomers=[SELECT Id,Name,Customer_Name__c,Email_Id__c,Phone_Number__c,Address_City__c FROM Laptop_Customer__c];
    }
}