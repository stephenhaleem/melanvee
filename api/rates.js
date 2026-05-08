export default async function handler(req, res) {
  try {
    const symbols = req.query.symbols || req.url.split('?')[1] && new URLSearchParams(req.url.split('?')[1]).get('symbols') || '';
    const url = `https://api.frankfurter.app/latest?base=GBP${symbols ? `&symbols=${encodeURIComponent(symbols)}` : ''}`;
    const r = await fetch(url);
    const body = await r.text();

    // Forward status and headers
    res.statusCode = r.status;
    res.setHeader('Content-Type', r.headers.get('content-type') || 'application/json');
    // Allow same-origin requests from client
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.end(body);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ error: String(err) }));
  }
}
