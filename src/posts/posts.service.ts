import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postRepo: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepo.save(createPostDto);
  }

  findAll() {
    return this.postRepo.find();
  }

  findOne(id: number) {
    return this.postRepo.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepo.update({ id }, { ...updatePostDto });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.postRepo.delete({ id });
    return id;
  }
}
