import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserReq } from './user-req';
import { UserRes } from './user-res';
import { GetUserItem, GetUserRes } from './getuser-res';
import { emit } from 'process';
import { UpdateUserRequest } from './update-req';

@Controller('user')
export class AppController {
  @Inject() private prisma: PrismaService;

  // @Get('all')
  // async alluser():Promise<any>{
  //   const users = await this.prisma.user.findMany();
  //   return users;
  // }

  @Get('')
  async alluser(): Promise<GetUserRes> {
    const users = await this.prisma.user.findMany();
    return {
      data: users.map(item => {
        return {
          id: item.id,
          name: item.name ?? '',
          email: item.email
        };
      })
    };
  }

  @Get(':id')
  async getuser(@Param('id') id: string): Promise<any> {
    const users = await this.prisma.user.findFirst({
      where: {
        id: Number(id)
      }
    });
    return users;
  }

  @Get(':id/:email')
  async getuserwithemail(@Param('id') id: string, @Param('email') email: string): Promise<any> {
    const users = await this.prisma.user.findFirst({
      where: {
        id: Number(id),
        email: email
      }
    });
    return users;
  }

  @Post('add')
  async addUser(@Body() req: UserReq): Promise<UserRes> {
    const user = await this.prisma.user.create({
      data: {
        name: req.name,
        email: req.email
      }
    });
    return {
      id: user.id,
      name: user.name ?? '',
      email: user.email
    };
  }

  @Put(':id')
  async updateuser(@Param('id') id: string, @Body() req: UpdateUserRequest): Promise<any> {
    const user = await this.prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        name: req.name,
        email: req.email
      }
    });
  }

  @Delete(':id')
  async deleteuser(@Param('id') id: string): Promise<any> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (result)
      await this.prisma.user.delete({
        where: { id: Number(id) }
      });
    if (!result)
      return {
        id: 'user not found'
      };
  }
}
