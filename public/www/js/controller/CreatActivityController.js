function CreatActivityController($scope, $navigate,$http) {
    $scope.show =(Activity.get_all_activity()=='') ;

    $scope.creat_activity = function () {
          activity_name_repeat();
    }

    function activity_name_repeat(){
        if(Activity.activity_name_is_or_not_repeat($scope.activity_name)==true){
            $scope.warning_show=true;
            return;
        }
        $scope.warning_show=false;
        return activity_name_no_repeat() ;
    }

    function activity_name_no_repeat(){
        var activity=new Activity($scope.activity_name);
        activity.create();
        Activity.create_now_activity($scope.activity_name)
        $scope.data_synchronous()
        $navigate.go("/auction")
    }

    $scope.go_to_activity_list = function () {
        $navigate.go("/activity_list");
    }
    $scope.data_synchronous=function(){
        synchronous($http)
    }
}

