# BC-Cancer-Challenge

## Technical Challenge for BC Cancer Research Centre

## Description

The task was to create a set of six servers and implement an algorithm that balances the workload of all connected servers.

#### Components
App.js - The main component of the program. Displays the other components.

Workload.js - This component contains the workload inputs for each of the servers.

ServerLayout.js - This component draws the servers and the connections between them.

#### Server Design and Implementation

To represent a server, I created a Server class, since all servers would share the same fields and would want to call the same methods. Each instance of a server would store its name, workload and list of connected servers.

Methods:
- connectServer(server): Connect the current server to the server that is being passed in
- rebalance(): Rebalance the workload of all of the servers that the current server is connected to, including itself
- Getters/Setters

A connection between two servers is bidirectional. If A is connected to B, B is also connected to A.
A server does not need to have a direct connection from source to target in order to be connected to the target.

As an example, let B be connected to C. If we connect A to B, then A is also connected to C, although we did not explicitly connect A to C.

#### User Interface Design

- Each server is represented by a square box containing its name and workload.
- Connections between servers are indicated by a line between them.
- Each server has a corresponding input field to set its workload.
- To connect a a source and target server, click on a server to designate as the source server.
- The servers that are available to connect to will start flashing blue. If a server is not available to connect, it is already connected to the source server.
- Choosing a target server draws a line between the two servers, connecting them.
- To cancel the selection of a target server, click again on the source server.

#### Edge Cases 
- A server cannot be connected to itself
- A server cannot connect to another server if it is already connected to it
- A server's workload cannot be greater than 9999999999. My rationale for choosing this limit is simply because this is the largest number that will fit in the box that I have allocated to each server.
- A server's workload cannot be negative

#### Load Balancing Algorithm
 For a server s:
 
 Let c be the number of servers that s is connected to.
 
1) Sum the workload of all the servers that are connected to s and the workload of s.
2) Calculate the floor of the sum divided by (c+1) to to obtain a quotient q.
3) Mod the sum by (c+1) to obtain a remainder r.
4)  If the remainder is 0, the workload of all servers will be equal, so we can set the workload of all servers to the quotient.
    Otherwise, we distribute the remainder by adding 1 to each of the connected server's workload until the remainder is all used up.
    When this is complete, we have a balanced workload for all connected servers.
   
## Discussion
There were several things I took into consideration while making this application, including usability and scalability. One main issue was deciding how a user would connect 2 servers. My inital thought was to have dropdown for each server and have them select a server from a list. However, this would not scale well, as adding n servers would increase the size of each dropdown and require n additional dropdowns. I wanted the connection process to be easy and intuitive even when there were many servers on the screen at once. This led to my current design, which was to simply click the source and target server to connect the two.

Some other software design principles I utilized included the Single-Responsiblity princple and Open-Closed principle. Each component I have is responsible for a single part of the program, encapsulating its functionality. As a result, extending the program to be allow users to add servers or remove existing connections between servers would not require many modifications to existing code.

## How to run

I have deployed the app to Heroku, so the easiest way to run the program is by visiting https://amos-ko-bc-cancer-challenge.herokuapp.com/. 

To run the program locally:
1) Ensure node.js is installed.
2) Clone or download the repo.
3) In the root directory, install the packages using "npm install".
4) Run the program using "npm start".

The program will be running on http://localhost:3000/

## Usage
1) Enter the workload for the servers in the corresponding input fields.
2) Begin by selecting a server as the source server. The servers available for connection will flash blue.
3) Choose the target server to create a connection to the source. The workload will now be balanced between the connected servers.
