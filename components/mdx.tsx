import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Feedback } from '@/components/feedback';
import { RoleBadge } from '@/components/role-badge';
import { StepCard, Steps } from '@/components/step-card';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    StepCard,
    Steps,
    RoleBadge,
    Feedback,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
