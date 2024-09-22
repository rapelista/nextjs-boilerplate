import { useQuery } from '@tanstack/react-query';
import { generateApiUrl } from '~/lib/api';
import { makePlaceholderPaginatedData } from '~/lib/query';
import { PaginatedResponseType } from '~/types/api';
import { BaseEntityType } from '~/types/entity';
import { request } from './api';

export async function getPaginatedEntity<T extends BaseEntityType>(
  context: string
): Promise<PaginatedResponseType<T>> {
  const url = generateApiUrl(context);
  return await request(url);
}

export function useGetPaginatedEntity(context: string) {
  return useQuery({
    queryKey: [context],
    queryFn: () => getPaginatedEntity(context),
    placeholderData: makePlaceholderPaginatedData,
  });
}
