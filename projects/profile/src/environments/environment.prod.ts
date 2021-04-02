export const environment = {
    production: true,
    defaultLanguage: 'en',
    languages: ['en', 'sk'],
    storage: localStorage,
    webApiUrl: 'http://voc-net.azurewebsites.net/',
    tenantConfig: {
        tenant: "voicipher.onmicrosoft.com",
        clientId: '3f16cd47-52fe-44e6-96b3-131e1e57b09c',
        signUpSignIn: "B2C_1_Voicipher_SignUp_SignIn",
        passwordReset: "B2C_1_Voicipher_Password_Reset",
        authorityBase: "https://login.microsoftonline.com/tfp/",
        b2cScopes: ["https://voicipher.onmicrosoft.com/access-api/user_impersonation"],
        cacheLocation: 'localStorage',
        redirectUri: 'https://voicipher.com/'
    }
};
