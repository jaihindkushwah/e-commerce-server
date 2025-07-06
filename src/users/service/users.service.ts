import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
export interface IUser {
  id: number;
  name: string;
  email: string;
}
export type UserInput = Omit<IUser, "id">;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ attributes: { exclude: ["password"] } });
  }
  async create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user as User);
  }
  async findOne(id: string) {
    return this.userModel.findByPk(id);
  }
  async findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
  async remove(id: string) {
    return this.userModel.destroy({ where: { id } });
  }
  async updateById(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }
}
