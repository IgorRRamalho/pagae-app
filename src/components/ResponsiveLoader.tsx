// src/components/ResponsiveLoader.tsx
import { Suspense } from 'react';

import loadComponents from '../utils/loadComponents';
import useViewport from '@hook/useViewport';

type Props = {
  componentName: string;
};

const ResponsiveLoader = ({ componentName }: Props) => {
  const { isMobile } = useViewport();
  const Component = loadComponents(componentName, isMobile);

  return (
    <Suspense fallback={<div className="loading">Carregando...</div>}>
      <Component />
    </Suspense>
  );
};

export default ResponsiveLoader;