// Initialize Firebase
// Firebase App is always required and must be first
// var firebase = require("firebase/app");

// // Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

// Comment out (or don't require) services that you don't want to use
// require("firebase/storage");

// var config = {
//     apiKey: "AIzaSyCyGs-XV0-4_G1S1tCtztPtzPzHF8sDZoI",
//     authDomain: "fir-database-44ae6.firebaseapp.com",
//     databaseURL: "https://fir-database-44ae6.firebaseio.com",
//     projectId: "fir-database-44ae6",
//     storageBucket: "fir-database-44ae6.appspot.com",
//     messagingSenderId: "869914990991"
// };
// firebase.initializeApp(config);
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BPL2zL29_3MQ84spsOYC0KB1bcj74Lt5Zl8gPPwP3f7fUFP5Y7gZZOAFAbdrofImt9hpe2WIrbYFQKKNdX9sNAc");
// messaging.requestPermission().then(function () {
//     console.log('Notification permission granted.');
//     // TODO(developer): Retrieve an Instance ID token for use with FCM.
//     // ...

//     // Get Instance ID token. Initially this makes a network call, once retrieved
//     // subsequent calls to getToken will return from cache.

//     return messaging.getToken();
// }).then(function (currentToken) {
//     console.log(currentToken);
//     if (currentToken) {
//         sendTokenToServer(currentToken);
//         updateUIForPushEnabled(currentToken);
//     } else {
//         // Show permission request.
//         console.log('No Instance ID token available. Request permission to generate one.');
//         // Show permission UI.
//         updateUIForPushPermissionRequired();
//         setTokenSentToServer(false);
//     }
// }).catch(function (err) {
//     console.log('Unable to get permission to notify.', err);
// });
// // Callback fired if Instance ID token is updated.
// messaging.onTokenRefresh(function () {
//     messaging.getToken().then(function (refreshedToken) {
//         console.log('Token refreshed.');
//         // Indicate that the new Instance ID token has not yet been sent to the
//         // app server.
//         setTokenSentToServer(false);
//         // Send Instance ID token to app server.
//         sendTokenToServer(refreshedToken);
//         // ...
//     }).catch(function (err) {
//         console.log('Unable to retrieve refreshed token ', err);
//         showToken('Unable to retrieve refreshed token ', err);
//     });
// });
// const functions = require('firebase-functions');
// const admin = require("firebase-admin");
admin.initializeApp();

exports.fcmSend = functions.database
	.ref('/messages/{userId}/{messageId}')
	.onCreate(event => {
		const message = event.after.val();
		const userId = event.params.userId;
		console.log(userId);
		const payload = {
			notification: {
				title: 'Title',
				body: `Some Body here`
			}
		};

		admin
			.database()
			.ref(`/fcmTokens/${userId}`)
			.once('value')
			.then(token => token.val())
			.then(userFcmToken => {
				console.log(userFcmToken, payload);
				return admin.messaging().sendToDevice(userFcmToken, payload);
			})
			.then(res => {
				console.log('Sent Successfully', res);
			})
			.catch(err => {
				console.log(err);
			});
	});
