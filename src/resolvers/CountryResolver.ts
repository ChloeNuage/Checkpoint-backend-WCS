import { Resolver, Mutation, Arg, InputType, Field, ObjectType, Query } from "type-graphql";
import Country  from "../entities/Country";
import DataSource from "../config/db";
import { FindManyOptions } from "typeorm";


@InputType()
class CountryInput {
    @Field()
    name!: string;

    @Field()
    code!: string;

    @Field()
    emoji!: string;
}

@Resolver()
export class CountryResolver {

  @Query(() =>  [Country], { nullable: true })
  async getAllCountries() {
    const allCountries = await Country.find();
    return allCountries;
  }

  @Query(() => Country, { nullable: true })
  async getCountryCode (
    @Arg("code") code: string
  ) {
    const country = await Country.findOne({ where: { code } });
    if (!country) throw new Error("Country not found");
    return country;
  }

  @Mutation(() => Country)
  async CreateCountry(
    @Arg("input") input: CountryInput
  ): Promise<Country> {
    const countryRepository = DataSource.getRepository(Country);
    const country = countryRepository.create(input);
    await countryRepository.save(country);
    return country;
  }
}