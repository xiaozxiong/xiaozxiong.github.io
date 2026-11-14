---
title: "KV Cache Management"
order: 3
desc: >-
  Key-value (KV) caches reduce repeated computation during large language model inference,
  but can consume substantial GPU memory as context lengths and request volumes grow.
  I am interested in cache sharing, offloading, and memory-efficient management
  to support scalable long-context inference.
# desc: "Large language model (LLM) inference relies on key-value (KV) caches to avoid redundant computation across autoregressive decoding steps. As context lengths grow to millions of tokens, the KV cache becomes the dominant memory bottleneck. My work explores KV cache sharing across multi-agent and multi-request scenarios, KV cache offloading to CPU and storage, efficient retrieval-augmented generation (RAG) with shared KV states, and compression strategies to enable scalable long-context inference under tight GPU memory constraints."
# interests:
#   - "LLM Inference"
# #   - "Multi-Agent KV Sharing"
#   - "KV Cache Offloading"
#   - "Retrieval-Augmented Generation (RAG)"
#   - "GPU Memory Management"
---
