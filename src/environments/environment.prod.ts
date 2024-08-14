import { Environment } from '../app/types/in-app';

export const environment: Environment = {
  production: true,
  apiBaseUrl: 'https://dv-identity.pochipay.com',
  identityBaseUrl: 'https://app-dv.pochipay.com',
  clientID: 'mpesa.ui',
  grantType: 'password',
};
