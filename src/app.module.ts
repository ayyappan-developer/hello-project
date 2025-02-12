import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma.service';
import { CategoryController } from './category/category.controller';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig, { AppConfig } from './config';


@Module({
  imports: [


    AuthModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtSecret: configService.get<AppConfig>('app').jwtSecret,
        jwtExpire: configService.get<AppConfig>('app').jwtExpire,
        userAccessControlKey: 'role',
      }),
      inject: [ConfigService],
    }),
    

    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),

    
  ],
  controllers: [UserController, CategoryController],
  providers: [PrismaService],
})
export class AppModule {}
