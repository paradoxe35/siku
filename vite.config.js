import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/dev/",
    root: "./assets",
    build: {
        rollupOptions: {
            input: ["./js/app.js", "./js/admin/admin.js"],
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "assets/"),
            "@js": resolve(__dirname, "assets/js/"),
            "@admin": resolve(__dirname, "assets/js/admin"),
            "@sass": resolve(__dirname, "assets/sass/"),
            "@lib": resolve(__dirname, "assets/lib/"),
        },
    },
});
