import * as Constants from '../Constants/Constants.js';

class Server {
    constructor(name, workload, servers) {
        this.name = name;
        this.workload = workload;
        this.servers = servers;
    }

    changeWorkload(value) {
        if(isNaN(value)) return;

        if(value >= 0 && value < Constants.MAX_WORKLOAD) {
            this.workload = value;
        }

        else {
            alert('Invalid workload');
        }
    }

    connectServer(server) {
        var connectedServers = this.getServers().map(elem => elem.name);
        if(server.getName() != this.getName() && !connectedServers.includes(server.name)) {
            this.servers.push(server);
        }
    }

    getWorkload() {
        return this.workload;
    }

    getServers() {
        return this.servers;
    }

    getName() {
        return this.name;
    }

    setWorkload(workload) {
        this.workload = workload;
    }

    /*

    This function rebalances the workload all servers connected to this current server.
    It does so by dividing the total workload of all the servers by the total number of servers, giving us a starting workload for each server.
    We then calculate the remainder and then evenly distribute it among the servers, starting from the first.
    
    If the remainder is 0, there is nothing to distribute so we can set the workload of all servers to the starting workload.
    Otherwise, we distribute it by simply adding 1 to each of the servers until the remainder is all used up.
    When this is complete, we have a balanced workload for all connected servers.
    
    */
    rebalanceWorkload() {
        var sum = 0;
        for(let server of this.servers) {
            sum += parseInt(server.getWorkload());
        }

        sum += parseInt(this.getWorkload());

        var quotient = Math.floor(sum / (this.servers.length + 1));
        var remainder = sum % (this.servers.length + 1);

        if(remainder == 0) {
            for(let server of this.servers) {
                server.setWorkload(quotient);
            }
        }

        else {
            let counter = 0;
            for(let server of this.servers) {
                if(counter < remainder) {
                    server.setWorkload(quotient + 1);
                    counter++;
                }
                else {
                    server.setWorkload(quotient);
                }
            }
        }
        this.setWorkload(quotient);
    }
}

export default Server;
