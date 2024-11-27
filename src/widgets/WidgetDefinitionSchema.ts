// deno-lint-ignore-file ban-types
import { z } from './.deps.ts';

// Define the updated WidgetDefinitionSchema
export const WidgetDefinitionSchema: z.ZodObject<
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
> = z
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
    AdditionalInstructions: z
      .array(z.string())
      .optional()
      .describe(
        'An array of instructional text providing guidance on how to configure and use this widget effectively. Includes tips on data formatting, available options, and expected behaviors.',
      ),
    UsageGuide: z
      .string()
      .optional()
      .describe(
        'A comprehensive guide for AI or users, explaining the value, benefits, and advanced use cases of the widget. Includes creative ideas for leveraging its capabilities and integrating it into workflows or designs.',
      ),
  })
  .describe(
    'An object representing a single widget definition, including its name, description, schema, optional instructional text, and a detailed usage guide.',
  );

export type WidgetDefinitionSchema = z.infer<typeof WidgetDefinitionSchema>;
