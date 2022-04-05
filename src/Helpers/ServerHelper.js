/*
getBoundingClientRect() returns an object that gives us the size and position of an element.
Using it, we return the X,Y coordinates of the middle of the element.
https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
*/
function getCoordinates(id) {
    var temp = document.getElementById(id);
    if(temp) {
        var rect = temp.getBoundingClientRect();
        return [rect.left + (rect.right - rect.left)/2, rect.top + (rect.bottom - rect.top)/2];
    }
}

/*
The functions createLineElement() and drawLine() are used to draw
lines between the servers. 
Source: https://stackoverflow.com/questions/4270485/drawing-lines-on-html-page, answer 1, by user madox2
*/
function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
        + 'width: ' + length + 'px; '
        + '-moz-transform: rotate(' + angle + 'rad); ' 
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + 'position: absolute; '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; '
        + 'z-index: ' + '-1';

    line.setAttribute('style', styles);  
    return line;
  }
  
  function drawLine(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt(a*a + b*b);
  
    var slopeX = (x1 + x2)/2;
    var slopeY = (y1 + y2)/2;
  
    var x = slopeX - c / 2;
    var y = slopeY;
  
    var alpha = Math.PI - Math.atan2(-b, a);
    return createLineElement(x, y, c, alpha);
  }

  export {drawLine, getCoordinates}
  