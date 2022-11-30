import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  public constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ userId });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userRecord = await this.findOne(id);
    return this.userRepository.save({ ...userRecord, ...updateUserDto});
  }

  async setInactive(id: string) {
    const userRecord = await this.findOne(id);
    this.userRepository.save({ ...userRecord, isActive: false });
    return;
  }
}
