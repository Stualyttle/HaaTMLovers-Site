import React, { useEffect, useState } from 'react';
import { Constants } from '@lyttledev-dashboard/constants';
import { useWindowSize } from '@lyttledev-dashboard/hooks/useWindowSize';

export function useMobile(
  mainNavOpen: boolean,
  setMainNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
  initialized: Date | null,
) {
  const windowSize = useWindowSize();
  const [mobile, setMobile] = useState<boolean>(true);

  useEffect(() => {
    const isMobile = windowSize.width
      ? windowSize.width < Constants.mobileWidth
      : true;

    if (!windowSize?.width) return;

    if (isMobile !== mobile) {
      setMobile(isMobile);

      if (!isMobile === mainNavOpen) return;
      const now = new Date();
      const time = initialized ? now.getTime() - initialized.getTime() : 0;
      if (time < 2000) return;
      setMainNavOpen(!isMobile);
    }
  }, [windowSize, mobile]);

  useEffect(() => {
    if (mobile && mainNavOpen) {
      setMainNavOpen(false);
    }
  }, []);

  return {
    mobile,
    setMobile,
  };
}
