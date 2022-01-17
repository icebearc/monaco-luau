import { MonacoServices } from "@codingame/monaco-languageclient";
import * as monaco from "monaco-editor-core";
import editorWorker from "monaco-editor-core/esm/vs/editor/editor.worker?worker";
import { LineEndings, QuoteStyle } from "stylua-wasm";

import { connectLanguageServer } from "./connectLanguageServer";
import { theme } from "./language";
import { registerFormatting } from "./registerFormatting";
import { registerLanguage } from "./registerLanguage";

(self as any).MonacoEnvironment = {
	getWorker: () => new editorWorker(),
};

MonacoServices.install(monaco);

// If you change the port, make sure to also change it for the server!
const port = 8080;

registerLanguage();
registerFormatting({
	// Stylua's `ident_width` and `ident_type` will be set by monaco editor's
	// `tabSize` and `use_spaces`.
	column_width: 80,
	line_endings: LineEndings.Unix,
	quote_style: QuoteStyle.AutoPreferSingle,
	no_call_parentheses: false,
});
monaco.editor.defineTheme("luau-dark", theme);

const protocol = location.protocol === "https:" ? "wss" : "ws";
connectLanguageServer(`${protocol}://${location.hostname}:${port}`);

const editor = monaco.editor.create(document.querySelector("#editor-container")!, {
	model: monaco.editor.createModel(`function test()\nprint('hello')\nend`, "lua"),
	theme: "luau-dark",
	tabSize: 2,

	fontSize: 14,
	fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
	fontLigatures: true,

	insertSpaces: false,

	smoothScrolling: true,
	cursorBlinking: "smooth",
	cursorSmoothCaretAnimation: true,
	minimap: { enabled: false },
	padding: { top: 24 },

	folding: true,
	foldingHighlight: false,
	showFoldingControls: "always",
	dragAndDrop: true,
	links: true,
	formatOnPaste: false,

	showDeprecated: true,
	suggest: { snippetsPreventQuickSuggestions: false },
});

editor.getAction("editor.action.formatDocument").run();
