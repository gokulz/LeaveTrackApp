import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequestController.getMyLeaves';
const COLUMNS = [
    {label : 'Request Id', fieldName : 'Name', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label : 'From Date', fieldName : 'From_Date__c', cellAttributes : {class : {fieldName:'cellClass'}}},
    {label : 'To Date', fieldName : 'To_Date__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label : 'Status', fieldName : 'Status__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label : 'Reason', fieldName : 'Reason__c', cellAttributes : {class: {fieldName : 'cellClass'}}},
    {label : 'Manager Comment', fieldName : 'Manager_Comment__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {
        type : "button",
        typeAttributes : {
            label : 'Edit',
            name : 'Edit',
            title : 'Edit',
            value : 'edit'
        }, cellAttributes : {class : {fieldName : 'cellClass'}}
    }
];

export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    myLeaves=[];
    myLeaveResult;

    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeaveResult = result;

        if(result.data){
            this.myLeaves = result.data.map(a => ({
                ...a,
                cellClass : a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_warning' : ''
            }));
        }
        if(result.error){
            console.log('Error Occured While Fetching My leaves', result.err);
        }
    }
    get noRecordsFound(){
        return this.myLeaves.length ==0;
    }
}