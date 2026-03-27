import path from "node:path";
import { pathToFileURL } from "node:url";

export async function createTestServer() {
  const appModuleUrl = `${pathToFileURL(path.resolve("src/app.js")).href}?t=${Date.now()}`;
  const appModule = await import(appModuleUrl);
  const server = appModule.createServer(0);

  await new Promise((resolve) => server.once("listening", resolve));

  const port = server.address().port;

  return {
    async request(url, options = {}) {
      const response = await fetch(`http://127.0.0.1:${port}${url}`, options);
      let body = null;

      try {
        body = await response.json();
      } catch {
        body = null;
      }

      return { status: response.status, body };
    },
    async close() {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }
  };
}
