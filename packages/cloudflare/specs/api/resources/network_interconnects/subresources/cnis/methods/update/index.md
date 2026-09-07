## Modify stored information about a CNI object

**put** `/accounts/{account_id}/cni/cnis/{cni}`

Modify stored information about a CNI object

### Path Parameters

- `account_id: string`

  Customer account tag

- `cni: string`

### Body Parameters

- `id: string`

- `account: string`

  Customer account tag

- `cust_ip: string`

  Customer end of the point-to-point link

  This should always be inside the same prefix as `p2p_ip`.

- `interconnect: string`

  Interconnect identifier hosting this CNI

- `magic: object { conduit_name, description, mtu }`

  - `conduit_name: string`

  - `description: string`

  - `mtu: number`

- `p2p_ip: string`

  Cloudflare end of the point-to-point link

- `bgp: optional object { customer_asn, extra_prefixes, md5_key }`

  - `customer_asn: number`

    ASN used on the customer end of the BGP session

  - `extra_prefixes: array of string`

    Extra set of static prefixes to advertise to the customer's end of the session

  - `md5_key: optional string`

    MD5 key to use for session authentication.

    Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
    key is not treated as a secret value. This is *only* supported for preventing
    misconfiguration, not for defending against malicious attacks.

    The MD5 key, if set, must be of non-zero length and consist only of the following types of
    character:

    * ASCII alphanumerics: `[a-zA-Z0-9]`
    * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

    In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
    quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
    (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
    these disallowed characters will be rejected.

### Returns

- `id: string`

- `account: string`

  Customer account tag

- `cust_ip: string`

  Customer end of the point-to-point link

  This should always be inside the same prefix as `p2p_ip`.

- `interconnect: string`

  Interconnect identifier hosting this CNI

- `magic: object { conduit_name, description, mtu }`

  - `conduit_name: string`

  - `description: string`

  - `mtu: number`

- `p2p_ip: string`

  Cloudflare end of the point-to-point link

- `bgp: optional object { customer_asn, extra_prefixes, md5_key }`

  - `customer_asn: number`

    ASN used on the customer end of the BGP session

  - `extra_prefixes: array of string`

    Extra set of static prefixes to advertise to the customer's end of the session

  - `md5_key: optional string`

    MD5 key to use for session authentication.

    Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
    key is not treated as a secret value. This is *only* supported for preventing
    misconfiguration, not for defending against malicious attacks.

    The MD5 key, if set, must be of non-zero length and consist only of the following types of
    character:

    * ASCII alphanumerics: `[a-zA-Z0-9]`
    * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

    In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
    quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
    (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
    these disallowed characters will be rejected.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/cnis/$CNI \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account": "account",
          "cust_ip": "192.168.3.4/31",
          "interconnect": "interconnect",
          "magic": {
            "conduit_name": "conduit_name",
            "description": "description",
            "mtu": 0
          },
          "p2p_ip": "192.168.3.4/31"
        }'
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "account": "account",
  "cust_ip": "192.168.3.4/31",
  "interconnect": "interconnect",
  "magic": {
    "conduit_name": "conduit_name",
    "description": "description",
    "mtu": 0
  },
  "p2p_ip": "192.168.3.4/31",
  "bgp": {
    "customer_asn": 0,
    "extra_prefixes": [
      "string"
    ],
    "md5_key": "md5_key"
  }
}
```
