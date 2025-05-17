import Header from "@/components/Header";
import Task from "@/components/Task";
import Modal from "@/components/Modal";
import {
	AppShell,
	Title,
	Container,
	Card,
	Grid,
	Group,
	Text,
	Badge,
	Button,
	Divider,
} from "@mantine/core";
import Tasks from "@/components/Tasks";

export default function Home() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
			<div className="w-full max-w-xl border border-gray-300 rounded-md shadow-sm p-5 bg-white">
				<Header />
				<hr className="border-dashed border-gray-300 my-4" />
				<Tasks title="TODO TASKS" priorities={["NORMAL", "HIGH"]} />
				<hr className="border-dashed border-gray-300 my-4" />
				<Tasks title="DONE TASKS" priorities={["DONE"]} />
				<Modal />
			</div>
		</div>
	);
}
