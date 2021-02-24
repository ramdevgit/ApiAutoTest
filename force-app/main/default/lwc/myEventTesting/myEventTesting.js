import { LightningElement, track } from 'lwc';

export default class MyEventTesting extends LightningElement {
    
    @track greeting='Test';

    handleOnChange(event){
        console.log('handleOnChange:::', event.target.value);
        //this.greeting = event.target.value;
    }
}