import * as RNLocalize from "react-native-localize";

import pt from "app/resources/locales/pt-BR";

const I18n = require("i18n-js");

I18n.translations = {
  pt
};

I18n.defaultLocale = "pt-BR";
I18n.fallbacks = true;

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

export default I18n;
