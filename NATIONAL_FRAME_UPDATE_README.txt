HappyHr.Me National Frame Update

Changes:
- Homepage metadata, hero, guides, about section, footer, and market picker are no longer Hawaii-centric.
- City selector now exposes Hawaii plus 22 mainland U.S. markets.
- Restaurant results are visually grouped by Area for faster scanning.
- Local clock now uses the selected market time zone rather than always HST.
- Front-end market guard rejects records whose state does not match the selected/tagged market.
- Oahu has an additional coordinate boundary guard, preventing mainland/out-of-state rows mislabeled as Honolulu/Oahu from appearing.

The data workflow should also use the accompanying market-validation n8n file so future mismatched Google Places results are sent to review rather than published.
