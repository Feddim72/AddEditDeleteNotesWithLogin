import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

const useGet = <TTableData, TSelectData = TTableData>(
  url: string,
  options?: UseQueryOptions<TTableData, AxiosError, TSelectData>
) => {
  return useQuery({
    queryKey: url,
    queryFn: ({ queryKey }) =>
      axios
        .get<TTableData>(url, { params: queryKey[1] })
        .then((res) => res.data),
    ...options,
  });
};

export default useGet;
