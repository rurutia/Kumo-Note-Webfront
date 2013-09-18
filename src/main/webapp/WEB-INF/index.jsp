<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<link href="resource/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<style type="text/css">
tr.selected {
	background-color:#ccc;
}
</style>
<title>Note App</title>
</head>
<body>

<div class="container">

<ol class="breadcrumb" ng-controller="navigationControl">
  <li id="linkHome">
    <span ng-show="isActive">Home</span>
  	<a ng-hide="isActive" href="#/list" ng-click="isActive=true">Home</a>
  </li>
  <li id="linkDetail" ng-show="isDetailActive">
    <span>Detail</span>
  </li>
</ol>

 <div ng-view></div>
</div>

  <script src="resource/lib/angular/angular.js"></script>
  <script src="resource/lib/angular/angular-resource.js"></script>
  <script src="resource/js/app.js"></script>
  <script src="resource/js/services.js"></script>
  <script src="resource/js/controllers.js"></script>
  <script src="resource/js/filters.js"></script>
  <script src="resource/js/directives.js"></script>
  <script src="resource/js/jquery-1.10.2.min.js"></script>
  <script src="resource/js/bootstrap.min.js"></script>
</body>
</html>