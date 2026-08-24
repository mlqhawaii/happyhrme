City-guide routing fix:
- Every guide card now uses ?market=<slug>.
- Honolulu/Oʻahu -> ?market=honolulu
- Maui -> ?market=maui
- Kauaʻi -> ?market=kauai
- Hawaiʻi Island -> ?market=hawaii-island
- An explicit URL selection always wins over localStorage/saved market.
- Old ?island=Oahu/Maui/Kauai/Hawaii URLs remain supported.
- All 26 guide cards were automatically audited against the supported market list.
