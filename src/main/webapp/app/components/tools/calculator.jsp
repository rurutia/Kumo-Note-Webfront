<div class="col-sm-9" ng-controller="calculatorCtrl" style="margin-left:0px;padding-left:0px">
	<div class="row">
		<div class="col-sm-4">
			<label>exchange rate(AUD : CNY):</label>
			<input ng-model="exchangeRate" />
		</div>
		<div class="col-sm-4">
			<label>delivery charge per KG($):</label>
			<input ng-model="deliveryRate" />
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<table id="calculator-table" class="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Qty</th>
						<th>Buy</th>
						<th>S(¥)</th>
						<th>Wt</th>
						<th>Do</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="item in items">
						<td ng-if="!item.editable">{{$index + 1}}.{{item.description}}</td>
						<td ng-if="item.editable"><input style="width:100%" ng-model="item.copy.description"></input></td>
	
						<td ng-if="!item.editable">{{item.quantity}}</td>
						<td ng-if="item.editable"><input ng-model="item.copy.quantity"></input></td>
	
						<td ng-if="!item.editable">
							<ul class="list-unstyled">
								<li>{{item.costAud | number : 2}}($)</li>
								<li>{{item.costAud * exchangeRate | number : 2}}(¥)</li>
							</ul>
						</td>
						<td ng-if="item.editable">
							<ul class="list-unstyled">
								<li><input ng-model="item.copy.costAud"></li>
								<li>{{item.copy.costAud * exchangeRate | number : 2}}(¥)</li>
							</ul>
						</td>

	
						<td ng-if="!item.editable">{{item.sellCny | number : 2}}</td>
						<td ng-if="item.editable"><input ng-model="item.copy.sellCny"></input></td>
	
	
						<td ng-if="!item.editable">{{item.weight}}</td>
						<td ng-if="item.editable"><input ng-model="item.copy.weight"></input></td>
	
						<td>
							<button type="button" class="btn btn-primary btn-sm" ng-click="editItem(item)" ng-show="!item.editable">
								<span class="glyphicon glyphicon-pencil" aria-hidden="true"> </span>
							</button>
							<button type="button" style="margin-top:5px" class="btn btn-danger btn-sm" ng-click="deleteItem(item, $index)" ng-show="!item.editable">
								<span class="glyphicon glyphicon-remove" aria-hidden="true"> </span>
							</button>
							<button type="button" class="btn btn-primary btn-sm" ng-click="saveItem(item)" ng-show="item.editable">
							    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
							</button>
							<button type="button" style="margin-top:5px" class="btn btn-primary btn-sm" ng-click="cancelEditItem(item)" ng-show="item.editable">
								<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
							</button>
						</td>
					</tr>
					<tr><td colspan="8" style="border-top:1px solid black">
						<div class="row">
							<div class="col-sm-2 pull-right">
								<button type="button" class="btn btn-primary btn-sm" ng-click="addItem()">Add item</button>
							</div>	
							<div class="col-sm-2 pull-right">
								<button type="button" class="btn btn-danger btn-sm" ng-click="deleteAllItem()">Delete all</button>
							</div>	
						</div>
					</tr></td>
				</tbody>
			</table>
		</div>
	</div>

	<hr>

	<div class="row">
		<div class="col-sm-6">
			<table class="table table-striped">
				<thead>
					<tr>
						<th style="width:15%">Total sell(¥)</th>
						<th></th>
						<th>Purchase cost(¥)</th>
						<th></th>
						<th>Delivery charge(¥)</th>
						<th></th>
						<th>Margin(¥)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="width:15%">{{total.sellPrice | number : 2}}</td>
						<td><div style="border-top:2px solid black;margin-top:100%"></div></td>
						<td>{{total.purchaseCost | number : 2}}</td>
						<td><div style="border-top:2px solid black;margin-top:100%"></div></td>
						<td>{{total.deliveryCost | number : 2}} </td>
						<td><div style="border-top:2px solid black;border-bottom:2px solid black;margin-top:100%;height:5px"></div></td>
						<td>{{total.sellPrice - total.purchaseCost - total.deliveryCost | number : 2}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>



</div>