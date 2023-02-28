import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.servcie';

const mockUser = {
  lastName: 'lastName #1',
  firstName: 'firstName #1',
  email: 'email #1',
  password: 'password #1',
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
    },
    {
      lastName: 'lastName #2',
      firstName: 'firstName #2',
      email: 'email #2',
      password: 'password #2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new cat', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        lastName: 'lastName #1',
        firstName: 'firstName #1',
        email: 'email #1',
        password: 'password #1',
      }),
    );
    const newUser = await service.create({
      lastName: 'lastName #1',
      firstName: 'firstName #1',
      email: 'email #1',
      password: 'password #1',
    });
    expect(newUser).toEqual(mockUser);
  });

  // it('should update a user', async () => {
  //   jest
  //     .spyOn(model, 'findOneAndUpdate')
  //     .mockImplementationOnce(
  //       (): Promise<
  //         Document<unknown, any, User> &
  //           Omit<User & { _id: Types.ObjectId }, never> &
  //           Required<{ _id: Types.ObjectId }>
  //       > => {},
  //     );
  //   const newUser = await service.updateUser('1', {
  //     lastName: 'update #1',
  //   });
  //   expect(newUser).toEqual(mockUser);
  // });
});
