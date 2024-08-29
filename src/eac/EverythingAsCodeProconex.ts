import { EverythingAsCode, EverythingAsCodeDatabases, EverythingAsCodeDFS } from '../src.deps.ts';
import { EverythingAsCodeSynaptic } from '../synaptic.deps.ts';
import { EaCProconexURProfileAsCode } from './EaCProconexURProfileAsCode.ts';
import { EaCProconexURWorkflowAsCode } from './EaCProconexURWorkflowAsCode.ts';

export type EverythingAsCodeProconex =
  & {
    Profiles?: Record<string, EaCProconexURProfileAsCode>;

    Workflows?: Record<string, EaCProconexURWorkflowAsCode>;
  }
  & EverythingAsCodeDatabases
  & EverythingAsCodeDFS
  & EverythingAsCodeSynaptic
  & EverythingAsCode;
