import { createMemoryHistory, createRouter } from "vue-router";

import ChatView from "@/views/ChatView.vue";
import AboutView from "@/views/AboutView.vue";
import ComparingView from "@/views/ComparingView.vue";

const routes = [
	{ path: "/", component: ChatView },
	{ path: "/about", component: AboutView },
	{ path: "/comparing", component: ComparingView },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
