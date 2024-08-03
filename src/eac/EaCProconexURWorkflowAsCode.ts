import { EaCDetails } from '../src.deps.ts';
import {
  EaCProconexURWorkflowDetails,
  isEaCProconexURWorkflowDetails,
} from './EaCProconexURWorkflowDetails.ts';

export type EaCProconexURWorkflowAsCode = EaCDetails<EaCProconexURWorkflowDetails>;

export function isEaCProconexURWorkflowAsCode(eac: unknown): eac is EaCProconexURWorkflowAsCode {
  const ai = eac as EaCProconexURWorkflowAsCode;

  return ai && isEaCProconexURWorkflowDetails(ai.Details);
}
