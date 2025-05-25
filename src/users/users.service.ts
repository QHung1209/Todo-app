import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const existsUser = await this.userModel.findOne({
      email,
    });
    if (existsUser) throw new ConflictException(`Email ${email} exists`);
    const hashedPassword = this.hashPassword(password);
    return await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });
  }

  hashPassword = (password: string) => {
    return hashSync(password, 10);
  };

  checkUserPassword = (password: string, hashPassword: string) => {
    return compareSync(password, hashPassword);
  };

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`Not found user with id ${id}`);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new NotFoundException(`Not found user with email ${email}`);
    return user;
  }
}
