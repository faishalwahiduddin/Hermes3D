const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export const resolveStudioProxyGatewayUrl = (upstreamGatewayUrl?: string): string => {
  const raw = typeof upstreamGatewayUrl === "string" ? upstreamGatewayUrl.trim() : "";
  if (raw) {
    try {
      const parsed = new URL(raw);
      if (LOOPBACK_HOSTS.has(parsed.hostname)) {
        return raw;
      }
    } catch {
      // Fall through to the Studio proxy for malformed or non-URL values.
    }
  }

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  // Some embedded browsers (incl. Cursor Browser) fail WebSocket upgrades to
  // 127.0.0.1 but succeed on the localhost hostname for the same Studio port.
  let host = window.location.host;
  if (host === "127.0.0.1" || host.startsWith("127.0.0.1:")) {
    host = host.replace("127.0.0.1", "localhost");
  }
  if (host === "[::1]" || host.startsWith("[::1]:")) {
    host = host.replace("[::1]", "localhost");
  }
  return `${protocol}://${host}/api/gateway/ws`;
};

