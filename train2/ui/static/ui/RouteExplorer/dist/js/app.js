!function(){var t=angular.module("RouteExplorer",["ngRoute","ui.bootstrap","ui.bootstrap.buttons"]);t.constant("env",{baseDir:"/static/ui/RouteExplorer"}),t.config(["$routeProvider","env",function(t,e){var r=function(t){return e.baseDir+"/tpls/"+t+".html"};t.when("/",{pageId:"welcome",templateUrl:r("SelectStops"),controller:"SelectStopsController",resolve:{Layout:"Layout"}}).when("/about",{pageId:"about",templateUrl:r("About")}).when("/:period/select-route/:origin/:destination",{pageId:"routes",templateUrl:r("SelectRoute"),controller:"SelectRouteController",resolve:{Layout:"Layout"},reloadOnSearch:!1}).when("/:period/routes/:routeId",{pageId:"route",templateUrl:r("RouteDetails"),controller:"RouteDetailsController",resolve:{Layout:"Layout"},reloadOnSearch:!1}).when("/explore",{pageId:"explore",templateUrl:r("Explore"),controller:"ExploreController"}).otherwise({redirectTo:"/"})}])}(),String.prototype.repeat||(String.prototype.repeat=function(t){"use strict";if(null===this)throw new TypeError("can't convert "+this+" to object");var e=""+this;if(t=+t,t!=t&&(t=0),0>t)throw new RangeError("repeat count must be non-negative");if(t==1/0)throw new RangeError("repeat count must be less than infinity");if(t=Math.floor(t),0===e.length||0===t)return"";if(e.length*t>=1<<28)throw new RangeError("repeat count must not overflow maximum string size");for(var r="";1==(1&t)&&(r+=e),t>>>=1,0!==t;)e+=e;return r}),angular.module("RouteExplorer").controller("AppController",["$scope","$location",function(t,e){t.share=function(t){var r=t+encodeURIComponent("http://otrain.org/#"+e.url());window.open(r,"sharePopup","width=600,height=550,top=100,left=100,location=no,scrollbar=no,status=no,menubar=no")},t.$on("$routeChangeSuccess",function(e,r){t.bodyClass=r.pageId?"rex-page-"+r.pageId:null})}]),angular.module("RouteExplorer").controller("ExploreController",["$scope","$route","$http","$location","LocationBinder","Layout","Locale","TimeParser",function(t,e,r,n,o,a,i,u){}]),angular.module("RouteExplorer").controller("RouteDetailsController",["$scope","$route","$http","$location","LocationBinder","Layout","Locale","TimeParser",function(t,e,r,n,o,a,i,u){function l(t,e){return t=t||"all",e=e||"all",D[t]&&D[t][e]?D[t][e]:null}function s(){var e=l(t.selectedDay,t.selectedTime);return e?e.stops:[]}function c(e){t.times=[];var r={};for(var n in e){var o=e[n],a="all"==o.info.hours?"all":o.info.hours[0]+"-"+o.info.hours[1],i=o.info.week_day;if(D[i]||(D[i]={}),D[i][a]=o,"all"!=a&&!r[a]){var u={id:a,from:d(o.info.hours[0]),to:d(o.info.hours[1])};r[a]=u,t.times.push(u)}}}function d(t){return("0"+t%24).slice(-2)+":00"}function f(t){return i.months[t.getMonth()].name+" "+t.getFullYear()}function p(t,e){var r=new Date(t);return r.setMonth(r.getMonth()+e),r}function m(t,e){var r=12*(t.to.getFullYear()-t.from.getFullYear())+t.to.getMonth()-t.from.getMonth()+1;return{from:p(t.from,r*e),to:p(t.to,r*e),end:p(t.end,r*e)}}var g=e.current.params,h=u.parsePeriod(g.period),v=u.createRequestString(h.from),y=u.createRequestString(h.end),R=g.routeId,b=a.findRoute(R).stops,D={};t.loaded=!1,t.stopIds=b,t.origin=b[0],t.destination=b[b.length-1],t.selectedPeriod=f(h.from),h.to>h.from&&(t.selectedPeriod+=" — "+f(h.to)),t.selectedDay=null,t.days=i.days,t.selectedTime=null,t.times=[],t.selectRouteUrl="#/"+g.period+"/select-route/"+t.origin+"/"+t.destination;var S=m(h,-1),x=m(h,1),w=a.getRoutesDateRange(),E=864e6;t.previousPeriodUrl=w.min.getTime()-E<S.from.getTime()?"#/"+u.formatPeriod(S)+"/routes/"+R:null,t.nextPeriodUrl=w.max>x.to?"#/"+u.formatPeriod(x)+"/routes/"+R:null,r.get("/api/v1/stats/route-info-full",{params:{route_id:R,from_date:v,to_date:y}}).success(function(e){c(e),t.loaded=!0}),o.bind(t,"selectedDay","day",function(t){return t?Number(t):null}),o.bind(t,"selectedTime","time"),t.stopStats=function(t){var e=s();for(var r in e)if(e[r].stop_id==t)return e[r];return null},t.stopName=function(t){var e=a.findStop(t);return e?e.name:null},t.isDayEmpty=function(t){var e=t.id,r=D[e];if(!r)return!0;for(var n in r)if(r[n].info.num_trips>0)return!1;return!0},t.isTimeEmpty=function(e){var r=t.selectedDay||"all",n=e.id,o=D[r]&&D[r][n];return o&&o.info.num_trips>0?!1:!0},t.tripCount=function(t,e){var r=l(t,e);return r?r.info.num_trips:0}}]),angular.module("RouteExplorer").controller("SelectRouteController",["$scope","$http","$location","$route","Layout","TimeParser",function(t,e,r,n,o,a){function i(e){t.stats=e}function u(t){var e=o.findStop(t);return e?e.name:null}function l(t){function e(t){var e={};for(var r in t){var n=t[r];for(var o in n.stops){var a=n.stops[o];e[a]||(e[a]=0),e[a]++}}return e}function r(t,e){var r={};for(var n in t)t[n]==e&&(r[n]=!0);return r}function n(t,e){var r,n=[];for(var o in t){var a=t[o];o>0&&o<t.length-1&&e[a]?(r||(r=[],n.push(r)),r.push(a)):(r=null,n.push(a))}return n}var o=r(e(t),t.length);delete o[c.id],delete o[d.id];for(var a in t)t[a].stops=n(t[a].stops,o)}t.stops=o.getStops();var s=a.parsePeriod(n.current.params.period),c=o.findStop(n.current.params.origin),d=o.findStop(n.current.params.destination);e.get("/api/v1/stats/path-info-full",{params:{origin:c.id,destination:d.id,from_date:a.createRequestString(s.from),to_date:a.createRequestString(s.end)}}).success(function(e){i(e),t.loaded=!0});o.findRoutesByPeriod(c.id,d.id,s.from,s.end).then(function(e){e.length>1&&l(e),t.routes=e}),t.isCollapsed=function(t){return angular.isArray(t)},t.isOrigin=function(t){return t==c.id},t.isDestination=function(t){return t==d.id},t.stopText=function(e){return t.isCollapsed(e)?"•".repeat(e.length):u(e)},t.stopTooltip=function(e){return t.isCollapsed(e)?e.map(u).join(", "):null},t.barWidth=function(e){var r=100*e.count/t.routes[0].count;return 1>r?"1px":r+"%"},t.routeUrl=function(t){return"/#/"+n.current.params.period+"/routes/"+t.id}}]),angular.module("RouteExplorer").controller("SelectStopsController",["$scope","$rootScope","$location","Layout","Locale","TimeParser",function(t,e,r,n,o,a){function i(t,e){t.getFullYear()<2013&&(t=new Date(2013,0,1));for(var r=[],n=new Date(t.getFullYear(),t.getMonth(),1);e>n;){end=new Date(n.getFullYear(),n.getMonth()+1,n.getDate());var a={from:n,to:n,end:end,name:o.months[n.getMonth()].name+" "+n.getFullYear()};a.toName=o.until+a.name,r.push(a),n=end}return r.reverse(),r}t.stops=n.getStops(),t.origin=null,t.destination=null,t.months=o.months;var u=n.getRoutesDateRange();t.periods=i(u.min,u.max),t.startPeriod=t.periods[0],t.endPeriod=t.periods[0],t.formValid=function(){return!!t.origin&&!!t.destination&&t.origin!=t.destination&&t.startPeriod.from<=t.endPeriod.to},t.stopName=function(t){var e=n.findStop(t);return e?e.name:null},t.goToRoutes=function(){t.noRoutes=!1,t.loading=!0;var e={from:t.startPeriod.from,to:t.endPeriod.to,end:t.endPeriod.end},o=e.from,i=e.end,u=a.formatPeriod(e);n.findRoutesByPeriod(t.origin.id,t.destination.id,o,i).then(function(e){0===e.length?t.noRoutes=!0:1==e.length?r.path("/"+u+"/routes/"+e[0].id):r.path("/"+u+"/select-route/"+t.origin.id+"/"+t.destination.id)})["finally"](function(){t.loading=!1})},t.dismissError=function(){t.noRoutes=!1}}]),angular.module("RouteExplorer").controller("TimesDetailsController",["$scope","$route","Locale","LocationBinder","Layout",function(t,e,r,n,o){function a(t){return("0"+t%24).slice(-2)+":00"}function i(){var e=u(t.selectedDay,t.selectedTime);return e?e.stops:[]}function u(t,e){return t=t||"all",e=e||"all",l[t]&&l[t][e]?l[t][e]:null}o.then(function(e){t.layout=e}),t.layout=null;var l={},s=e.current.params;t.stopIds=[parseInt(s.origin),parseInt(s.destination)],n.bind(t,"selectedDay","day",function(t){return t?Number(t):null}),n.bind(t,"selectedTime","time"),t.stopName=function(e){if(t.layout){var r=t.layout.findStop(e);return r?r.name:null}return null},t.selectedDay=null,t.days=r.days,t.selectedTime=null,t.times=[],t.loadStats=function(){var e=t.stats;t.times=[];var r={};for(var n in e){var o=e[n],i="all"==o.info.hours?"all":o.info.hours[0]+"-"+o.info.hours[1],u=o.info.week_day;if(l[u]||(l[u]={}),l[u][i]=o,"all"!=i&&!r[i]){var s={id:i,from:a(o.info.hours[0]),to:a(o.info.hours[1])};r[i]=s,t.times.push(s)}}},t.tripCount=function(t,e){var r=u(t,e);return r?r.info.num_trips:0},t.isTimeEmpty=function(e){var r=t.selectedDay||"all",n=e.id,o=l[r]&&l[r][n];return o&&o.info.num_trips>0?!1:!0},t.stopStats=function(t){var e=i();for(var r in e)if(e[r].stop_id==t)return e[r];return null},t.loadStats()}]),angular.module("RouteExplorer").directive("rexPercentBar",["env",function(t){return{restrict:"E",scope:{value:"=value",type:"=type"},templateUrl:t.baseDir+"/tpls/PercentBar.html"}}]),angular.module("RouteExplorer").directive("timesDetails",["env","Layout",function(t,e){return{restrict:"E",scope:{stats:"="},controller:"TimesDetailsController",templateUrl:t.baseDir+"/tpls/TimesDetails.html"}}]),angular.module("RouteExplorer").filter("duration",function(){return function(t){var e=!1;t=Math.trunc(t),0>t&&(e=!0,t=-t);var r=Math.trunc(t/60);t-=60*r;var n=Math.trunc(r/60);r-=60*n,10>t&&(t="0"+t),10>r&&0!==n&&(r="0"+r);var o=r+":"+t;return 0!==n&&(o=n+":"+o),e&&(o="-"+o),o}}),angular.module("RouteExplorer").factory("Layout",["$http","$q","TimeParser",function(t,e,r){var n=[],o={},a=[],i={},u=e.all([t.get("/api/v1/stops").then(function(t){n=t.data.map(function(t){return{id:t.stop_id,name:t.heb_stop_names[0],names:t.heb_stop_names}}),n.forEach(function(t){o[t.id]=t})}),t.get("/api/v1/routes/all/").then(function(t){a=t.data.map(function(t){return{id:t.id,stops:t.stop_ids,count:t.count,minDate:new Date(t.min_date),maxDate:new Date(t.max_date)}}),i=a.reduce(function(t,e){return t[e.id]=e,t},{})})]),l=function(t){return o[t]||null},s=function(t,e,r){var n={};return t.forEach(function(t){var o=t.stops.indexOf(e),a=t.stops.indexOf(r);if(!(0>o||0>a||o>a)){var i=t.stops,u=t.id;u in n?n[u].count+=t.count:n[u]={id:u,stops:i,count:t.count}}}),n=Object.keys(n).map(function(t){return n[t]}),n.sort(function(t,e){return e.count-t.count}),n},c=function(n,o,i,u){var l=e.defer(),c=s(a,n,o);if(0===c.length)l.resolve([]);else{var d=i,f=u;t.get("/api/v1/routes/all-by-date",{params:{from_date:r.createRequestString(d),to_date:r.createRequestString(f)}}).then(function(t){var e=t.data.map(function(t){return{id:t.id,stops:t.stop_ids,count:t.count}});l.resolve(s(e,n,o))},function(t){l.reject({msg:"Error fetching routes",response:t})})}return l.promise},d=function(t){return i[t]||null},f=function(){var t=new Date(1900,0,1),e=new Date(2100,0,1);for(var r in a){var n=a[r];0!==n.count&&(n.minDate&&n.minDate<e&&(e=n.minDate),n.maxDate&&n.maxDate>t&&(t=n.maxDate))}return{min:e,max:t}};return service={getStops:function(){return n},getRoutes:function(){return a},findRoute:d,findStop:l,findRoutes:function(t,e){return s(a,t,e)},findRoutesByPeriod:c,getRoutesDateRange:f},u.then(function(){return service})}]),angular.module("RouteExplorer").constant("Locale",{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"].map(function(t,e){return{id:e+1,name:t}}),days:[{abbr:"א",name:"ראשון",id:1},{abbr:"ב",name:"שני",id:2},{abbr:"ג",name:"שלישי",id:3},{abbr:"ד",name:"רביעי",id:4},{abbr:"ה",name:"חמישי",id:5},{abbr:"ו",name:"שישי",id:6},{abbr:"ש",name:"שבת",id:7}],until:"עד ל"}),angular.module("RouteExplorer").factory("LocationBinder",["$location",function(t){return{bind:function(e,r,n,o,a){e[r]=t.search()[n]||null,e.$watch(r,function(e){a&&(e=a(e)),t.search(n,e)}),e.$watch(function(){return t.search()[n]||null},function(t){o&&(t=o(t)),e[r]=t})}}}]),angular.module("RouteExplorer").factory("TimeParser",[function(){function t(t){var e=t.getDate().toString(),r=(t.getMonth()+1).toString(),n=t.getFullYear().toString();return e+"/"+r+"/"+n}function e(t){var e=Number(t.substr(0,4)),r=Number(t.substr(4,2));return new Date(e,r-1,1)}function r(t){var r=t.split("-",2),n=e(r[0]),o=r.length>1?e(r[1]):n,a=new Date(o.getFullYear(),o.getMonth()+1,1);return{from:n,to:o,end:a}}function n(t){return t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)}function o(t){var e=n(t.from);return t.from<t.to&&(e+="-"+n(t.to)),e}return{createRequestString:t,parseMonth:e,parsePeriod:r,formatMonth:n,formatPeriod:o}}]);
//# sourceMappingURL=app.js.map
