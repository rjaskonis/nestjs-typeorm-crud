import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotAcceptableException,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
} from "@nestjs/common";
import { DashLettersPipe } from "../common/pipes/dash-letters.pipe";
import { UpperCasePipe } from "../common/pipes/uppercase.pipe";
import { Cat } from "./cat.entity";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Controller("cats")
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    async getCats(): Promise<Cat[]> {
        return this.catService.getCats();
    }

    @Post()
    async addCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catService.addCat(createCatDto);
    }

    @Put(":id")
    // @UsePipes(UpperCasePipe, DashLettersPipe)
    updateCat(
        @Param(
            "id",
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, // 406
            }) // or @Param('id', ParseIntPipe) // 400
        )
        id: number,
        @Body() updateCatDto: UpdateCatDto
    ): Promise<Cat> | Promise<NotFoundException> {
        return this.catService.updateCat(id, updateCatDto);
    }
}
