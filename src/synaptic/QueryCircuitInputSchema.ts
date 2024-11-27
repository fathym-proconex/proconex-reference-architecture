// deno-lint-ignore-file ban-types
import { WidgetDefinitionSchema } from '../widgets/WidgetDefinitionSchema.ts';
import { z } from './.deps.ts';

export const QueryCircuitInputSchema: z.ZodObject<
  {
    Input: z.ZodOptional<z.ZodString>;
    CurrentQuery: z.ZodOptional<z.ZodString>;
    WidgetDefinitions: z.ZodOptional<
      z.ZodRecord<
        z.ZodString,
        z.ZodObject<
          {
            Name: z.ZodString;
            Description: z.ZodString;
            Schema: z.ZodObject<{}, 'strip', z.ZodTypeAny, {}, {}>;
            AdditionalInstructions: z.ZodOptional<z.ZodArray<z.ZodString>>;
            UsageGuide: z.ZodOptional<z.ZodString>;
          },
          'strip',
          z.ZodTypeAny,
          {
            Name: string;
            Description: string;
            Schema: {};
            AdditionalInstructions?: string[];
            UsageGuide?: string;
          },
          {
            Name: string;
            Description: string;
            Schema: {};
            AdditionalInstructions?: string[];
            UsageGuide?: string;
          }
        >
      >
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    Input?: string;
    CurrentQuery?: string;
    WidgetDefinitions?: Record<
      string,
      {
        Name: string;
        Description: string;
        Schema: {};
        AdditionalInstructions?: string[];
        UsageGuide?: string;
      }
    >;
  },
  {
    Input?: string;
    CurrentQuery?: string;
    WidgetDefinitions?: Record<
      string,
      {
        Name: string;
        Description: string;
        Schema: {};
        AdditionalInstructions?: string[];
        UsageGuide?: string;
      }
    >;
  }
> = z.object({
  Input: z.string().optional().describe('The user input into the system.'),
  CurrentQuery: z
    .string()
    .optional()
    .describe(`The user's current KQL query to use.`),
  WidgetDefinitions: z
    .record(WidgetDefinitionSchema)
    .optional()
    .describe(
      'A record of widget definitions provided by the client, where each key is the widget name and the value is the corresponding widget definition. Each widget definition includes a Name, Description, and Schema for the expected data format.',
    ),
});

export type QueryCircuitInputSchema = z.infer<typeof QueryCircuitInputSchema>;
