import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CategoryReq } from "./category-req";
import { CategoryRes } from "./category-res";

@Controller('category')
export class CategoryController {
  @Inject() private prisma: PrismaService;

  @Get('')
  async getcategory():Promise<any>{
    const category = await this.prisma.category.findMany();
    return category;
  }

  @Post('add')
  async addcategory(@Body() req : CategoryReq):Promise<any>{
    const category = await this.prisma.category.create({
        data: {
          title: req.title,
          detail: req.detail
        }
      });
      return this.getcategory();
  }

}