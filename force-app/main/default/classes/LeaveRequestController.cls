public with sharing class LeaveRequestController {
    @AuraEnabled(cacheable = true)
    public static List<Leave_Request__c>getMyLeaves(){
        try{
        List<Leave_Request__c> leaveList = new List<Leave_Request__c>();
        leaveList = [SELECT id, Name,From_Date__c,To_Date__c,Status__c,Reason__c,Manager_Comment__c FROM Leave_Request__c WHERE User__c =:UserInfo.getUserId() Order By CreatedDate DESC];
        return leaveList;
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable = true)
    public static List<Leave_Request__c> getLeaveRequest(){
        try{
            List<Leave_Request__c> leaveRequestList = new List<Leave_Request__c>();
            leaveRequestList = [SELECT Id, Name, From_Date__c, To_Date__c, Status__c, Reason__c,Manager_Comment__c, User__r.ManagerId,User__r.Name FROM Leave_Request__c WHERE User__r.ManagerId=:UserInfo.getUserId() Order By CreatedDate DESC];
            return leaveRequestList;
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}