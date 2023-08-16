import { Get } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Posts } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Resolver('Posts')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Posts])
  async getAllPosts(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Query(() => Posts)
  @Get(':id')
  async getOnePost(@Args('id') id: number): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Posts)
  @Query(() => [Posts])
  async createPost(
    @Args('createPost') createPostDto: CreatePostDto,
  ): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  @Mutation(() => Posts)
  async updatePost(
    @Args('id') id: number,
    @Args('updatePost') updatePostDto: UpdatePostDto,
  ): Promise<Posts> {
    return this.postsService.update(id, updatePostDto);
  }

  @Mutation(() => Number)
  async removePost(@Args('id') id: number): Promise<number> {
    return this.postsService.remove(id);
  }
}
