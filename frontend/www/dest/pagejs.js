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
angular.module('starter.controllers',[])
  .directive('autofocus', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $timeout(function () {
          $element[0].focus();
        });
      }
    }
  }])
  /*enter事件*/
  .directive('myEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.myEnter);
          });

          event.preventDefault();
        }
      });
    };
  })

  .filter('myLimitTo', [function () {
    return function (obj, limit) {
      var keys = Object.keys(obj);
      if (keys.length < 1) {
        return [];
      }
      var ret = new Object,
        count = 0;
      angular.forEach(keys, function (key, arrayIndex) {
        if (count >= limit) {
          return false;
        }
        ret[key] = obj[key];
        count++;
      });
        return ret;
    };
  }])
  /*测试*/
  .controller('TestCtrl', function ($scope, $http, $state) {
  })
  /*
  * 首页
  */
  .controller('ikitchenCtrl', function ($scope, $state) {
    $scope.toSearchPage = function () {
      $state.go('menu-search');
    }
  })
  /*
   * 登录
   */
  .controller('loginCtrl', function ($scope, $state) {


  })
  /*
   * 菜谱搜索页面 menu-search
   */
  .controller('SearchPageCtrl', function ($scope, $state, $ionicHistory, $http) {
    $scope.keys = {};
    //
    $scope.del_key = function(){
      $scope.search_val = "";
      search_change();
    }
    //返回上一页
    $scope.returnpage = function () {
      $scope.search_show = false;//隐藏
      $scope.search_val = "";
      $state.go("tab.ikitchen");
      //$ionicHistory.goBack();
    };
    //最近搜索 热门搜索
    $http({
      url: 'http://120.24.225.232/api/search/hot_recent/',
      method: 'get',
    }).success(function (data) {
      console.log(data.content);
      $scope.recent = data.content.recent;
      $scope.recent_show = $scope.recent.length == 0?false:true;
      $scope.hot = data.content.hot;

    }).error(function (status) {

    });
      //清空最近搜索
    $scope.clearRecent = function () {
      $http({
        url: 'http://120.24.225.232/api/search/clear/',
        method: 'get',
      }).success(function (data) {
        $scope.recent_show = false;

      }).error(function (status) {

      });
    }
    //最近搜索 热门搜索 end

    $scope.search_val = "";
    $scope.search_show = false;

    //搜索框改变时
    $scope.search_change =search_change;

      function search_change() {
        $scope.search_show = $scope.search_val == "" ? false : true;
        var data = {"input": $scope.search_val};
        if ($scope.search_val != "") {
          $http({
            url: 'http://120.24.225.232/api/search/relate/',
            method: 'post',
            data: data
          }).success(function (data) {
            console.log(data.content);
            $scope.keys = data.content.hot;
            $scope.my_favorite = data.content.like;

          }).error(function (status) {

          });
        }
      };

    /*前往搜索相关的菜谱列表*/
    function goToMenuList(val) {
      var source = "menu-search";

      $http({
          url: 'http://120.24.225.232/api/search/insert/',
        method: 'POST',
        data:{"input":val}
      }).success(function (data, header, config, status) {
          console.log(data);
      }).error(function (data, header, config, status) {

      });

      $state.go("menu-list", {"source": source, "search_key": val});
    }

    $scope.goToMenuList = goToMenuList;
    $scope.mykey = function (e) {
      var keycode = window.event ? e.keyCode : e.which;//获取按键编码
      if (keycode == 13) {
        goToMenuList($scope.search_val);
      }
    };


  })

  /*
   * 菜谱分类
   */
  .controller('ClassificationCtrl', function ($scope, $state, $ionicHistory, $http,$timeout) {
    $http({
      url: 'http://120.24.225.232/api/menu/all/',
      method: 'get'
    }).success(function (data) {
     // $scope.error = "访问成功啦";
      $scope.cf_list = data["content"];

     $scope.load = function () {
       $('.menu-panel .col-25').css('height', $('.menu-panel .col-25').css('width'));//高度等于宽度
      };


    }).error(function (status) {
    //  $scope.error = "访问失败啦" + status.detail;
      console.log(status.detail);
    });
    //相应分类的菜谱列表页
    $scope.goMeneList = function (id,name) {
      var param = {
        id: id,
        source: "menu-classification",
        search_key: name
      };
      $state.go("menu-list", param);
    };

  })
  /*
   * 菜谱搜索列表 menu-list
   */
  .controller('MenuSearchCtrl', function ($scope, $ionicModal, $http, $state, $stateParams, $ionicHistory) {
    console.log($stateParams);
    $scope.sort_active = {"auto": "active", "score": "", "do_num": ""};
    var source = $stateParams.source;//上一页
    var search_key = $stateParams.search_key;
    var search_id = $stateParams.id;
    $scope.search_key = search_key;
    // $scope.sortFlag = "score";

    $scope.menuSort = function (type) {
      $scope.sort_active = {"auto": "", "score": "", "do_num": ""};
      $scope.sort_active[type] = "active";
      $scope.sortFlag = type;
    };

    listByIdOrKey();

    //根据搜索条件搜索列表
    function listByIdOrKey() {
      var urlId = 'http://120.24.225.232/api/cookbook/by_menu/?menu=' + search_id;  //根据分类获取列表
      var urkKey = 'http://120.24.225.232/api/cookbook/by_name/?name=' + search_key;   //根据关键词类获取列表
      var url = search_id ? urlId : urkKey;

      $http({
        url: url,
        method: 'GET'
      }).success(function (data, header, config, status) {
        //响应成功
        $scope.menuLists = data.content;
        if($scope.menuLists.length == 0){ //没有搜索结果
          $scope.notFund = true;
        }else {
          $.each($scope.menuLists, function (i, item) {
            item.do_num = parseInt(item.do_num);
            item.score = parseFloat(item.score);
            item.favorite = parseInt(item.favorite);
          });
          console.log($scope.menuLists);
        }


      }).error(function (data, header, config, status) {
        console.log('请求失败');
        //处理响应失败
      });
    }

    $scope.focus_search = function () {
      $state.go("menu-search");
    }

    //浮动框//
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    //返回上一页
    $scope.goBack = function () {
      $state.go(source);
      //$ionicHistory.goBack();
    }
    //进入菜谱详情页
    $scope.goDetail = function (id) {
      var obj = {
        id: id,
        source: "menu-list"
      };
      $state.go("menu-detail", obj);
    }
  })
  /*
   * 菜谱详情页
   */
  .controller('MenuDetailCtrl', function ($scope, $http, $stateParams, $state, $ionicHistory) {
    var id = $stateParams.id;
    /*加载菜谱详细信息by id*/
    $http({
      url: 'http://120.24.225.232/api/cookbook/by_cookbook_id/',
      method: 'POST',
      data:{"id":id}
    }).success(function (data, header, config, status) {
      //响应成功
      console.log("菜谱详情");
      console.log(data);
      $scope.menu = data.content;
      // /*angular.forEach(data, function (obj, n) {
      //   while (obj.id == id) {
      //     $scope.menu = obj;
      //     return;
      //   }
      //   console.log($scope.menu.title);
      // })*/

    }).error(function (data, header, config, status) {
      console.log('sss');
      //处理响应失败
    });
    //返回上一页
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }


  })
  /*
   * 创建菜谱名
   */
  .controller('CreateNameCtrl', function ($scope,$state) {
    $scope.data={
      menuName:""
    };
    $scope.createDetail = function () {
      console.log($scope.data.menuName);
      var param ={
        "menuName":$scope.data.menuName
      }
        $state.go("create-detail",param);
    };

  })
  /*
   * 创建菜谱详情
   */
  .controller('CreateDetailCtrl', function ($scope,$stateParams) {
    $scope.menuName = $stateParams.menuName;
    $scope.materials = [
      { material: "",amount:"" }
    ];
    $scope.steps = [
      { id:0,desc: "",img:"" },
      { id:1,desc: "",img:"" }
    ];
    /*用料 做法 删除 移动 新增*/
    $scope.data = {
      mshowDeleteReorder: false, //显示delete
      showDeleteReorder:false,
      adj:"调整用料",
      adjstep:"调整步骤"
    };
      //删除
    $scope.onItemDelete = function(material,str) {
      $scope[str].splice($scope[str].indexOf(str), 1);
    };
      //拖拽 移动排序
    $scope.moveItem = function(item, fromIndex, toIndex,str) {
      $scope[str].splice(fromIndex, 1);
      $scope[str].splice(toIndex, 0, item);
    };
      //新增
    $scope.add = function (str) {
      if(str == "materials"){
        $scope[str].push({ material: "",amount:"" });
      }
      if(str == "steps") {
        $scope[str].push({id: $scope.steps.length, desc: "", img: ""});
      }
    };
      //调整
    $scope.adjust = function (str) {
      if(str == "materials"){
        $scope.data.adj = $scope.data.mshowDeleteReorder?"调整用料":"调整完成";
        $scope.data.mshowDeleteReorder = !$scope.data.mshowDeleteReorder;
        $scope.mate = $scope.data.mshowDeleteReorder?{"width" : "40%"}:{"width" : "50%"};
      }
      if(str == "steps") {
        $scope.data.adjstep = $scope.data.showDeleteReorder?"调整步骤":"调整完成";
        $scope.data.showDeleteReorder = !$scope.data.showDeleteReorder;
        $scope.stepImg = $scope.data.showDeleteReorder?{"width" : "60%"}:{"width" : "100%"};
      }

    };
    /*用料 做法 删除 移动 新增 end*/

  })


  /*
   * 每周流行菜谱
   */
  .controller('PopulCtrl', function ($scope, $http) {

    $http({
      url: 'js/popudata.json',
      method: 'GET'
    }).success(function (data, header, config, status) {
      //响应成功
      $scope.popu_data = data
    }).error(function (data, header, config, status) {
      console.log('sss');
      //处理响应失败
    });

  });

