import axios from "axios";
import _ from "lodash";
import md5 from "md5";

const API_URL = "https://todo-mg-xzentrix.hasura.app/api/rest";
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["x-hasura-admin-secret"] =
	process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

const sendLogin = async (username, password) => {
	console.log(
        {
            username: {"_eq": username },
            password: {"_eq": md5(`${password}`) },
        })
    const response = await axios.post(
        "/login",
        {
            username: {"_eq": username },
            password: {"_eq": md5(`${password}`) },
        }
    );
    return response.data?.users[0];
}

const sendRegister = async (username, password) => {
	console.log("sendRegister", {
		username: username,
		password: md5(`${password}`),
	});
	const response = await axios.post(
		"/register",
		{
			username: username,
			password: md5(`${password}`),
		}
	);
	return response.data?.insert_users_one;
}

const checkDuplicateUser = async (username) => {
	const response = await axios.post(
		"/user",
		{
			username: { "_eq": username },
		}
	);
	console.log("checkDuplicateUser", response.data?.users);
	console.log("checkDuplicateUser", _.size(response.data?.users));
	return _.size(response.data?.users) > 0 ? true : false;
}

export { sendLogin, sendRegister, checkDuplicateUser };