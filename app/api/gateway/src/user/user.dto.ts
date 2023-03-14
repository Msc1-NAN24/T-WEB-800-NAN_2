import { User, UserDocument } from '../model/user.schema';

export type UserDto = Omit<UserDocument, 'password'>;
export type createUserDto = Omit<User, '_id'>;
