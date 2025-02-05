import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserReq } from './user-req';
import { UserRes } from './user-res';
import { GetUserItem, GetUserRes } from './getuser-res';

@Controller('user')
export class AppController {
@Inject() private prisma:PrismaService;



  // @Get('all')
  // async alluser():Promise<any>{
  //   const users = await this.prisma.user.findMany();
  //   return users;
  // }

  
  @Get('all')
  async alluser():Promise<GetUserRes>{
    const users = await this.prisma.user.findMany();
    return {
      
      data : users.map((item)=>{
        return {
          id:item.id,
          name:item.name??'',
          email:item.email,
        }
      
      })
    };
  }

  @Get('getuser/:id')
  async getuser(@Param('id') id: string):Promise<any>{
    const users =  await this.prisma.user.findFirst({
      where : {
        id:Number(id)
      }
    });
    return users;
  }

  @Get('getuserwithemail/:id/:email')
  async getuserwithemail(@Param('id') id: string, @Param('email') email:string):Promise<any>{
    const users =  await this.prisma.user.findFirst({
      where : {
        id:Number(id),
        email:email,
      }
    });
    return users;
  }

  
  @Post('create')
  async addUser(@Body() req:UserReq):Promise<UserRes>{
  const user=  await this.prisma.user.create({
      data : {
        name:req.name,
        email:req.email,
      }
    });
    return {
      id : user.id,
      name :user.name??'',
      email :user.email
    };
  }
}
