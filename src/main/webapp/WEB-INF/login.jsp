<html>
<head>
<title>Login Page</title>
<link href="assets/css/login.css" rel="stylesheet" type="text/css" />
<link href="assets/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

</head>
<body style="background: #eee">

	<div class="container">

        <div id="login-wraper">
            <form class="form-horizontal" name='loginForm'
		     action="j_spring_security_check" method='POST'>
                <legend>Sign in to <span class="blue">KumoNote</span></legend>

				<div class="form-group">
					<label for="username" class="col-sm-3 control-label">Username:</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" name='username' id="username">
					</div>
				</div>
				
				<div class="form-group">
					<label for="password" class="col-sm-3 control-label">Password:</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" name='password' id="password">
					</div>
				</div>

                <input name="submit" class="btn btn-block btn-success" type="submit"
					value="Login" />
            
            </form>
        
        </div>

    </div>
	<footer class="white navbar-fixed-bottom">
      Copyright © Michael Yu 2015. All Rights Reserved
    </footer>
 
</body>
</html>