import { ComponentMethods } from "@/api/MethodNames";
import {
  buildComponentPath,
  executeJsonRequest,
} from "@/api/http/execute-request";
import {
  normalizeComponentDetail,
  normalizeComponentList,
} from "@/api/component/normalize-component";
import type {
  ComponentDetail,
  ComponentSummary,
  CreateComponentBody,
  UpdateComponentBody,
} from "@/domains/component/componentDomains";

export const componentApi = {
  async list(): Promise<ComponentSummary[]> {
    const raw = await executeJsonRequest<unknown>({
      method: ComponentMethods.List,
      path: buildComponentPath(ComponentMethods.List),
    });
    return normalizeComponentList(raw);
  },

  async getBySlug(slug: string): Promise<ComponentDetail> {
    const raw = await executeJsonRequest<unknown>({
      method: ComponentMethods.GetBySlug,
      path: buildComponentPath(ComponentMethods.GetBySlug, { slug }),
      params: { slug },
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[ComponentHub] getBySlug raw", {
        slug,
        isArray: Array.isArray(raw),
        keys:
          raw && typeof raw === "object" && !Array.isArray(raw)
            ? Object.keys(raw as object)
            : [],
      });
    }

    return normalizeComponentDetail(raw);
  },

  async create(body: CreateComponentBody): Promise<ComponentDetail> {
    const raw = await executeJsonRequest<unknown, CreateComponentBody>({
      method: ComponentMethods.Create,
      path: buildComponentPath(ComponentMethods.Create),
      body,
    });
    return normalizeComponentDetail(raw);
  },

  async update(id: number, body: UpdateComponentBody): Promise<ComponentDetail> {
    const raw = await executeJsonRequest<unknown, UpdateComponentBody>({
      method: ComponentMethods.Update,
      path: buildComponentPath(ComponentMethods.Update, { id }),
      params: { id },
      body,
    });
    return normalizeComponentDetail(raw);
  },

  async remove(id: number): Promise<void> {
    await executeJsonRequest<void>({
      method: ComponentMethods.Delete,
      path: buildComponentPath(ComponentMethods.Delete, { id }),
      params: { id },
    });
  },
} as const;
