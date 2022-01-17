import * as monaco from "monaco-editor";

export const languageConfiguration: monaco.languages.LanguageConfiguration = {
	comments: {
		// symbol used for single line comment. Remove this entry if your language does not support line comments
		lineComment: "--",
		// symbols used for start and end a block comment. Remove this entry if your language does not support block comments
		blockComment: ["--[[", "]]"],
	},
	// symbols used as brackets
	brackets: [
		["{", "}"],
		["[", "]"],
		["(", ")"],
		["do", "end"],
		["then", "end"],
	],
	// symbols that are auto closed when typing
	autoClosingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: "'", close: "'", notIn: ["string", "comment"] },
		{ open: '"', close: '"', notIn: ["string", "comment"] },
	],
	// symbols that that can be used to surround a selection
	surroundingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: '"', close: '"' },
		{ open: "'", close: "'" },
	],

	autoCloseBefore: "}])",

	indentationRules: {
		increaseIndentPattern:
			/^((?!(\\-\\-)).)*((\\b(function|do|repeat)\\b((?!\\b(end|until)\\b).)*)|(\\{\\s*)|(\\b(then|else)\\b[;\\s]*))$/,
		decreaseIndentPattern: /^\\s*((\\b(end|until)\\b)|(\\})|(\\))|(\\b(else)\\b[;\\s]*)/,
	},

	folding: {
		markers: {
			start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
			end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))"),
		},
	},
};
