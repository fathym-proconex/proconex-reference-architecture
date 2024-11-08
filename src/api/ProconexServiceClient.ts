// deno-lint-ignore-file no-explicit-any
import { EverythingAsCodeProconex } from '../eac/EverythingAsCodeProconex.ts';
import {
  EaCBaseClient,
  EaCStatus,
  establishHeaders,
  ExplorerRequest,
  UserEaCRecord,
} from '../src.deps.ts';

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
  constructor(baseUrl: URL, apiToken: string) {
    super(baseUrl, apiToken);
  }

  //#region API Methods
  Profiles = {
    Create: async (
      examples: Record<string, string>,
      extractionInstructions?: string,
    ): Promise<EaCStatus> => {
      const response = await fetch(this.loadClientUrl(`profiles`), {
        method: 'POST',
        headers: this.loadHeaders(),
        body: JSON.stringify({
          Examples: examples,
          ExtractionInstructions: extractionInstructions,
        }),
      });

      return await this.json(response);
    },

    Delete: async (profileLookup: string): Promise<EaCStatus> => {
      const response = await fetch(
        this.loadClientUrl(`profiles/${profileLookup}`),
        {
          method: 'DELETE',
          headers: this.loadHeaders(),
        },
      );

      return await this.json(response);
    },

    Get: async (profileLookup: string): Promise<EaCStatus> => {
      const response = await fetch(
        this.loadClientUrl(`profiles/${profileLookup}`),
        {
          method: 'GET',
          headers: this.loadHeaders(),
        },
      );

      return await this.json(response);
    },

    Update: async (
      profileLookup: string,
      examples: Record<string, string>,
      extractionInstructions?: string,
    ): Promise<EaCStatus> => {
      const response = await fetch(
        this.loadClientUrl(`profiles/${profileLookup}`),
        {
          method: 'PUT',
          headers: this.loadHeaders(),
          body: JSON.stringify({
            Examples: examples,
            ExtractionInstructions: extractionInstructions,
          }),
        },
      );

      return await this.json(response);
    },
  };

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
      Extract: async (workflowLookup: string): Promise<Response> => {
        const response = await fetch(
          this.loadClientUrl(`workflows/${workflowLookup}/documents/extract`),
          {
            method: 'GET',
            headers: this.loadHeaders(),
          },
        );

        return response;
      },
      Retriever: {
        Refresh: async (workflowLookup: string): Promise<Response> => {
          const response = await fetch(
            this.loadClientUrl(
              `workflows/${workflowLookup}/documents/retriever/refresh`,
            ),
            {
              method: 'PUT',
              headers: this.loadHeaders(),
              body: JSON.stringify({}),
            },
          );

          return response;
        },
      },
      Upload: async (
        workflowLookup: string,
        type: string,
        data: FormData,
        headers: Headers,
        profileLookup?: string,
      ): Promise<Response> => {
        const headersInit = Array.from(headers.entries()).reduce(
          (acc, [key, value]) => {
            acc[key] = value;

            return acc;
          },
          {} as Record<string, string>,
        );

        const profileLookupParam = profileLookup ? `&profileLookup=${profileLookup}` : '';

        const response = await fetch(
          this.loadClientUrl(
            `workflows/${workflowLookup}/documents/upload?type=${type}${profileLookupParam}`,
          ),
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
        type: string,
        stream: ReadableStream<Uint8Array>,
        headers: Headers,
        profileLookup?: string,
      ): Promise<Response> => {
        const headersInit = Array.from(headers.entries()).reduce(
          (acc, [key, value]) => {
            acc[key] = value;

            return acc;
          },
          {} as Record<string, string>,
        );

        const profileLookupParam = profileLookup ? `&profileLookup=${profileLookup}` : '';

        const response = await fetch(
          this.loadClientUrl(
            `workflows/${workflowLookup}/documents/upload?type=${type}${profileLookupParam}`,
          ),
          {
            method: 'POST',
            headers: this.loadHeaders(headersInit),
            body: stream,
          },
        );

        return response;
      },

      IQOQ: {
        Extract: async (
          workflowLookup: string,
          docLookup: string,
        ): Promise<Response> => {
          const response = await fetch(
            this.loadClientUrl(
              `workflows/${workflowLookup}/documents/${docLookup}/iq-oq/extract`,
            ),
            {
              method: 'GET',
              headers: this.loadHeaders(),
            },
          );

          return response;
        },
      },
    },

    Requirements: {
      List: async (
        workflowLookup: string,
      ): Promise<{ [reqId: string]: string }> => {
        const response = await fetch(
          this.loadClientUrl(`workflows/${workflowLookup}/requirements`),
          {
            method: 'GET',
            headers: this.loadHeaders(),
          },
        );

        return await response.json();
      },
    },

    TraceMatrix: {
      Download: async (workflowLookup: string): Promise<Response> => {
        const response = await fetch(
          this.loadClientUrl(
            `workflows/${workflowLookup}/trace-matrix/download`,
          ),
          {
            method: 'GET',
            headers: this.loadHeaders(),
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

    IoT: {
      Upload: async (data: FormData, headers: Headers): Promise<Response> => {
        const headersInit = Array.from(headers.entries()).reduce(
          (acc, [key, value]) => {
            acc[key] = value;

            return acc;
          },
          {} as Record<string, string>,
        );

        const response = await fetch(
          this.loadClientUrl(`workspaces/iot/upload`),
          {
            method: 'POST',
            headers: this.loadHeaders(headersInit),
            body: data,
          },
        );

        return response;
      },
      UploadStream: async (
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
          this.loadClientUrl(`workspaces/iot/upload`),
          {
            method: 'POST',
            headers: this.loadHeaders(headersInit),
            body: stream,
          },
        );

        return response;
      },

      Warm: {
        Explorer: async (expReq: ExplorerRequest): Promise<any> => {
          const response = await fetch(
            this.loadClientUrl(`workspaces/iot/warm/explorer`),
            {
              method: 'POST',
              headers: this.loadHeaders(),
              body: JSON.stringify(expReq),
            },
          );

          return await this.json(response);
        },
      },
    },
  };
  //#endregion

  //#region Helpers
  // protected override loadHeaders(
  //   headers: HeadersInit | undefined = undefined,
  // ): HeadersInit {
  //   return establishHeaders(
  //     new Headers({
  //       Authorization: `Bearer ${this.apiToken}`,
  //       'Content-Type': 'application/json',
  //     }),
  //     (headers as Record<string, string>) || {},
  //   );
  // }
  //#endregion
}
