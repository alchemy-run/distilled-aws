# SYN Protection

# Filters

## List all SYN Protection filters.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters`

List all SYN Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `mode: optional string`

  The mode of the filters to get. Optional. Valid values: 'enabled', 'disabled', 'monitoring'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters \
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
  "result": [
    {
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z"
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

## Create a SYN Protection filter.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters`

Create a SYN Protection filter for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `expression: string`

  The filter expression.

- `mode: string`

  The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
          "mode": "mode"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete all SYN Protection filters.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters`

Delete all SYN Protection filters for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters \
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

### Filter List Response

- `FilterListResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Filter Create Response

- `FilterCreateResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Filter Bulk Delete Response

- `FilterBulkDeleteResponse object { errors, messages, success }`

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

# Items

## Get SYN Protection filter.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}`

Get a SYN Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters/$FILTER_ID \
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Update SYN Protection filter.

**patch** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}`

Update a SYN Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

  UUID.

### Body Parameters

- `expression: optional string`

  The new filter expression. Optional.

- `mode: optional string`

  The new mode for the filter. Optional. Must be one of 'enabled', 'disabled', 'monitoring'.

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

- `result: optional object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters/$FILTER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete SYN Protection filter.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}`

Delete a SYN Protection filter specified by the given UUID.

### Path Parameters

- `account_id: string`

  Identifier.

- `filter_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/filters/$FILTER_ID \
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

- `ItemGetResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

### Item Edit Response

- `ItemEditResponse object { id, created_on, expression, 2 more }`

  - `id: string`

    The unique ID of the expression filter.

  - `created_on: string`

    The creation timestamp of the expression filter.

  - `expression: string`

    The filter expression.

  - `mode: string`

    The filter's mode. Must be one of 'enabled', 'disabled', 'monitoring'.

  - `modified_on: string`

    The last modification timestamp of the expression filter.

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

# Rules

## List all SYN Protection rules.

**get** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

List all SYN Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional string`

  The direction of ordering (ASC or DESC). Defaults to 'ASC'.

- `order: optional string`

  The field to order by. Defaults to 'prefix'.

- `page: optional number`

  The page number for pagination. Defaults to 1.

- `per_page: optional number`

  The number of items per page. Must be between 10 and 1000. Defaults to 25.

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

- `result: optional array of object { id, burst_sensitivity, created_on, 6 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
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
  "result": [
    {
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

## Create SYN Protection rule.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

Create a SYN Protection rule for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `burst_sensitivity: string`

  The burst sensitivity. Must be one of 'low', 'medium', 'high'.

- `mode: string`

  The mode for SYN Protection. Must be one of 'enabled', 'disabled', 'monitoring'.

- `name: string`

  The name of the SYN Protection rule. Value is relative to the 'scope' setting. For 'global' scope, name should be 'global'. For either the 'region' or 'datacenter' scope, name should be the actual name of the region or datacenter, e.g., 'wnam' or 'lax'.

- `rate_sensitivity: string`

  The rate sensitivity. Must be one of 'low', 'medium', 'high'.

- `scope: string`

  The scope for the SYN Protection rule. Must be one of 'global', 'region', or 'datacenter'.

- `mitigation_type: optional string`

  The type of mitigation. Must be one of 'challenge' or 'retransmit'. Optional. Defaults to 'challenge'.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "burst_sensitivity": "burst_sensitivity",
          "mode": "mode",
          "name": "name",
          "rate_sensitivity": "rate_sensitivity",
          "scope": "scope"
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

## Delete all SYN Protection rules.

**delete** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules`

Delete all SYN Protection rules for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/syn_protection/rules \
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

### Rule List Response

- `RuleListResponse object { id, burst_sensitivity, created_on, 6 more }`

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

### Rule Create Response

- `RuleCreateResponse object { id, burst_sensitivity, created_on, 6 more }`

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

### Rule Bulk Delete Response

- `RuleBulkDeleteResponse object { errors, messages, success }`

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
