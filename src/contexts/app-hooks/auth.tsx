import { useEffect, useState } from 'react';
import { Constants } from '@lyttledev-dashboard/constants';

export function useAppAuth() {
  const [authorized, setAuthorized] = useState(false);

  const check = async (): Promise<void> => {
    const res: Response = await fetch(Constants.checkLoginUrl, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': Constants.checkLoginUrl,
      },
      credentials: 'include',
    });

    if (res.status !== 200) return;
    setAuthorized(true);
  };

  useEffect(() => {
    void check();
  }, []);

  return authorized;
}
