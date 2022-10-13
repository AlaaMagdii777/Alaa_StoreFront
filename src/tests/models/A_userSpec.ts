//Models-Test_user
import { User } from '../../models/users';
import { UserTestType } from '../../types/types';

const user = new User();

const newUser={
    "userName": "alaa",
    "password": "Alaa1234",
    "firstName": "Alaa",
    "lastName": "Magdy"
}
//Models-Test_user
describe('Models-Test_user', () => {
  it('test Models-Test_user CreateUser', async () => {
    const result: UserTestType = await user.createUser({
      userName: 'alaa',
      password: 'Alaa1234',
      firstName: 'Alaa',
      lastName: 'Magdy',
    });
    expect(result).toBeInstanceOf(Object);
  });

  it('test Models_user for getUser', async () => {
    const result: UserTestType = await user.getUser(1);
    expect(result.userName).not.toEqual('alaaFWD');
    expect(result).toBeInstanceOf(Object);
  });
  it('test Models update_USERS', async () => {
    const result: UserTestType = await user.updateUser(1, {
      userName: 'alaa',
      firstName: 'Alaa',
      lastName: 'Magdy',
    });
    expect(result.userName).not.toEqual('alaaFWD');
    expect(result).toBeInstanceOf(Object);
  });
});
