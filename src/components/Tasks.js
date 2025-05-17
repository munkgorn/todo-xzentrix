import { Grid, Title, Divider } from "@mantine/core";
import Task from "./Task";
import _ from "lodash";

const Tasks = ({ title, priorities }) => {
	const lists = [
        {
            title: 'TITLE TASK',
            priority: 'DONE',
            description: 'description title'
        },
        {
            title: 'TITLE TASK',
            priority: 'NORMAL',
            description: 'description title'
        },
        {
            title: 'TITLE TASK',
            priority: 'HIGH',
            description: 'description title'
        },
        {
            title: 'TITLE TASK',
            priority: 'NORMAL',
            description: 'description title'
        },
    ];
    const results = _.orderBy(_.filter(lists, (f) => _.includes(priorities, f.priority)), ['priority'], ['asc']);
	return (
		<Grid mb="sm">
			<Grid.Col ta="center">
				<Title order={3} mb="0">
					{title || TASKS}
				</Title>
			</Grid.Col>
			<Grid.Col px="sm">
				{_.map(
					results,
					(v) => (
						<Task {...v} />
					)
				)}
			</Grid.Col>
		</Grid>
	);
};

export default Tasks;
