import { useEffect, useState } from 'react';
import { storage } from '@lyttledev-dashboard/utils';

export function useStartup() {
  const lastUpdate = storage.get('lastUpdate');
  const timeoutTime = 1000 * 2; // 10 seconds

  const [may, setMay] = useState<boolean | null>(null);

  useEffect(() => {
    const mayCheck = Date.now() - parseInt(lastUpdate ?? '0') > timeoutTime;
    setMay(mayCheck);

    const timeout = setTimeout(() => {
      setMay(true);
    }, timeoutTime);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return may;
}

export function useMainNav() {
  const [mainNavOpen, setMainNavOpen] = useState(false);
  const toggleMainNav = () => {
    const state = !mainNavOpen;
    setMainNavOpen(state);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', setLastUpdate);

    return () => {
      window.removeEventListener('beforeunload', setLastUpdate);
    };

    function setLastUpdate() {
      storage.set('lastUpdate', Date.now().toString());
    }
  }, []);

  return {
    mainNavOpen,
    setMainNavOpen,
    toggleMainNav,
  };
}
