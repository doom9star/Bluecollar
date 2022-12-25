export function captialize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase();
}

export function getTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
  });
}
