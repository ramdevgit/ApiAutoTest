public class ViewLaptopBrand{
    public List<Laptop_Brand__c> laptopBrands{set;get;}
    public void getLaptopBrands(){
        laptopBrands=[SELECT Id,Name,Price__c,Model_Number__c,Offer__c FROM Laptop_Brand__c];
    }
}