import './ServerLayout.css';
import React, { useState, useEffect } from 'react';

function DrawServers(props) {
    const [sourceServer, setSourceServer] = useState({name: '', x: 0, y: 0});
    const [serverList, setServers] = useState(props.servers);

    useEffect(() => {
        setServers(props.servers);
    })

    function handleServerClick(event) {
        var servers = document.getElementsByClassName("server");

        //Begin server selection by choosing source server
        if(sourceServer.x == 0 && sourceServer.y == 0) {
            let sourceX, sourceY;
            [sourceX, sourceY] = getCoordinates(event.currentTarget.id);
            setSourceServer({name: event.currentTarget.id, x: sourceX, y: sourceY});
            
            let currentServerObj;
            for(let i = 0; i < serverList.length; i++) {
               if(serverList[i].getName() === event.currentTarget.id) {
                    currentServerObj = serverList[i];
               }
            }

            let connectedServers = currentServerObj.getServers().map(elem => elem.name);

            for(let server of servers) {
                if(server.id !== event.currentTarget.id && !connectedServers.includes(server.id)) {
                    server.style.animation = "blink .5s step-end infinite alternate";
                }
            }
        }

        //choosing the server to connect to
        else if(sourceServer.x != 0 && sourceServer.y != 0) {
            let targetX, targetY;
            [targetX, targetY] = getCoordinates(event.currentTarget.id);

            document.body.appendChild(createLine(sourceServer.x, sourceServer.y, targetX, targetY));

            for(let server of servers) {
                server.style.animation = "";
            }
            
            // Add selected server to source server's list of servers
            var source, target;
            for(let i = 0; i < serverList.length; i++) {
                if(serverList[i].getName().toLowerCase() == sourceServer.name.toLowerCase()) {
                    source = serverList[i];
                }

                else if(serverList[i].getName().toLowerCase() == event.currentTarget.id.toLowerCase()) {
                    target = serverList[i];
                }
            }

            if(target) {
                source.connectServer(target);
                props.updateServers(serverList);
            }

            setSourceServer({name: '', x:0, y:0});
        }
    }

    return (
        <div>
            <div className='row'>
                <div id='ServerB' className="server" onClick={handleServerClick}>
                    <div className='workload'>
                        <p>B</p>
                        {serverList[1].getWorkload()}
                    </div>
                </div>
            </div>

            <div className='doubleRow'>
                <div id='ServerA' className="server" onClick={handleServerClick}>
                    <div className='workload'>
                        <p>A</p>
                        {serverList[0].getWorkload()}
                    </div>
                </div>
                <div id='ServerC' className="server" onClick={handleServerClick}>
                    <div className='workload'>
                        <p>C</p>
                        {serverList[2].getWorkload()}
                    </div>
                </div>
            </div>

            <div className='doubleRow'>
                <div id='ServerF' className="server" onClick={handleServerClick}>
                    <div className='workload'>
                        <p>F</p>
                        {serverList[5].getWorkload()}
                    </div>
                </div>
                <div id='ServerD' className="server" onClick={handleServerClick}>
                    <div className='workload'>
                        <p>D</p>
                        {serverList[4].getWorkload()}
                    </div>
                </div>
            </div>

            <div className='row'>
                <div id='ServerE' className="server" onClick={handleServerClick}>
                    <div className='workload'>
                        <p>E</p>
                        {serverList[4].getWorkload()}
                    </div>
                </div>
            </div>
        </div>
    )
}


/*
getBoundingClientRect() returns an object that gives us the size and position of an element.
https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
We return the X-Y coordinates of the middle of the element
*/
function getCoordinates(id) {
    var temp = document.getElementById(id);
    if(temp) {
        var rect = temp.getBoundingClientRect();
        return [rect.left + (rect.right-rect.left)/2, rect.top + (rect.bottom - rect.top)/2];
    }
}

/*
The functions createLineElement() and createLine() are used to draw
lines between the servers. 
Based on code from: https://stackoverflow.com/questions/4270485/drawing-lines-on-html-page, answer 1, by user madox2
*/
function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
               + 'width: ' + length + 'px; '
               + '-moz-transform: rotate(' + angle + 'rad); ' 
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; '
               + 'z-index: ' + '-1';

    line.setAttribute('style', styles);  
    return line;
  }
  
  function createLine(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt(a * a + b * b);
  
    var slopeX = (x1 + x2) / 2;
    var slopeY = (y1 + y2) / 2;
  
    var x = slopeX - c / 2;
    var y = slopeY;
  
    var alpha = Math.PI - Math.atan2(-b, a);
    return createLineElement(x, y, c, alpha);
  }

export default DrawServers;
