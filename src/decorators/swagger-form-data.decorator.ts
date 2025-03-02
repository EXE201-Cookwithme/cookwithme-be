import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiDocsPagination() {
  return applyDecorators(
    ApiQuery({
      name: 'keyword',
      type: String,
      required: false,
      description: 'Search by title video',
    }),
    ApiQuery({
      name: 'categoryName',
      type: String,
      required: false,
      description: 'Filter by category name',
    }),
  );
}
