const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

module.exports = {
  admin,
  db
};
