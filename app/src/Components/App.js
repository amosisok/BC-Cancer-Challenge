import React, { useState, useEffect} from 'react';
import Server from './Server.js';
import Workload from './Workload.js'
import ServerLayout from './ServerLayout.js';

function App() {
  var serverA = new Server('ServerA', 0, []);
  var serverB = new Server('ServerB', 0, []);
  var serverC = new Server('ServerC', 0, []);
  var serverD = new Server('ServerD', 0, []);
  var serverE = new Server('ServerE', 0, []);
  var serverF = new Server('ServerF', 0, []);

  var serverList = [];
  serverList.push(serverA, serverB, serverC, serverD, serverE, serverF);

  const [servers, setServerList] = useState(serverList);

  function onServerUpdate(childData) {
    setServerList(childData);
  }
  
  return (
    <div>
      <Workload servers={servers} updateServers={onServerUpdate}/>
      <ServerLayout servers={servers} updateServers={onServerUpdate}></ServerLayout>
    </div>
  );
}

export default App;
