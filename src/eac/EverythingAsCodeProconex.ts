import { EverythingAsCodeDFS } from '../src.deps.ts';
import { EaCProconexURProfileAsCode } from './EaCProconexURProfileAsCode.ts';
import { EaCProconexURWorkflowAsCode } from './EaCProconexURWorkflowAsCode.ts';

export type EverythingAsCodeProconex = {
  Profiles: EaCProconexURProfileAsCode;

  Workflows: EaCProconexURWorkflowAsCode;
} & EverythingAsCodeDFS;
