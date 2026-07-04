import { Client } from "basic-ftp";
import pkg from "prompts";
const { prompt } = pkg;
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import * as dotenv from "dotenv";

dotenv.config();

const FTP_CONFIG_PATH = path.join(process.cwd(), ".env.ftp");

async function askIfSave(values) {
  const { save } = await prompt({
    type: "confirm",
    name: "save",
    message: "Soll ich diese Zugangsdaten lokal in .env.ftp speichern?",
    initial: true,
  });
  if (save) {
    const content = [
      `FTP_HOST=${values.host}`,
      `FTP_USER=${values.user}`,
      `FTP_PASSWORD=${values.password}`,
      `FTP_PORT=${values.port}`,
    ].join("\n");
    fs.writeFileSync(FTP_CONFIG_PATH, content, { mode: 0o600 });
    console.log(`Gespeichert in ${FTP_CONFIG_PATH}`);
  }
}

async function getFtpConfig() {
  if (fs.existsSync(FTP_CONFIG_PATH)) {
    const { error } = dotenv.config({ path: FTP_CONFIG_PATH });
    if (!error && process.env.FTP_HOST && process.env.FTP_USER && process.env.FTP_PASSWORD) {
      return {
        host: process.env.FTP_HOST.trim().replace(/^(https?|ftp):\/\//i, "").replace(/\/$/, ""),
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        port: parseInt(process.env.FTP_PORT || "21", 10),
      };
    }
  }

  const values = await prompt([
    {
      type: "text",
      name: "host",
      message: "FTP-Host (Hostinger FTP Hostname):",
      initial: "ftp.deine-domain.ch",
      validate: (value) => (!value ? "Host ist erforderlich" : true),
    },
    {
      type: "text",
      name: "user",
      message: "FTP-Benutzername:",
    },
    {
      type: "password",
      name: "password",
      message: "FTP-Passwort:",
      mask: "*",
    },
    {
      type: "number",
      name: "port",
      message: "FTP-Port:",
      initial: 21,
    },
  ]);

  values.host = values.host.trim().replace(/^(https?|ftp):\/\//i, "").replace(/\/$/, "");
  await askIfSave(values);
  return values;
}

async function runBuild() {
  console.log("Baue Production Build ...");
  try {
    execSync("pnpm run build:hostinger", {
      cwd: process.cwd(),
      stdio: "inherit",
      env: { ...process.env, VITE_BASE: "/" },
    });
  } catch (e) {
    console.error("Build fehlgeschlagen.");
    process.exit(1);
  }
}

function listLocalRecursive(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listLocalRecursive(fullPath));
    } else {
      results.push(path.relative(dir, fullPath).split(path.sep).join("/"));
    }
  }
  return results;
}

async function listRemoteRecursive(client, remoteDir) {
  const results = [];
  const entries = await client.list(remoteDir);
  for (const entry of entries) {
    if (entry.name === "." || entry.name === "..") continue;
    const fullPath = path.posix.join(remoteDir, entry.name);
    if (entry.isDirectory) {
      results.push(...(await listRemoteRecursive(client, fullPath)));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function verifyUpload(client, localRoot, remoteRoot) {
  const localFiles = listLocalRecursive(localRoot).sort();
  const remoteFiles = (await listRemoteRecursive(client, remoteRoot))
    .map((p) => p.replace(new RegExp(`^${remoteRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/`), ""))
    .sort();

  const missing = localFiles.filter((f) => !remoteFiles.includes(f));
  if (missing.length > 0) {
    console.error("⚠️  Diese Dateien fehlen auf dem Server:", missing);
  } else {
    console.log(`✅ Alle ${localFiles.length} Dateien vollständig hochgeladen.`);
  }
}

async function upload(client, config) {
  const localRoot = path.join(process.cwd(), "dist");
  const remoteRoot = "/public_html";

  await client.ensureDir(remoteRoot);
  await client.changeWorkingDirectory(remoteRoot);

  const { clear } = await prompt({
    type: "confirm",
    name: "clear",
    message: `Alle bestehenden Dateien in ${remoteRoot} auf dem Server löschen, bevor der neue Build hochgeladen wird?`,
    initial: true,
  });
  if (clear) {
    await client.clearWorkingDir();
  } else {
    console.log("Überspringe Löschvorgang – Dateien werden nur überschrieben/ergänzt.");
  }

  client.trackProgress((info) => {
    console.log(`Lade hoch: ${info.name}`);
  });

  await client.uploadFromDir(localRoot);
  client.trackProgress();

  await verifyUpload(client, localRoot, remoteRoot);
}

async function main() {
  const config = await getFtpConfig();
  await runBuild();

  const client = new Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      secure: false,
    });

    console.log("Verbunden. Lösche alte Dateien und lade Build hoch ...");
    await upload(client, config);
  } catch (err) {
    console.error("❌ Verbindung fehlgeschlagen:", err.message || err);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();