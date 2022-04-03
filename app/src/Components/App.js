import React, { useState, useEffect } from 'react';
import Server from './Server.js';
import CreateServers from './CreateServer.js'

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
    console.log(childData)
    setServerList(childData);
  }

  return <CreateServers servers={servers} updateServers={onServerUpdate}/>;
}

export default App;
