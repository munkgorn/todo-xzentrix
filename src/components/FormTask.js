import React, { useState, useEffect } from "react";
import {
	useMutation,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useZustandStore } from "@/stores/useZustandStore";
import { useModalStore } from "@/stores/useModalStore";

// Create a client
const queryClient = new QueryClient();

const FormTask = ({ mode, taskData, onSubmit }) => {
	const initialTaskState = {
		id: "",
		title: "",
		priority: "NORMAL",
		description: "",
	};

	const [task, setTask] = useState(initialTaskState);

	useEffect(() => {
		if (taskData) {
			setTask(taskData);
		}
	}, [taskData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTask({
			...task,
			[name]: value,
		});
	};

	const addTaskToStore = useZustandStore((state) => state.addTask);
	const updateTaskInStore = useZustandStore((state) => state.updateTask);
	const deleteTask = useZustandStore((state) => state.deleteTask);
  const hide = useModalStore((state) => state.hide);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(task);
		}
		if (mode === "edit") {
			updateTaskInStore(task);
		} else {
			addTaskToStore(task);
		}
		// ปิด modal หลังเพิ่มหรือแก้ไข
		if (typeof onSubmit === "function") {
			onSubmit();
		}
	};

	const handleDeleteClick = (e) => {
		e.stopPropagation();
		deleteTask(taskData.id);
    hide();
	};

	return (
		<QueryClientProvider client={queryClient}>
			<form onSubmit={handleSubmit} className="w-full">
				{mode === "edit" && (
					<input type="hidden" name="id" value={task.id} />
				)}

				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="title">
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={task.title}
						onChange={handleChange}
						required
						className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 mb-2"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={task.description}
						onChange={handleChange}
						rows="4"
						className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					></textarea>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 mb-2"
						htmlFor="priority"
					>
						Priority
					</label>
					<div className="relative">
						<select
							id="priority"
							name="priority"
							value={task.priority}
							onChange={handleChange}
							className="w-full border rounded bg-white pr-8 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
						>
							<option value="NORMAL">NORMAL</option>
							<option value="HIGH">HIGH</option>
							<option value="DONE">DONE</option>
						</select>
						<div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 10l5 5 5-5H7z"
								/>
							</svg>
						</div>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
				>
					{mode === "edit" ? "Update Task" : "Add Task"}
				</button>
				{mode === "edit" && (
					<button
						type="button"
						className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-500 cursor-pointer mt-2"
						aria-label="Delete task"
						onClick={handleDeleteClick}
					>
						Delete Task
					</button>
				)}
			</form>
		</QueryClientProvider>
	);
};

export default FormTask;
