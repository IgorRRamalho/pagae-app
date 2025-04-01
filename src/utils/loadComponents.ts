// src/utils/loadComponents.ts
import { lazy } from 'react';

type ComponentType = 'mobile' | 'desktop';

const loadComponents = (componentName: string, isMobile: boolean) => {
  const type: ComponentType = isMobile ? 'mobile' : 'desktop';
  
  return lazy(async () => {
    try {
      // Tenta carregar a versão específica
      return await import(`@pages/${componentName}/${componentName}.${type}.tsx`);
    } catch (error) {
      // Fallback para desktop se mobile não existir
      if (type === 'mobile') {
        console.warn(`Mobile version not found, using desktop fallback for ${componentName}`);
        return await import(`../pages/${componentName}/${componentName}.desktop`);
      }
      throw new Error(`Component ${componentName}.${type} not found`);
    }
  });
};

export default loadComponents;