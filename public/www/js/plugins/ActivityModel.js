function Activity(activity_name) {
    this.status="un_start"
    this.activity_name = activity_name;
}

Activity.get_all_activity = function (activity_of_user) {
    if(activity_of_user!=undefined){
        return activity_of_user["activities"]
    }
      return []
}

Activity.activity_name_is_or_not_repeat=function(activity_name){
    var activity_of_user=user.get_activity_of_user()
    var all_activity=Activity.get_all_activity(activity_of_user);
    return _.some(all_activity,function(list){
        return list["activity_name"]==activity_name;
    })
}

Activity.prototype.create = function () {
    var activity_of_user=user.get_activity_of_user()
    var activities = Activity.get_all_activity(activity_of_user);
    activities.unshift(this);
    user.save_activity_of_user(activity_of_user);
}

Activity.current_activity = function () {
    var activity_of_user =user.get_activity_of_user()
    return   activity_of_user["current_activity"]
}

Activity.create_now_activity=function(activity_name_apply){
    var activity_of_user =user.get_activity_of_user()
    activity_of_user["now_activity"]=activity_name_apply
    user.save_activity_of_user(activity_of_user)
}

Activity.get_now_activity_name=function(){
    var activity_of_user =user.get_activity_of_user()
    return activity_of_user["now_activity"]
}

Activity.get_activity_status=function(activity_name){
   var activity_of_user=user.get_activity_of_user()
   var all_activity= Activity.get_all_activity(activity_of_user);
    return _.find(all_activity,function(list){
        return list.activity_name==activity_name
    })['status']
}

Activity.activity_status_change=function(activity_name, status){
    var activity_of_user=user.get_activity_of_user()
    var all_activity= Activity.get_all_activity(activity_of_user);
     var event=_.map(all_activity,function(list){
       if(list.activity_name==activity_name){

           list.status=status
       }
        return list
    })
    user.save_activity_of_user(activity_of_user);
}

Activity.create_activity_start=function(activity_name){
    var activity_of_user =user.get_activity_of_user()
    activity_of_user["current_activity"]=activity_name;
    user.save_activity_of_user(activity_of_user)
}

Activity.destroy_activity_start=function(){
    var activity_of_user =user.get_activity_of_user()
    activity_of_user["current_activity"]=""
    user.save_activity_of_user(activity_of_user)
}