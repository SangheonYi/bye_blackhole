import axios from 'axios';
import {
  testPostStatus,
  testPatchStatus,
} from '../../test/test-util.spec';
const url = 'http://localhost:8080/admin';
let user = {
  intra_id: 'sayi',
  nickname: 'sayinick',
  auth_token: 'sayi token',
  icon: 'gamer_keyboard',
};

let user2 = {
  intra_id: 'taekim',
  nickname: 'taekimnick',
  auth_token: 'taekim token',
  icon: 'gamer_boy',
};

const testCreateUser = async (
  okUser: object,
  failUser: object,
  dupColumn: string,
  dupValue: string,
) => {
  await testPostStatus(url, okUser, 201);
  const fail = await testPostStatus(url, failUser, 400);
  expect(fail).toBe(`${dupColumn}: ${dupValue} is already exist`);
};

describe('admin create 테스트', () => {
  beforeEach(async () => await axios.delete(`${url}/clear`));

  it('intra_id 중복 확인', async () =>
    await testCreateUser(
      user,
      { ...user, nickname: 'fail' },
      'intra_id',
      user.intra_id,
    ));

  it('nickname 중복 확인', async () =>
    await testCreateUser(
      user,
      { ...user, intra_id: 'fail' },
      'nickname',
      user.nickname,
    ));
});

const testUpdateUser = async (
  okBody: object,
  failBody: object,
  error: string,
) => {
  await testPatchStatus(url, okBody, 200);
  const fail = await testPatchStatus(url, failBody, 400);
  expect(fail).toBe(error);
};

describe('admin update 테스트', () => {
  const updateBody = {
    intra_id: user.intra_id,
    nickname: 'update success',
    icon: user.icon,
  };
  beforeEach(async () => {
    await axios.delete(`${url}/clear`);
    await axios.post(url, user);
    await axios.post(url, user2);
  });

  it('intra_id 존재 확인', async () =>
    testUpdateUser(
      updateBody,
      { ...updateBody, intra_id: 'fail' },
      `intra_id: fail is not exist`,
    ));

  it('nicknam 중복 확인', async () =>
    testUpdateUser(
      updateBody,
      { ...updateBody, nickname: user2.nickname },
      `nickname: ${user2.nickname} is already exist`,
    ));
});
