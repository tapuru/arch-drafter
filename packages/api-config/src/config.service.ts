import { Injectable } from "@nestjs/common";
import { Microservice } from "@/lib/microservices.enum";
import { ConfigData, MicroserviceConfig } from "@/lib/config.type";
import { DEFAULT_CONFIG } from "./lib/default-config.const";
import { Transport } from "@nestjs/microservices";

@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseFromEnv(process.env);
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }

  private parseFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: parseInt(env.GATEWAY_PORT || `${DEFAULT_CONFIG.port}`),
      services: {
        PROJECTS_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.PROJECTS, env),
          transport: Transport.TCP,
        },
        SESSIONS_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.SESSIONS, env),
          transport: Transport.TCP,
        },
        STORAGE_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.STORAGE, env),
          transport: Transport.TCP,
        },
        EXPORT_SERVICE: {
          options: this.parseServiceOptionsFromEnv(Microservice.EXPORT, env),
          transport: Transport.TCP,
        },
      },
    };
  }

  private parseServiceOptionsFromEnv(
    name: Microservice,
    env: NodeJS.ProcessEnv,
  ): MicroserviceConfig["options"] {
    return {
      host:
        env[`${name}_HOST`] || `${DEFAULT_CONFIG.services[name].options.host}`,
      port: parseInt(
        env[`${name}_PORT`] || `${DEFAULT_CONFIG.services[name].options.port}`,
      ),
    };
  }
}
