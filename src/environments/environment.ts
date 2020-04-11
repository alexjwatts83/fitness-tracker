// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const firebaseConfig = {
  apiKey: "AIzaSyAzUVAHE-4qENU5A6M9K5-UjbBSPmjWigk",
  authDomain: "ng-fitness-tracker-18167.firebaseapp.com",
  databaseURL: "https://ng-fitness-tracker-18167.firebaseio.com",
  projectId: "ng-fitness-tracker-18167",
  storageBucket: "ng-fitness-tracker-18167.appspot.com",
  messagingSenderId: "487024589762",
  appId: "1:487024589762:web:d1e204ae88e259dda2f45b",
  measurementId: "G-YPJMW69H5S"
};
export const environment = {
  production: false,
  firebaseConfig: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
