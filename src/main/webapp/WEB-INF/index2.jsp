<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="easyNote">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
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
  	<a ng-hide="isActive" href="${pageContext.request.contextPath}" ng-click="isActive=true">Home</a>
  </li>
  <li id="linkDetail" ng-show="isDetailActive">
    <span>Detail</span>
  </li>
</ol>

	<!-- HERE WILL BE LOADED AN AJAX CONTENT -->
	<ui-view ng-cloak></ui-view>
</div>

  <script src="vendor/jquery/jquery-1.10.2.min.js"></script>
  <script src="vendor/angular/angular.js"></script>
  <script src="vendor/angular/angular-resource.js"></script>
  <script src="vendor/angular-modules/angular-ui-router.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <script src="app/app.js"></script>
  <script src="app/services.js"></script>
  <script src="app/controllers.js"></script>
  <script src="app/filters.js"></script>
  <script src="app/directives.js"></script>



</body>
</html>