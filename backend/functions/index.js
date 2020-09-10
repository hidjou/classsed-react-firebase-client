const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unLikeScream, deleteScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handlers/users');
const { db } = require('./util/admin');
const { FBAuth } = require('./util/fbAuth');
const express = require('express');

const functions = require('firebase-functions');
const cors = require('cors');
const app = express();

// cors middleware
app.use(cors());


// Routes

// [1] screams routes

// @GET screams //  desc: get all screams  // privacy: public
app.get('/screams', getAllScreams);

// @POST one scream  // desc: send new scream  // privacy: private
app.post('/scream', FBAuth, postOneScream);

// @GET one scream  // desc: get one scream  // privacy: public
app.get('/scream/:screamId', getScream);

// @POST one scream  // desc: comment on scream  // privacy: private
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

// @GET like  // desc: like scream  // privacy: private
app.get('/scream/:screamId/like', FBAuth, likeScream);

// @GET unlike  // desc: unlike scream  // privacy: private
app.get('/scream/:screamId/unlike', FBAuth, unLikeScream);

// @delete scream  // desc: delete scream  // privacy: private
app.delete('/scream/:screamId', FBAuth, deleteScream);


// [2] user routes

// @POST /signup  // desc: sign up newUser  // privacy: public
app.post('/signup', signup);

// @POST /login  // desc: login User  // privacy: public
app.post('/login', login);

// @POST /user/image  // desc: upload image  // privacy: private
app.post('/user/image', FBAuth, uploadImage);

// @POST /user   // desc: update user details  // privacy: private
app.post('/user', FBAuth, addUserDetails);

// @GET /user  // desc: get Authenticated user details  // privacy: private
app.get('/user', FBAuth, getAuthenticatedUser);

// @GET /user/:handle  // desc: get User Details  // privacy: public
app.get('/user/:handle', getUserDetails);

// @POST /notifications  // desc: mark Notifications Read // privacy: private
app.post('/notifications', FBAuth, markNotificationsRead);




// http requests on database
// https://baseurl.com/api/route

exports.api = functions.region('europe-west6').https.onRequest(app);


// database triggers: occuring based on some events


// create notification based on like scream
exports.createNotificationOnLike = functions
  .region('europe-west6')
  .firestore.document('likes/{id}')
  .onCreate(snapshot => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`)
            .set({
              recipient: doc.data().userHandle,
              sender: snapshot.data().userHandle,
              read: false,
              screamId: doc.id,
              type: 'like',
              createdAt: new Date().toISOString()
            })
        }
      })
      .catch(err => {
        console.error(err);
      })
  });


// delete notification based on unlike scream
exports.deleteNotificationOnUnlike = functions
  .region('europe-west6')
  .firestore.document('likes/{id}')
  .onDelete(snapshot => {
    return db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
        return;
      })
  })


// create notification based on comment on scream
exports.createNotificationOnComment = functions
  .region('europe-west6')
  .firestore.document('comments/{id}')
  .onCreate(snapshot => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
          return db.doc(`/notifications/${snapshot.id}`)
            .set({
              recipient: doc.data().userHandle,
              sender: snapshot.data().userHandle,
              read: false,
              screamId: doc.id,
              type: 'comment',
              createdAt: new Date().toISOString()
            })
        }
      })
      .catch(err => {
        console.error(err);
      })
  });


// change user image in all user's screams
exports.onUserImageChange = functions
  .region('europe-west6')
  .firestore.document('/users/{userId}')
  .onUpdate(change => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has been changed');
      const batch = db.batch();
      return db
        .collection('screams')
        .where('userHandle', '==', change.before.data().handle)
        .get()
        .then(data => {
          data.forEach(doc => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });


// delete all notifications and comments and likes based on delete one scream
exports.onScreamDelete = functions
  .region('europe-west6')
  .firestore.document('/screams/{screamId}')
  .onDelete((snapshot, context) => {
    console.log('context is >>>>', context);
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection('comments')
      .where('screamId', '==', screamId)
      .get()
      .then(data => {
        data.forEach(doc => batch.delete(db.doc(`/comments/${doc.id}`)));
        return db
          .collection('likes')
          .where('screamId', '==', screamId)
          .get()
      })
      .then(data => {
        data.forEach(doc => batch.delete(db.doc(`/likes/${doc.id}`)));
        return db
          .collection('notifications')
          .where('screamId', '==', screamId)
          .get()
      })
      .then(data => {
        data.forEach(doc => batch.delete(db.doc(`/notifications/${doc.id}`)));
        return batch.commit();
      })
      .catch(err => console.error(err));

  });