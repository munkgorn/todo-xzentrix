import { useState } from "react";
import { Card, Grid, Text } from "@mantine/core";
import { IconCircleCheck } from '@tabler/icons-react';
import _ from 'lodash';
import classes from "@/styles/task.module.css";

const Task = (data) => {
	const [checked, setChecked] = useState(false);
	const bgcolor = {
		NORMAL: '#4098ea',
		HIGH: '#fd6e41',
		DONE: '#02af3b'
	}
	return (
		<Card
			className={classes.root}
			radius="md"
			shadow="md"
			bg={_.result(bgcolor, _.upperCase(data?.priority))}
			p="sm"
			mb="xs"
			onClick={() => setChecked((c) => !c)}
		>
			<Grid>
				<Grid.Col span={10}>
					<Text className={classes.priority}>{data?.priority}</Text>
					<Text className={classes.label}>{data?.title}</Text>
					<Text className={classes.description}>{data?.description}</Text>
				</Grid.Col>
				<Grid.Col span={2} ta="right">
					<IconCircleCheck color="green" />
				</Grid.Col>
			</Grid>
		</Card>
	);
};

export default Task;
