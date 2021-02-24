public class ViewLaptopOrders{
    
    public List<Laptop_Order__c> laptopOrders{set;get;}
    
    public List<Laptop_Order__c> ViewLaptopOrders(){
        laptopOrders=[SELECT Id,Name,Order_Price__c,Laptop_Brands__r.Name,Laptop_Customer__r.Customer_Name__c FROM Laptop_Order__c];
        return laptopOrders;
    }
    
    
}