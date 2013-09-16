<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
   <link href="resource/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<title>Note App</title>
</head>
<body>
<div class="container">
	<div class="panel panel-primary" ng-controller="addNoteControl">
	  <div class="panel-heading">Add new note</div>
	  <div class="panel-body">
		<form action="save-note" method="post" class="form-horizontal">
		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">Subject</label>
		    <div class="col-lg-10">
		      <input name="subject" ng-model="note.subject" type="text" class="form-control" placeholder="subject">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputPassword1" class="col-lg-2 control-label">Content</label>
		    <div class="col-lg-10">
		      <textarea name="content" ng-model="note.content" class="form-control" placeholder="content" rows="3"></textarea>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputPassword1" class="col-lg-2 control-label">Type</label>
		   <div class="col-lg-10">
				<select name="type" ng-model="note.category" multiple class="form-control" tabindex="1">
					<option value="{{category.value}}" ng-repeat="category in categories">
				    	{{category.text}}
				 	</option>
				</select>		
			</div>
		  </div>
			<div class="form-actions">
				<button type="submit" class="btn btn-primary">Submit</button>
				<button type="reset" class="btn">Reset</button> 
				<button type="button" class="btn btn-danger" ng-click="postFormData()">Ajax</button>     
			</div>
		</form>
	  </div>
	</div>
	
	<div class="panel panel-primary" ng-controller="noteListControl">
	  <div class="panel-heading">List notes</div>
	  <div class="panel-body">
	    <select ng-model="orderProp">
			<option value="id" selected="selected">id(smallest)</option>
			<option value="-id" selected="selected">id(biggest)</option>
			<option value="subject">subject</option>
			<option value="date">date</option>
		</select>
		
		<table  class="table table-striped table-hover">
			<thead>
				<tr>
					<th>#</th>
					<th>Subject</th>
					<th>Content</th>
					<th>Type</th>
					<th>Timestamp</th>
				</tr>
			</thead>
			<tbody>
		      <tr data-ng-repeat="task in tasks | orderBy:orderProp">
		        <td>{{ task.id }}</td>
		        <td>{{ task.subject }}</td>
		        <td>{{ task.content }}</td>
		        <td>{{ task.type }}</td>
		        <td>{{ task.date }}</td>
		      </tr>
			</tbody>
		</table>
	  </div>
	</div>
	
</div>
                   

  <script src="resource/lib/angular/angular.js"></script>
  <script src="resource/js/app.js"></script>
  <script src="resource/js/services.js"></script>
  <script src="resource/js/controllers.js"></script>
  <script src="resource/js/filters.js"></script>
  <script src="resource/js/directives.js"></script>
  <script src="resource/js/jquery-1.10.2.min.js"></script>
  <script src="resource/js/bootstrap.min.js"></script>
  

</body>
</html>