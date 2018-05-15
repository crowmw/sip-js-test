import SIP from "sip.js";

const constraints = {
  audio: {
    deviceId: { exact: undefined }
  },
  video: false
};

function getConfig(store) {
  const config = {
    wsServers: "wss://" + "fsw-dannte.scc24.pl" + ":" + "5066",
    uri: "388141" + "@" + "fsw-dannte.scc24.pl",
    authorizationUser: "388141",
    password: "ba9ec211f21cddc8fc3b495e9b870457", //fetchedConfig.SIPPassword,
    userAgentString: "webRTC 1.0 systell",
    traceSip: true,
    register: false,
    options: {
      extraHeaders: ["Expires: 60"]
    },
    sessionDescriptionHandlerFactoryOptions: {
      constraints: constraints,
      peerConnectionOptions: {
        // rtcConfiguration: { rtcpMuxPolicy: 'negotiate' },
        iceCheckingTimeout: 550
      }
    }
  };

  return config;
}

function call() {
  const config = getConfig();
  var agent = new SIP.UA(config);
  agent.register(config.options);

  agent.on("registered", function() {
    alert("registered");
  });

  agent.on("registrationFailed", function() {
    alert("Registration failed!");
  });

  agent.on("unregistered", function() {
    alert("Unregistered!");
  });

  agent.on("disconnected", function() {
    alert("Disconnected");
  });
}

document.getElementById("btn").addEventListener("click", () => {
  call();
});
