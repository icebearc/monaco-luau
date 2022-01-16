// @ts-ignore
import { conf, language } from "monaco-editor/esm/vs/basic-languages/lua/lua.js";
import { languages } from "monaco-editor-core";

export const registerLanguage = () => {
	languages.register({
		id: "lua",
		extensions: [".lua"],
		aliases: ["Lua", "lua"],
	});
	languages.setMonarchTokensProvider("lua", language);
	languages.setLanguageConfiguration("lua", conf);
};
