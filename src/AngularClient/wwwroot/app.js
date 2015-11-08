!function(){var a=angular.module("mainApp",["ui.router"]);a.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/authorized"),a.state("authorized",{url:"/authorized",templateUrl:"/templates/authorized.html",controller:"AuthorizedController"}).state("home",{"abstract":!0,url:"/home",templateUrl:"/templates/home.html"}).state("overview",{parent:"home",url:"/overview",templateUrl:"/templates/overview.html",controller:"OverviewController",resolve:{DataEventRecordsService:"DataEventRecordsService",dataEventRecords:["DataEventRecordsService",function(a){return a.GetDataEventRecords()}]}}).state("details",{parent:"overview",url:"/details/:id",templateUrl:"/templates/details.html",controller:"DetailsController",resolve:{DataEventRecordsService:"DataEventRecordsService",dataEventRecord:["DataEventRecordsService","$stateParams",function(a,b){var c=b.id;return console.log(b.id),a.GetDataEventRecord({id:c})}]}}).state("create",{parent:"overview",url:"/create",templateUrl:"/templates/create.html",controller:"DetailsController",resolve:{dataEventRecord:[function(){return{Id:"",Name:"",Description:"",Timestamp:"2015-08-28T09:57:32.4669632"}}]}}),c.html5Mode(!0)}]),a.run(["$rootScope",function(a){a.$on("$stateChangeError",function(a,b,c,d,e,f){console.log(a),console.log(b),console.log(c),console.log(d),console.log(e),console.log(f)}),a.$on("$stateNotFound",function(a,b,c,d){console.log(a),console.log(b),console.log(c),console.log(d)})}])}(),function(){"use strict";function a(a,b,c,d,e){if(b.info("AuthorizedController called"),a.message="AuthorizedController created",e.authorizationData=null,console.log(e.authorizationData),e.authorizationData)a.message="AuthorizedController created logged on",d.go("overview");else if(console.log("AuthorizedController created, no auth data"),c.location.hash){console.log("AuthorizedController created, has hash"),a.message="AuthorizedController created with a code";var f=window.location.hash.substr(1),g=f.split("&").reduce(function(a,b){var c=b.split("=");return a[c[0]]=c[1],a},{}),h="";g.error||(g.state!==e.myautostate?(console.log("AuthorizedController created. no myautostate"),h=g.access_token):(e.myautostate=null,console.log("AuthorizedController created. returning access token"),h=g.access_token)),e.authorizationData=h,console.log(e.authorizationData),d.go("overview")}else{a.message="AuthorizedController time to log on";var i="https://localhost:44300/connect/authorize",j="angularclient",k="https://localhost:44302/authorized",l="token",m="dataEventRecords",n=Date.now()+""+Math.random();e.myautostate=n,console.log("AuthorizedController created. adding myautostate: "+e.myautostate);var o=i+"?client_id="+encodeURI(j)+"&redirect_uri="+encodeURI(k)+"&response_type="+encodeURI(l)+"&scope="+encodeURI(m)+"&state="+encodeURI(n);c.location=o}}var b=angular.module("mainApp");b.controller("AuthorizedController",["$scope","$log","$window","$state","$rootScope",a])}(),function(){"use strict";function a(a,b,c,d,e){b.info("DetailsController called"),a.message="dataEventRecord Create, Update or Delete",a.DataEventRecordsService=d,a.state=e,a.dataEventRecord=c,a.Update=function(){b.info("Updating"),b.info(c),a.DataEventRecordsService.UpdateDataEventRecord(c),a.state.go("overview")},a.Create=function(){b.info("Creating"),b.info(c),a.DataEventRecordsService.AddDataEventRecord(c),a.state.go("overview")}}var b=angular.module("mainApp");b.controller("DetailsController",["$scope","$log","dataEventRecord","DataEventRecordsService","$state",a])}(),function(){"use strict";function a(a,b,c,d){b.info("OverviewController called"),a.message="Overview",a.DataEventRecordsService=d,b.info(c),a.dataEventRecords=c,a.Delete=function(c){b.info("deleting"),a.DataEventRecordsService.DeleteDataEventRecord(c)}}var b=angular.module("mainApp");b.controller("OverviewController",["$scope","$log","dataEventRecords","DataEventRecordsService",a])}(),function(){"use strict";function a(a,b,c,d){b.info("DataEventRecordsService called");var e="https://localhost:44303/",f=function(b){var d=c.defer();return console.log("addDataEventRecord started"),console.log(b),a({url:e+"api/DataEventRecords",method:"POST",data:b}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},g=function(b){var d=c.defer();return console.log("addDataEventRecord started"),console.log(b),a({url:e+"api/DataEventRecords/"+b.Id,method:"PUT",data:b}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},h=function(b){var d=c.defer();return console.log("DeleteDataEventRecord begin"),console.log(b),a({url:e+"api/DataEventRecords/"+b,method:"DELETE",data:""}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},i=function(){var b=c.defer();return console.log("GetDataEventRecords started"),console.log(d.authorizationData),a({url:e+"api/DataEventRecords",method:"GET",headers:{accept:"application/json; charset=utf-8",Authorization:"Bearer "+d.authorizationData}}).success(function(a){console.log("GetDataEventRecords success"),b.resolve(a)}).error(function(a){console.log("GetDataEventRecords error"),b.reject(a)}),b.promise},j=function(c){return b.info("DataEventRecordService GetDataEventRecord called: "+c.id),b.info(c),a.get(e+"api/DataEventRecords/"+c.id).then(function(a){return a.data})};return{AddDataEventRecord:f,UpdateDataEventRecord:g,DeleteDataEventRecord:h,GetDataEventRecords:i,GetDataEventRecord:j}}var b=angular.module("mainApp");b.factory("DataEventRecordsService",["$http","$log","$q","$rootScope",a])}();