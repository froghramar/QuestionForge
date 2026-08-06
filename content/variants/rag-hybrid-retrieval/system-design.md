---
id: variant.rag-hybrid-retrieval.system-design
question: question.rag-hybrid-retrieval
technology: tech.system-design
---
# Expected Answer
I would use lexical and vector retrieval as complementary candidate generators. Exact identifiers, error codes, and quoted phrases favor lexical search; paraphrases favor embeddings. Run both in parallel, fuse small candidate sets, then rerank only the merged top results. Measure recall by query class and reserve a latency budget for each stage, with a fallback when reranking times out. Authorization filters apply before context assembly.
# Why It Matters
Vector-only search often misses the precise token a support user needs.
# Common Mistakes
- **Reranking thousands of chunks:** It destroys latency and cost budgets.
- **Combining unnormalized scores blindly:** One retriever can dominate for accidental numeric reasons.
# Follow-up Questions
- **Why use fusion?** (Answer: It gives both lexical and semantic candidates a chance.)
- **Where does reranking fit?** (Answer: After cheap retrieval, before context assembly.)
