import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});

admin.initializeApp(functions.config().firebase);

// export const testFunction = functions.database
// 	.ref('/users')
// 	.onUpdate((change, context) => {
// 		// Get an object representing the document
// 		// e.g. {'name': 'Marie', 'age': 66}
// 		const newValue = change.after.val();

// 		// ...or the previous value before this update
// 		const previousValue = change.before.val();

// 		// access a particular field as you would any JS property
// 		const name = newValue.name;

// 		// perform desired operations ...
// 		console.log(name, previousValue);

// 		// return admin
// 		// 	.messaging()
// 		// 	.sendToDevice(
// 		// 		'AAAAyor5WY8:APA91bGaUhuGUieMDdzZ26hDXVErkZCqnM2RwWW043aDuiDhUR-yAzgCkPse2FN73wEQtqqzSHGy5ddxYJwobh52o1vngOuefE8wPzTCSBGlFuMyUWBHP4RJc8yMe14tR_8-gGWkmTBf5xwHctAIbjxIihBkOjrQGQ',
// 		// 		{
// 		// 			notification: {
// 		// 				title: 'New sample txt',
// 		// 				body: 'open sample',
// 		// 				badge: '1',
// 		// 				sound: 'default'
// 		// 			}
// 		// 		}
// 		// 	)
// 		// 	.then(response => {
// 		// 		console.log('====>>>', response);
// 		// 	});
// 		// https://fir-database-44ae6.firebaseio.com/fcmTokens/Saud’s iPhone

// 		const payload = {
// 			notification: {
// 				title: 'Title',
// 				body: `Some Body here`
// 			}
// 		};
// 		return admin
// 			.database()
// 			.ref(`/fcmTokens/Saud’s iPhone`)
// 			.once('value')
// 			.then(token => {
// 				console.log(token.val(), token);
// 				return token.val();
// 			})
// 			.then(userFcmToken => {
// 				console.log(userFcmToken, payload);
// 				return admin.messaging().sendToDevice(userFcmToken, payload);
// 			})
// 			.then(res => {
// 				console.log('Sent Successfully', res);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	});

export const newUserAdded = functions.database
	.ref('/users/{userId}')
	.onCreate((snap, context) => {
		// Get an object representing the document
		// e.g. {'name': 'Marie', 'age': 66}
		const newUser = snap.val();

		console.log('===>User Object', newUser, context.params.userId);
		// access a particular field as you would any JS property
		const name = newUser.name;

		// perform desired operations ...
		console.log(name);
		const payload = {
			notification: {
				title: 'Pukaar',
				body: `New user sign-up! Please check your app.`
			}
		};
		return admin
			.database()
			.ref(`/fcmTokens/Saud’s iPhone`)
			.once('value')
			.then(token => {
				console.log(token.val(), token);
				return token.val();
			})
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
// export const onPatientAdded = functions.firestore
// 	.document('/patients/')
// 	.onCreate((change, context) => {
// 		console.log(change.data, context.params);
// 	});

// exports.sendPushNotification = functions.database
// 	.ref('/sample/{id}')
// 	.onWrite(event => {
// 		const payload = {
// 			notification: {
// 				title: 'New sample txt',
// 				body: 'open sample',
// 				badge: '1',
// 				sound: 'default'
// 			}
// 		};

// 		return admin
// 			.database()
// 			.ref('sampleToken')
// 			.once('value')
// 			.then(allToken => {
// 				if (allToken.val()) {
// 					const token = Object.keys(allToken.val());
// 					console.log(token);
// 					return admin
// 						.messaging()
// 						.sendToDevice(
// 							'eamE1VhZAgA:APA91bF28-lZoAlKM8jwJhvsppChV318M2ldALYzhr2f3R42BusWTOJSFvwtnYc4Y634945-3_u55x52jDl8b3Kz345qvYd0v6Aqc1DuJu9l23lc6oD3VHK6wp96S4W48l4Rq6IzzapS',
// 							payload
// 						)
// 						.then(response => {
// 							console.log(response);
// 						});
// 				} else {
// 					return {};
// 				}
// 			});
// 	});

// admin.initializeApp();

// exports.fcmSend = functions.database
// 	.ref('/messages/{userId}/{messageId}')
// 	.onCreate(event => {
// 		const message = event.after.val();
// 		const userId = event.params.userId;
// 		console.log(userId);
// 		const payload = {
// 			notification: {
// 				title: 'Title',
// 				body: `Some Body here`
// 			}
// 		};

// 		admin
// 			.database()
// 			.ref(`/fcmTokens/${userId}`)
// 			.once('value')
// 			.then(token => token.val())
// 			.then(userFcmToken => {
// 				console.log(userFcmToken, payload);
// 				return admin.messaging().sendToDevice(userFcmToken, payload);
// 			})
// 			.then(res => {
// 				console.log('Sent Successfully', res);
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	});
