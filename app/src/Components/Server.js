class Server {
    constructor(name, workload, servers) {
        this.name = name;
        this.workload = workload;
        this.servers = servers;
    }

    changeWorkload(value) {
        if(isNaN(value)) return;

        if(value >= 0 && value < 9999999999) {
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

    rebalanceWorkload() {
        var sum = 0;
        for(let server of this.servers) {
            sum += parseInt(server.getWorkload());
        }

        sum += parseInt(this.getWorkload());

        var quotient = Math.round(sum/(this.servers.length + 1));
        var remainder = sum % this.servers.length + 1;

        // console.log('quotient', quotient);
        // console.log('remain', remainder);

        for(let server of this.servers) {
            server.setWorkload(quotient);
        }

        Number.isInteger(sum/(this.servers.length + 1)) ? this.setWorkload(quotient) : this.setWorkload(remainder)

        // 5/3
    }
}

export default Server;
