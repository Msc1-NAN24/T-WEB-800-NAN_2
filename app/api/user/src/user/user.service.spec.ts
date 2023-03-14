import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './model/user.schema';
import { UserService } from './user.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';
import * as bcrypt from 'bcrypt';

const mockUser = {
  lastName: 'lastName #1',
  firstName: 'firstName #1',
  email: 'email #1',
  password: 'password #1',
  phone: '555 01',
};

describe('UsersService', () => {
  let service: UserService;
  let model: Model<User>;

  const usersArray = [
    {
      lastName: 'lastName #1',
      firstName: 'firstName #1',
      email: 'email #1',
      password: 'password #1',
      phone: '555 01',
    },
    {
      lastName: 'lastName #2',
      firstName: 'firstName #2',
      email: 'email #2',
      password: 'password #2',
      phone: '555 02',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create user in DB', async () => {
    const res = await service.create(mockUser);
    const isMatch = await bcrypt.compare(mockUser.password, res.password);

    expect(res._id.toString().length).toEqual(24);
    expect(res).toEqual(
      expect.objectContaining({
        lastName: 'lastName #1',
        firstName: 'firstName #1',
        email: 'email #1',
        phone: '555 01',
      }),
    );
    expect(isMatch).toBeTruthy();
  });

  it('should be update user', async () => {
    const user = await service.create(mockUser);
    const res = await service.updateUser(user._id, {
      email: 'update@email.fr',
    });

    expect(res.email).toEqual('update@email.fr');
  });

  it('should find all user', async () => {
    await model.create(usersArray[0]);
    await model.create(usersArray[1]);

    const res = await service.findAll();
    expect(res.length).toEqual(2);
  });

  it('should find one user', async () => {
    const user = await model.create(usersArray[0]);
    await model.create(usersArray[1]);

    const res = await service.findOne({ _id: user._id });
    expect(res).toEqual(
      expect.objectContaining({
        lastName: 'lastName #1',
        firstName: 'firstName #1',
        email: 'email #1',
        phone: '555 01',
      }),
    );
  });

  it('should find delete user', async () => {
    const deleteUser: UserDocument = await model.create(usersArray[0]);
    const user = await model.create(usersArray[1]);

    await service.delete(deleteUser._id);
    const res = await service.findAll();
    expect(res.length).toEqual(1);
    expect(res[0]._id).toEqual(user._id);
  });
});
