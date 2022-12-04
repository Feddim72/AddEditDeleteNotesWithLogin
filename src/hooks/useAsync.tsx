import { useCallback, useEffect, useReducer, useRef } from "react";

function useSafeDispatch<T extends unknown[]>(dispatch: (...args: T) => void) {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args: T) => (mounted.current ? dispatch(...args) : undefined),
    [dispatch]
  );
}

interface InitialState<Data, Error> {
  status: "idle" | "resolved" | "rejected" | "pending";
  data?: Data | null;
  error?: Error | null;
}

const defaultInitialState: InitialState<null, null> = {
  status: "idle",
  data: null,
  error: null,
};

function useAsync<Data extends unknown, Error extends unknown = unknown>(
  initialState?: InitialState<Data, Error>
) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = useReducer(
    (s: InitialState<Data, Error>, a: InitialState<Data, Error>) => ({
      ...s,
      ...a,
    }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (resData: any) => safeSetState({ data: resData, status: "resolved" }),
    [safeSetState]
  );

  const setError = useCallback(
    (err: any) => safeSetState({ error: err, status: "rejected" }),
    [safeSetState]
  );

  const reset = useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = useCallback(
    (promise: any) => {
      if (!promise || !promise.then) {
        throw new Error(
          // eslint-disable-next-line max-len
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"
        );
      }

      safeSetState({ status: "pending" });
      return promise.then(
        (apiData: Data) => {
          setData(apiData);
          return apiData;
        },
        (err: Error) => {
          setError(err);
          return Promise.reject(err);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
