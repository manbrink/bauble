import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const withQueryClientProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P) => (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
    </QueryClientProvider>
  );
};

export default withQueryClientProvider;
