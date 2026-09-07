# Origin TLS Compliance Modes

## Get Origin TLS Compliance Modes setting

**get** `/zones/{zone_id}/settings/origin_tls_compliance_modes`

Origin TLS Compliance Modes constrains the set of TLS key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. The value is a list of named compliance modes (currently `fips` and `pqh`). Multiple modes are combined as the intersection of their permitted algorithm lists. An empty list (or no rule configured) means no compliance constraint is applied.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: array of string`

    List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/origin_tls_compliance_modes \
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
    "id": "origin_tls_compliance_modes",
    "editable": true,
    "value": [
      "fips",
      "pqh"
    ],
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Replace Origin TLS Compliance Modes setting

**put** `/zones/{zone_id}/settings/origin_tls_compliance_modes`

Replace the entire set of TLS compliance modes for the zone with the list provided in the request body. PUT performs a full replace, not a merge — any modes not present in the request body are removed. The request body must be of the form `{"value": ["fips", "pqh"]}`. Currently supported modes are `fips` and `pqh`; an empty list clears the constraint. Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Invalid mode values are rejected with a 4xx response.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: array of string`

  List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: array of string`

    List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/origin_tls_compliance_modes \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": [
            "fips",
            "pqh"
          ]
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
    "id": "origin_tls_compliance_modes",
    "editable": true,
    "value": [
      "fips",
      "pqh"
    ],
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Change Origin TLS Compliance Modes setting

**patch** `/zones/{zone_id}/settings/origin_tls_compliance_modes`

Update the set of TLS compliance modes for the zone. PATCH performs a full replace of the modes list, not a merge — the request body is treated as the complete new list, and any modes not present in it are removed. (To remove a single mode from an existing configuration, send the updated list without it.) The request body must be of the form `{"value": ["fips", "pqh"]}`. Currently supported modes are `fips` and `pqh`; an empty list clears the constraint. Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Invalid mode values are rejected with a 4xx response.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: array of string`

  List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: array of string`

    List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/origin_tls_compliance_modes \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": [
            "fips",
            "pqh"
          ]
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
    "id": "origin_tls_compliance_modes",
    "editable": true,
    "value": [
      "fips",
      "pqh"
    ],
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Origin TLS Compliance Modes setting

**delete** `/zones/{zone_id}/settings/origin_tls_compliance_modes`

Delete the Origin TLS Compliance Modes setting for the zone, removing any configured compliance constraint. After deletion, Cloudflare's default behavior applies (no compliance filtering of the key-exchange algorithm list sent to the origin).

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/origin_tls_compliance_modes \
    -X DELETE \
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
    "id": "origin_tls_compliance_modes",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Origin TLS Compliance Mode Get Response

- `OriginTLSComplianceModeGetResponse object { id, editable, value, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: array of string`

    List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

  - `modified_on: optional string`

    Last time this setting was modified.

### Origin TLS Compliance Mode Update Response

- `OriginTLSComplianceModeUpdateResponse object { id, editable, value, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: array of string`

    List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

  - `modified_on: optional string`

    Last time this setting was modified.

### Origin TLS Compliance Mode Edit Response

- `OriginTLSComplianceModeEditResponse object { id, editable, value, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: array of string`

    List of TLS compliance modes that constrain the key-exchange algorithms Cloudflare may use when establishing the TLS connection to the zone's origin. Currently supported values are `fips` (FIPS-approved curves) and `pqh` (post-quantum hybrid). Future modes (e.g. `cnsa2`) may be added; clients should treat unknown values as opaque strings. Multiple modes are combined as the intersection of their permitted algorithm lists; selections whose intersection is empty are rejected. An empty list clears the constraint.

  - `modified_on: optional string`

    Last time this setting was modified.

### Origin TLS Compliance Mode Delete Response

- `OriginTLSComplianceModeDeleteResponse object { id, editable, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.
