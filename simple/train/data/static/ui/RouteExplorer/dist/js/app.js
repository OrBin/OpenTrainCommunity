!function(){var t=angular.module("RouteExplorer",["ngRoute","ui.bootstrap","ui.bootstrap.buttons"]);t.constant("env",{baseDir:"/static/ui/RouteExplorer"}),t.config(["$routeProvider","env",function(t,e){var n=function(t){return e.baseDir+"/tpls/"+t+".html"};t.when("/",{pageId:"welcome",templateUrl:n("SelectStops"),controller:"SelectStopsController",resolve:{Layout:"Layout"}}).when("/about",{pageId:"about",templateUrl:n("About")}).when("/:period/select-route/:origin/:destination",{pageId:"routes",templateUrl:n("SelectRoute"),controller:"SelectRouteController",resolve:{Layout:"Layout"}}).when("/:period/routes/:routeId",{pageId:"route",templateUrl:n("RouteDetails"),controller:"RouteDetailsController",resolve:{Layout:"Layout"},reloadOnSearch:!1}).otherwise({redirectTo:"/"})}])}(),String.prototype.repeat||(String.prototype.repeat=function(t){"use strict";if(null===this)throw new TypeError("can't convert "+this+" to object");var e=""+this;if(t=+t,t!=t&&(t=0),0>t)throw new RangeError("repeat count must be non-negative");if(t==1/0)throw new RangeError("repeat count must be less than infinity");if(t=Math.floor(t),0===e.length||0===t)return"";if(e.length*t>=1<<28)throw new RangeError("repeat count must not overflow maximum string size");for(var n="";1==(1&t)&&(n+=e),t>>>=1,0!==t;)e+=e;return n}),angular.module("RouteExplorer").controller("AppController",["$scope","$location",function(t,e){t.share=function(t){var n=t+encodeURIComponent("http://otrain.org/#"+e.url());window.open(n,"sharePopup","width=600,height=550,top=100,left=100,location=no,scrollbar=no,status=no,menubar=no")},t.$on("$routeChangeSuccess",function(e,n){t.bodyClass=n.pageId?"rex-page-"+n.pageId:null})}]),angular.module("RouteExplorer").controller("RouteDetailsController",["$scope","$route","$http","$location","LocationBinder","Layout","Locale","TimeParser",function(t,e,n,r,o,i,u,a){function l(t,e){return t=t||"all",e=e||"all",y[t]&&y[t][e]?y[t][e]:null}function s(){var e=l(t.selectedDay,t.selectedTime);return e?e.stops:[]}function c(e){function n(t){return("0"+t%24).slice(-2)+":00"}t.times=[];var r={};for(var o in e){var i=e[o],u="all"==i.info.hours?"all":i.info.hours[0]+"-"+i.info.hours[1],a=i.info.week_day;if(y[a]||(y[a]={}),y[a][u]=i,"all"!=u&&!r[u]){var l={id:u,from:n(i.info.hours[0]),to:n(i.info.hours[1])};r[u]=l,t.times.push(l)}}}function d(t){return u.months[t.getMonth()].name+" "+t.getFullYear()}function f(t,e){var n=new Date(t);return n.setMonth(n.getMonth()+e),n}function p(t,e){return size=12*(t.to.getFullYear()-t.from.getFullYear())+t.to.getMonth()-t.from.getMonth()+1,{from:f(t.from,size*e),to:f(t.to,size*e),end:f(t.end,size*e)}}var m=e.current.params,g=a.parsePeriod(m.period),h=g.from,v=g.end,b=m.routeId,R=i.findRoute(b).stops,y={};t.loaded=!1,t.stopIds=R,t.origin=R[0],t.destination=R[R.length-1],t.selectedPeriod=d(g.from),g.to>g.from&&(t.selectedPeriod+=" — "+d(g.to)),t.selectedDay=null,t.days=u.days,t.selectedTime=null,t.times=[],t.selectRouteUrl="#/"+m.period+"/select-route/"+t.origin+"/"+t.destination;var D=p(g,-1),w=p(g,1),P=i.getRoutesDateRange();t.previousPeriodUrl=P.min<D.from?"#/"+a.formatPeriod(D)+"/routes/"+b:null,t.nextPeriodUrl=P.max>w.to?"#/"+a.formatPeriod(w)+"/routes/"+b:null,n.get("/api/route-info-full",{params:{route_id:b,from_date:h.getTime(),to_date:v.getTime()}}).success(function(e){c(e),t.loaded=!0}),o.bind(t,"selectedDay","day",function(t){return t?Number(t):null}),o.bind(t,"selectedTime","time"),t.stopStats=function(t){var e=s();for(var n in e)if(e[n].stop_id==t)return e[n];return null},t.stopName=function(t){var e=i.findStop(t);return e?e.name:null},t.isDayEmpty=function(t){var e=t.id,n=y[e];if(!n)return!0;for(var r in n)if(n[r].info.num_trips>0)return!1;return!0},t.isTimeEmpty=function(e){var n=t.selectedDay||"all",r=e.id,o=y[n]&&y[n][r];return o&&o.info.num_trips>0?!1:!0},t.tripCount=function(t,e){var n=l(t,e);return n?n.info.num_trips:0}}]),angular.module("RouteExplorer").controller("SelectRouteController",["$scope","$location","$route","Layout","TimeParser",function(t,e,n,r,o){function i(t){var e=r.findStop(t);return e?e.name:null}function u(t){function e(t){var e={};for(var n in t){var r=t[n];for(var o in r.stops){var i=r.stops[o];e[i]||(e[i]=0),e[i]++}}return e}function n(t,e){var n={};for(var r in t)t[r]==e&&(n[r]=!0);return n}function r(t,e){var n,r=[];for(var o in t){var i=t[o];o>0&&o<t.length-1&&e[i]?(n||(n=[],r.push(n)),n.push(i)):(n=null,r.push(i))}return r}var o=n(e(t),t.length);delete o[l.id],delete o[s.id];for(var i in t)t[i].stops=r(t[i].stops,o)}t.stops=r.getStops();var a=o.parsePeriod(n.current.params.period),l=r.findStop(n.current.params.origin),s=r.findStop(n.current.params.destination);r.findRoutesByPeriod(l.id,s.id,a.from,a.end).then(function(e){e.length>1&&u(e),t.routes=e}),t.isCollapsed=function(t){return angular.isArray(t)},t.isOrigin=function(t){return t==l.id},t.isDestination=function(t){return t==s.id},t.stopText=function(e){return t.isCollapsed(e)?"•".repeat(e.length):i(e)},t.stopTooltip=function(e){return t.isCollapsed(e)?e.map(i).join(", "):null},t.barWidth=function(e){var n=100*e.count/t.routes[0].count;return 1>n?"1px":n+"%"},t.routeUrl=function(t){return"/#/"+n.current.params.period+"/routes/"+t.id}}]),angular.module("RouteExplorer").controller("SelectStopsController",["$scope","$rootScope","$location","Layout","Locale","TimeParser",function(t,e,n,r,o,i){function u(t,e){t.getFullYear()<2013&&(t=new Date(2013,0,1));for(var n=[],r=new Date(t.getFullYear(),t.getMonth(),1);e>r;){end=new Date(r.getFullYear(),r.getMonth()+1,r.getDate());var i={from:r,to:r,end:end,name:o.months[r.getMonth()].name+" "+r.getFullYear()};i.toName=o.until+i.name,n.push(i),r=end}return n.reverse(),n}t.stops=r.getStops(),t.origin=null,t.destination=null,t.months=o.months;var a=r.getRoutesDateRange();t.periods=u(a.min,a.max),t.startPeriod=t.periods[0],t.endPeriod=t.periods[0],t.formValid=function(){return!!t.origin&&!!t.destination&&t.origin!=t.destination&&t.startPeriod.from<=t.endPeriod.to},t.stopName=function(t){var e=r.findStop(t);return e?e.name:null},t.goToRoutes=function(){t.noRoutes=!1,t.loading=!0;var e={from:t.startPeriod.from,to:t.endPeriod.to,end:t.endPeriod.end},o=e.from,u=e.end,a=i.formatPeriod(e);r.findRoutesByPeriod(t.origin.id,t.destination.id,o,u).then(function(e){0===e.length?t.noRoutes=!0:1==e.length?n.path("/"+a+"/routes/"+e[0].id):n.path("/"+a+"/select-route/"+t.origin.id+"/"+t.destination.id)})["finally"](function(){t.loading=!1})},t.dismissError=function(){t.noRoutes=!1}}]),angular.module("RouteExplorer").directive("rexPercentBar",["env",function(t){return{restrict:"E",scope:{value:"=value",type:"=type"},templateUrl:t.baseDir+"/tpls/PercentBar.html"}}]),angular.module("RouteExplorer").filter("duration",function(){return function(t){var e=!1;t=Math.trunc(t),0>t&&(e=!0,t=-t);var n=Math.trunc(t/60);t-=60*n;var r=Math.trunc(n/60);n-=60*r,10>t&&(t="0"+t),10>n&&0!==r&&(n="0"+n);var o=n+":"+t;return 0!==r&&(o=r+":"+o),e&&(o="-"+o),o}}),angular.module("RouteExplorer").factory("Layout",["$http","$q",function(t,e){var n=[],r={},o=[],i={},u=e.all([t.get("/api/stops").then(function(t){n=t.data.map(function(t){return{id:t.stop_id,name:t.heb_stop_names[0],names:t.heb_stop_names}}),n.forEach(function(t){r[t.id]=t})}),t.get("/api/all-routes").then(function(t){o=t.data.map(function(t){return{id:t.id,stops:t.stop_ids,count:t.count,minDate:new Date(t.min_date),maxDate:new Date(t.max_date)}}),i=o.reduce(function(t,e){return t[e.id]=e,t},{})})]),a=function(t){return r[t]||null},l=function(t,e,n){var r={};return t.forEach(function(t){var o=t.stops.indexOf(e),i=t.stops.indexOf(n);if(!(0>o||0>i||o>i)){var u=t.stops,a=t.id;a in r?r[a].count+=t.count:r[a]={id:a,stops:u,count:t.count}}}),r=Object.keys(r).map(function(t){return r[t]}),r.sort(function(t,e){return e.count-t.count}),r},s=function(n,r,i,u){var a=e.defer(),s=l(o,n,r);if(0===s.length)a.resolve([]);else{var c=i,d=u;t.get("/api/all-routes-by-date",{params:{from_date:c.getTime(),to_date:d.getTime()}}).then(function(t){var e=t.data.map(function(t){return{id:t.id,stops:t.stop_ids,count:t.count}});a.resolve(l(e,n,r))},function(t){a.reject({msg:"Error fetching routes",response:t})})}return a.promise},c=function(t){return i[t]||null},d=function(){var t=new Date(1900,0,1),e=new Date(2100,0,1);for(var n in o)route=o[n],0!==route.count&&(route.minDate&&route.minDate<e&&(e=route.minDate),route.maxDate&&route.maxDate>t&&(t=route.maxDate));return{min:e,max:t}};return service={getStops:function(){return n},getRoutes:function(){return o},findRoute:c,findStop:a,findRoutes:function(t,e){return l(o,t,e)},findRoutesByPeriod:s,getRoutesDateRange:d},u.then(function(){return service})}]),angular.module("RouteExplorer").constant("Locale",{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"].map(function(t,e){return{id:e+1,name:t}}),days:[{abbr:"א",name:"ראשון",id:1},{abbr:"ב",name:"שני",id:2},{abbr:"ג",name:"שלישי",id:3},{abbr:"ד",name:"רביעי",id:4},{abbr:"ה",name:"חמישי",id:5},{abbr:"ו",name:"שישי",id:6},{abbr:"ש",name:"שבת",id:7}],until:"עד ל"}),angular.module("RouteExplorer").factory("LocationBinder",["$location",function(t){return{bind:function(e,n,r,o,i){e[n]=t.search()[r]||null,e.$watch(n,function(e){i&&(e=i(e)),t.search(r,e)}),e.$watch(function(){return t.search()[r]||null},function(t){o&&(t=o(t)),e[n]=t})}}}]),angular.module("RouteExplorer").factory("TimeParser",[function(){function t(t){var e=Number(t.substr(0,4)),n=Number(t.substr(4,2));return new Date(e,n-1,1)}function e(e){var n=e.split("-",2),r=t(n[0]),o=n.length>1?t(n[1]):r,i=new Date(o.getFullYear(),o.getMonth()+1,1);return{from:r,to:o,end:i}}function n(t){return t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)}function r(t){var e=n(t.from);return t.from<t.to&&(e+="-"+n(t.to)),e}return{parseMonth:t,parsePeriod:e,formatMonth:n,formatPeriod:r}}]);
//# sourceMappingURL=app.js.map
