# n8n-nodes-halu

An [n8n](https://n8n.io) community node for [**Komplex AI**](https://detector.komplexai.io)'s
hallucination detector for LLM output. Drop a **"Detect Hallucination"** step into any
n8n workflow to score AI-generated text for hallucination risk.

## Install

In self-hosted n8n: **Settings → Community Nodes → Install** → `n8n-nodes-halu`.

## Credentials

Create a **Komplex AI (halu) API** credential with your API key (`sk_...`) — get one free
at <https://detector.komplexai.io/account/keys>.

## Node: Komplex AI Hallucination Detector

**Operation:** Detect Hallucination.

| Field | Description |
|-------|-------------|
| Response Text | The LLM output to score (English, ≤ 2,048 chars). Required. |
| Prompt (optional) | The prompt the model saw — improves accuracy on context-dependent claims. |
| Task | `multiclass` (default; full regime breakdown) or `binary`. |

Returns the API JSON: `p_hallucination`, `flag`, `top_regime`, `regime_scores`, etc.
Wire the `flag` / `p_hallucination` into an **IF** node to gate, annotate, or route.

## Scope & limits

English natural-language responses, ≤ 2,048 chars; probabilistic signal, not a fact-checker;
first call after idle can cold-start ~10–30s. See
[Performance](https://detector.komplexai.io/performance) and the
[Guide](https://detector.komplexai.io/guide).

## License

Apache-2.0
