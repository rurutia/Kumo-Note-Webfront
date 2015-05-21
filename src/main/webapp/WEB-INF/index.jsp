<!DOCTYPE html>
<html ng-app="kumoNoteApp">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Kumo Note - powered by AngularJS</title>

    <!-- Bootstrap Core CSS -->
    <link href="assets/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

    <!-- jQuery UI CSS // commented out to use bootstrap css and js -->
<!--     <link href="assets/libs/jquery/jquery-ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
 -->
    <!-- Landing-page CSS -->
    <link href="assets/css/landing-page.css" rel="stylesheet">
    
    <!-- Prism CSS -->
    <link href="assets/libs/prism/prism.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="assets/libs/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
    
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <style type="text/css">
		tr.selected {
			background-color:#ccc;
		}
	</style>

</head>

<body>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Kumo Note</a>
            </div>

            <div class="navbar-header navbar-text" ng-cloak>
                <date-timer />
            </div>   

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a ui-sref="calculator">Calculator</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"
						role="button" aria-expanded="false">User <span
						class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">Profile</a></li>
							<li><a href="j_spring_security_logout">Logout</a></li>
						</ul>
					</li>
				</ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Header -->
    <div class="intro-header">
		<div class="container">

<!--             <div class="row">
                <div class="col-lg-12">
                    <div class="intro-message">
                        <h1>Kumo Note</h1>
                        <h3>A Cloud Note Taking Service powered by AngularJS</h3>
                        <hr class="intro-divider">
                        <ul class="list-inline intro-social-buttons">
                            <li>
                                <a href="https://github.com/rurutia/angular-js-spring-mybatis" class="btn btn-default btn-lg"><i class="fa fa-github fa-fw"></i> <span class="network-name">Github</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->

        </div>
        <!-- /.container -->

    </div>
    <!-- /.intro-header -->

    <!-- Page Content -->
     <div class="content-section-a">

		<div class="container" ng-cloak>
		
			<ol class="breadcrumb" ng-controller="navigationControl">
			  <li ng-repeat="item in itemList" ng-class="{'active': item.isActive}">
				<span ng-if="item.isActive" ng-cloak>{{item.text}}</span>  
 			  	<a ng-if="!item.isActive" ui-sref="{{item.link}}">{{item.text}}</a>
 			  </li>
			</ol>
			<!-- HERE WILL BE LOADED AN AJAX CONTENT -->
			<ui-view ng-cloak></ui-view>
		</div>
        <!-- /.container -->

    </div>
    <!-- /.content-section-a -->

<!--     <div class="content-section-b">

        <div class="container">

            <div class="row">
                <div class="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                    <hr class="section-heading-spacer">
                    <div class="clearfix"></div>
                    <h2 class="section-heading">3D Device Mockups<br>by PSDCovers</h2>
                    <p class="lead">Turn your 2D designs into high quality, 3D product shots in seconds using free Photoshop actions by <a target="_blank" href="http://www.psdcovers.com/">PSDCovers</a>! Visit their website to download some of their awesome, free photoshop actions!</p>
                </div>
                <div class="col-lg-5 col-sm-pull-6  col-sm-6">
                    <img class="img-responsive" src="assets/img/dog.png" alt="">
                </div>
            </div>

        </div>
        /.container

    </div> -->
    <!-- /.content-section-b -->

<!--     <div class="content-section-a">

        <div class="container">

            <div class="row">
                <div class="col-lg-5 col-sm-6">
                    <hr class="section-heading-spacer">
                    <div class="clearfix"></div>
                    <h2 class="section-heading">Google Web Fonts and<br>Font Awesome Icons</h2>
                    <p class="lead">This template features the 'Lato' font, part of the <a target="_blank" href="http://www.google.com/fonts">Google Web Font library</a>, as well as <a target="_blank" href="http://fontawesome.io">icons from Font Awesome</a>.</p>
                </div>
                <div class="col-lg-5 col-lg-offset-2 col-sm-6">
                    <img class="img-responsive" src="assets/img/phones.png" alt="">
                </div>
            </div>

        </div>
        /.container

    </div> -->
    <!-- /.content-section-a -->

<%--     <div class="banner">

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
        <!-- /.container -->

    </div> --%>
    <!-- /.banner -->

    <!-- Footer -->
<!--     <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-inline">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a hstyle="margin-top:5px"ref="#about">About</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                    <p class="copyright text-muted small">Copyright &copy; Michael Yu 2014. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer> -->
    <footer class="white navbar-fixed-bottom">
      Copyright � Michael Yu 2015. All Rights Reserved
    </footer>

    <!-- jQuery Version 1.10.0 -->
    <script src="assets/libs/jquery/jquery-1.10.2.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="assets/libs/bootstrap/js/bootstrap.min.js"></script>

    <!-- jQuery UI Version 1.10.0   // commented out to use bootstrap css and js -->
<!--     <script src="assets/libs/jquery/jquery-ui-1.10.4.custom.js"></script>
 -->    
    <!-- Prism -->
    <script src="assets/libs/prism/prism.js"></script>

	  <script src="assets/libs/angular/angular.js"></script>
	  <script src="assets/libs/angular/angular-resource.js"></script>
	  <script src="assets/libs/angular-modules/angular-ui-router.js"></script>
	  <script src="app/app.module.js"></script>
	  <script src="app/services.js"></script>
	  <script src="app/controllers.js"></script>
	  <script src="app/filters.js"></script>
	  <script src="app/directives.js"></script>
	  <script src="app/components/toolbar/toolbar.js"></script>
	  <script src="app/components/list/draggable-table-row.js"></script>
	  <script src="app/components/tools/calculator.js"></script>
	  
	  <script src="app/components/list/language.js"></script>
	  	  <script src="app/components/list/extra.js"></script>
	  	  	  	  <script src="app/components/list/extra2.js"></script>
	  	  
	  
	  

</body>

</html>
