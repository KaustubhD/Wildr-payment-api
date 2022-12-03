import { JwtModuleOptions } from "@nestjs/jwt";
import { ExtractJwt } from "passport-jwt";

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '1h',
  },
};

export const jwtStrategyConfig = {
  secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}