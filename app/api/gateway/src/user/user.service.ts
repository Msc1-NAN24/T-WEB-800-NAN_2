import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from '../model/user.schema';

@Injectable()
export class UserService {
  async getAllUser() {
    const { data } = await axios.get('http://api-user:3000/user');
    return data;
  }
  async getUserById(id) {
    const { data } = await axios.get(`http://api-user:3000/user/${id}`);
    return data;
  }
  async createUser(createUser: Omit<User, '_id'>) {
    try {
      const { data } = await axios.post(
        'http://api-user:3000/user',
        createUser,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(userId: string, update: Partial<User>) {
    const { data } = await axios.patch(
      `http://api-user:3000/user/${userId}`,
      update,
    );
    return data;
  }

  async deleteUser(userId: string) {
    const { data } = await axios.delete(`http://api-user:3000/user/${userId}`);
    return data;
  }
}
