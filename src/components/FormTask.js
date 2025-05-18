import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { taskStore } from "@/stores/dataStore";
import { modalStore } from "@/stores/providerStore";
import { addTask, updateTask, deleteTask } from "@/graphql/task";
import _ from 'lodash';

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

	const addTaskToStore = taskStore((state) => state.addTask);
	const updateTaskStore = taskStore((state) => state.updateTask);
	const deleteTaskStore = taskStore((state) => state.deleteTask);
	const hide = modalStore((state) => state.hide);

	const addMutation = useMutation({
		mutationFn: async (task) => {
			addTaskToStore(task);
			hide();
		},
	});

	const editMutation = useMutation({
		mutationFn: async (task) => {
			updateTaskStore(task);
			hide();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			deleteTaskStore(id);
			hide();
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (mode === "edit") {
			editMutation.mutate(task, {
				onSuccess: () => {
					if (typeof onSubmit === "function") {
						onSubmit();
					}
					hide();
				},
			});
		} else {
			addMutation.mutate(task, {
				onSuccess: () => {
					if (typeof onSubmit === "function") {
						onSubmit();
					}
					hide();
				},
			});
		}
	};

	const handleDeleteClick = (e) => {
		e.stopPropagation();
		console.log("Delete task", taskData.id);
		deleteMutation.mutate(taskData.id, {
			onSuccess: () => {
				hide();
			},
		});
	};

	return (
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
					onChange={(e) =>
						setTask({ ...task, title: e.target.value })
					}
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
					onChange={(e) =>
						setTask({ ...task, description: e.target.value })
					}
					rows="4"
					className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				></textarea>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 mb-2" htmlFor="priority">
					Priority
				</label>
				<div className="relative">
					<select
						id="priority"
						name="priority"
						value={task.priority}
						onChange={(e) =>
							setTask({ ...task, priority: e.target.value })
						}
						className="w-full border rounded bg-white pr-8 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
					>
						<option value="normal">Normal</option>
						<option value="high">High</option>
						<option value="done">Done</option>
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
	);
};

export default FormTask;
