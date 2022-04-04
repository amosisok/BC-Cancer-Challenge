import './ServerLayout.css';
import React, { useState, useEffect } from 'react';
import { getCoordinates, drawLine } from '../Helpers/ServerHelper.js';

function DrawServers(props) {
    const [sourceServer, setSourceServer] = useState({name: '', x: 0, y: 0});
    const [serverList, setServers] = useState(props.servers);

    useEffect(() => {
        setServers(props.servers);
    })

    function handleServerClick(event) {
        var servers = document.getElementsByClassName("server");
        var currentServerObj, sourceConnectedServers, targetConnectedServers;
        
        //Begin server selection by choosing source server
        if(sourceServer.x == 0 && sourceServer.y == 0) {
            let sourceX, sourceY;
            [sourceX, sourceY] = getCoordinates(event.currentTarget.id);
            setSourceServer({name: event.currentTarget.id, x: sourceX, y: sourceY});
            
            for(let i = 0; i < serverList.length; i++) {
               if(serverList[i].getName() === event.currentTarget.id) {
                    currentServerObj = serverList[i];
               }
            }

            sourceConnectedServers = currentServerObj.getServers().map(elem => elem.name);

            for(let server of servers) {
                if(server.id !== event.currentTarget.id && !sourceConnectedServers.includes(server.id)) {
                    server.style.animation = "blink .5s step-end infinite alternate";
                }
            }
        }

        //choosing the server to connect to
        else if(sourceServer.x != 0 && sourceServer.y != 0) {

            var source, target;
            for(let i = 0; i < serverList.length; i++) {
                if(serverList[i].getName() == sourceServer.name) {
                    source = serverList[i];
                }

                else if(serverList[i].getName() == event.currentTarget.id) {
                    target = serverList[i];
                }
            }

            //We can only connect to a server that is flashing blue. Click again on source server to cancel connection.
            if(event.currentTarget.style.animation === '' && event.currentTarget.id !== source.getName()) {
                return;
            }

            let targetX, targetY;
            [targetX, targetY] = getCoordinates(event.currentTarget.id);

            document.body.appendChild(drawLine(sourceServer.x, sourceServer.y, targetX, targetY));

            for(let server of servers) {
                server.style.animation = "";
            }
            
            // Add selected server to source server's list of servers
            sourceConnectedServers = source.getServers().map(elem => elem.name);
            if(target) {
                targetConnectedServers = target.getServers().map(elem => elem.name);
            }

            if(target && !sourceConnectedServers.includes(target.getName())) {
                source.connectServer(target);
                target.connectServer(source);

                // for each of source's connections, excluding itself and any already connected servers, connect them to the target
                for(let server of source.getServers()) {
                    server.connectServer(target);
                    target.connectServer(server);
                }


                //for each of the target's connections, connect them to each of the source's connections
                for(let targetsConnection of target.getServers()) {
                    for(let sourcesConnection of source.getServers()) {
                        targetsConnection.connectServer(sourcesConnection);
                        sourcesConnection.connectServer(targetsConnection);
                    }
                    source.connectServer(targetsConnection);
                    targetsConnection.connectServer(source);
                }

                source.rebalanceWorkload();
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
                        {serverList[3].getWorkload()}
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

export default DrawServers;
