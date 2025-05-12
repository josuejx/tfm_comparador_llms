import { createRouter, createWebHashHistory } from "vue-router";

import ChatView from "@/views/ChatView.vue";
import AboutView from "@/views/AboutView.vue";
import ComparingView from "@/views/ComparingView.vue";
import AnalysisView from "@/views/AnalysisView.vue";

const routes = [
	{ path: "/", component: ChatView },
	{ path: "/about", component: AboutView },
	{ path: "/comparing", component: ComparingView },
	{ path: "/analysis/:store", component: AnalysisView },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
