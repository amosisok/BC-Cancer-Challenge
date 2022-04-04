import React, { useState} from 'react';
import './Workload.css';
import * as Constants from '../Constants/Constants.js';

function Workload(props) {
    const [serverList, setServers] = useState(props.servers);

    function onWorkloadChange(event) {
        let serverName = event.currentTarget.id;

        const workloadFormat = new RegExp(Constants.WORKLOAD_REGEX);
        let newWorkload = event.currentTarget.value;

        if(newWorkload === "") {
            newWorkload = 0;
        }

        //Update the servers when the workload of a server changes
        if(serverList && workloadFormat.test(newWorkload)) {
            let serverIndex = serverName.charCodeAt(serverName.length-1) - 'A'.charCodeAt(0);
            let server = serverList[serverIndex];
            let servers = serverList.slice();

            server.setWorkload(newWorkload);
            servers[serverIndex] = server;
            setServers(servers)
            props.updateServers(serverList);
        }
    }

    return (
        <div>
            <div className='workLoadInputs'>
                <div className='form'>
                    <p>Server A workload: {serverList[0].getWorkload()}</p>
                    <input id='workloadA' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server B workload: {serverList[1].getWorkload()}</p>
                    <input id='workloadB' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server C workload: {serverList[2].getWorkload()}</p>
                    <input id='workloadC' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p >Server D workload: {serverList[3].getWorkload()}</p>
                    <input id='workloadD' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server E workload: {serverList[4].getWorkload()}</p>
                    <input id='workloadE' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server F workload: {serverList[5].getWorkload()}</p>
                    <input id='workloadF' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>
            </div>
        </div>
    );
}

export default Workload;
