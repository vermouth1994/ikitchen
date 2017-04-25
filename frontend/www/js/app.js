angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  //tabs在安卓手机中顶部问题解决
  .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    //   $ionicConfigProvider.tabs.position('bottom');// other values: top
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

  }])
  //路由
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    //下方导航栏
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      //首页
      .state('tab.ikitchen', {
        url: '/ikitchen',
        views: {
          'tab-ikitchen': {
            templateUrl: 'templates/tab-ikitchen.html',
            controller: 'ikitchenCtrl'
          }
        }
      })
      //登录
      .state('tab.login', {
        url: '/login',
        views: {
          'tab-Mine': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
      })
      //流行菜谱
      .state('ikitchen-popular', {
        url: '/ikitchen/weekly_popular',
        templateUrl: 'templates/ikitchen-popular.html',
        controller: 'PopulCtrl'
      })
      //测试
      .state('test', {
        url: '/test',
        templateUrl: 'templates/ikitchen-test.html',
        controller: 'TestCtrl'
      })
      //创建菜谱名
      .state('create-name', {
        url: '/create/name',
        templateUrl: 'templates/create-name.html',
        controller: 'CreateNameCtrl'
      })
      //创建菜谱详情
      .state('create-detail', {
        params: {"menuName": null},
        url: '/create/detail',
        templateUrl: 'templates/create-detail.html',
        controller: 'CreateDetailCtrl'
      })
      //菜谱分类
      .state('menu-classification', {
        url: '/menu/menu-classification',
        templateUrl: 'templates/menu-classification.html',
        controller: 'ClassificationCtrl'
      })


      //菜谱搜索页
      .state('menu-search', {
        url: '/menu/menu-search',
        templateUrl: 'templates/menu-search.html',
        controller: 'SearchPageCtrl'
      })
      //菜谱搜索列表  menu-list
      .state('menu-list', {
        params: {"id": null, "source": null, "search_key": null},
        url: '/menu/menu-list',
        templateUrl: 'templates/menu-list.html',
        controller: 'MenuSearchCtrl'
      })

      //菜谱详情页面
      .state('menu-detail', {
        params: {"id": null},
        url: '/menu/menu-detail',
        templateUrl: 'templates/menu-detail.html',
        controller: 'MenuDetailCtrl'
      });

    $urlRouterProvider.otherwise('/tab/ikitchen');

  });
