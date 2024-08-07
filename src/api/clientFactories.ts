import { loadJwtConfig } from '../src.deps.ts';
import { ProconexServiceClient } from './ProconexServiceClient.ts';

export async function loadProconexSvc(
  proconexApiKey: string,
): Promise<ProconexServiceClient>;

export async function loadProconexSvc(
  workspaceLookup: string,
  username: string,
): Promise<ProconexServiceClient>;

export async function loadProconexSvc(
  proconexApiKeyWorkspaceLookup?: string,
  username?: string,
): Promise<ProconexServiceClient> {
  if (!proconexApiKeyWorkspaceLookup) {
    proconexApiKeyWorkspaceLookup = Deno.env.get('PROCONEX_API_KEY')!;
  }

  if (username) {
    proconexApiKeyWorkspaceLookup = await loadJwtConfig().Create(
      {
        WorkspaceLookup: proconexApiKeyWorkspaceLookup,
        Username: username!,
      },
      60 * 60 * 1,
    );
  }

  const proconexBaseUrl = Deno.env.get('PROCONEX_API_BASE_URL')!;

  return new ProconexServiceClient(
    new URL(proconexBaseUrl),
    proconexApiKeyWorkspaceLookup,
  );
}
