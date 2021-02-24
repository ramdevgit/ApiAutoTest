import { LightningElement, track } from 'lwc';
import {FlowAttributeChangeEvent, FlowNavigationNextEvent} from 'lightning/flowSupport';

export default class DeliveryStatus extends LightningElement {
    @track noOfDays;
    get cityOptions(){
        return [
            { label: 'CHENNAI', value: 'CHENNAI' },
            { label: 'TRICHY', value: 'TRICHY' },
            { label: 'MADURAI', value: 'MADURAI' },
        ];
    };
    handleChange(event) {
       
        console.log('this.value::', event.detail.value);
        if( event.detail.value === 'CHENNAI'){
            this.noOfDays = 3;
        }else if( event.detail.value === 'TRICHY'){
            this.noOfDays = 5;
        }else{
            this.noOfDays = 10;
        }
    }
}