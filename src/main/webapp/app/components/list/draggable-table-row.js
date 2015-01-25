// Draggable table row

$(document).ready(function () {
	
	// utility functions, can be replaced by jquery
	function mouseCoords(ev){
		if(ev.pageX || ev.pageY){
			return {x:ev.pageX, y:ev.pageY};
		}
		return {
			x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y:ev.clientY + document.body.scrollTop  - document.body.clientTop
		};
	}
	
	function getPosition(e){
		var left = 0;
		var top  = 0;
		while (e.offsetParent){
			left += e.offsetLeft;
			top  += e.offsetTop;
			e     = e.offsetParent;
		}
		left += e.offsetLeft;
		top  += e.offsetTop;
		return {x:left, y:top};
	}
	
	function getMouseOffset(target, ev){
		ev = ev || window.event;
		var docPos    = getPosition(target);
		var mousePos  = mouseCoords(ev);
		return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	}
	
	var isMouseDown,
	    isMouseStateSet,
	    curTarget,
	    mouseOffset,
	    curTargetParentPos,
	    draggableRows = [],
	    lastMouseY,
	    moveDirection,	
		currentIndex, newIndex,
		// message passed to drag event handler
	    msg;
	
	// dragHelper represents the row being dragged
	var dragHelper = $('<div></div>').css({position: 'absolute', 'border-width': '3px', 'border-color': 'red', 'border-style' : 'solid'});

	$('body').append(dragHelper);

	document.onmousedown = function(ev) {
		// only drag when left mouse is clicked and the target must be td
		if(ev.which == 1 && $(ev.target).is('.draggable')) {
			isMouseDown = true;
		}
	};
	
	document.onmouseup= function(ev) {
		// trigger UI change by broadcasting AngularUI event
		if(isMouseDown) {
				var scope = angular.element(document).scope();
				scope.$apply(scope.$broadcast('RecordDragEvent', msg));
		}
		
		// reset variables and UI
		isMouseDown = false;
		curTarget = null;
		dragHelper.css('display', 'none');
		draggableRows = [];
		newIndex = undefined;
		msg = null;
		$('.remove').remove();
	};
	
	document.onmousemove = function(ev) {
		var mousePos = mouseCoords(ev);
		
		if(isMouseDown && !isMouseStateSet) {
			curTarget = ev.target;
			
			var trNode = curTarget.parentNode;
			
			// put current row into dragHelper DIV
			dragHelper
				.empty()
				.append($(trNode).clone())
				.css('display', 'block')
				.width(trNode.offsetWidth);
			
			mouseOffset = getMouseOffset(trNode, ev);
			curTargetParentPos = getPosition(trNode); 
			
			$('table#record-list tbody>tr').each(function(i) {
				draggableRows.push(this);
			});
		}
		
		if(curTarget) {
			if(lastMouseY) {
				if(mousePos.y < lastMouseY) {
					moveDirection = 'up';
				}
				else {
					moveDirection = 'down';
				}
			}

			dragHelperPos = { left: curTargetParentPos.x, top: mousePos.y - mouseOffset.y };
			dragHelper.offset(dragHelperPos);
			
			dragHelperTopLeftPos = dragHelperPos;
			dragHelperBottomLeftPos = { left: curTargetParentPos.x, top: mousePos.y - mouseOffset.y + curTarget.offsetHeight };
			
			if(moveDirection === 'up') {
				for(var i=0;i<draggableRows.length;i++) {
					var rowPos = getPosition(draggableRows[i]);
					var rowHeight = draggableRows[i].offsetHeight;
					
					if(dragHelperTopLeftPos.top < rowPos.y) {
						newIndex = i;
						break;
					}
				}				
			}
			
			if(moveDirection === 'down') {
				for(var i=draggableRows.length-1;i>=0;i--) {
					var rowPos = getPosition(draggableRows[i]);
					var rowHeight = draggableRows[i].offsetHeight;
					
					if(dragHelperBottomLeftPos.top > rowPos.y + rowHeight) {
						newIndex = i;
						break;
					}
				}				
			}

			if(typeof newIndex !== 'undefined' && newIndex != $(curTarget.parentNode).attr('index')) {
				$('.remove').remove();
				var placeHolderDiv = $('<div class="remove"></div>').css({'border-width': '5px', 'background-color': '#eee', 'border-color': 'red', 'border-style' : 'dashed'});
			    var placeHolderTr = $('<tr class="remove"></tr>');
			    var placeHolderTd = $('<td class="remove" colspan="6"></td>');
			    placeHolderTr.append(placeHolderTd.append(placeHolderDiv));
				placeHolderDiv.width(dragHelper.width());
				placeHolderDiv.height(dragHelper.height());$(curTarget.parentNode).attr('index')
				if(moveDirection === 'up') {
					placeHolderTr.insertBefore($(draggableRows[i]));
				}
				else if(moveDirection === 'down') {
					placeHolderTr.insertAfter($(draggableRows[i]));
				}
			}
			else {
				newIndex = undefined;
			}
			
			lastMouseY = mousePos.y ;
			
			msg = {newIndex: newIndex, currentIndex: parseInt($(curTarget.parentNode).attr('index'))};

		}
		
		isMouseStateSet = isMouseDown;
		
		if(isMouseDown) {
			// must have return false here to prevent the default action (i.e. select all elements)
			return false;
		}
	};
	
	
});