import { AuthData } from '@app/api/auth.api';
import { httpApiMock } from '@app/api/mocks/http.api.mock';
import { initValues } from '@app/components/auth/LoginForm/LoginForm';

const avatarImg =
  'https://lightence-assets.s3.amazonaws.com/avatars/avatar5.webp';

httpApiMock.onPost('login').reply((config) => {
  const data: AuthData = JSON.parse(config.data || '');
  if (data.password === initValues.password) {
    return [
      200,
      {
        token: 'bearerToken1',
        user: {
          id: 1,
          firstName: 'Admin',
          lastName: 'Johnson',
          imgUrl: avatarImg,
          userName: '@john1989',
          email: {
            name: 'chris.johnson@altence.com',
            verified: false,
          },
          phone: {
            number: '+18143519459',
            verified: true,
          },
          sex: 'male',
          birthday: '01/26/2022',
          lang: 'en',
          country: 'GB',
          city: 'London',
          address1: '14 London Road',
          zipcode: 5211,
          website: 'altence.com',
          socials: {
            twitter: '@altence_team',
            facebook: 'https://facebook.com/groups/1076577369582221',
            linkedin: 'https://linkedin.com/company/altence',
          },
        },
      },
    ];
  }
  return [401, { message: 'Invalid Credentials' }];
});

httpApiMock.onPost('signUp').reply(200);

httpApiMock.onPost('forgotPassword').reply(200);

httpApiMock.onPost('verifySecurityCode').reply(200);

httpApiMock.onPost('setNewPassword').reply(200);
