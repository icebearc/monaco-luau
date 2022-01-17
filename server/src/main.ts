import * as rpc from "vscode-ws-jsonrpc";
import { WebSocketServer } from "ws";

import { launch } from "./launch";
import { startPluginServer } from "./startPluginServer";

// If you change the port, make sure to also change it for the client!
const port = 8080;
const pluginPort = 27844;

new WebSocketServer({ port }).on("connection", webSocket => {
	const socket: rpc.IWebSocket = {
		send: content =>
			webSocket.send(content, error => {
				if (error) throw error;
			}),
		onMessage: callback => webSocket.on("message", callback),
		onError: callback => webSocket.on("error", callback),
		onClose: callback => webSocket.on("close", callback),
		dispose: () => webSocket.close(),
	};
	if (webSocket.readyState === webSocket.OPEN) {
		launch(socket);
	} else {
		webSocket.on("open", () => launch(socket));
	}
});

startPluginServer(pluginPort);
