import Header from "@/components/Header";
import Task from "@/components/Task";
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
		<Container mt="xl">
			<Grid>
				<Grid.Col
					span={{ xs: 12, sm: 8, md: 5, xl: 6 }}
					offset={{ xs: 0, sm: 2, md: 3.5, xl: 3 }}
				>
					<Card shadow="sm" radius="md" withBorder>
						<Header />
						<Divider mb="sm" variant="dashed" />
						<Tasks
							title="TODO TASKS"
							priorities={["NORMAL", "HIGH"]}
						/>
						<Divider mb="sm" variant="dashed" />
						<Tasks title="DONE TASKS" priorities={["DONE"]} />
					</Card>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
