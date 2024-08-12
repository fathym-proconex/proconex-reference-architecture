import { EverythingAsCodeProconex } from '../eac/EverythingAsCodeProconex.ts';
import { EaCBaseClient, EaCStatus, establishHeaders, UserEaCRecord } from '../src.deps.ts';

export type UserWorkspaceRecrod =
  & Omit<
    UserEaCRecord,
    'EnterpriseLookup' | 'EnterpriseName'
  >
  & {
    WorkspaceLookup: string;

    WorkspaceName: string;
  };

export class ProconexServiceClient extends EaCBaseClient {
  /** */
  constructor(protected baseUrl: URL, protected apiToken: string) {
    super(baseUrl, apiToken);
  }

  //#region API Methods
  Workflows = {
    Create: async (workflowName: string): Promise<EaCStatus> => {
      const response = await fetch(this.loadClientUrl(`workflows`), {
        method: 'POST',
        headers: this.loadHeaders(),
        body: JSON.stringify({
          WorkflowName: workflowName,
        }),
      });

      return await this.json(response);
    },
    Delete: async (workflowLookup: string): Promise<EaCStatus> => {
      const response = await fetch(
        this.loadClientUrl(`workflows/${workflowLookup}`),
        {
          method: 'DELETE',
          headers: this.loadHeaders(),
        },
      );

      return await this.json(response);
    },

    Documents: {
      Delete: async (
        workflowLookup: string,
        docLookup: string,
      ): Promise<EaCStatus> => {
        const response = await fetch(
          this.loadClientUrl(
            `workflows/${workflowLookup}/documents/${docLookup}`,
          ),
          {
            method: 'DELETE',
            headers: this.loadHeaders(),
          },
        );

        return await this.json(response);
      },
      Download: async (
        workflowLookup: string,
        docLookup: string,
        attach: boolean,
      ): Promise<Response> => {
        const response = await fetch(
          this.loadClientUrl(
            `workflows/${workflowLookup}/documents/${docLookup}/download?attach=${attach}`,
          ),
          {
            method: 'GET',
            headers: this.loadHeaders(),
          },
        );

        return response;
      },
      Upload: async (
        workflowLookup: string,
        data: FormData,
        headers: Headers,
      ): Promise<Response> => {
        const headersInit = Array.from(headers.entries()).reduce(
          (acc, [key, value]) => {
            acc[key] = value;

            return acc;
          },
          {} as Record<string, string>,
        );

        const response = await fetch(
          this.loadClientUrl(`workflows/${workflowLookup}/documents/upload`),
          {
            method: 'POST',
            headers: this.loadHeaders(headersInit),
            body: data,
          },
        );

        return response;
      },
      UploadStream: async (
        workflowLookup: string,
        stream: ReadableStream<Uint8Array>,
        headers: Headers,
      ): Promise<Response> => {
        const headersInit = Array.from(headers.entries()).reduce(
          (acc, [key, value]) => {
            acc[key] = value;

            return acc;
          },
          {} as Record<string, string>,
        );

        const response = await fetch(
          this.loadClientUrl(`workflows/${workflowLookup}/documents/upload`),
          {
            method: 'POST',
            headers: this.loadHeaders(headersInit),
            body: stream,
          },
        );

        return response;
      },
    },
  };

  Workspaces = {
    Create: async (workspaceName: string): Promise<EaCStatus> => {
      const response = await fetch(this.loadClientUrl(`workspaces`), {
        method: 'POST',
        headers: this.loadHeaders(),
        body: JSON.stringify({
          WorkspaceName: workspaceName,
        }),
      });

      return await this.json(response);
    },
    Delete: async (): Promise<EaCStatus> => {
      const response = await fetch(this.loadClientUrl(`workspaces`), {
        method: 'DELETE',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },
    GetOrFirst: async (): Promise<EverythingAsCodeProconex> => {
      const response = await fetch(this.loadClientUrl(`workspaces/or-first`), {
        method: 'GET',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },
    List: async (): Promise<UserWorkspaceRecrod[]> => {
      const response = await fetch(this.loadClientUrl(`workspaces/list`), {
        method: 'GET',
        headers: this.loadHeaders(),
      });

      return await this.json(response);
    },
  };
  //#endregion

  //#region Helpers
  protected loadHeaders(
    headers: HeadersInit | undefined = undefined,
  ): HeadersInit {
    return establishHeaders(
      new Headers({
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      }),
      (headers as Record<string, string>) || {},
    );
  }
  //#endregion
}
