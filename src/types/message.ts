export default interface Message {
	id: number;
	content: string;
	role: "USER" | "MODEL";
	timestamp: string;
	animate: boolean;
}
