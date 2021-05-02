import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cat } from "./cat.entity";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat) private readonly catsRepository: Repository<Cat>
    ) {}

    async getCats(): Promise<Cat[]> {
        return this.catsRepository.find();
    }

    addCat(createCatDto: CreateCatDto) {
        const cat = new Cat();

        cat.name = createCatDto.name;
        cat.breed = createCatDto.breed;

        return this.catsRepository.save(cat);
    }

    async updateCat(id: number, updateCatDto: UpdateCatDto) {
        const cat = await this.catsRepository.findOne(id);

        if (!cat) throw new BadRequestException("Cat not found bro");

        const updatedCat = { ...cat, ...updateCatDto };
        console.log(cat);

        return this.catsRepository.save(updatedCat);
    }
}
