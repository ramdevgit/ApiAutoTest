import { LightningElement,track ,api} from 'lwc';

export default class PrintHello extends LightningElement {
    @track greeting = "RAM WORLD";
    @api greeting;
    changeHandler(event) {
        this.greeting = event.target.value;
    }
}