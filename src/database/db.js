const firebase = require('firebase').initializeApp(
  {
    apiKey: process.env.FIRE_AI_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_DB_URL,
    projectId: process.env.FIRE_PROJECT_ID,
  }
);

export default firebase;