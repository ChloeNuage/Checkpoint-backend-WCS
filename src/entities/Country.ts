import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType() 
@Entity()
class Country extends BaseEntity {
    @Field(() => Int) 
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()          
    @Column()
    name!: string;

    @Field()         
    @Column()
    code!: string;

    @Field()           
    @Column()
    emoji!: string;
}

export default Country;