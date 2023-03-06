import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controler';
import { UserService } from './user.service';
import { createUserDto } from './dto/user.dto';
import { User } from './model/user.schema';

describe('Users Controller', () => {
  let controller: UserController;
  let service: UserService;
  const createUserDto: createUserDto[] = [
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

  const userUpdated: User = {
    lastName: 'update #1',
    firstName: 'firstName #1',
    email: 'email #1',
    password: 'password #1',
    phone: '555',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(createUserDto),
            findOne: jest.fn().mockResolvedValue(createUserDto[0]),
            create: jest.fn().mockResolvedValue(createUserDto[0]),
            updateUser: jest.fn().mockResolvedValue(userUpdated),
            delete: jest.fn().mockResolvedValue(createUserDto[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest.spyOn(service, 'create');

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

  describe('findOne()', () => {
    it('should return a users', async () => {
      await controller.getUser('1');
      expect(service.findOne).toHaveBeenCalledWith({ _id: '1' });
    });
  });

  describe('delete()', () => {
    it('should delete users', async () => {
      const createSpy = jest.spyOn(service, 'delete');
      await controller.deleteUser('1');
      expect(createSpy).toHaveBeenCalledWith('1');
    });
  });
});
