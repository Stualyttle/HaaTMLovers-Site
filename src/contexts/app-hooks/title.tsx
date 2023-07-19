import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { useState } from 'react';

export function useTitle() {
  const homeTitle = getMessage(pagesPrefix + 'home.title');
  const [pageTitle, setPageTitle] = useState(homeTitle);

  return {
    pageTitle,
    setPageTitle,
  };
}
