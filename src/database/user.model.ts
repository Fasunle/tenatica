import { firestore } from '../server';

export class UserModel {
  private _userModel = firestore.collection('users');
  constructor() {}

  /**
   * Create a new User
   * @returns creatino message
   */
  async create(item: IUser): Promise<ICreateUserResponse> {
    try {
      const existingUsers = new Set([item.email]);
      const users = await this._userModel.get();

      users.forEach((user) => {
        if (existingUsers.has(user.data().email)) {
          throw { message: 'User exsist already', status: 400 };
        }
      });
      // create new user
      await this._userModel.doc().set(item);
      return { message: 'User Created successfully', status: 201 };
    } catch (error) {
      return { message: error.message, status: error.status };
    }
  }

  async getUser(id: string): Promise<IUser> {
    try {
      const users = await this._userModel.get();
      let currentUser: IUser;

      users.forEach((user) => {
        if (user.data().userId === id) {
          currentUser = {
            email: user.data().email,
            userId: user.data().userId,
            username: user.data().username,
          };
        }
      });

      if (!currentUser) throw 'Not found';
      return currentUser;
    } catch (error) {
      return null;
    }
  }
}
