	<div ng-controller="appInfo" style="text-align:center">
		<h5>{{myApplication.describe()}} {{rule}}</h5>
	</div>

	<h5 style="text-align:center">App started time: {{appStartedTime}}</h5>
		
	<div class="row" ng-controller="currentTimeControl">
		<div class="col-md-3">Current time: {{appCurrentTime}}</div>
		<div class="col-md-3">
		<form role="form-inline">
		  	<div class="form-group">
			  	<label>
				<input type="checkbox" ng-model="dateTime.isRefresh" ng-change="change()" />
				Refresh
				</label>
			</div>
		</form>
		</div>
	</div>
	
	
<div class="panel-group" id="addNoteAccordion" ng-controller="addNoteControl">	
	<div class="panel panel-primary note-panel-accordion" >
	  <div id="addNoteCollapseHeading" class="panel-heading">
		  <h5 class="panel-title">
	        <a data-toggle="collapse">
	          Add Note
	        </a>
	      </h5>
	  </div>
	  <div class="panel-collapse collapse">
		  <div class="panel-body">
			<form action="save-note" method="post" class="form-horizontal">
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
			      <span>chars entered: {{note.content.length}}</span>
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-md-2 control-label">Type</label>
			   <div class="col-md-10">
					<select name="type" ng-model="note.category" ng-options="c.value as c.label group by c.group for c in categories"
					 multiple class="form-control" tabindex="1" size="16">
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
	</div>
</div>


	
	<div class="panel panel-primary" id="noteList" style="margin-top:20px" ng-controller="noteListControl">
	  <div class="panel-heading">Notes List</div>
	  <div class="panel-body" ng-controller="noteItemCtrl">
	  	<!-- Category buttons -->
	  	<div class="btn-group" style="margin-right:5px" ng-repeat="(name, categories) in groups">
		  <button type="button" ng-class="changeBtnStyle(name)" ng-click="selectMainType(name)">{{name}}</button>
		  <button type="button" ng-class="changeBtnStyle(name, 'dropdown-toggle')" data-toggle="dropdown">
		    <span class="caret"></span>
		    <span class="sr-only">Toggle Dropdown</span>
		  </button>
		  <ul class="dropdown-menu" role="menu">
			<li ng-repeat="category in categories">
				<a href="#" ng-click="selectCategory(category)">{{category}}</a>
			</li>		
		  </ul>
	   </div>
	   
	   <div class="row top-buffer">
	    	<div class="col-md-2">
			    <select ng-model="orderProp">
					<option value="id" selected="selected">id(smallest)</option>
					<option value="-id" selected="selected">id(biggest)</option>
					<option value="subject">subject</option>
					<option value="date">date</option>
				</select>
			</div>
			<div class="col-md-2">
				<button type="button" ng-click="resetFilter()" class="btn btn-warning">Reset</button>
			</div>
		</div>
	  	
		<table  class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Subject</th>
					<th>Content</th>
					<th>Type</th>
					<th>Main Type</th>
					<th>Timestamp</th>
					<th style="width:200px">Action</th>
				</tr>
			</thead>
			<tbody>
		      <tr data-ng-repeat="note in notes | orderBy:orderProp | filter:categoryFilterFn" ng-class="{selected: isSelected}"
		      ng-mouseenter="isSelected=true" ng-mouseleave="isSelected=false"
		      > 
		        <td>{{ note.id }}</td>
		        <td>{{ note.subject }}</td>
		        <td>{{ note.content }}</td>
		        <td>{{ note.type }}</td>
		        <td>{{ note.mainType }}</td>
		        <td>{{ note.date }}</td>
		        <td>
		        	<button class="btn btn-danger btn-small" ng-show="isSelected" ng-click="deleteNote(note.id)">delete</button>
		        	<!--  
		        	<a href="#/detail/{{note.id}}/{{note.subject}}/{{note.content}}/{{note.type}}" class="btn btn-danger btn-small" ng-show="isSelected">view</a>  
		        	-->
		        	<a ui-sref="detail({'noteId':note.id, 'subject':note.subject, 'content':note.content, 'type':note.type})" class="btn btn-danger btn-small" ng-show="isSelected">view</a>  

		        </td>
		      </tr>
			</tbody>
		</table>
	  </div>
	</div>