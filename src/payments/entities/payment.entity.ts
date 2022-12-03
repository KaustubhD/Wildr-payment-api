import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";
import { Currency } from "../enums/Currency";
import { PaymentStatus } from "../enums/PaymentStatus";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  public transactionId: string;

  @Index()
  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId'})
  public user: User;

  @CreateDateColumn()
  public initiatedAt: string;

  @Column({
    type: 'varchar',
    default: PaymentStatus.Pending.toString(),
  })
  public paymentStatus: PaymentStatus;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  public finalisedAt: string;

  @Column({
    nullable: false,
    unique: true,
  })
  public stripeSessionId: string;

  @Column()
  public amount: number;

  @Column({
    type: 'varchar',
  })
  public currency: Currency;
}
