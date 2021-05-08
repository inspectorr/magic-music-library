import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

// @Roles('admin')

export const Roles = (...roles: string[]) => applyDecorators(
    SetMetadata('roles', ['root', ...roles]),
    // ApiOperation({summary: `(${roles} only)`})
);
