import { EaCDetails } from '../src.deps.ts';
import {
  EaCProconexURProfileDetails,
  isEaCProconexURProfileDetails,
} from './EaCProconexURProfileDetails.ts';

export type EaCProconexURProfileAsCode = EaCDetails<EaCProconexURProfileDetails>;

export function isEaCProconexURProfileAsCode(eac: unknown): eac is EaCProconexURProfileAsCode {
  const ai = eac as EaCProconexURProfileAsCode;

  return ai && isEaCProconexURProfileDetails(ai.Details);
}
