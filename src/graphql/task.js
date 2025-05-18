import axios from "axios";
import _ from "lodash";

const API_URL = "https://todo-mg-xzentrix.hasura.app/api/rest";
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["x-hasura-admin-secret"] =
	process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

// Function สำหรับการดึงข้อมูล
const fetchTasks = async (user_id) => {
	console.log("call", user_id);
	const response = await axios.get('/task', {
		user_id: { _eq: user_id },
	});
	return response.data?.tasks; // คืนค่าข้อมูลที่ได้
};

// Function สำหรับการเพิ่ม Task
const addTask = async (newTask) => {
	try {
		_.update(newTask, "completed", (value) => {
			return newTask.priority === "done" ? true : false; // เปลี่ยนแปลงค่า completed ตาม priority
		}); // ใช้ lodash เพื่ออัปเดตค่า completed
		const response = await axios.post(
			'/task',
			_.pick(newTask, [
				"title",
				"description",
				"priority",
				"completed",
				"user_id",
			])
		); // ส่งข้อมูลที่ต้องการเพิ่ม
		return response.data?.insert_tasks_one; // คืนค่าข้อมูลที่กลับมาจากการเพิ่ม
	} catch (error) {
		console.error("Error adding task:", error);
		throw error; // ส่งต่อข้อผิดพลาด
	}
};

// Function สำหรับการอัปเดต Task
const updateTask = async (task) => {
	_.update(task, "completed", (value) => {
		return task.priority === "done" ? true : false; // เปลี่ยนแปลงค่า completed ตาม priority
	}); // ใช้ lodash เพื่ออัปเดตค่า completed
	const response = await axios.put(
		'/task',
		_.pick(task, ["id", "title", "description", "priority", "completed"])
	); // ใช้ PUT หรือ PATCH ที่ URL ที่มี ID
	return response.data?.update_tasks_by_pk; // คืนค่าข้อมูลที่กลับมาจากการอัปเดต
};

// Function สำหรับการลบ Task
const deleteTask = async (id) => {
	await axios.delete('/task', {
		data: { id: { _eq: id } },
	}); // ใช้ DELETE ที่ URL ที่มี ID
	return id; // คืนค่า ID ที่ถูกลบ
};

export { fetchTasks, addTask, updateTask, deleteTask };
