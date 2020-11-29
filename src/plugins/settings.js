module.exports = {
    videoServer : location.hostname,
    // videoServer: "skyhub-nano.local",
    controllerServer: location.protocol + "//" + location.hostname + ":9090",
    // controllerServer: location.protocol + '//skyhub-nano.local:9090',
    environment: "DEV",
    sensorPollRate: 2500,
    pingPollRate: 1000
}