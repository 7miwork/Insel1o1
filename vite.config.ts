import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// ===============================
// Debug Collector Plugin (unchanged)
// ===============================

const PROJECT_ROOT = process.cwd();
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");

const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
}

function trimLogFile(logPath: string) {
  try {
    if (!fs.existsSync(logPath)) return;

    const size = fs.statSync(logPath).size;
    if (size <= MAX_LOG_SIZE_BYTES) return;

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");

    let kept: string[] = [];
    let bytes = 0;

    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      const lineSize = Buffer.byteLength(line + "\n");

      if (bytes + lineSize > TRIM_TARGET_BYTES) break;

      kept.unshift(line);
      bytes += lineSize;
    }

    fs.writeFileSync(logPath, kept.join("\n"));
  } catch {}
}

function writeLog(source: string, entries: any[]) {
  if (!entries?.length) return;

  ensureLogDir();
  const file = path.join(LOG_DIR, `${source}.log`);

  const lines = entries.map(
    (e) => `[${new Date().toISOString()}] ${JSON.stringify(e)}`
  );

  fs.appendFileSync(file, lines.join("\n") + "\n");

  trimLogFile(file);
}

function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/logs", (req, res) => {
        if (req.method !== "POST") return;

        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);

            if (payload.consoleLogs) writeLog("browserConsole", payload.consoleLogs);
            if (payload.networkRequests) writeLog("networkRequests", payload.networkRequests);
            if (payload.sessionEvents) writeLog("sessionReplay", payload.sessionEvents);

            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  // 🔥 IMPORTANT for GitHub Pages
  base: "/Dao-Yu-101-V3/",

  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime(),
    vitePluginManusDebugCollector(),
  ],

  resolve: {
    alias: {
      "@": path.resolve("client/src"),
      "@shared": path.resolve("shared"),
      "@assets": path.resolve("attached_assets"),
    },
  },

  root: path.resolve("client"),

  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
  },
});