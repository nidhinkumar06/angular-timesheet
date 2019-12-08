// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDh7ROS6NyhuHAOEETKVy6BYGalJjxhyXY',
    authDomain: 'momtemplates.firebaseapp.com',
    databaseURL: 'https://momtemplates.firebaseio.com',
    projectId: 'momtemplates',
    storageBucket: 'momtemplates.appspot.com',
    messagingSenderId: '74152339447',
    appId: '1:74152339447:web:6d43c9466c3cd97e77f0f2'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
