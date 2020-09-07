import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdsDTO {
    @ApiProperty()
    title: string;
    @ApiProperty()
    price: number;
}