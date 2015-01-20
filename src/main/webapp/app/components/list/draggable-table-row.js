$(document).ready(function () {
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
		prevIndex, nextIndex, currentIndex,
		newIndex,
	    msg;
	
	var dragHelper = $('<div></div>').css({position: 'absolute', 'border-width': '3px', 'border-color': 'red', 'border-style' : 'solid'});

	$('body').append(dragHelper);

	document.onmousedown = function(ev) {
		// only drag when left mouse is clicked
		if(ev.which == 1 && $(ev.target).is('td')) {
			isMouseDown = true;
		}
	};
	
	document.onmouseup= function(ev) {
		if(isMouseDown) {
				var scope = angular.element(document).scope();
				scope.$apply(scope.$broadcast('MyDragEvent', msg));
		}
		
		
		isMouseDown = false;
		curTarget = null;
		dragHelper.css('display', 'none');
		draggableRows = [];
		prevIndex = nextIndex = currentIndex= null;
		newIndex = undefined;
		msg = null;
		$('.remove').remove();
	};
	
	document.onmousemove = function(ev) {
		var mousePos = mouseCoords(ev);
		
		if(isMouseDown && !isMouseStateSet) {
			curTarget = ev.target;
			dragHelper.empty().get(0).appendChild(curTarget.parentNode.cloneNode(true));
			dragHelper.css('display', 'block');
			dragHelper.width(curTarget.parentNode.offsetWidth);
			mouseOffset = getMouseOffset(curTarget.parentNode, ev);
			curTargetParentPos = getPosition(curTarget.parentNode); 
			
			$('table#record-list tbody>tr').each(function(i) {
				// do not add target row itself to array for checking positions after
//				if(this != curTarget.parentNode) {
					draggableRows.push(this);
//				}
			});
		}
		if(curTarget) {
//			console.log("prevY:" + lastMouseY);
//			console.log("cY:" + mousePos.y);
			if(lastMouseY) {
				if(mousePos.y < lastMouseY) {
					moveDirection = 'up';
				}
				else {
					moveDirection = 'down';
				}
			}
//			console.log(moveDirection);
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
						console.log("inside donw............");
						newIndex = i;
						console.log(dragHelperBottomLeftPos.top);
						console.log(newIndex);

						break;
					}
				}				
			}

			if(typeof newIndex !== 'undefined' && newIndex != $(curTarget.parentNode).attr('index')) {
				console.log("------------");
				console.log(newIndex);
				console.log( $(curTarget.parentNode).attr('index'))
				$('.remove').remove();
				var placeHolderDiv = $('<div class="remove"></div>').css({'border-width': '5px', 'border-color': 'red', 'border-style' : 'dashed'});
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
			
			
//			console.log(newIndex);
			
			lastMouseY =  mousePos.y ;
			
			msg = {newIndex: newIndex, currentIndex: parseInt($(curTarget.parentNode).attr('index'))};
//			msg = {prevIndex: prevIndex, nextIndex: nextIndex, currentIndex: parseInt($(curTarget.parentNode).attr('index'))};
//			var scope = angular.element(document).scope();
//			scope.$apply(scope.$broadcast('MyDragEvent', {prevIndex: prevIndex, nextIndex: nextIndex, currentIndex: parseInt($(curTarget.parentNode).attr('index'))}));
//			
			
		}
		
		isMouseStateSet = isMouseDown;
		
		return false;
	};
	
	
});