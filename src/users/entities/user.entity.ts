import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public userId: string;

  @Column({
    unique: true,
  })
  public userName: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    length: 256,
  })
  public password: string;

  @Column({
    default: true
  })
  public isActive: boolean;
}
