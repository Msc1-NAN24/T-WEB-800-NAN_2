import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controler';
import { UserService } from './user.servcie';
import { createUserDto } from './dto/user.dto';
import { User } from '../schemas/user.schema';

describe('Users Controller', () => {
  let controller: UserController;
  let service: UserService;
  const createUserDto: createUserDto[] = [
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

  const mockUser: User = {
    lastName: 'lastName #1',
    firstName: 'firstName #1',
    email: 'email #1',
    password: 'password #1',
  };
  const userUpdated: User = {
    lastName: 'update #1',
    firstName: 'firstName #1',
    email: 'email #1',
    password: 'password #1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(createUserDto),
            create: jest.fn().mockResolvedValue(createUserDto[0]),
            updateUSer: jest.fn().mockResolvedValue,
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      expect(controller.getAllUser()).resolves.toEqual(createUserDto);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should return an array of users', async () => {
      expect(
        controller.updateUser('1', { lastName: 'update #1' }),
      ).resolves.toEqual(userUpdated);
      expect(service.updateUser).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    it('should delete users', async () => {
      expect(controller.deleteUser('1')).resolves.toEqual(userUpdated);
      expect(service.delete()).toHaveBeenCalled();
    });
  });
});
