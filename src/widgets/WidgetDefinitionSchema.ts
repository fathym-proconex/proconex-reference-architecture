// deno-lint-ignore-file ban-types
import { z } from './.deps.ts';

/**
 * Schema for defining a single widget definition, including its name, description,
 * and the data structure (schema) it expects.
 */
export const WidgetDefinitionSchema: z.ZodObject<
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
> = z
  .object({
    /**
     * The unique name of the widget type. Used to identify this widget in the SuggestedWidgets list.
     */
    Name: z
      .string()
      .describe(
        'The unique name of the widget type. This is used to identify the widget in the SuggestedWidgets list.',
      ),
    /**
     * A description of the widget’s purpose, use case, and the expected data format.
     */
    Description: z
      .string()
      .describe(
        'A description of the widget’s purpose, use case, and expected data format.',
      ),
    /**
     * Schema defining the structure of data required for this widget. Must match the input expected by the widget.
     */
    Schema: z
      .object({})
      .describe(
        'The schema defining the structure of data required for this widget. This schema must match the input expected by the widget.',
      ),
  })
  .describe('An object representing a single widget definition.');

export type WidgetDefinitionSchema = z.infer<typeof WidgetDefinitionSchema>;
