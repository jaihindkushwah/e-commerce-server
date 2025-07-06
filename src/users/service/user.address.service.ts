import { InjectModel } from "@nestjs/sequelize";
import { UserAddress } from "../models/user.address.model";
import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class UserAddressService {
  constructor(
    private usersService: UsersService,
    @InjectModel(UserAddress) private userAddressModel: typeof UserAddress,
  ) {}
  async create(userAddress: UserAddress) {
    return this.userAddressModel.create(userAddress);
  }
  async findAll() {
    return this.userAddressModel.findAll();
  }
  async findAllByUserId(userId: number) {
    return this.userAddressModel.findAll({ where: { user_id: userId } });
  }
  async findOne(id: number) {
    return this.userAddressModel.findByPk(id);
  }
  async remove(id: number) {
    return this.userAddressModel.destroy({ where: { id } });
  }
  async update(id: number, userAddress: UserAddress) {
    return this.userAddressModel.update(userAddress, { where: { id } });
  }
}
