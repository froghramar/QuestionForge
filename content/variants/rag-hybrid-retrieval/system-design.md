---
id: variant.rag-hybrid-retrieval.system-design
question: question.rag-hybrid-retrieval
technology: tech.system-design
---
# Expected Answer
Run lexical and vector retrieval in parallel. Lexical retrieval protects exact identifiers, product codes, and quoted errors; vector retrieval catches paraphrase and semantic similarity. Fuse bounded candidate lists with reciprocal-rank fusion or a calibrated score, then apply a reranker to the small merged set. Preserve source metadata and enforce authorization before prompt construction. Measure recall by query class and reserve a fixed latency budget for each stage; fall back to the faster candidate set if the reranker times out.
# Why It Matters
Vector-only search often misses the precise token a support user needs.
# Common Mistakes
- **Reranking thousands of chunks:** It destroys latency and cost budgets.
- **Combining unnormalized scores blindly:** One retriever can dominate for accidental numeric reasons.
# Follow-up Questions
- **Why use fusion?** (Answer: It gives both lexical and semantic candidates a chance.)
- **Where does reranking fit?** (Answer: After cheap retrieval, before context assembly.)
