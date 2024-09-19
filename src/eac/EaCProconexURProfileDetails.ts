import { EaCVertexDetails } from '../src.deps.ts';

export type EaCProconexURProfileDetails = {
  Examples: Record<string, string>;

  ExtractionInstructions?: string;
} & EaCVertexDetails;

export function isEaCProconexURProfileDetails(
  details: unknown,
): details is EaCProconexURProfileDetails {
  const x = details as EaCProconexURProfileDetails;

  return !!x && x.Examples !== undefined && !!Object.keys(x.Examples).length;
}
