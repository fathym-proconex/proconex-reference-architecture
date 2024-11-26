// deno-lint-ignore-file ban-types
import { z } from './.deps.ts';

export const WidgetDefinitionsSchema: z.ZodArray<
  z.ZodObject<
    {
      Name: z.ZodString;
      Description: z.ZodString;
      Schema: z.ZodObject<{}, 'strip', z.ZodTypeAny, {}, {}>;
    },
    'strip',
    z.ZodTypeAny,
    {
      Name: string;
      Description: string;
      Schema: {};
    },
    {
      Name: string;
      Description: string;
      Schema: {};
    }
  >,
  'many'
> = z
  .array(
    z
      .object({
        Name: z
          .string()
          .describe(
            'The unique name of the widget type. This is used to identify the widget in the SuggestedWidgets list.',
          ),
        Description: z
          .string()
          .describe(
            'A description of the widget’s purpose, use case, and expected data format.',
          ),
        Schema: z
          .object({})
          .describe(
            'The schema defining the structure of data required for this widget. This schema must match the input expected by the widget.',
          ),
      })
      .describe('An object representing a single widget definition.'),
  )
  .describe(
    'An array of widget definitions, where each definition includes a Name, Description, and Schema.',
  );

export type WidgetDefinitionsSchema = z.infer<typeof WidgetDefinitionsSchema>;
