import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';
import { PaginatedResponseType } from '~/types/api';
import { BaseEntityType } from '~/types/entity';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
        refetchOnMount: true,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function makePlaceholderPaginatedData<
  T extends BaseEntityType
>(): PaginatedResponseType<T> {
  return {
    data: Array.from({ length: 10 }, (_, id) => ({ id } as T)),
    meta: {
      page: 1,
      totalPage: 1,
      totalData: 0,
    },
  };
}
