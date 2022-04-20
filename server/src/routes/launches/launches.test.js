// launches.test.js
const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test('It should response 200 code', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
describe('Test POST /launches', () => {
  // 把資料放在 describe 這邊，就每個 test 都可以使用
  const completeLaunchData = {
    mission: 'super test mission',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186',
    launchDate: 'January 4, 2028'
  };
  const launchDatawithoutDate = {
    mission: 'super test mission',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186',
  };

  const launchDataWithInvaliDate = {
    mission: 'super test mission',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186',
    launchDate: 'hahahahaa'
  };
  test('It should can created with 201 code', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect(201)
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(launchDatawithoutDate);

  });
  test('It should can catch missing require properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDatawithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);
    // .toStrictEqual
    expect(response.body).toStrictEqual({
      error: "some col not included!!",
    });

  });
  test('It should can catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvaliDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Date format error',
    })
  })
})