import { ref } from "vue";

export const isDarkMode = ref(
	document.documentElement.classList.contains("dark"),
);

export default class Utils {
	static toggleDarkMode = function (forceDarkMode: boolean | undefined) {
		const isDark =
			forceDarkMode ?? !document.documentElement.classList.contains("dark");

		document.documentElement.classList.toggle("dark", isDark);
		isDarkMode.value = isDark;
	};
}
