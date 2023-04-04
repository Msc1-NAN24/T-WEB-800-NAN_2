import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/Auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelModule } from './travel/travel.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TravelModule,
    MongooseModule.forRoot(process.env.ME_CONFIG_MONGODB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
