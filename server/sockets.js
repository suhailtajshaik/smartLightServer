let sockets = {};
let clientCount = 0;
let currentStatus;
let socket = (io) => {
    io.on('connection', function (socket) {
        sockets[socket.id] = socket;
        clientCount = Object.keys(sockets).length;
        console.log(clientCount + (clientCount>1?" clients":" client") + " connected.");

        socket.on("stateChanged", function (state) {
            io.emit("updateState", state);
            console.log("SERVER : Light is turned : ", state ? 'ON' : 'OFF');
        });

        socket.on('disconnect', function () {
            delete sockets[socket.id];
            console.log("Total clients connected NOW: ", Object.keys(sockets).length);

            // no more sockets, kill the stream
            if (Object.keys(sockets).length == 0) {
                console.log("0 Clients connected.");
                process.exit(0);
            }
        });

        socket.on("checkState", ()=>{
            io.emit("checkLedState", {"request":"checkState"});
        });
        socket.on("LEDstatus",(LED)=>{
            let status= LED.status;
            io.emit("akCheckState", status);
        })
        socket.on('HeartBeat', function (data) {
            if(!data.isAlive){
                console.log("Hardware disconnected.");
            }
        });

    });
};

module.exports = socket;