# BC-Cancer-Challenge

## Technical Challenge for BC Cancer Research Centre

## Description

#### Components
App.js - The main component of the program. Displays the other components.


Workload.js - This component contains the workload inputs for each of the servers.


ServerLayout.js - This component draws the servers and the connections between them.

#### Server Design and Implementation

The task was to create a set of six servers and implement an algorithm that balances the workload of all connected servers.

To represent a server, I created a Server class with the following:

Fields:
- name (the name of the server)
- workload (an integer that represents the current workload of a server)
- servers (an array of server objects that represent the servers that it is connected to)

Methods:
- changeWorkload(value): Edit the server's workload
- connectServer(server): Connect the current server to the server that is being passed in
- rebalance(): Rebalance the workload of all of the servers that the current server is connected to, including itself
- Getters/Setters

A connection between two servers is bidirectional. If A connects to B, B is also connected to A.
A server does not need to have a direct connection from source to target in order to be connected to the target.

As an example, let B be connected to C. If we connected A to B, A is also connected to C, although we did not explicitly connect A to C.

#### User Interface Design

- Each server is represented by a box containing its name and workload.
- Connections between servers are indicated by a line between them.
- Each server has an input field to set its workload.
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
 
1) Sum the workload of all the servers that are connected to s.
2) Calculate the floor of the sum divided by (c+1) to to obtain a quotient q. => Math.floor(sum/(c+1))
3) Mod the sum by (c+1) to obtain a remainder r.
4)  If the remainder is 0, the workload of all servers will be equal, so we can set the workload of all servers to the quotient.
    Otherwise, we distribute the remainder by adding 1 to each of the connected server's workload until the remainder is all used up.
    When this is complete, we have a balanced workload for all connected servers.
   

## Installation
1) Clone the repo.
2) Navigate to the app directory and install the dependencies using "npm install".
3) Run the program using "npm start".

The program will be running on http://localhost:3000/

## Usage
