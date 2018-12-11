export const environment = {
  production: true,
  useFakeApi: false,
  envName: 'test',
  appName: '[TEST] angular-ngrx-scaffold',
  apiDomain: 'test-api.example.com',
  apiBaseUrl: '/api',
  baseHref: '',
  loginUrl: '/login',
  pageSizeDefault: 10,
  maxRequestLength: 100, // MB (poi verranno moltiplicati per 1024 * 1000 nel config service)
  whitelistDomains: ['test.example.com'],
  defaultDateFormat: 'DD/MM/YYYY',
  defaultDateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
  defaultDatePattern:
    '(((0[1-9]|[12][0-9]|3[01])([-.\\/])(0[13578]|10|12)([-.\\/])(\\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\\/])(0[469]|11)([-.\\/])(\\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\\/])(02)([-.\\/])(\\d{4}))|((29)(\\.|-|\\/)(02)([-.\\/])([02468][048]00))|((29)([-.\\/])(02)([-.\\/])([13579][26]00))|((29)([-.\\/])(02)([-.\\/])([0-9][0-9][0][48]))|((29)([-.\\/])(02)([-.\\/])([0-9][0-9][2468][048]))|((29)([-.\\/])(02)([-.\\/])([0-9][0-9][13579][26])))',
  angularDefaultDateFormat: 'dd/MM/yyyy',
  angularDefaultDateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
};
