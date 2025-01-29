import React from "react";

export function useMediaQuery(query: string): boolean {
  const [browser, setBrowser] = React.useState<boolean>(false);

  const mediaQuery = React.useMemo(() => {
    if (browser == true) {
      return window?.matchMedia(query);
    } else {
      return false;
    }
  }, [query, browser]);

  const [match, setMatch] = React.useState(
    mediaQuery ? mediaQuery.matches : false
  );

  React.useEffect(() => {
    setBrowser(true);
  }, []);

  React.useEffect(() => {
    if (!mediaQuery) {
      return;
    }

    const onChange = () => setMatch(mediaQuery?.matches);
    mediaQuery?.addEventListener("change", onChange);

    return () => mediaQuery?.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return match;
}
