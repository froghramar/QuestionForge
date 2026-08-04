---
id: variant.jws-vs-jwe.system-design
question: question.jws-vs-jwe
technology: tech.system-design
---
# Expected Answer (JOSE / RFC 7515 and RFC 7516)

JWS signs a payload. A recipient can verify that the payload was not modified and was produced by the holder of the signing key, but anyone holding the compact token can base64url-decode the header and payload. JWE encrypts a payload for one or more recipients. It protects confidentiality, but recipients still need to validate the encryption algorithm, key selection, and application claims. Encryption does not automatically mean the sender is authenticated in the way the application requires.

Most access tokens and OIDC ID Tokens are signed JWS objects, so their claims should be minimal and non-sensitive. Use JWE only when claims must remain confidential from token holders or intermediaries and the key distribution, rotation, and recipient behavior justify the additional complexity. A nested JWT can be signed then encrypted when recipients need both a verifiable issuer and confidential contents, but it is not a default requirement.

# Why It Matters

Treating a signed JWT as encrypted leaks data through browser storage, logs, telemetry, and client inspection. Unnecessary encryption also increases operational complexity and can hide data that systems legitimately need to inspect.

# Example Code

```typescript
interface JwtHeader {
  alg: string;
  enc?: string;
}

export function tokenProtection(header: JwtHeader): 'signed' | 'encrypted' | 'unknown' {
  if (header.alg === 'dir' || header.enc) return 'encrypted';
  if (header.alg !== 'none') return 'signed';
  return 'unknown';
}
```

# Common Mistakes

- **Putting passwords or secrets in a JWS payload:** Signing does not conceal values; token holders can decode them.
- **Assuming JWE removes claim validation:** Issuer, audience, expiry, and token purpose still matter after decryption.
- **Using encryption to avoid authorization design:** Confidentiality does not decide whether the recipient is allowed to perform an action.

# Follow-up Questions

- **Does a JWS provide confidentiality?** (Answer: No. It provides integrity and signer authentication, while its payload remains readable.)
- **When is a nested JWT appropriate?** (Answer: When a design explicitly requires both verifiable provenance and confidentiality for the recipient.)

# References

- [RFC 7515: JSON Web Signature](https://www.rfc-editor.org/rfc/rfc7515)
- [RFC 7516: JSON Web Encryption](https://www.rfc-editor.org/rfc/rfc7516)
