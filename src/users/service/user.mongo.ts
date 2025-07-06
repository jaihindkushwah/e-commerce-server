import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/models/user.schema";

export interface IUser {
  id: number;
  name: string;
  email: string;
}
type UserInput = Omit<IUser, "id">;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, "-password");
  }
  async create(user: UserInput): Promise<User> {
    return await this.userModel.create(user);
  }
  async findOne(id: string) {
    return this.userModel.findById(id);
  }
  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
