<!--  
<div transtest prop="{{'abcdefg'}}" ng-init="var1='outside directive'" ng-transclude >
<h1>var1</h1>
</div>

<script type="text/ng-template" id="productTemplate">
<td>{{item.name}}</td>
<td><input ng-model='item.quantity' /></td>
</script>

<div class="panel panel-default" ng-controller="defaultCtrl1">
	<div class="panel-body">
		<table class="table table-striped" product-table="totalValue"
			product-data="products" ng-transclude>
			<tr>
				<th>Name</th>
				<th>Quantity</th>
			</tr>
			<tr ng-repeat="item in products" product-item></tr>
			<tr>
				<th>Total:</th>
				<td>{{totalValue}}</td>
			</tr>
		</table>
	</div>
</div>
-->

<div ng-controller="appInfoCtrl" app-info style="text-align:center"></div>
		
<div class="panel-group" id="addNoteAccordion" ng-controller="addNoteCtrl">	
	<div class="panel panel-primary note-panel-accordion" >
	  <div id="addNoteCollapseHeading" class="panel-heading">
		  <h5 class="panel-title">
		    <span ng-class="{'glyphicon':true, 'glyphicon-chevron-down':collapsed, 'glyphicon-chevron-up':notCollapsed}"></span>
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


	
	<div class="panel panel-primary" id="noteList" style="margin-top:20px" ng-controller="noteListCtrl">
	  <div class="panel-heading">Notes List</div>
	  <div class="panel-body">
	    
	    <!-- Filter info -->
	    <div ng-show="filterInfo" class="alert alert-info" role="alert">
	      <button type="button" ng-click="resetFilter()" class="btn btn-warning pull-right">Reset</button>
	      <ul class="list-inline">
			  <li ng-repeat="(name, value) in filterInfo"><strong>{{name}}: </strong>{{value}}</li>
	      </ul>
	    </div>
	    
	    <!--  Start of filter section -->
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
			    <select class="form-control" ng-init="orderProp='id'" ng-model="orderProp">
					<option value="id">id(smallest)</option>
					<option value="-id">id(biggest)</option>
					<option value="subject">subject</option>
					<option value="date">date</option>
				</select>
			</div>
			
			<div class="col-md-2 pull-right">
				<div class="pull-left"><span class="btn"><strong>Bulk actions:</strong></span></div>
				<div class="btn-group pull-right" role="group" aria-label="...">
				  <button id="bulkMarkBtn" title="Mark/Unmark All" type="button" class="btn btn-default" ng-click="toggleRowSelection(undefined, undefined, true)">
				  <span class="glyphicon glyphicon-pushpin"></span></button>
<!-- 				  <button type="button" class="btn btn-default">Delete</button>
 -->				</div>
			</div>
		</div>
			
	    <!--  End of filter section -->
		
	  	<!--  Start of list -->
		<table class="table" id="record-list">
			<thead>
				<tr>
					<th style="width:5%">#</th>
					<th style="width:15%">Subject</th>
					<th>Content</th>
					<th style="width:10%">Type</th>
					<th style="width:10%">Main Type</th>
					<th style="width:10%">Timestamp</th>
				</tr>
			</thead>
			<tbody>
		      <tr id="{{note.id}}" index="{{$index}}" data-ng-repeat="note in notes  | filter:categoryFilterFn" ng-class="getRowStyle(note)"
		      ng-mouseenter="toggleRowSelection(note, true, false)" ng-mouseleave="toggleRowSelection(note, false, false)" toolbar-hover note="note" delete-note="deleteNote(theNote)"> 
		        <td style="width:5%" class="draggable">{{ note.id }}</td>
		        <td style="width:15%" class="draggable">{{ note.subject }}</td>
 		        <td class="draggable" syntax-highlight content="{{note.content}}" language-type="{{note.type}}">
                </td>
		        <td style="width:10%" class="draggable">{{ note.type }}</td>
		        <td style="width:10%" class="draggable">{{ note.mainType }}</td>
		        <td style="width:10%" class="draggable">
		        {{ note.date | date:'yyyy-MM-dd HH:mm:ss' }}
		        </td>
		      </tr>
			</tbody>
		</table>
	  </div>
	</div>

