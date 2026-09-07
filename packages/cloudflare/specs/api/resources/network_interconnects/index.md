# Network Interconnects

# CNIs

## List existing CNI objects

**get** `/accounts/{account_id}/cni/cnis`

List existing CNI objects

### Path Parameters

- `account_id: string`

  Customer account tag

### Query Parameters

- `cursor: optional number`

- `limit: optional number`

- `slot: optional string`

  If specified, only show CNIs associated with the specified slot

- `tunnel_id: optional string`

  If specified, only show cnis associated with the specified tunnel id

### Returns

- `items: array of object { id, account, cust_ip, 4 more }`

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

- `next: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/cnis \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": [
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
  ],
  "next": 0
}
```

## Get information about a CNI object

**get** `/accounts/{account_id}/cni/cnis/{cni}`

Get information about a CNI object

### Path Parameters

- `account_id: string`

  Customer account tag

- `cni: string`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## Create a new CNI object

**post** `/accounts/{account_id}/cni/cnis`

Create a new CNI object

### Path Parameters

- `account_id: string`

  Customer account tag

### Body Parameters

- `account: string`

  Customer account tag

- `interconnect: string`

- `magic: object { conduit_name, description, mtu }`

  - `conduit_name: string`

  - `description: string`

  - `mtu: number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/cnis \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account": "account",
          "interconnect": "interconnect",
          "magic": {
            "conduit_name": "conduit_name",
            "description": "description",
            "mtu": 0
          }
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

## Delete a specified CNI object

**delete** `/accounts/{account_id}/cni/cnis/{cni}`

Delete a specified CNI object

### Path Parameters

- `account_id: string`

  Customer account tag

- `cni: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/cnis/$CNI \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### CNI List Response

- `CNIListResponse object { items, next }`

  - `items: array of object { id, account, cust_ip, 4 more }`

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

  - `next: optional number`

### CNI Get Response

- `CNIGetResponse object { id, account, cust_ip, 4 more }`

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

### CNI Create Response

- `CNICreateResponse object { id, account, cust_ip, 4 more }`

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

### CNI Update Response

- `CNIUpdateResponse object { id, account, cust_ip, 4 more }`

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

# Interconnects

## List existing interconnects

**get** `/accounts/{account_id}/cni/interconnects`

List existing interconnects

### Path Parameters

- `account_id: string`

  Customer account tag

### Query Parameters

- `cursor: optional number`

- `limit: optional number`

- `site: optional string`

  If specified, only show interconnects located at the given site

- `type: optional string`

  If specified, only show interconnects of the given type

### Returns

- `items: array of object { account, facility, name, 5 more }  or object { account, name, region, 3 more }`

  - `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

    - `account: string`

    - `facility: object { address, name }`

      - `address: array of string`

      - `name: string`

    - `name: string`

    - `site: string`

      A Cloudflare site name.

    - `slot_id: string`

    - `speed: string`

    - `type: string`

    - `owner: optional string`

  - `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

    - `account: string`

    - `name: string`

    - `region: string`

    - `type: string`

    - `owner: optional string`

    - `speed: optional "50M" or "100M" or "200M" or 9 more`

      Bandwidth structure as visible through the customer-facing API.

      - `"50M"`

      - `"100M"`

      - `"200M"`

      - `"300M"`

      - `"400M"`

      - `"500M"`

      - `"1G"`

      - `"2G"`

      - `"5G"`

      - `"10G"`

      - `"20G"`

      - `"50G"`

- `next: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": [
    {
      "account": "account",
      "facility": {
        "address": [
          "string"
        ],
        "name": "name"
      },
      "name": "name",
      "site": "site",
      "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "speed": "speed",
      "type": "type",
      "owner": "owner"
    }
  ],
  "next": 0
}
```

## Get information about an interconnect object

**get** `/accounts/{account_id}/cni/interconnects/{icon}`

Get information about an interconnect object

### Path Parameters

- `account_id: string`

  Customer account tag

- `icon: string`

### Returns

- `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

  - `account: string`

  - `facility: object { address, name }`

    - `address: array of string`

    - `name: string`

  - `name: string`

  - `site: string`

    A Cloudflare site name.

  - `slot_id: string`

  - `speed: string`

  - `type: string`

  - `owner: optional string`

- `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

  - `account: string`

  - `name: string`

  - `region: string`

  - `type: string`

  - `owner: optional string`

  - `speed: optional "50M" or "100M" or "200M" or 9 more`

    Bandwidth structure as visible through the customer-facing API.

    - `"50M"`

    - `"100M"`

    - `"200M"`

    - `"300M"`

    - `"400M"`

    - `"500M"`

    - `"1G"`

    - `"2G"`

    - `"5G"`

    - `"10G"`

    - `"20G"`

    - `"50G"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "account": "account",
  "facility": {
    "address": [
      "string"
    ],
    "name": "name"
  },
  "name": "name",
  "site": "site",
  "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "speed": "speed",
  "type": "type",
  "owner": "owner"
}
```

## Create a new interconnect

**post** `/accounts/{account_id}/cni/interconnects`

Create a new interconnect

### Path Parameters

- `account_id: string`

  Customer account tag

### Body Parameters

- `body: object { account, slot_id, type, speed }  or object { account, bandwidth, pairing_key, type }`

  - `NscInterconnectCreatePhysicalBody object { account, slot_id, type, speed }`

    - `account: string`

    - `slot_id: string`

    - `type: string`

    - `speed: optional string`

  - `NscInterconnectCreateGcpPartnerBody object { account, bandwidth, pairing_key, type }`

    - `account: string`

    - `bandwidth: "50M" or "100M" or "200M" or 9 more`

      Bandwidth structure as visible through the customer-facing API.

      - `"50M"`

      - `"100M"`

      - `"200M"`

      - `"300M"`

      - `"400M"`

      - `"500M"`

      - `"1G"`

      - `"2G"`

      - `"5G"`

      - `"10G"`

      - `"20G"`

      - `"50G"`

    - `pairing_key: string`

      Pairing key provided by GCP

    - `type: string`

### Returns

- `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

  - `account: string`

  - `facility: object { address, name }`

    - `address: array of string`

    - `name: string`

  - `name: string`

  - `site: string`

    A Cloudflare site name.

  - `slot_id: string`

  - `speed: string`

  - `type: string`

  - `owner: optional string`

- `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

  - `account: string`

  - `name: string`

  - `region: string`

  - `type: string`

  - `owner: optional string`

  - `speed: optional "50M" or "100M" or "200M" or 9 more`

    Bandwidth structure as visible through the customer-facing API.

    - `"50M"`

    - `"100M"`

    - `"200M"`

    - `"300M"`

    - `"400M"`

    - `"500M"`

    - `"1G"`

    - `"2G"`

    - `"5G"`

    - `"10G"`

    - `"20G"`

    - `"50G"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account": "account",
          "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "type": "type"
        }'
```

#### Response

```json
{
  "account": "account",
  "facility": {
    "address": [
      "string"
    ],
    "name": "name"
  },
  "name": "name",
  "site": "site",
  "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "speed": "speed",
  "type": "type",
  "owner": "owner"
}
```

## Delete an interconnect object

**delete** `/accounts/{account_id}/cni/interconnects/{icon}`

Delete an interconnect object

### Path Parameters

- `account_id: string`

  Customer account tag

- `icon: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Generate the Letter of Authorization (LOA) for a given interconnect

**get** `/accounts/{account_id}/cni/interconnects/{icon}/loa`

Generate the Letter of Authorization (LOA) for a given interconnect

### Path Parameters

- `account_id: string`

  Customer account tag

- `icon: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON/loa \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Get the current status of an interconnect object

**get** `/accounts/{account_id}/cni/interconnects/{icon}/status`

Get the current status of an interconnect object

### Path Parameters

- `account_id: string`

  Customer account tag

- `icon: string`

### Returns

- `Pending object { state }`

  - `state: "Pending"`

    - `"Pending"`

- `Down object { state, reason }`

  - `state: "Down"`

    - `"Down"`

  - `reason: optional string`

    Diagnostic information, if available

- `Unhealthy object { state, reason }`

  - `state: "Unhealthy"`

    - `"Unhealthy"`

  - `reason: optional string`

    Diagnostic information, if available

- `Healthy object { state }`

  - `state: "Healthy"`

    - `"Healthy"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON/status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "state": "Pending"
}
```

## Domain Types

### Interconnect List Response

- `InterconnectListResponse object { items, next }`

  - `items: array of object { account, facility, name, 5 more }  or object { account, name, region, 3 more }`

    - `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

      - `account: string`

      - `facility: object { address, name }`

        - `address: array of string`

        - `name: string`

      - `name: string`

      - `site: string`

        A Cloudflare site name.

      - `slot_id: string`

      - `speed: string`

      - `type: string`

      - `owner: optional string`

    - `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

      - `account: string`

      - `name: string`

      - `region: string`

      - `type: string`

      - `owner: optional string`

      - `speed: optional "50M" or "100M" or "200M" or 9 more`

        Bandwidth structure as visible through the customer-facing API.

        - `"50M"`

        - `"100M"`

        - `"200M"`

        - `"300M"`

        - `"400M"`

        - `"500M"`

        - `"1G"`

        - `"2G"`

        - `"5G"`

        - `"10G"`

        - `"20G"`

        - `"50G"`

  - `next: optional number`

### Interconnect Get Response

- `InterconnectGetResponse = object { account, facility, name, 5 more }  or object { account, name, region, 3 more }`

  - `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

    - `account: string`

    - `facility: object { address, name }`

      - `address: array of string`

      - `name: string`

    - `name: string`

    - `site: string`

      A Cloudflare site name.

    - `slot_id: string`

    - `speed: string`

    - `type: string`

    - `owner: optional string`

  - `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

    - `account: string`

    - `name: string`

    - `region: string`

    - `type: string`

    - `owner: optional string`

    - `speed: optional "50M" or "100M" or "200M" or 9 more`

      Bandwidth structure as visible through the customer-facing API.

      - `"50M"`

      - `"100M"`

      - `"200M"`

      - `"300M"`

      - `"400M"`

      - `"500M"`

      - `"1G"`

      - `"2G"`

      - `"5G"`

      - `"10G"`

      - `"20G"`

      - `"50G"`

### Interconnect Create Response

- `InterconnectCreateResponse = object { account, facility, name, 5 more }  or object { account, name, region, 3 more }`

  - `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

    - `account: string`

    - `facility: object { address, name }`

      - `address: array of string`

      - `name: string`

    - `name: string`

    - `site: string`

      A Cloudflare site name.

    - `slot_id: string`

    - `speed: string`

    - `type: string`

    - `owner: optional string`

  - `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

    - `account: string`

    - `name: string`

    - `region: string`

    - `type: string`

    - `owner: optional string`

    - `speed: optional "50M" or "100M" or "200M" or 9 more`

      Bandwidth structure as visible through the customer-facing API.

      - `"50M"`

      - `"100M"`

      - `"200M"`

      - `"300M"`

      - `"400M"`

      - `"500M"`

      - `"1G"`

      - `"2G"`

      - `"5G"`

      - `"10G"`

      - `"20G"`

      - `"50G"`

### Interconnect Status Response

- `InterconnectStatusResponse = object { state }  or object { state, reason }  or object { state, reason }  or object { state }`

  - `Pending object { state }`

    - `state: "Pending"`

      - `"Pending"`

  - `Down object { state, reason }`

    - `state: "Down"`

      - `"Down"`

    - `reason: optional string`

      Diagnostic information, if available

  - `Unhealthy object { state, reason }`

    - `state: "Unhealthy"`

      - `"Unhealthy"`

    - `reason: optional string`

      Diagnostic information, if available

  - `Healthy object { state }`

    - `state: "Healthy"`

      - `"Healthy"`

# Settings

## Get the current settings for the active account

**get** `/accounts/{account_id}/cni/settings`

Get the current settings for the active account

### Path Parameters

- `account_id: string`

### Returns

- `default_asn: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/settings \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "default_asn": 0
}
```

## Update the current settings for the active account

**put** `/accounts/{account_id}/cni/settings`

Update the current settings for the active account

### Path Parameters

- `account_id: string`

### Body Parameters

- `default_asn: optional number`

### Returns

- `default_asn: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "default_asn": 0
}
```

## Domain Types

### Setting Get Response

- `SettingGetResponse object { default_asn }`

  - `default_asn: number`

### Setting Update Response

- `SettingUpdateResponse object { default_asn }`

  - `default_asn: number`

# Slots

## Retrieve a list of all slots matching the specified parameters

**get** `/accounts/{account_id}/cni/slots`

Retrieve a list of all slots matching the specified parameters

### Path Parameters

- `account_id: string`

  Customer account tag

### Query Parameters

- `address_contains: optional string`

  If specified, only show slots with the given text in their address field

- `cursor: optional number`

- `limit: optional number`

- `occupied: optional boolean`

  If specified, only show slots with a specific occupied/unoccupied state

- `site: optional string`

  If specified, only show slots located at the given site

- `speed: optional string`

  If specified, only show slots that support the given speed

### Returns

- `items: array of object { id, facility, occupied, 3 more }`

  - `id: string`

    Slot ID

  - `facility: object { address, name }`

    - `address: array of string`

    - `name: string`

  - `occupied: boolean`

    Whether the slot is occupied or not

  - `site: string`

  - `speed: string`

  - `account: optional string`

    Customer account tag

- `next: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/slots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "facility": {
        "address": [
          "string"
        ],
        "name": "name"
      },
      "occupied": true,
      "site": "site",
      "speed": "speed",
      "account": "account"
    }
  ],
  "next": 0
}
```

## Get information about the specified slot

**get** `/accounts/{account_id}/cni/slots/{slot}`

Get information about the specified slot

### Path Parameters

- `account_id: string`

  Customer account tag

- `slot: string`

### Returns

- `id: string`

  Slot ID

- `facility: object { address, name }`

  - `address: array of string`

  - `name: string`

- `occupied: boolean`

  Whether the slot is occupied or not

- `site: string`

- `speed: string`

- `account: optional string`

  Customer account tag

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/slots/$SLOT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "facility": {
    "address": [
      "string"
    ],
    "name": "name"
  },
  "occupied": true,
  "site": "site",
  "speed": "speed",
  "account": "account"
}
```

## Domain Types

### Slot List Response

- `SlotListResponse object { items, next }`

  - `items: array of object { id, facility, occupied, 3 more }`

    - `id: string`

      Slot ID

    - `facility: object { address, name }`

      - `address: array of string`

      - `name: string`

    - `occupied: boolean`

      Whether the slot is occupied or not

    - `site: string`

    - `speed: string`

    - `account: optional string`

      Customer account tag

  - `next: optional number`

### Slot Get Response

- `SlotGetResponse object { id, facility, occupied, 3 more }`

  - `id: string`

    Slot ID

  - `facility: object { address, name }`

    - `address: array of string`

    - `name: string`

  - `occupied: boolean`

    Whether the slot is occupied or not

  - `site: string`

  - `speed: string`

  - `account: optional string`

    Customer account tag
