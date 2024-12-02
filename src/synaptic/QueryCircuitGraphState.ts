// deno-lint-ignore-file no-explicit-any
import { WidgetDefinitionSchema } from '../widgets/WidgetDefinitionSchema.ts';
import { Annotation, BaseMessage, BinaryOperatorAggregate, InferSynapticState } from './.deps.ts';

export const QueryCircuitGraphState: {
  CurrentQuery: BinaryOperatorAggregate<string, string>;
  DataQuery: BinaryOperatorAggregate<string, string>;
  Error: BinaryOperatorAggregate<string, string>;
  Intent: BinaryOperatorAggregate<string, string>;
  Justification: BinaryOperatorAggregate<string, string>;
  Messages: BinaryOperatorAggregate<
    BaseMessage[] | undefined,
    BaseMessage[] | undefined
  >;
  QueryMessage: BinaryOperatorAggregate<string, string>;
  QueryResults: BinaryOperatorAggregate<any, any>;
  SuggestedWidgets: BinaryOperatorAggregate<string[], string[]>;
  TypescriptModules: BinaryOperatorAggregate<
    Record<string, string>,
    Record<string, string>
  >;
  WidgetDefinitions: BinaryOperatorAggregate<
    Record<string, WidgetDefinitionSchema>,
    Record<string, WidgetDefinitionSchema>
  >;
  WidgetQueries: BinaryOperatorAggregate<
    { WidgetType: string; Query: string }[],
    { WidgetType: string; Query: string }[]
  >;
  WidgetResults: BinaryOperatorAggregate<
    Record<string, any>,
    Record<string, any>
  >;
} = {
  CurrentQuery: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  DataQuery: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  Error: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  Intent: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  Justification: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  Messages: Annotation<BaseMessage[] | undefined>({
    reducer: (x, y) => x?.concat(y || []) || y || [],
    default: () => [],
  }),
  QueryMessage: Annotation<string>({
    reducer: (_x, y) => y,
    default: () => '',
  }),
  QueryResults: Annotation<any>({
    reducer: (_x, y) => y,
    default: () => {},
  }),
  SuggestedWidgets: Annotation<string[]>({
    reducer: (_x, y) => y,
    default: () => [],
  }),
  TypescriptModules: Annotation<Record<string, string>>({
    reducer: (_x, y) => y,
    default: () => ({}),
  }),
  WidgetDefinitions: Annotation<Record<string, WidgetDefinitionSchema>>({
    reducer: (_x, y) => y,
    default: () => ({}),
  }),
  WidgetQueries: Annotation<{ WidgetType: string; Query: string }[]>({
    reducer: (_x, y) => y,
    default: () => [] as { WidgetType: string; Query: string }[],
  }),
  WidgetResults: Annotation<Record<string, any>>({
    reducer: (_x, y) => y,
    default: () => ({} as Record<string, any>),
  }),
};

export type QueryCircuitGraphState = InferSynapticState<
  typeof QueryCircuitGraphState
>;
