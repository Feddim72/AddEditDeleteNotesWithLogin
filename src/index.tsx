import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "context/AuthProvider";
import axios from "axios";
import "./axiosinterceptor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      queryFn: ({ queryKey }) => {
        if (typeof queryKey === "string")
          return axios.get(queryKey).then(({ data }) => data);
        return null;
      },
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Suspense fallback={<div className="w-full h-full bg-black" />}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);

reportWebVitals();
