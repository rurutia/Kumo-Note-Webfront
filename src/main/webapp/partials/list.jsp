	<h5>app started time: {{appStartedTime}}</h5>
	<h5>{{myApplication}} {{rule}}</h5>
	
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
		      <span>chars entered: {{note.content.length}}</span>
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-lg-2 control-label">Type</label>
		   <div class="col-lg-10">
				<select name="type" ng-model="note.category" ng-options="c.value as c.label group by c.group for c in categories"
				 multiple class="form-control" tabindex="1" size="8">
					<option value=""></option>
				</select>		
			</div>
		  </div>
			<div class="form-actions">
				<button type="button" class="btn btn-primary btn-small" ng-click="postFormData()">Save</button>     
				<button type="reset" class="btn">Reset</button> 
			</div>
		</form>
	  </div>
	</div>
	
	<div class="panel panel-primary" id="noteList" ng-controller="noteListControl">
	  <div class="panel-heading">List notes</div>
	  <div class="panel-body">
	    <select ng-model="orderProp">
			<option value="id" selected="selected">id(smallest)</option>
			<option value="-id" selected="selected">id(biggest)</option>
			<option value="subject">subject</option>
			<option value="date">date</option>
		</select>
		
		<table  class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Subject</th>
					<th>Content</th>
					<th>Type</th>
					<th>Timestamp</th>
					<th style="width:200px">Action</th>
				</tr>
			</thead>
			<tbody>
		      <tr data-ng-repeat="note in notes | orderBy:orderProp" ng-controller="noteItemController" ng-class="{selected: isSelected}"
		      ng-mouseenter="isSelected=true" ng-mouseleave="isSelected=false"
		      > 
		        <td>{{ note.id }}</td>
		        <td>{{ note.subject }}</td>
		        <td>{{ note.content }}</td>
		        <td>{{ note.type }}</td>
		        <td>{{ note.date }}</td>
		        <td>
		        	<button class="btn btn-danger btn-small" ng-show="isSelected" ng-click="deleteNote(note.id)">delete</button>
		        	<a href="#/detail/{{note.id}}/{{note.subject}}/{{note.content}}/{{note.type}}" class="btn btn-danger btn-small" ng-show="isSelected">view</a>  
		        </td>
		      </tr>
			</tbody>
		</table>
	  </div>
	</div>