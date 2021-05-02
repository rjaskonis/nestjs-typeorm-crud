import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperCasePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // console.log('value is: ', value);
        if (typeof value === 'string') return (value as string).toUpperCase();
        else if (typeof value === 'object') {
            const parsedObject: any = {};

            Object.keys(value).forEach((key) => {
                parsedObject[key] = (value[key] as string).toUpperCase();
            });

            return parsedObject;
        } else return null;
    }
}
