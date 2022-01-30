const isPwa = (): boolean =>
  ["fullscreen", "standalone", "minimal-ui"].some(
    displayMode => window.matchMedia(`(display-mode: ${displayMode})`).matches
  );

const isMobileUI = (): boolean => window.matchMedia("(max-width: 600px)").matches;

export { isPwa, isMobileUI };
