import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma.service';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [],
  controllers: [UserController, CategoryController],
  providers: [PrismaService],
})
export class AppModule {}
