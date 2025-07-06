import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { AuthService } from "../service/auth.service";
import { UpdateUserDto } from "../dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get("/")
  async getAllData() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to fetch users.");
    }
  }

  @UsePipes(new ValidationPipe())
  @Post("/register")
  async create(@Body() user: CreateUserDto) {
    try {
      return await this.authService.createUser(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("Registration failed.");
    }
  }

  @UsePipes(new ValidationPipe())
  @Post("/login")
  async login(@Body() user: UpdateUserDto) {
    if (!user?.email || !user?.password) {
      throw new BadRequestException("Email and password are required.");
    }
    try {
      const result = await this.authService.signIn(user.email, user.password);
      if (!result) {
        throw new UnauthorizedException("Invalid credentials.");
      }
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("Login failed. Try again later.");
    }
  }

  @Post("/verify")
  async verify(@Body() user: UpdateUserDto) {
    if (!user.email || !user.verify_token) {
      throw new BadRequestException(
        "Email and verification token are required.",
      );
    }

    try {
      const result = await this.authService.verifyUser(
        user.email,
        user.verify_token,
      );
      if (!result) {
        throw new NotFoundException("Verification failed or user not found.");
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Verification failed.");
    }
  }
}
