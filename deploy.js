import fs from "fs";
import path from "path";
import { Client } from "basic-ftp";

const config = JSON.parse(fs.readFileSync("./deploy.config.json", "utf-8"));

async function deploy() {
    const client = new Client();
    client.ftp.verbose = true;

    try {
        console.log("Connecting to FTP...");

        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            port: config.port,
            secure: false
        });

        console.log("Connected!");

        const localDist = path.resolve("./dist");

        console.log("Uploading build folder...");

        await client.ensureDir(config.remotePath);
        await client.clearWorkingDir();
        await client.uploadFromDir(localDist);

        console.log("Deploy successful 🚀");
    } catch (err) {
        console.error("Deploy failed:", err);
    }

    client.close();
}

deploy();