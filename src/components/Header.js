import { Text, Title, Group, Button, Divider } from "@mantine/core";
import dayjs from "dayjs";

import {
	IconCirclePlusFilled,
	IconDownload,
	IconArrowRight,
} from "@tabler/icons-react";

const Header = () => {
	return (
		<Group justify="space-between" mb="sm">
			<Group gap="xs">
				<Title order={1}>{dayjs().format("D")}</Title>
				<Text size="xs">
					{dayjs().format("dddd")}
					<br />
					{dayjs().format("MMM YYYY")}
				</Text>
			</Group>
			<Button
				leftSection={<IconCirclePlusFilled size={24} mr="xs" color="#e346ef" />}
				variant="transparent"
				color="black"
				size="xs"
				p="0"
				mr="10px"
			>
				NEW TASK
			</Button>
		</Group>
	);
};

export default Header;
