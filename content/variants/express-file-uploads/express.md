---
id: variant.express-file-uploads.express
question: question.express-file-uploads
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Treat uploaded files as hostile input. Express’s JSON parser does not parse `multipart/form-data`, so use a maintained multipart middleware configured with file-count and byte limits, preferably streaming directly to controlled object storage. Never trust a supplied filename, extension, or MIME type as proof of content. Generate a storage key, inspect or validate the actual file type where appropriate, and scan content when the risk profile requires it.

Store uploads outside the application source tree and outside any directory served automatically as static files. Serve them through an authorization-aware download endpoint or separate storage domain with carefully selected headers. Avoid buffering large files in memory; impose upstream request limits and timeouts as well. A database should generally store metadata and a storage reference, not large binary values by default.

# Why It Matters

Unsafe upload handling can enable memory exhaustion, stored malicious content, path traversal, or exposure of private files.

# Code Example

```typescript
import express, { Request, Response } from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1_000_000, files: 1 } });
app.post('/uploads', upload.single('document'), (req: Request, res: Response) => {
  if (!req.file || req.file.mimetype !== 'application/pdf') return res.status(400).json({ error: 'one PDF is required' });
  return res.status(201).json({ bytes: req.file.size });
});
app.listen(3000);
```

# Common Mistakes

- **Trusting `file.originalname` for a storage path:** Client-controlled names can collide or contain unsafe path components.
- **Buffering arbitrarily large uploads in memory:** A small number of requests can exhaust the Node.js process.

# Follow-up Questions

- **Why use a generated object key?** (Answer: It separates storage identity from untrusted filenames.)
- **Should a private upload be served with `express.static`?** (Answer: No; it bypasses per-request authorization.)
