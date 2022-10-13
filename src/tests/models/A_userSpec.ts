//Models-Test_user
import { User } from '../../models/users';
import { UserTestType } from '../../types/types';

const user = new User();

//Models-Test_user CreateUser
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

  //Models-Test_user getUser
  it('test Models_user for getUser', async () => {
    const result: UserTestType = await user.getUser(1);
    expect(result.userName).not.toEqual('alaaFWD');
    expect(result).toBeInstanceOf(Object);
  });


  it('test Models_user index_Method', async () => {
    const result: UserTestType[] = await user.index();
    expect(result).toBeInstanceOf(Array);
  });

  //Models-Test_user updateuser

  it('test Models update_USERS', async () => {
    const result: UserTestType = await user.updateUser(1, {
      userName: 'alaa',
      firstName: 'Alaa',
      lastName: 'Magdy',
    });
    expect(result.userName).not.toEqual('alaaFWD');
    expect(result).toBeInstanceOf(Object);
  });
  
 //Make_Sure_About_Methods

  it('test Models_user toBeDefined create user correctly', () => {
    expect(user.createUser).toBeDefined();
  });
  it('test Models_user toBeDefined get All_users', () => {
    expect(user.index).toBeDefined();
  });
  it('test Models_user  toBeDefined get All_users', () => {
    expect(user.getUser).toBeDefined();
  });
  it('test Models_user toBeDefined update_user correctly', () => {
    expect(user.updateUser).toBeDefined();
  });
});
