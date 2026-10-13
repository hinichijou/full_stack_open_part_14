// To solve Playwright test issues with missing csrf token. It seems that getting the token needs a round trip request to the authentication server and Playwright pushes the button in the meanwhile.
// Adding delay to the tests also fixed the issue but I guess this could be a real issue with slow connections.
import { useEffect, useState } from 'react';

//https://next-auth.js.org/getting-started/client#getcsrftoken
import { getCsrfToken } from "next-auth/react"

export function useHasCsrfToken() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    getCsrfToken().then(() => setHasToken(true))
  }, []);

  return hasToken;
}