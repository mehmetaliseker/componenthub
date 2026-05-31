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
  componentCode: string;
  styleCode: string | null;
}

export interface CreateComponentBody {
  name: string;
  slug: string;
  description?: string;
  category: string;
  previewType: string;
  componentCode: string;
  styleCode?: string;
  builtin?: boolean;
}

export type UpdateComponentBody = CreateComponentBody;
