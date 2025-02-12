import { Inject } from "@nestjs/common";
import appConfig, { AppConfig } from "./config";
import { PrismaService } from "./prisma.service";

export class BaseController {
    @Inject(appConfig.KEY) public readonly appConfig: AppConfig;
    @Inject() public prismaService: PrismaService;
}