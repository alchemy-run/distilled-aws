## Check Post-Quantum TLS support

**get** `/radar/post_quantum/tls/support`

Tests whether a hostname or IP address supports Post-Quantum (PQ) TLS key exchange. Returns information about the negotiated key exchange algorithm, whether it uses PQ cryptography, and any detected TLS implementation bugs (Split ClientHello, HRR failure, etc.).

### Query Parameters

- `host: string`

  Hostname or IP address to test for Post-Quantum TLS support, optionally with port (defaults to 443).

### Returns

- `result: object { bugs, host, kex, 2 more }`

  - `bugs: object { hrrFailure, splitClientHello, unknownKeyshare }`

    - `hrrFailure: boolean`

      Server sends a HelloRetryRequest but fails to complete the handshake after the client sends the second ClientHello. Often caused by non-compliant TLS 1.3 implementations on shared hosting providers.

    - `splitClientHello: boolean`

      Server rejects fragmented ClientHello caused by large PQ keyshare, but accepts classical (non-PQ) handshakes. Typically caused by middleboxes or firewalls that cannot reassemble split TLS ClientHello messages.

    - `unknownKeyshare: boolean`

      Server cannot handle an unknown key exchange algorithm in the ClientHello keyshare extension. Compliant servers should respond with HelloRetryRequest for a supported algorithm.

  - `host: string`

    The host that was tested

  - `kex: number`

    TLS CurveID of the negotiated key exchange

  - `kexName: string`

    Human-readable name of the key exchange algorithm

  - `pq: boolean`

    Whether the negotiated key exchange uses Post-Quantum cryptography (specifically X25519MLKEM768)

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/post_quantum/tls/support \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "bugs": {
      "hrrFailure": true,
      "splitClientHello": true,
      "unknownKeyshare": true
    },
    "host": "host",
    "kex": 0,
    "kexName": "kexName",
    "pq": true
  },
  "success": true
}
```
