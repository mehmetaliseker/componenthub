export interface ComponentSummary {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  previewType: string;
  isBuiltin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentDetail extends ComponentSummary {
  jsxCode: string | null;
  tsxCode: string | null;
  cssCode: string | null;
  tailwindJsxCode: string | null;
  tailwindTsxCode: string | null;
  dependencies: string | null;
  responsiveNotes: string | null;
  componentCode: string;
  styleCode: string | null;
}

export interface CreateComponentBody {
  name: string;
  slug: string;
  description: string;
  category: string;
  previewType: string;
  jsxCode?: string;
  tsxCode?: string;
  cssCode: string;
  tailwindJsxCode?: string;
  tailwindTsxCode?: string;
  dependencies?: string;
  responsiveNotes?: string;
  builtin?: boolean;
}

export type UpdateComponentBody = CreateComponentBody;
