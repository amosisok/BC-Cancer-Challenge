import './ServerLayout.css';

function drawServers(props) {
    return (
        <div>
            <div className='row'>
                <div id='serverA' className="server">
                    <div className='workload'>
                        {props.workloadB}
                    </div>
                </div>
            </div>

            <div className='doubleRow'>
                <div id='serverB' className="server">
                    <div className='workload'>
                        {props.workloadA}
                    </div>
                </div>
                <div id='serverB' className="server"></div>
            </div>

            <div className='doubleRow'>
                <div id='serverB' className="server"></div>
                <div id='serverB' className="server"></div>
            </div>

            <div className='row'>
                <div id='serverA' className="server"></div>
            </div>
        </div>
    )
}

//pass the x&y of all the workloads to app.js in an object onload.
//when i choose to connect server A to Server B, i draw a line from server A's xy coord to server B's XY coords

export default drawServers;