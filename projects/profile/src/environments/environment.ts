// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    defaultLanguage: 'en',
    languages: ['en', 'sk'],
    storage: localStorage,
    webApiUrl: 'https://localhost:5001/',
    tenantConfig: {
        tenant: "voicipher.onmicrosoft.com",
        clientId: '3f16cd47-52fe-44e6-96b3-131e1e57b09c',
        signUpSignIn: "B2C_1_Voicipher_SignUp_SignIn",
        passwordReset: "B2C_1_Voicipher_Password_Reset",
        authorityBase: "https://login.microsoftonline.com/tfp/",
        b2cScopes: ["https://voicipher.onmicrosoft.com/access-api/user_impersonation"],
        cacheLocation: 'localStorage',
        redirectUri: 'http://localhost:4100/'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
