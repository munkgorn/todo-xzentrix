import Header from "@/components/Header";
import Task from "@/components/Task";
import Modal from "@/components/Modal";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userStore, taskStore } from "@/stores/dataStore";
import Tasks from "@/components/Tasks";
import { fetchTasks } from "@/graphql/task";
import { getSession, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
	const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      userStore.setState({ user: session.user });
    }
  }, [status, session]);
	// if (status === "unauthenticated") {
	// 	if (typeof window !== "undefined") {
	// 		// window.location.href = "/auth/login";
	// 	}
	// }
  // console.log("session", session);

	const user = userStore((state) => state.user);
	const setTasks = taskStore((state) => state.setTasks);

	const { data, isLoading, error } = useQuery({
		queryKey: ["tasks", user],
		queryFn: () => fetchTasks(user.id),
		refetchOnWindowFocus: true,
		enabled: !!session,
	});

	useEffect(() => {
		if (data) {
			setTasks(data);
		}
	}, [data, setTasks]);

	if (isLoading) return <div>Loading tasks...</div>;
	if (error) return <div>Error loading tasks</div>;

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
			<div className="w-full max-w-xl border border-gray-300 rounded-md shadow-sm p-5 bg-white">
				<Header />
				{/* <p>{status}</p> */}
				<hr className="border-dashed border-gray-300 my-4" />
				<Tasks title="TODO TASKS" priorities={["normal", "high"]} />
				<hr className="border-dashed border-gray-300 my-4" />
				<Tasks title="DONE TASKS" priorities={["done"]} />
				<Modal />
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
  // Session next-auth
  const session = await getSession(context)
  console.log("session index", session);

  if (!session) {
    // Redirect to the login page if not authenticated
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {  }, // will be passed to the page component as props
  };
}