import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";
import appConfig from "src/config/app.config";
import { BusinessService } from "../user/business.service";
import { PanelistService } from "../user/panelist.service";
import { UserService } from "../user/user.service";
type UserDecoded = {
    userId: string;
    from: string;
  }
@Injectable()
export class UserAccessGuard {
  constructor(
    private userService: UserService,
    private business: BusinessService,
    private panelist: PanelistService,

    private reflector: Reflector) { }
  logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;

    if (!header) return false;

    try {
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, appConfig().appSecret)  ;
  
      let user = await this.userService.validateUser(decoded['phone'] );
      if (!user) user = await this.business.validateBusiness(decoded['phone'] );
      if (!user) user = await this.panelist.validatePanelist(decoded['phone'] );

      request['user'] = user;
  
      return true
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
