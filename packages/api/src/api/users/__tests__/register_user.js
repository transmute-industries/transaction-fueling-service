import supertest from 'supertest';
import app from '../../../app';

describe('Users', () => {
  let server;
  let agent;
  let okta_test_user_username;
  let okta_test_user_ethereum_address;
  let okta_test_user_encrypted_sk;

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(done => {
    agent = supertest(app);
    server = app.listen(done);
    okta_test_user_username = 'test@example.com';
    okta_test_user_ethereum_address = '0x9D8C08D332FE52a0c33D090273C5b537f197fD9b';
    okta_test_user_encrypted_sk = '26f84e90eb7dc8ad351a5ec47a115e53';
  });

  test('anonymous user should be able to register', async () => {
    // TODO: Add encryptedSk to profile payload.
    let response = await agent
      .post('/api/v0/users')
      .send({
        profile: {
          firstName: 'Isaac',
          lastName: 'Brock',
          ethAddress: okta_test_user_ethereum_address,
          encryptedSk: okta_test_user_encrypted_sk,
          email: okta_test_user_username,
          login: okta_test_user_username,
          mobilePhone: '555-415-1337'
        }
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
      
    expect(response.statusCode).toBe(200);
  });

  afterAll(done => {
    server.close(done);
  });
});
