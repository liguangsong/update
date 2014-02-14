function user(){
    this.current_activity=""
    this.now_activity=""
    this.current_bid=""
    this.now_bid=""
    this.activities=[] ;
    this.sign_up=[];
    this.bids=[];
}

user.prototype.create=function(){
    var name=user.get_user_name("user_name")
    localStorage.setItem(name,JSON.stringify(this))
}

user.get_user_name=function(){
    return localStorage.getItem("user_name")||[];
}

user.get_activity_of_user=function(){
    var user_name=user.get_user_name();
    return JSON.parse(localStorage.getItem(user_name))||{}
}

user.save_activity_of_user=function(activity_of_user){
    var user_name=user.get_user_name();
    localStorage.setItem(user_name,JSON.stringify(activity_of_user))
    return "true"

}


