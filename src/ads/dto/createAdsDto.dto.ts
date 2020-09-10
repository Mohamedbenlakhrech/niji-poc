import { ApiProperty } from "@nestjs/swagger";

export class CreateAdsDTO {
    @ApiProperty()
    title: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    categories: string[]
}