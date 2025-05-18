import dayjs from "dayjs";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import FormTask from "./FormTask";
import { modalStore } from "@/stores/providerStore";
import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const Header = () => {
	const openModal = modalStore((state) => state.show);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleNewTaskClick = () => {
		openModal({
			title: "New Task",
			content: (
				<FormTask
					mode="add"
					onSubmit={() => useModalStore.getState().hide()}
				/>
			),
		});
	};

	return (
		<div className="flex justify-between mb-4 items-center relative">
			<button
				className="p-2 mr-4 rounded hover:bg-gray-200 cursor-pointer"
				aria-label="Menu"
				onClick={() => setShowDropdown((prev) => !prev)}
			>
				<div className="flex space-x-2 flex-grow">
					<h1 className="text-3xl font-bold">
						{dayjs().format("D")}
					</h1>
					<div>
						<p className="text-xs">
							{dayjs().format("dddd")}
							<br />
							{dayjs().format("MMM YYYY")}
						</p>
					</div>
				</div>
			</button>
			<button
				className="flex items-center text-black text-sm p-0 mr-2 bg-transparent cursor-pointer"
				onClick={handleNewTaskClick}
			>
				<IconCirclePlusFilled
					size={24}
					className="mr-1 text-[#e346ef]"
				/>
				<span className="font-bold">NEW TASK</span>
			</button>
			{showDropdown && (
				<div className="absolute top-full left-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
					<button
						className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
						onClick={() => {
							signOut({
								callbackUrl: `${window.location.origin}/auth/login`,
							});
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
