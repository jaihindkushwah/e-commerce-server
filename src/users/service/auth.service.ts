import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { NotificationsService } from "src/notifications/notifications.service";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private notificationService: NotificationsService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    Logger.log(user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: "1d",
      }),
    };
  }
  // create user
  async createUser(user: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new UnauthorizedException("User already exists.");
    }
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(user.password, salt);
    const verifyToken = this.generateVerifyToken(user.email);
    user.verify_token = verifyToken;
    await this.notificationService.sendVerificationEmail(
      user.email,
      verifyToken,
    );
    const created = await this.usersService.create({
      ...user,
      password: hashedPass,
    });
    const { password: _, ...newUser } = created.toJSON();
    return newUser;
  }

  async verifyUser(
    email: CreateUserDto["email"],
    token: CreateUserDto["verify_token"],
  ) {
    if (!token) throw new UnauthorizedException();
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();
    const tokenMatch = await this.jwtService.verify(token);
    if (!tokenMatch) throw new UnauthorizedException();
    await this.usersService.updateById(user.id, {
      verify_token: "",
      is_verified: true,
    });
    return user;
  }
  async resendVerificationEmail(email: CreateUserDto["email"]) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();
    const verifyToken = this.generateVerifyToken(email);
    user.verify_token = verifyToken;
    await this.notificationService.sendVerificationEmail(
      user.email,
      verifyToken,
    );
    await this.usersService.updateById(user.id, {
      verify_token: verifyToken,
    });
    return user;
  }
  async generateRefreshToken(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
      }),
    };
  }

  private generateVerifyToken(email: CreateUserDto["email"]) {
    return this.jwtService.sign(
      { email },
      { expiresIn: "30m", privateKey: process.env.JWT_ACCESS_SECRET },
    );
  }
}
