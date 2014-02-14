function LoginController($scope, $http, $navigate, $templateCache) {
    $scope.login = function () {
        var name = document.getElementById("user_name").value;
        var password = document.getElementById("user_password").value;
        var date = {name: name, password: password}
        submit_login_information(date,name)
    }

    function submit_login_information(date,name){
        $http({method: 'post', url: '/sessions/user_authentication', data: {update: date}}).success(
            function (respond, statue) {
                if (respond == "true") {
                    go_to_activity_list(name)
                }
                if (respond == "false") {
                    $scope.notice = 'true'
                }
            })
            .error(function () {
                $scope.error = 'true'
            })
    }

    function  go_to_activity_list(name){
        localStorage.setItem("user_name",name)
        if(localStorage.getItem(name)==null){
            var a=new user();
            a.create();
        }
        $navigate.go("/activity_list")

    }
}



