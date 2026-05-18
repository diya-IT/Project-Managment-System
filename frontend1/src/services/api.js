const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchJSON(path, opts) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export default { fetchJSON };
