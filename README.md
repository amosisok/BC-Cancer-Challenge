# BC-Cancer-Challenge

## Technical Challenge for BC Cancer Research Centre

## Description

#### Object Design and Implementation

The task was to create a set of six servers and implement an algorithm that balances the workload of all connected servers.

To represent a server, I created a Server class with the following:

Fields:
- workload (an integer that represents the current workload of a server)
- servers (an array of server objects that represent the servers that it is connected to)

Methods:
- increment(value): Increments the server's workload by value
- decrement(value): Decrements the server's workload by value
- connect(server): Connect the current server to the server that is being passed in

When a server's workload is updated, we call rebalance(), and that server and its array of servers workload will be updated. rebalance() is a function that rebalances the workload of all connected servers, and will be explained in a later section.

When a new server is connected to a server (or list of servers), we add it to the server list for each server that is connected and call rebalance().

#### User Interface Design

- Each server is represented by a box.
- Connections between servers are indicated by a line between them.
- Each server has an input field to display and set its workload.
- Each server has a connect button that opens a dropdown and allows the user to select a server to connect to.
- Choosing a server draws a line between the two servers.

#### Edge Cases 
- A server cannot be connected to itself
- A server cannot connect to another server if it is already directly connected to it
- A server's workload cannot be greater than Number.MAX_SAFE_INTEGER in Javascript, which is 2^53-1 
- A server's workload cannot be negative

#### Load Balancing Algorithm
 For a server s:
 
 Let c be the number of servers that s is connected to.
 
1) Sum the workload of all the servers that are connected to s.
2) Calculate the floor of the sum divided by (c+1) to to obtain a quotient q. => Math.floor(sum/(c+1))
3) Mod the sum by q to obtain a remainder r.
4) If r is equal to 0:
   
   For each server that s is connected to, set their workload to q. Set the workload of s to q.
 
5) If r is NOT equal to 0:
   
   For each server that s is connected to, set their workload to q. Set the workload of s to r.
   

## Installation

## Usage
