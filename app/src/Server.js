class Server {
    constructor(name, workload, servers) {
        this.name = name;
        this.workload = workload;
        this.servers = servers;
    }

    changeWorkload(value) {
        if(isNaN(value)) return;

        if(value >= 0 && value < Number.MAX_SAFE_INTEGER) {
            this.workload = value;
        }

        else {
            alert('Invalid workload');
        }
    }

    connectServer(server) {
        this.servers.push(server);
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
}

export default Server;
