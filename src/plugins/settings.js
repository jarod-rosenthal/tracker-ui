module.exports = {
    videoServer : location.hostname,
    // videoServer: "skyhub-nano.local",
    controllerServer: "http://" + location.hostname + ":9090",
    // controllerServer: 'http://skyhub-nano.local:9090',
    environment: "DEV",
    sensorPollRate: 2500,
    pingPollRate: 1000
}