import { Body, Controller, Get, Inject, Post,  UploadedFile, UseInterceptors,  BadRequestException  } from "@nestjs/common";
import { BaseController } from "src/base.controller";
import { AuthService } from "@auth/auth.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Authorize } from "@auth/authorize.decorator";
import { CurrentUser } from "@auth/current-user";
import { PrismaService } from "src/prisma.service";
import { categoryItemRes, CategoryRes } from "./category-res";
import { CategoryReq } from "./category-req";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('category')
export class CategoryController  {
    @Inject() private prisma: PrismaService;
 
    @Get('')
    async allcategory(): Promise<CategoryRes> {
      const category = await this.prisma.category.findMany();
      return {

        data: category.map(item => {
          return {
            id: item.id,
            title: item.title ?? '',
            detail: item.detail,
            image:item.image,
           
          };
        })
      };

    }

      @Post('add')
      @UseInterceptors(FileInterceptor('profilepic', {
        storage: diskStorage({
          destination: './uploads', // Save files to the uploads directory
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExt = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${fileExt}`;
            callback(null, filename);
          }
        }),
        limits: { fileSize: 5 * 1024 * 1024 } // 5MB file limit
      }))
      async addcategory(@Body() req: CategoryReq, @UploadedFile() file:  Express.Multer.File ): Promise<categoryItemRes> {

        if (!file) {
          throw new BadRequestException('Profile picture is required');
        }

        
        const category = await this.prisma.category.create({
          data: {
            title: req.title,
            detail: req.detail
            
          }
        });

        return {
          id:category.id,
          title:category.title,
          detail:category.detail,
          image:category.image,
        
        }
    

      }
 

}