import { languages } from "monaco-editor-core";

import { language, languageConfiguration } from "./language";

export const registerLanguage = () => {
	languages.register({
		id: "lua",
		extensions: [".lua"],
		aliases: ["Lua", "lua"],
	});
	languages.setMonarchTokensProvider("lua", language);
	languages.setLanguageConfiguration("lua", languageConfiguration);
};
