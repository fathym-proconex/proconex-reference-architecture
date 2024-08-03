import { EaCVertexDetails } from '../src.deps.ts';

export type EaCProconexURWorkflowDetails = {
  DFSLookup: string;

  Documents: Record<
    string,
    {
      ProfileLookup: string;
    }
  >;
} & EaCVertexDetails;

export function isEaCProconexURWorkflowDetails(
  details: unknown,
): details is EaCProconexURWorkflowDetails {
  const x = details as EaCProconexURWorkflowDetails;

  return (
    !!x &&
    x.DFSLookup !== undefined &&
    typeof x.DFSLookup === 'string' &&
    x.Documents !== undefined &&
    !!Object.keys(x.Documents).length
  );
}
