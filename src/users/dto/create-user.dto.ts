export class CreateUserDto {
  public userName: string;

  // @IsEmail()
  public email: string;

  // @MinLength(5)
  public password: string;
}
