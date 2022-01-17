import { listen } from "@codingame/monaco-jsonrpc";
import {
	CloseAction,
	createConnection,
	ErrorAction,
	MessageConnection,
	MonacoLanguageClient,
} from "@codingame/monaco-languageclient";
import ReconnectingWebSocket from "reconnecting-websocket";

const createLanguageClient = (connection: MessageConnection) =>
	new MonacoLanguageClient({
		name: "Lua Language Client",
		clientOptions: {
			documentSelector: ["lua"],
			// Disable the default error handler.
			errorHandler: {
				error: () => ErrorAction.Continue,
				closed: () => CloseAction.DoNotRestart,
			},
		},
		connectionProvider: {
			get: (errorHandler, closeHandler) =>
				Promise.resolve(createConnection(connection, errorHandler, closeHandler)),
		},
	});

export const connectLanguageServer = (url: string, pluginUrl: string) =>
	listen({
		webSocket: new ReconnectingWebSocket(url) as WebSocket,
		onConnection: connection => {
			const languageClient = createLanguageClient(connection);
			// TODO: languageClient.sendNotification
			const disposable = languageClient.start();
			const closeSocket = connectPluginServer(pluginUrl, languageClient);

			connection.onClose(() => {
				disposable.dispose();
				closeSocket();
			});
		},
	});

const connectPluginServer = (url: string, client: MonacoLanguageClient) => {
	console.log("Connecting to plugin server");
	const socket = new ReconnectingWebSocket(url);

	socket.addEventListener("open", () => {
		console.log("Connected to plugin server!");
	});

	socket.addEventListener("message", event => {
		console.log("Received update");
		const data = JSON.parse(event.data);
		client.sendNotification("$/updateDataModel", data);
	});
	return () => socket.close();
};
