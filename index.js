import SIP from "sip.js";

const constraints = {
  audio: {
    deviceId: { exact: undefined }
  },
  video: false
};

function getConfig(store) {
  const config = {
    wsServers: "wss://" + "<<address-to-server>>" + ":" + "5066",
    uri: "123" + "@" + "<<address-to-server>>",
    authorizationUser: "123",
    password: "<<password>>", //fetchedConfig.SIPPassword,
    userAgentString: "webRTC 1.0 <<company-name>>",
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
