# Prefixes

## List Prefixes

**get** `/accounts/{account_id}/addressing/prefixes`

List all prefixes owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional array of Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "2af39739cc4e3b5910c918468bb89828",
      "account_id": "258def64c72dae45f3e4c8516e2111f2",
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "approved": "P",
      "asn": 13335,
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "delegate_loa_creation": true,
      "description": "Internal test prefix",
      "irr_validation_state": "pending",
      "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false,
      "ownership_validation_state": "pending",
      "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
      "rpki_validation_state": "pending"
    }
  ]
}
```

## Prefix Details

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

List a particular prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```

## Add Prefix

**post** `/accounts/{account_id}/addressing/prefixes`

Add a new prefix under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Body Parameters

- `asn: number`

  Autonomous System Number (ASN) the prefix will be advertised under.

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `delegate_loa_creation: optional boolean`

  Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

- `description: optional string`

  Description of the prefix.

- `loa_document_id: optional string`

  Identifier for the uploaded LOA document.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "asn": 13335,
          "cidr": "192.0.2.0/24",
          "delegate_loa_creation": true,
          "description": "Internal test prefix",
          "loa_document_id": "d933b1530bc56c9953cf8ce166da8004"
        }'
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```

## Update Prefix Description

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

Modify the description for a prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `description: string`

  Description of the prefix.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "Internal test prefix"
        }'
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```

## Delete Prefix

**delete** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

Delete an unapproved prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true
}
```

## Domain Types

### Prefix

- `Prefix object { id, account_id, advertised, 15 more }`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Prefix Delete Response

- `PrefixDeleteResponse object { errors, messages, success }`

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

# Service Bindings

## List Service Bindings

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings`

List the Cloudflare services this prefix is currently bound to. Traffic sent to an address within an IP prefix will be routed to the Cloudflare service of the most-specific Service Binding matching the address.
**Example:** binding `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other IPs in the prefix to Cloudflare Magic Transit.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "0429b49b6a5155297b78e75a44b09e14",
      "cidr": "192.0.2.0/24",
      "provisioning": {
        "state": "provisioning"
      },
      "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
      "service_name": "Magic Transit"
    }
  ]
}
```

## Get Service Binding

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}`

Fetch a single Service Binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `binding_id: string`

  Identifier of a Service Binding.

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

- `result: optional ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings/$BINDING_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
  }
}
```

## Create Service Binding

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings`

Creates a new Service Binding, routing traffic to IPs within the given CIDR to a service running on Cloudflare's network.
**NOTE:** The first Service Binding created for an IP Prefix must exactly match the IP Prefix's CIDR. Subsequent Service Bindings may be created with a more-specific CIDR. Refer to the  [Service Bindings Documentation](https://developers.cloudflare.com/byoip/service-bindings/) for compatibility details.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `service_id: string`

  Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
  **List Services** endpoint.

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

- `result: optional ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24",
          "service_id": "2db684ee7ca04e159946fd05b99e1bcd"
        }'
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
  }
}
```

## Delete Service Binding

**delete** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}`

Delete a Service Binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `binding_id: string`

  Identifier of a Service Binding.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings/$BINDING_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true
}
```

## Domain Types

### Service Binding

- `ServiceBinding object { id, cidr, provisioning, 2 more }`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Service Binding Delete Response

- `ServiceBindingDeleteResponse object { errors, messages, success }`

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

# BGP Prefixes

## List BGP Prefixes

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes`

List all BGP Prefixes within the specified IP Prefix. BGP Prefixes are used to control which specific subnets are advertised to the Internet. It is possible to advertise subnets more specific than an IP Prefix by creating more specific BGP Prefixes.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "7009ba364c7a5760798ceb430e603b74",
      "asn": 13335,
      "asn_prepend_count": 2,
      "auto_advertise_withdraw": true,
      "bgp_signal_opts": {
        "enabled": false,
        "modified_at": "2014-01-01T05:20:00.12345Z"
      },
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand": {
        "advertised": true,
        "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
        "on_demand_enabled": true,
        "on_demand_locked": false
      }
    }
  ]
}
```

## Fetch BGP Prefix

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}`

Retrieve a single BGP Prefix according to its identifier

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `bgp_prefix_id: string`

  Identifier of BGP Prefix.

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```

## Create BGP Prefix

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes`

Create a BGP prefix, controlling the BGP advertisement status of a specific subnet. When created, BGP prefixes are initially withdrawn, and can be advertised with the Update BGP Prefix API.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24"
        }'
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```

## Update BGP Prefix

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}`

Update the properties of a BGP Prefix, such as the on demand advertisement status (advertised or withdrawn).

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `bgp_prefix_id: string`

  Identifier of BGP Prefix.

### Body Parameters

- `asn_prepend_count: optional number`

  Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

- `auto_advertise_withdraw: optional boolean`

  Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

- `on_demand: optional object { advertised }`

  - `advertised: optional boolean`

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "asn_prepend_count": 2,
          "auto_advertise_withdraw": true
        }'
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```

## Domain Types

### BGP Prefix

- `BGPPrefix object { id, asn, asn_prepend_count, 6 more }`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

# Advertisement Status

## Get Advertisement Status

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status`

View the current advertisement state for a prefix.

**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing
subnets of an IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/status \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Prefix Dynamic Advertisement Status

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status`

Advertise or withdraw the BGP route for a prefix.

**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing
subnets of an IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `advertised: boolean`

  Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
  `false`, the BGP route is withdrawn.

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

- `result: optional object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/status \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "advertised": true
        }'
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
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Advertisement Status Get Response

- `AdvertisementStatusGetResponse object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Advertisement Status Edit Response

- `AdvertisementStatusEditResponse object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

# Delegations

## List Prefix Delegations

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations`

List all delegations for a given account IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of Delegations`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "d933b1530bc56c9953cf8ce166da8004",
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Create Prefix Delegation

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations`

Create a new account delegation for a given IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `delegated_account_id: string`

  Account identifier for the account to which prefix is being delegated.

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

- `result: optional Delegations`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24",
          "delegated_account_id": "b1946ac92492d2347c6235b4d2611184"
        }'
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
  }
}
```

## Delete Prefix Delegation

**delete** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations/{delegation_id}`

Delete an account delegation for a given IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `delegation_id: string`

  Identifier of a Delegation.

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

- `result: optional object { id }`

  - `id: optional string`

    Identifier of a Delegation.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations/$DELEGATION_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "d933b1530bc56c9953cf8ce166da8004"
  }
}
```

## Domain Types

### Delegations

- `Delegations object { id, cidr, created_at, 3 more }`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

### Delegation Delete Response

- `DelegationDeleteResponse object { id }`

  - `id: optional string`

    Identifier of a Delegation.
