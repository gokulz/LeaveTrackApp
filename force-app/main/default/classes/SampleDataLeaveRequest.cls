public with sharing class SampleDataLeaveRequest {
    public static void createSampleData(){
        Id currentUserId = UserInfo.getUserId();
        List<Leave_Request__c> leaveList = new List<Leave_Request__c>();
        leaveList.add(new Leave_Request__c(User__c = currentUserId, From_Date__c = Date.newInstance(2024, 08, 10), 
        To_Date__c = Date.newInstance(2024, 08, 11), Status__c = 'Approved',Reason__c ='For Personal Reason'));
        leaveList.add(new Leave_Request__c(User__c = currentUserId, From_Date__c = Date.newInstance(2024, 08, 27), 
        To_Date__c = Date.newInstance(2024, 08, 27), Status__c = 'Pending', Reason__c= 'Sick Leave'));
        leaveList.add(new Leave_Request__c(User__c = currentUserId, From_Date__c = Date.newInstance(2024,08,26), 
        To_Date__c = Date.newInstance(2024,08,26), Status__c = 'Rejected', Reason__c = 'Vacation Leave'));
        insert leaveList;
    }
}
