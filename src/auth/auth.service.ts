import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { SecurityUtils } from "../utils/SecurityUtils";
import { AuthDto } from "./dto/AuthDto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(authDto: AuthDto): Promise<any> {
    const user = await this.validateUser(authDto.email, authDto.password);
    const tokenPayload = { email: user.email, sub: user.userId };
    const accessToken = this.jwtService.sign(tokenPayload);
    
    return { accessToken };
  }

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    const hashedPassword = SecurityUtils.hashPassword(password);

    if (user && user.password == hashedPassword) {
      delete user['password'];
      return user;
    }

    throw new UnauthorizedException();
  }
}