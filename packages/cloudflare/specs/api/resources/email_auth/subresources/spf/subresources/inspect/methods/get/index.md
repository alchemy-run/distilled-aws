## Inspect SPF Record

**get** `/zones/{zone_id}/email/auth/spf/inspect`

Inspects a specific SPF TXT record and returns a parsed tree structure
in the spflimit-worker format.

The record ID must be provided via the `id` query parameter.

Returns a recursive tree showing:

- Parsed components with their qualifiers and types
- Nested includes recursively resolved within components
- Per-component and total lookup counts
- Detailed error information with context

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `id: string`

  DNS record ID (rec_tag) to inspect

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { components, domain, record, 2 more }`

  Recursive SPF inspection tree

  - `components: array of unknown`

    Parsed SPF components (mechanisms)

  - `domain: string`

    Domain being inspected

  - `record: string`

    Raw SPF record content

  - `total_lookups: number`

    Total number of DNS lookups performed across all includes

  - `errors: optional array of object { code, domain, message, details }`

    All errors encountered during inspection, collected from the entire tree.
    This includes errors from nested includes at any depth, providing a quick
    overview of all issues without needing to traverse the nested structure.
    Each error includes a `domain` field to identify where it occurred.
    Empty array if no errors (omitted from JSON when empty).

    - `code: string`

      Error code. Known values:

      - `lookup_failed` — DNS TXT lookup failed
      - `spf_not_found` — no SPF record found
      - `invalid_spf` — record does not start with `v=spf1`
      - `invalid_domain` — PSL validation failed
      - `loop_detected` — include/redirect cycle detected
      - `invalid_mechanism` — unrecognised or malformed mechanism
      - `resource_limit_exceeded` — internal resource protection limits exceeded (recursion depth or query budget)
      - `max_lookups` — RFC 7208 10-lookup limit exceeded

    - `domain: string`

      Domain where the error occurred

    - `message: string`

      Human-readable error message

    - `details: optional string`

      Additional error-specific details (optional).

      - For `invalid_domain` errors: the invalid domain string
      - For `invalid_mechanism` errors: the invalid mechanism text (e.g., "invalidmech123")
      - For `loop_detected` errors: the domain that caused the loop
      - For other error types: not present

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/auth/spf/inspect \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "components": [
      {}
    ],
    "domain": "example.com",
    "record": "v=spf1 ip4:203.0.113.1 include:spf.example.com -all",
    "total_lookups": 2,
    "errors": [
      {
        "code": "max_lookups",
        "domain": "example.com",
        "message": "RFC 7208 10-lookup limit exceeded",
        "details": "invalid"
      }
    ]
  }
}
```
