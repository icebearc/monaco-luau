import * as monaco from "monaco-editor";

export const theme: monaco.editor.IStandaloneThemeData = {
	base: "vs-dark",
	inherit: true,

	rules: [
		{ token: "", foreground: "#FCFCFA" },
		{ token: "variable.language.self", foreground: "#F7768E" },
		{ token: "variable.parameter.variadic", foreground: "#F59762", fontStyle: "italic" },
		{ token: "variable.parameter.function", foreground: "#F59762", fontStyle: "italic" },
		{ token: "variable.other.constant", foreground: "#AB9EF5" },
		{ token: "variable.property", foreground: "#86DCE9" },
		{ token: "variable.index", foreground: "#939293" },
		{ token: "variable.object.property", foreground: "#FCFCFA" },

		{ token: "keyword", foreground: "#F66087" },
		{ token: "keyword.local", foreground: "#86DCE9", fontStyle: "italic" },
		{ token: "keyword.operator", foreground: "#F66087" },
		{ token: "keyword.operator.type.annotation", foreground: "#F66087" },
		{ token: "keyword.operator.typedef.annotation", foreground: "#F66087" },
		{ token: "keyword.control.export", foreground: "#F66087", fontStyle: "italic" },

		{ token: "operator", foreground: "#F66087" },
		{ token: "operator.type", foreground: "#F66087" },
		{ token: "operator.special", foreground: "#F66087" },
		{ token: "operator.symbol", foreground: "#939293" },

		{ token: "entity.name.type.alias", foreground: "#86DCE9" },
		{ token: "entity.name.function", foreground: "#AEDC70" },

		{ token: "global", foreground: "#FCFCFA" },

		{ token: "storage.type", foreground: "#AB9EF5" },

		{ token: "comment", foreground: "#666666", fontStyle: "italic" },
		{ token: "comment.highlight.title", foreground: "#86DCE9", fontStyle: "italic" },
		{ token: "comment.highlight.name", foreground: "#86DCE9", fontStyle: "italic" },
		{ token: "comment.delimiter.modifier", foreground: "#86DCE9", fontStyle: "italic" },
		{ token: "comment.highlight.modifier", foreground: "#86DCE9", fontStyle: "italic" },
		{ token: "comment.highlight.descriptor", foreground: "#FCFCFA", fontStyle: "italic" },

		{ token: "delimiter.longstring", foreground: "#F66087" },
		{ token: "delimiter.bracket", foreground: "#939293" },
		{ token: "delimiter.array", foreground: "#939293" },
		{ token: "delimiter.parenthesis", foreground: "#939293" },
		{ token: "delimiter", foreground: "#939293" },

		{ token: "string", foreground: "#FBD75C" },
		{ token: "longstring", foreground: "#FBD75C" },
		{ token: "string.delimeter", foreground: "#939293" },
		{ token: "string.escape", foreground: "#AB9EF5" },

		{ token: "punctuation.separator.arguments", foreground: "#939293" },
		{ token: "punctuation.separator.parameter", foreground: "#939293" },
		{ token: "punctuation.separator.table", foreground: "#939293" },
		{ token: "punctuation.definition.block", foreground: "#939293" },
		{ token: "punctuation.definition.parameters", foreground: "#939293" },
		{ token: "punctuation.definition.typeparameters", foreground: "#F66087" },

		{ token: "constant.language", foreground: "#AB9EF5" },
		{ token: "number", foreground: "#AB9EF5" },
		{ token: "constants", foreground: "#AB9EF5" },

		// { token: 'support.function', foreground: '#0DB9D7' },
		// { token: 'support.function.library', foreground: '#0DB9D7' },
		// { token: 'support.type', foreground: '#0DB9D7' },
		{ token: "support.function", foreground: "#AEDC70" },
		{ token: "support.function.library", foreground: "#AEDC70" },
		{ token: "support.type", foreground: "#86DCE9" },

		{ token: "string.invalid", foreground: "#F66261" },
		{ token: "string.escape.invalid", foreground: "#F66261" },
	],

	colors: {
		"editor.background": "#222222",

		"editorLineNumber.foreground": "#7A7A7A",
		"editorLineNumber.activeForeground": "#BBBBBB",

		"editorIndentGuide.background": "#282828",

		"editorSuggestWidget.background": "#181818",
		"editorSuggestWidget.border": "#000000",
		"editorSuggestWidget.foreground": "#D5D5D5",
		"editorSuggestWidget.selectedBackground": "#363636",
		"editorSuggestWidget.highlightForeground": "#18A0FB",

		"textCodeBlock.background": "#181818",
	},
};
