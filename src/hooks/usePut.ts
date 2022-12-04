import axios, { AxiosError } from "axios";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";

interface Options<TBody>
  extends UseMutationOptions<unknown, AxiosError, TBody, undefined> {
  url: string;
  invalidateQueriesList?: QueryKey[];
  removeQueries?: QueryKey[];
  shouldInvalidateAll?: boolean;
  id: number;
}

const usePut = <TBody>(options: Options<TBody>) => {
  const { onSuccess, url, shouldInvalidateAll, id } = options;
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...mutation } = useMutation({
    mutationFn: (body) => {
      if (body instanceof FormData) {
        body.append("id", String(id));
      } else {
        body = { ...body, id };
      }
      return axios.put(url, body);
    },

    ...options,
    onSuccess: (...arg) => {
      if (shouldInvalidateAll) {
        queryClient.invalidateQueries();
      } else {
        options.invalidateQueriesList?.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
      }
      options.removeQueries?.forEach((queryKey) => {
        queryClient.removeQueries(queryKey);
      });
      onSuccess?.(...arg);
    },
    onError: (e) => {},
  });

  return { put: mutate, isLoadingPut: isLoading, ...mutation };
};

export default usePut;
