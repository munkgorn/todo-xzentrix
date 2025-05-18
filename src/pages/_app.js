import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../styles/globals.css";

const queryClient = new QueryClient(); // Create a QueryClient instance

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={true} />
			</QueryClientProvider>
		</SessionProvider>
	);
}
