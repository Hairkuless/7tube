declare module "node:http" {
  export interface IncomingMessage {
    url?: string;
  }

  export interface ServerResponse {
    statusCode: number;
    setHeader(name: string, value: string): void;
    end(body?: string): void;
  }

  export interface Server {
    listen(port: number, callback?: () => void): void;
  }

  export function createServer(
    handler: (request: IncomingMessage, response: ServerResponse) => void,
  ): Server;
}

declare const process: {
  env: Record<string, string | undefined>;
};
