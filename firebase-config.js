(function () {
  function parseEnv(text) {
    const values = {};
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .forEach((line) => {
        const separatorIndex = line.indexOf("=");
        if (separatorIndex === -1) return;
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        values[key] = value;
      });
    return values;
  }

  function loadEnvConfig() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./.env", false);
    xhr.send(null);

    if (xhr.status === 200 || xhr.status === 0) {
      const envValues = parseEnv(xhr.responseText || "");
      return {
        apiKey: envValues.FIREBASE_API_KEY || "",
        authDomain: envValues.FIREBASE_AUTH_DOMAIN || "",
        databaseURL: envValues.FIREBASE_DATABASE_URL || "",
        projectId: envValues.FIREBASE_PROJECT_ID || "",
        storageBucket: envValues.FIREBASE_STORAGE_BUCKET || "",
        messagingSenderId: envValues.FIREBASE_MESSAGING_SENDER_ID || "",
        appId: envValues.FIREBASE_APP_ID || "",
        measurementId: envValues.FIREBASE_MEASUREMENT_ID || "",
      };
    }

    return {};
  }

  window.__FIREBASE_CONFIG__ = loadEnvConfig();
})();
