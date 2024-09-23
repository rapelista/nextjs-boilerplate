import { BaseEntityType } from '~/types/entity';

export const defaultColumnSizing = {
  size: 250,
  minSize: 50,
  maxSize: 500,
};

export function generateParamsFromSlug<T extends BaseEntityType>(
  url: string,
  entity: T
) {
  return url.replace(/:(.*?)(\/|$)/g, (match) => {
    const key = match.replace(/:|\/$/g, '');
    return String(entity[key as keyof T]);
  });
}
