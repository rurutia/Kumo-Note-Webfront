	<div class="panel panel-primary" ng-controller="noteDetailControl">
	  <div class="panel-heading">Detail View</div>
	  <div class="panel-body">
		<form method="post" class="form-horizontal">
		  <div class="form-group">
		    <label class="col-md-2 control-label">id</label>
		    <pre class="col-md-3">{{note.id}}</pre>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail1" class="col-md-2 control-label">Subject</label>
		    <div class="col-md-10">
		      <input name="subject" ng-model="note.subject" type="text" class="form-control" placeholder="subject">
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputPassword1" class="col-md-2 control-label">Content</label>
		    <div class="col-md-10">
		      <textarea name="content" ng-model="note.content" class="form-control" placeholder="content" rows="3"></textarea>
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-md-2 control-label">Type</label>
			<pre class="col-md-6" ng-click="isCategorySelectionShow=true">{{note.type}}</pre>
		  </div>
		  
		  <div class="form-group" ng-show="isCategorySelectionShow">
		   <div class="col-md-10 col-md-offset-2">
				<select name="type" ng-model="note.type" ng-options="c.value as c.label group by c.group for c in categories"
				 multiple class="form-control" tabindex="1" size="8" ng-click="window.alert('dd')">
					<option value=""></option>
				</select>		
			</div>
		  </div>
			<div class="form-actions">
				<button type="submit" class="btn btn-primary btn-small" ng-click="updateNote()">Update</button>
				<button type="reset" class="btn btn-small">Reset</button> 
				<button class="btn btn-danger btn-small" ng-click="deleteNote()">delete</button>
			</div>
		</form>
	  </div>
	</div>

	</div>