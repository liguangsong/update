function ActivityListController($scope, $navigate, $http,$timeout) {

    if (Activity.get_all_activity(user.get_activity_of_user()) == '') {
        $navigate.go("/creat_activity")
    }

    $scope.eventList = Activity.get_all_activity(user.get_activity_of_user());

    $scope.jump_creat_activity = function () {
        $navigate.go("/creat_activity")
    }

    $scope.jump_auction = function (list) {
        var activity_name_apply = list.activity_name;
        Activity.create_now_activity(activity_name_apply);
        $navigate.go("/auction")
    }



    $scope.synchronous_data = function () {
        var activity_of_user = {name:"e.png"}

        $http({method: 'post', url: 'localhost:3000/filersave', data: {update: activity_of_user}}).success(
            function (respond, statue) {
                if (respond == "true") {
                 pop_out(respond)
                }
                if (respond == "false") {
                   pop_out(respond)
                }
            })
            .error(function () {
                pop_out("error")
            })
    }
    function pop_out(respond) {
        $scope.pop_out_modal = true;
        $scope.success=respond=="true"
        $scope.false=respond=="false"
        $scope.error = respond=="error"
        $timeout(function () {
            $scope.pop_out_modal = false;
        }, 3000);
    }
    $scope.data_synchronous=function(){
        synchronous($http)
    }
}
