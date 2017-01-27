(function() {
    var app = angular.module('app', ['ngRoute']);
    var page = 0;
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "assets/pages/step0.html", controller: "step0Controller" })
            .when("/step1", { templateUrl: "assets/pages/step1.html", controller: "step1Controller" })
            .when("/step2", { templateUrl: "assets/pages/step2.html", controller: "step2Controller" })
            .when("/step3", { templateUrl: "assets/pages/step3.html", controller: "step1Controller" })
            .when("/step4", { templateUrl: "assets/pages/step4.html", controller: "step1Controller" })
            .when("/step5", { templateUrl: "assets/pages/step5.html", controller: "step5Controller" })
            .otherwise({ redirectTo: "/" })
    })

    app.controller("mainController", function($scope) {
        $scope.$on('changeTitle', function(event, titleUp, titleDown, description) {
            $scope.titleUp = titleUp;
            $scope.titleDown = titleDown;
            $scope.description = description;
        });
    });

    app.controller("step0Controller", function($scope) {
        $scope.$emit("changeTitle", "Simulateur", "de gain", "5 étapes pour connaître le potentiel de vos combles");
        changeProgressValue(0);
    });

    app.controller("step1Controller", function($scope) {
        $scope.$emit("changeTitle", "Géométrie", "de la maison", "");
        changeProgressValue(20);
    });

    app.controller("step2Controller", function($scope) {
        $scope.$emit("changeTitle", "Géométrie", "de la maison", "");
        changeProgressValue(40);
    });

    app.controller("step5Controller", function($scope) {
        $scope.$emit("changeTitle", "Surface", "des combles", "");
        changeProgressValue(80);
        $scope.l1 = 10;
        $scope.l2 = 20;
        $scope.l3 = 30;
        $scope.l4 = 40;
        $scope.l5 = 10;
    });

    function changeProgressValue(value) {
        TweenMax.to(".progress", 1, { width: value + "vw", ease: Power4.easeOut });
    }

    function increaseProgressValue(value) {
        var initValue = $('.progress').data('value');
        var finalValue = Number(initValue) + Number(value);
        $('.progress').data('value', finalValue);
        changeProgressValue(finalValue);
    }

    $('.well').on("mouseover", function() {

    });
})();