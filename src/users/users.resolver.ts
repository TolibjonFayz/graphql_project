import { Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateeUserDto } from './dto/update-user.dto';
import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getAllusers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  @Get(':id')
  async getOneUser(@Args('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @Query(() => [User])
  async createUser(
    @Args('createUser') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUser') updateUserDto: UpdateeUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return this.usersService.remove(id);
  }
}
