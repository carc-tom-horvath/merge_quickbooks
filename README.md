# Merge API Explorer

A lightweight local tool for exploring Merge's normalized QuickBooks accounting schema. Built for Carbon Arc DPP schema research.

## What it does

- Queries Merge's Accounting API (`/api/accounting/v1/`) through a local proxy
- Displays responses as syntax-highlighted JSON, a tabular summary, or a field-level schema view
- Useful for understanding how Merge normalizes QuickBooks data before designing an internal ontology

## Setup

**Requirements:** Node.js installed on your machine.

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/merge-explorer.git
cd merge-explorer
```

**2. Start the proxy**
```bash
node merge-proxy.js
```

You should see:
```
✓ Merge proxy running at http://localhost:3131
```

**3. Open the explorer**

Open `merge-explorer.html` in your browser directly, or serve it locally:
```bash
npx serve .
```
Then navigate to `http://localhost:3000/merge-explorer.html`.

## Usage

1. Paste your **Merge API key** (from Merge dashboard → API keys → Test access key)
2. Paste your **Account Token** (from Merge dashboard → Linked Accounts → click your account)
3. Select an endpoint or type a custom one
4. Hit **Send Request**

Switch between **JSON**, **Summary**, and **Schema** tabs to explore the response.

## Endpoints covered

| Button | Merge endpoint |
|---|---|
| accounts | `/accounts` |
| balance-sheets | `/balance-sheets` |
| cash-flow | `/cash-flow-statements` |
| income-stmt | `/income-statements` |
| invoices | `/invoices` |
| expenses | `/expenses` |
| contacts | `/contacts` |
| company-info | `/company-info` |
| transactions | `/transactions` |
| vendor-credits | `/vendor-credits` |

Any other endpoint can be entered manually in the **custom endpoint** field.

## Notes

- The proxy runs on `localhost:3131` and is required to avoid CORS issues when calling Merge's API from the browser
- No credentials are stored anywhere — API key and account token are entered at runtime and never leave your machine
- This tool uses Merge's **test** environment — use your test API key and a test linked account token
- The proxy must be running before you send requests from the HTML file

## Stopping the proxy

`Ctrl+C` in the terminal window where the proxy is running.
