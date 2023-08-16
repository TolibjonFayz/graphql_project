import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateeUserDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
