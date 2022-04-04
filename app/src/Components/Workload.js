import React, { useState} from 'react';
import './Workload.css';
import * as Constants from '../Constants/Constants.js';
import ServerLayout from './ServerLayout.js';


function Workload(props) {

    const [serverAWorkload, setWorkloadA] = useState(0);
    const [serverBWorkload, setWorkloadB] = useState(0);
    const [serverCWorkload, setWorkloadC] = useState(0);
    const [serverDWorkload, setWorkloadD] = useState(0);
    const [serverEWorkload, setWorkloadE] = useState(0);
    const [serverFWorkload, setWorkloadF] = useState(0);
    const [serverList, setServers] = useState(props.servers);

    function onWorkloadChange(event) {
        let serverName = event.currentTarget.id;

        const workloadFormat = new RegExp(Constants.WORKLOAD_REGEX);
        let newWorkload = event.currentTarget.value;

        if(newWorkload === "") {
            newWorkload = 0;
        }

        /* 
        I realize that there is a lot of repeated code here and this will not scale well with many servers,
        but I was unable find another way to call hooks dynamically. Since there were only 6 servers, I decided
        to settle with this approach.
        */
        if(serverList && workloadFormat.test(newWorkload)) {
            switch(serverName) {
                case 'workloadA':
                    serverList[0].changeWorkload(newWorkload);
                    setWorkloadA(newWorkload);
                    break;

                case 'workloadB':
                    serverList[1].changeWorkload(newWorkload);
                    setWorkloadB(newWorkload);
                    break;

                case 'workloadC':
                    serverList[2].changeWorkload(newWorkload);
                    setWorkloadC(newWorkload);
                    break;

                case 'workloadD':
                    serverList[3].changeWorkload(newWorkload);
                    setWorkloadD(newWorkload);
                    break;

                case 'workloadE':
                    serverList[4].changeWorkload(newWorkload);
                    setWorkloadE(newWorkload);
                    break;

                case 'workloadF':
                    serverList[5].changeWorkload(newWorkload);
                    setWorkloadF(newWorkload);
                    break;
            }

            props.updateServers(serverList);
        }
    }

    function onServerUpdate(childData) {
        props.updateServers(childData);
    }

    return (
        <div>
            <div className='workLoadInputs'>
                <div className='form'>
                    <p>Server A workload: {serverAWorkload}</p>
                    <input id='workloadA' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server B workload: {serverBWorkload}</p>
                    <input id='workloadB' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server C workload: {serverCWorkload}</p>
                    <input id='workloadC' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p >Server D workload: {serverDWorkload}</p>
                    <input id='workloadD' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server E workload: {serverEWorkload}</p>
                    <input id='workloadE' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>

                <div className='form'>
                    <p>Server F workload: {serverFWorkload}</p>
                    <input id='workloadF' onChange={onWorkloadChange} type='number' min='0' max={Constants.MAX_WORKLOAD}></input>
                </div>
            </div>

            <ServerLayout servers={serverList} updateServers={onServerUpdate}></ServerLayout>
        </div>
    );
}

export default Workload;