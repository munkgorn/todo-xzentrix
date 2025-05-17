import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
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
			</QueryClientProvider>
		</SessionProvider>
	);
}
