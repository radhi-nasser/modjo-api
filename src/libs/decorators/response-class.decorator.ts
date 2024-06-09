import { SetMetadata, Type } from '@nestjs/common';

export const ResponseClass = (responseClass: Type<any>) =>
  SetMetadata('responseClass', responseClass);
