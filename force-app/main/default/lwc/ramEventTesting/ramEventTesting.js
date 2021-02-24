import { LightningElement, track } from 'lwc';

export default class RamEventTesting extends LightningElement {
    @track greeting= 'Ram';

    handleOnChange(event){
        console.log('handleOnChange:::', event.target.value);
        this.greeting = event.target.value;
    }
}