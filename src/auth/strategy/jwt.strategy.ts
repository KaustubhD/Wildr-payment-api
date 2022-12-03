import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { jwtStrategyConfig } from "../../config/jwt.config";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super(jwtStrategyConfig);
  }

  public async validate(payload: Partial<User>) {
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }
}