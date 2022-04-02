import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Server from './Server.js';
import ServerLayout from './ServerLayout.js';

function App() {
  return <CreateServers/>;
}

function CreateServers() {
  var serverA = new Server('A', 0, []);
  var serverB = new Server('B', 0, []);
  // var serverList = [];
  // serverList.push(serverA, serverB);

  const [serverAWorkload, setWorkloadA] = useState(0);
  const [serverBWorkload, setWorkloadB] = useState(0);

  function onWorkloadChange(event) {
    let serverName = event.currentTarget.id;

    const positiveNumbers = /^[0-9\b]+$/;
    let newWorkload = event.currentTarget.value;

    if(newWorkload && positiveNumbers.test(newWorkload)) {
      switch(serverName) {
        case 'A':
          serverA.changeWorkload(newWorkload);
          setWorkloadA(newWorkload);
          break;

        case 'B':
          serverB.changeWorkload(newWorkload);
          setWorkloadB(newWorkload);
          break;
      }
    }
  }

  return (
    <div>
      <p>server A workload: {serverAWorkload}</p>
      <input id='workloadA' onChange={onWorkloadChange} type='number' min='0' max={Number.MAX_SAFE_INTEGER}></input>

      <p>server B workload: {serverBWorkload}</p>
      <input id='workloadB' onChange={onWorkloadChange} type='number' min='0' max={Number.MAX_SAFE_INTEGER}></input>

      <ServerLayout workloadA={serverAWorkload} workloadB={serverBWorkload}></ServerLayout>

    </div>
  );
}

export default App;