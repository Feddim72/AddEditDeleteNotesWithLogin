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
}

const useRemove = <TBody>(options: Options<TBody> = { url: "" }) => {
  const { onSuccess, url } = options;
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...mutation } = useMutation({
    mutationFn: () => axios.delete(url),
    ...options,
    onSuccess: (...arg) => {
      options.invalidateQueriesList?.forEach((queryKey) => {
        queryClient.invalidateQueries(queryKey);
      });

      options.removeQueries?.forEach((queryKey) => {
        queryClient.removeQueries(queryKey);
      });
      onSuccess?.(...arg);
    },
    onError: (e) => {},
  });

  return { remove: mutate, isLoadingRemove: isLoading, ...mutation };
};

export default useRemove;
