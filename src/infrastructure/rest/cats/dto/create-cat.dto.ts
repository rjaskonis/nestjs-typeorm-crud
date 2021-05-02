import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCatDto {
    @ApiProperty({ type: String })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true })
    breed: string;
}
