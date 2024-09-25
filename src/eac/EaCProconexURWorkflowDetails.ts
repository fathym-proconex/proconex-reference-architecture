import { EaCVertexDetails } from '../src.deps.ts';

export type EaCProconexDocument = {
  ProfileLookup?: string;

  Type: 'requirements' | 'iq-oq' | 'trace-matrix';
};

export type EaCProconexURWorkflowDetails = {
  DFSLookup: string;

  Documents: Record<string, EaCProconexDocument>;
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
