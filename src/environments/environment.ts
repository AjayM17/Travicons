// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: {
    publishableKey: 'pk_test_51LPrDmBsD3QgDKZdttdn4P1p8uInSwt0f0vtLAfzLc0vDHsykEdUluCnJacAqhxPdjfQrjZM4cGbIg2cnsVyulCS00KWhK3tMj',
    secretKey: 'sk_test_51LPrDmBsD3QgDKZdNAOUNjK89hM3LXIa2CbnhUduDqtLv2pk3iEHpguoM8A8rUBs66oa7JXCTmbIB5PCDhxt3kaP00TJdY3TGy'
  },
  // api: 'http://your_ip_address:3000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
