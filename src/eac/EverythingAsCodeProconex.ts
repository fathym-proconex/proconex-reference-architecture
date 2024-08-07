import { EverythingAsCode, EverythingAsCodeDFS } from '../src.deps.ts';
import { EaCProconexURProfileAsCode } from './EaCProconexURProfileAsCode.ts';
import { EaCProconexURWorkflowAsCode } from './EaCProconexURWorkflowAsCode.ts';

export type EverythingAsCodeProconex =
  & {
    Profiles?: Record<string, EaCProconexURProfileAsCode | null>;

    Workflows?: Record<string, EaCProconexURWorkflowAsCode | null>;
  }
  & EverythingAsCodeDFS
  & EverythingAsCode;
