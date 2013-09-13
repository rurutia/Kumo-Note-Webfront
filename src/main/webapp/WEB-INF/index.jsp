<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
   <meta content="" name="description" />
   <meta content="" name="author" />
   <!-- BEGIN GLOBAL MANDATORY STYLES -->
   <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
   <link href="assets/plugins/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
   <link href="assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
   <link href="assets/css/style-metro.css" rel="stylesheet" type="text/css"/>
   <link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
   <link href="assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
   <link href="assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
   <link href="assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
   <!-- END GLOBAL MANDATORY STYLES -->
   <!-- BEGIN PAGE LEVEL STYLES --> 
   <link href="assets/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" type="text/css"/>
   <link href="assets/plugins/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" />
   <link href="assets/plugins/fullcalendar/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css"/>
   <link href="assets/plugins/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css" media="screen"/>
   <link href="assets/plugins/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen"/>
   <!-- END PAGE LEVEL STYLES -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.js"></script>
<title>Test App</title>
</head>
<body>
<div class="header navbar navbar-inverse navbar-fixed-top">
  <!-- BEGIN TOP NAVIGATION BAR -->
  <div class="navbar-inner">
    <div class="container-fluid">
    <ul class="nav pull-right">
   <!-- BEGIN NOTIFICATION DROPDOWN -->   
   <li class="dropdown" id="header_notification_bar">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      <i class="icon-warning-sign"></i>
      <span class="badge">6</span>
      </a>
      <ul class="dropdown-menu extended notification">
         <li>
            <p>You have 14 new notifications</p>
         </li>
         <li>
            <a href="#">
            <span class="label label-success"><i class="icon-plus"></i></span>
            New user registered. 
            <span class="time">Just now</span>
            </a>
         </li>
         <li>
            <a href="#">
            <span class="label label-important"><i class="icon-bolt"></i></span>
            Server #12 overloaded. 
            <span class="time">15 mins</span>
            </a>
         </li>
         <li>
            <a href="#">
            <span class="label label-warning"><i class="icon-bell"></i></span>
            Server #2 not respoding.
            <span class="time">22 mins</span>
            </a>
         </li>
         <li>
            <a href="#">
            <span class="label label-info"><i class="icon-bullhorn"></i></span>
            Application error.
            <span class="time">40 mins</span>
            </a>
         </li>
         <li>
            <a href="#">
            <span class="label label-important"><i class="icon-bolt"></i></span>
            Database overloaded 68%. 
            <span class="time">2 hrs</span>
            </a>
         </li>
         <li>
            <a href="#">
            <span class="label label-important"><i class="icon-bolt"></i></span>
            2 user IP blocked.
            <span class="time">5 hrs</span>
            </a>
         </li>
         <li class="external">
            <a href="#">See all notifications <i class="m-icon-swapright"></i></a>
         </li>
      </ul>
   </li>
   </ul>
    </div>
  </div>
  <!-- END TOP NAVIGATION BAR -->
</div>

<!-- BEGIN SIDEBAR -->
<div class="page-sidebar nav-collapse collapse">
  <!-- MAIN MENU GOES HERE.-->
</div>
<!-- END SIDEBAR -->

<!-- BEGIN PAGE -->
<div class="page-content">
  <!-- BEGIN PAGE CONTAINER-->
  <div class="container-fluid">
    <!-- BEGIN PAGE HEADER-->
    <div class="row-fluid">
      <div class="span12">
        <!-- BEGIN PAGE TITLE & BREADCRUMB-->   
        <h3 class="page-title">
          Dashboard
          <small>statistics and more</small>
        </h3>
        <ul class="breadcrumb">
          <li>
            <i class="icon-home"></i>
            <a href="#">Home</a> 
            <span class="icon-angle-right"></span>
          </li>
          <li><a href="#">Dashboard</a></li>
        </ul>
        <!-- END PAGE TITLE & BREADCRUMB--> 
      </div>
    </div>
    <!-- END PAGE HEADER-->
    <!-- CONTENT BODY GOES HERE >>>> -->
    <div>
    <table ng-controller="taskControl">
   <tr><th>id</th><th>name1</th></tr>
   <tbody>
      <tr data-ng-repeat="task in tasks">
        <td>{{ task.id }}</td>
        <td>{{ task.name }}</td>
      </tr>
    </tbody>
</table>
    </div>
  </div>   
  <!-- END PAGE CONTAINER-->
</div>      
<!-- END PAGE -->


<script>
   function taskControl($scope, $http) {
	  $http.get('http://localhost:8080/maven-webapp/welcome').success(function(data) {
	    $scope.tasks = data;
	  });
	}
</script>


  <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
  <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
   <!-- BEGIN CORE PLUGINS -->
  <script src="assets/plugins/jquery-1.10.1.min.js" type="text/javascript"></script>
   <script src="assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
   <!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
   <script src="assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
   <script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
   <!--[if lt IE 9]>
   <script src="assets/plugins/excanvas.min.js"></script>
   <script src="assets/plugins/respond.min.js"></script>  
   <![endif]-->   
   <script src="assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
   <script src="assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>  
   <script src="assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
   <script src="assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript" ></script>
  <!-- END CORE PLUGINS -->
   <!-- BEGIN PAGE LEVEL PLUGINS -->
   <script src="assets/plugins/jqvmap/jqvmap/jquery.vmap.js" type="text/javascript"></script>   
   <script src="assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js" type="text/javascript"></script>
   <script src="assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js" type="text/javascript"></script>
   <script src="assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js" type="text/javascript"></script>
   <script src="assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js" type="text/javascript"></script>
   <script src="assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js" type="text/javascript"></script>
   <script src="assets/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js" type="text/javascript"></script>  
   <script src="assets/plugins/flot/jquery.flot.js" type="text/javascript"></script>
   <script src="assets/plugins/flot/jquery.flot.resize.js" type="text/javascript"></script>
   <script src="assets/plugins/jquery.pulsate.min.js" type="text/javascript"></script>
   <script src="assets/plugins/bootstrap-daterangepicker/date.js" type="text/javascript"></script>
   <script src="assets/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>     
   <script src="assets/plugins/gritter/js/jquery.gritter.js" type="text/javascript"></script>
   <script src="assets/plugins/fullcalendar/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
   <script src="assets/plugins/jquery-easy-pie-chart/jquery.easy-pie-chart.js" type="text/javascript"></script>
   <script src="assets/plugins/jquery.sparkline.min.js" type="text/javascript"></script>  
   <!-- END PAGE LEVEL PLUGINS -->
   <!-- BEGIN PAGE LEVEL SCRIPTS -->
   <script src="assets/scripts/app.js" type="text/javascript"></script>
   <script src="assets/scripts/index.js" type="text/javascript"></script>        
   <!-- END PAGE LEVEL SCRIPTS -->  
   <script>
      jQuery(document).ready(function() {    
         App.init(); // initlayout and core plugins
         Index.init();
         Index.initJQVMAP(); // init index page's custom scripts
         Index.initCalendar(); // init index page's custom scripts
         Index.initCharts(); // init index page's custom scripts
         Index.initChat();
         Index.initMiniCharts();
         Index.initDashboardDaterange();
         Index.initIntro();
      });
   </script>
  <!-- END JAVASCRIPTS -->

</body>
</html>