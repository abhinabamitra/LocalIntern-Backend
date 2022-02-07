import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { EmailPattern, passwordPattern } from '../constants/constants';

export function IsDocquityEmail( validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDocquityEmail',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && 
                value.match(EmailPattern) != null 
        },
      },
    });
  };
}

export function IsValidPassword( validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isValidPassword',
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return typeof value === 'string' && 
                  value.match(passwordPattern) != null 
          },
        },
      });
    };
  }