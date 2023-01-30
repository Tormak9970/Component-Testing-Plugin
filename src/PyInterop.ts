import { ServerAPI, ServerResponse } from "decky-frontend-lib";

export type DummyData = {
  key:string
}

export enum LogLevel {
  INFO,
  WARN,
  ERROR
}

export class PyInterop {
  private static serverAPI: ServerAPI;

  static setServer(serv: ServerAPI) {
    this.serverAPI = serv;
  }

  static get server() { return this.serverAPI; }

  static async getDummyData(): Promise<ServerResponse<DummyData>> {
    return await this.serverAPI.callPluginMethod<{}, DummyData>("getDummyData", {});
  }

  static async log(message: String, level:LogLevel): Promise<void> {
    switch(level) {
      case LogLevel.INFO:
        await this.serverAPI.callPluginMethod<{ message: String }, boolean>("logInfo", { message: `[front-end]: ${message}` });
        break;
      case LogLevel.WARN:
        await this.serverAPI.callPluginMethod<{ message: String }, boolean>("logWarn", { message: `[front-end]: ${message}` });
        break;
      case LogLevel.ERROR:
        await this.serverAPI.callPluginMethod<{ message: String }, boolean>("logError", { message: `[front-end]: ${message}` });
        break;
    }
  }

  static toast(title: string, message: string) {
    return (() => {
      try {
        return this.serverAPI.toaster.toast({
          title: title,
          body: message,
          duration: 8000,
        });
      } catch (e) {
        console.log("Toaster Error", e);
      }
    })();
  }
}