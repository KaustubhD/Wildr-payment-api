import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/AuthDto";

@Controller('auth')
export class AuthController {

  public constructor(private authService: AuthService) { }

  @Post('login')
  public authenticateUser(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

}