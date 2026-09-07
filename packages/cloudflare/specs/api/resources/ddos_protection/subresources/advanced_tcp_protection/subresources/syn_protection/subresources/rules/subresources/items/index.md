# Items

## Get SYN Protection rule.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}`

Get a SYN Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

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

- `result: optional object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules/$RULE_ID \
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mitigation_type": "mitigation_type",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Update SYN Protection rule.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}`

Update a SYN Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Body Parameters

- `burst_sensitivity: optional string`

  The new burst sensitivity. Optional. Must be one of 'low', 'medium', 'high'.

- `mitigation_type: optional string`

  The new mitigation type. Optional. Must be one of 'challenge' or 'retransmit'.

- `mode: optional string`

  The new mode for SYN Protection. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

- `rate_sensitivity: optional string`

  The new rate sensitivity. Optional. Must be one of 'low', 'medium', 'high'.

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

- `result: optional object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mitigation_type": "mitigation_type",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```

## Delete SYN Protection rule.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}`

Delete a SYN Protection rule specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `rule_id: string`

  UUID.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules/$RULE_ID \
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
  "success": true
}
```

## Domain Types

### Item Get Response

- `ItemGetResponse object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Item Edit Response

- `ItemEditResponse object { id, burst_sensitivity, created_on, 6 more }`

  - `id: string`

    The unique ID of the SYN Protection rule.

  - `burst_sensitivity: string`

    The burst sensitivity. Must be one of 'low', 'medium', 'high'.

  - `created_on: string`

    The creation timestamp of the SYN Protection rule.

  - `mitigation_type: string`

    The type of mitigation for SYN Protection. Must be one of 'challenge' or 'retransmit'.

  - `mode: string`

    The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the SYN Protection rule.

  - `name: string`

    The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

  - `rate_sensitivity: string`

    The rate sensitivity. Must be one of 'low', 'medium', 'high'.

  - `scope: string`

    The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

### Item Delete Response

- `ItemDeleteResponse object { errors, messages, success }`

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
