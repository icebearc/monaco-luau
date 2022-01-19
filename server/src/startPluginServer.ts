import express from "express";
import http from "http";
import { WebSocket, WebSocketServer } from "ws";

export function startPluginServer(port: number) {
	let lastUpdate = "";
	const app = express();
	const server = http.createServer(app);
	const wss = new WebSocketServer({ server });

	app.use(
		"/update",
		express.json({
			limit: "3mb",
		}),
	);

	app.post("/update", async (req, res) => {
		if (!req.body) {
			res.status(400);
			res.json({
				success: false,
				reason: "Missing JSON",
			});
			return;
		}
		if (!req.body.DataModel) {
			res.status(400);
			res.json({
				success: false,
				reason: "Missing body.DataModel",
			});
			return;
		}
		wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(
					JSON.stringify({
						datamodel: req.body.DataModel,
						version: req.body.Version,
					}),
				);
			}
		});
		lastUpdate = req.body.DataModel;
		res.status(200);
		res.json({ success: true });
	});

	app.get("/last", (_req, res) => {
		res.send(lastUpdate);
	});

	if (port > 0) {
		server.listen(port, () => {
			console.log(`Started Roblox LSP Plugin Server on port ${port}`);
		});
	}
}
