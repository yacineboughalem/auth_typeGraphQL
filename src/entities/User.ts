import { ObjectType, Field, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column("text", { unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  @Field(() => Boolean)
  isActive: boolean;
}
