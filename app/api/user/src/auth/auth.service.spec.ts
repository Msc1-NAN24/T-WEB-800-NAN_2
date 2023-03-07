import { Model } from 'mongoose';
import { User, UserSchema } from '../user/model/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './Auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

describe('auth service', () => {
  const userMock = {
    lastName: 'lastName #1',
    firstName: 'firstName #1',
    email: 'email@email.fr',
    password: 'password #1',
    phone: '555 01',
  };

  let service: AuthService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: jwtConstants.expiresIn,
          },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('validateUser should be return user', async () => {
    await model.create({
      ...userMock,
      password: await bcrypt.hash(userMock.password, 10),
    });
    const user = await service.validateUser(userMock.email, userMock.password);

    const { password, ...result } = userMock;
    expect(user).toEqual(expect.objectContaining(result));
  });

  it('validateUser should be return null invalid email', async () => {
    await model.create(userMock);
    const user = await service.validateUser(userMock.email, userMock.password);

    expect(user).toBeNull();
  });

  it('validateUser should be return null invalid password', async () => {
    await model.create(userMock);
    const user = await service.validateUser(userMock.email, 'hello');

    expect(user).toBeNull();
  });

  it('should return user info and jwt token', async () => {
    const user = await model.create(userMock);
    const res = await service.login(user);

    expect(typeof res.access_token).toEqual('string');
    expect(res.user).toBeInstanceOf(model<User>);
  });
});
