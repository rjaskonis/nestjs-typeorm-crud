import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DashLettersPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'string')
            return (value as string).split('').join('-');
        else if (typeof value === 'object') {
            const parsedObject: any = {};

            Object.keys(value).forEach((key) => {
                parsedObject[key] = (value[key] as string).split('').join('-');
            });

            return parsedObject;
        } else return null;
    }
}
