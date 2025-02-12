import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { BaseController } from "src/base.controller";
import { AuthService } from "@auth/auth.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Authorize } from "@auth/authorize.decorator";
import { CurrentUser } from "@auth/current-user";
import { categoryItemRes } from "./category-res";

@Controller('jwd')
@ApiBearerAuth()
export class JwtCategoryController extends BaseController {
  
@Inject() private readonly authService: AuthService;
  
 

  @Post('add')
  @Authorize('ADMIN','USER')
  async addcategory(@CurrentUser() currentuser:any, @Body() req : categoryItemRes):Promise<any>{
    console.log(currentuser.name)
    const category = await this.prismaService.category.create({
        data: {
          title: req.title,
          detail: req.detail
        }
      });
      return category;
  }

  @Get()
  async getbytoken():Promise<any>{
   

    const payload={
      id:'1',
      name:'ayyappan',
      role:'USER'
    }
    const accessToken: string = await this.authService.sign(payload, this.appConfig.jwtSecret, this.appConfig.jwtExpire);
    return {
      accessToken
    };
  }

}