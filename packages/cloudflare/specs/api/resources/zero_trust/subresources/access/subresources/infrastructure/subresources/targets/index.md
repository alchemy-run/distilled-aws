# Targets

## List all targets

**get** `/accounts/{account_id}/infrastructure/targets`

Lists and sorts an account’s targets. Filters are optional and are ANDed
together.

### Path Parameters

- `account_id: string`

  Account identifier

### Query Parameters

- `created_after: optional string`

  Date and time at which the target was created after (inclusive)

- `created_before: optional string`

  Date and time at which the target was created before (inclusive)

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `hostname: optional string`

  Hostname of a target

- `hostname_contains: optional string`

  Partial match to the hostname of a target

- `ip_like: optional string`

  Filters for targets whose IP addresses look like the specified string.
  Supports `*` as a wildcard character

- `ip_v4: optional string`

  IPv4 address of the target

- `ip_v6: optional string`

  IPv6 address of the target

- `ips: optional array of string`

  Filters for targets that have any of the following IP addresses. Specify
  `ips` multiple times in query parameter to build list of candidates.

- `ipv4_end: optional string`

  Defines an IPv4 filter range's ending value (inclusive). Requires
  `ipv4_start` to be specified as well.

- `ipv4_start: optional string`

  Defines an IPv4 filter range's starting value (inclusive). Requires
  `ipv4_end` to be specified as well.

- `ipv6_end: optional string`

  Defines an IPv6 filter range's ending value (inclusive). Requires
  `ipv6_start` to be specified as well.

- `ipv6_start: optional string`

  Defines an IPv6 filter range's starting value (inclusive). Requires
  `ipv6_end` to be specified as well.

- `modified_after: optional string`

  Date and time at which the target was modified after (inclusive)

- `modified_before: optional string`

  Date and time at which the target was modified before (inclusive)

- `order: optional "hostname" or "created_at"`

  The field to sort by.

  - `"hostname"`

  - `"created_at"`

- `page: optional number`

  Current page in the response

- `per_page: optional number`

  Max amount of entries returned per page

- `target_ids: optional array of string`

  Filters for targets that have any of the following UUIDs. Specify
  `target_ids` multiple times in query parameter to build list of
  candidates.

- `virtual_network_id: optional string`

  Private virtual network identifier of the target

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

- `result: optional array of object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-08-24T14:15:22Z",
      "hostname": "infra-access-target",
      "ip": {
        "ipv4": {
          "ip_addr": "187.26.29.249",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        },
        "ipv6": {
          "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        }
      },
      "modified_at": "2019-08-24T14:15:22Z"
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

## Get target

**get** `/accounts/{account_id}/infrastructure/targets/{target_id}`

Get target

### Path Parameters

- `account_id: string`

  Account identifier

- `target_id: string`

  Target identifier

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

- `result: optional object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/$TARGET_ID \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-08-24T14:15:22Z",
    "hostname": "infra-access-target",
    "ip": {
      "ipv4": {
        "ip_addr": "187.26.29.249",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      },
      "ipv6": {
        "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      }
    },
    "modified_at": "2019-08-24T14:15:22Z"
  }
}
```

## Create new target

**post** `/accounts/{account_id}/infrastructure/targets`

Create new target

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `hostname: string`

  A non-unique field that refers to a target. Case insensitive, maximum
  length of 255 characters, supports the use of special characters dash
  and period, does not support spaces, and must start and end with an
  alphanumeric character.

- `ip: object { ipv4, ipv6 }`

  The IPv4/IPv6 address that identifies where to reach a target

  - `ipv4: optional object { ip_addr, virtual_network_id }`

    The target's IPv4 address

    - `ip_addr: optional string`

      IP address of the target

    - `virtual_network_id: optional string`

      (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `ipv6: optional object { ip_addr, virtual_network_id }`

    The target's IPv6 address

    - `ip_addr: optional string`

      IP address of the target

    - `virtual_network_id: optional string`

      (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

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

- `result: optional object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "infra-access-target",
          "ip": {}
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-08-24T14:15:22Z",
    "hostname": "infra-access-target",
    "ip": {
      "ipv4": {
        "ip_addr": "187.26.29.249",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      },
      "ipv6": {
        "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      }
    },
    "modified_at": "2019-08-24T14:15:22Z"
  }
}
```

## Update target

**put** `/accounts/{account_id}/infrastructure/targets/{target_id}`

Update target

### Path Parameters

- `account_id: string`

  Account identifier

- `target_id: string`

  Target identifier

### Body Parameters

- `hostname: string`

  A non-unique field that refers to a target. Case insensitive, maximum
  length of 255 characters, supports the use of special characters dash
  and period, does not support spaces, and must start and end with an
  alphanumeric character.

- `ip: object { ipv4, ipv6 }`

  The IPv4/IPv6 address that identifies where to reach a target

  - `ipv4: optional object { ip_addr, virtual_network_id }`

    The target's IPv4 address

    - `ip_addr: optional string`

      IP address of the target

    - `virtual_network_id: optional string`

      (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `ipv6: optional object { ip_addr, virtual_network_id }`

    The target's IPv6 address

    - `ip_addr: optional string`

      IP address of the target

    - `virtual_network_id: optional string`

      (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

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

- `result: optional object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/$TARGET_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "infra-access-target",
          "ip": {}
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-08-24T14:15:22Z",
    "hostname": "infra-access-target",
    "ip": {
      "ipv4": {
        "ip_addr": "187.26.29.249",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      },
      "ipv6": {
        "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
        "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
      }
    },
    "modified_at": "2019-08-24T14:15:22Z"
  }
}
```

## Delete target

**delete** `/accounts/{account_id}/infrastructure/targets/{target_id}`

Delete target

### Path Parameters

- `account_id: string`

  Account identifier

- `target_id: string`

  Target identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/$TARGET_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Create new targets

**put** `/accounts/{account_id}/infrastructure/targets/batch`

Adds one or more targets.

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `body: array of object { hostname, ip }`

  - `hostname: string`

    A non-unique field that refers to a target. Case insensitive, maximum
    length of 255 characters, supports the use of special characters dash
    and period, does not support spaces, and must start and end with an
    alphanumeric character.

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

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

- `result: optional array of object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/batch \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "hostname": "infra-access-target",
            "ip": {
              "ipv4": {
                "ip_addr": "187.26.29.249",
                "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
              },
              "ipv6": {
                "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
                "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
              }
            }
          }
        ]'
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-08-24T14:15:22Z",
      "hostname": "infra-access-target",
      "ip": {
        "ipv4": {
          "ip_addr": "187.26.29.249",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        },
        "ipv6": {
          "ip_addr": "64c0:64e8:f0b4:8dbf:7104:72b0:ec8f:f5e0",
          "virtual_network_id": "c77b744e-acc8-428f-9257-6878c046ed55"
        }
      },
      "modified_at": "2019-08-24T14:15:22Z"
    }
  ]
}
```

## Delete targets (Deprecated)

**delete** `/accounts/{account_id}/infrastructure/targets/batch`

Removes one or more targets.

### Path Parameters

- `account_id: string`

  Account identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Delete targets

**post** `/accounts/{account_id}/infrastructure/targets/batch_delete`

Removes one or more targets.

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `target_ids: array of string`

  List of target IDs to bulk delete

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/infrastructure/targets/batch_delete \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "target_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ]
        }'
```

## Domain Types

### Target List Response

- `TargetListResponse object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Target Get Response

- `TargetGetResponse object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Target Create Response

- `TargetCreateResponse object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Target Update Response

- `TargetUpdateResponse object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified

### Target Bulk Update Response

- `TargetBulkUpdateResponse object { id, created_at, hostname, 2 more }`

  - `id: string`

    Target identifier

  - `created_at: string`

    Date and time at which the target was created

  - `hostname: string`

    A non-unique field that refers to a target

  - `ip: object { ipv4, ipv6 }`

    The IPv4/IPv6 address that identifies where to reach a target

    - `ipv4: optional object { ip_addr, virtual_network_id }`

      The target's IPv4 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

    - `ipv6: optional object { ip_addr, virtual_network_id }`

      The target's IPv6 address

      - `ip_addr: optional string`

        IP address of the target

      - `virtual_network_id: optional string`

        (optional) Private virtual network identifier for the target. If omitted, the default virtual network ID will be used.

  - `modified_at: string`

    Date and time at which the target was modified
