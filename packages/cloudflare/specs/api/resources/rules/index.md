# Rules Lists

# Lists

## Get lists

**get** `/accounts/{account_id}/rules/lists`

Fetches all lists in the account.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

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

- `result: array of ListsList`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists \
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
  "result": [
    {
      "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
      "created_on": "2020-01-01T08:00:00Z",
      "kind": "ip",
      "modified_on": "2020-01-10T14:00:00Z",
      "name": "list1",
      "num_items": 10,
      "num_referencing_filters": 2,
      "description": "This is a note"
    }
  ],
  "success": true
}
```

## Get a list

**get** `/accounts/{account_id}/rules/lists/{list_id}`

Fetches the details of a list.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

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

- `result: object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID \
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
  "result": {
    "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
    "created_on": "2020-01-01T08:00:00Z",
    "kind": "ip",
    "modified_on": "2020-01-10T14:00:00Z",
    "name": "list1",
    "num_items": 10,
    "num_referencing_filters": 2,
    "description": "This is a note"
  },
  "success": true
}
```

## Create a list

**post** `/accounts/{account_id}/rules/lists`

Creates a new list of the specified kind.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

### Body Parameters

- `kind: "ip" or "redirect" or "hostname" or "asn"`

  The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

  - `"ip"`

  - `"redirect"`

  - `"hostname"`

  - `"asn"`

- `name: string`

  An informative name for the list. Use this name in filter and rule expressions.

- `description: optional string`

  An informative summary of the list.

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

- `result: object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "kind": "ip",
          "name": "list1",
          "description": "This is a note"
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
  "result": {
    "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
    "created_on": "2020-01-01T08:00:00Z",
    "kind": "ip",
    "modified_on": "2020-01-10T14:00:00Z",
    "name": "list1",
    "num_items": 10,
    "num_referencing_filters": 2,
    "description": "This is a note"
  },
  "success": true
}
```

## Update a list

**put** `/accounts/{account_id}/rules/lists/{list_id}`

Updates the description of a list.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

### Body Parameters

- `description: optional string`

  An informative summary of the list.

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

- `result: object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "This is a note"
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
  "result": {
    "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
    "created_on": "2020-01-01T08:00:00Z",
    "kind": "ip",
    "modified_on": "2020-01-10T14:00:00Z",
    "name": "list1",
    "num_items": 10,
    "num_referencing_filters": 2,
    "description": "This is a note"
  },
  "success": true
}
```

## Delete a list

**delete** `/accounts/{account_id}/rules/lists/{list_id}`

Deletes a specific list and all its items.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

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

- `result: object { id }`

  - `id: string`

    The unique ID of the list.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID \
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
  "result": {
    "id": "2c0fc9fa937b11eaa1b71c4d701ab86e"
  },
  "success": true
}
```

## Domain Types

### Hostname

- `Hostname object { url_hostname, exclude_exact_hostname }`

  Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

  - `url_hostname: string`

  - `exclude_exact_hostname: optional boolean`

    Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

### Lists List

- `ListsList object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

### Redirect

- `Redirect object { source_url, target_url, include_subdomains, 4 more }`

  The definition of the redirect.

  - `source_url: string`

  - `target_url: string`

  - `include_subdomains: optional boolean`

  - `preserve_path_suffix: optional boolean`

  - `preserve_query_string: optional boolean`

  - `status_code: optional 301 or 302 or 307 or 308`

    - `301`

    - `302`

    - `307`

    - `308`

  - `subpath_matching: optional boolean`

### List Get Response

- `ListGetResponse object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

### List Create Response

- `ListCreateResponse object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

### List Update Response

- `ListUpdateResponse object { id, created_on, kind, 5 more }`

  - `id: string`

    The unique ID of the list.

  - `created_on: string`

    The RFC 3339 timestamp of when the list was created.

  - `kind: "ip" or "redirect" or "hostname" or "asn"`

    The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

    - `"ip"`

    - `"redirect"`

    - `"hostname"`

    - `"asn"`

  - `modified_on: string`

    The RFC 3339 timestamp of when the list was last modified.

  - `name: string`

    An informative name for the list. Use this name in filter and rule expressions.

  - `num_items: number`

    The number of items in the list.

  - `num_referencing_filters: number`

    The number of [filters](/api/resources/filters/) referencing the list.

  - `description: optional string`

    An informative summary of the list.

### List Delete Response

- `ListDeleteResponse object { id }`

  - `id: string`

    The unique ID of the list.

# Bulk Operations

## Get bulk operation status

**get** `/accounts/{account_id}/rules/lists/bulk_operations/{operation_id}`

Gets the current status of an asynchronous operation on a list.

The `status` property can have one of the following values: `pending`, `running`, `completed`, or `failed`. If the status is `failed`, the `error` property will contain a message describing the error.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `operation_id: string`

  The unique operation ID of the asynchronous action.

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

- `result: object { id, status }  or object { id, completed, status }  or object { id, completed, error, status }`

  - `ListsBulkOperationPendingOrRunning object { id, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `status: "pending" or "running"`

      The current status of the asynchronous operation.

      - `"pending"`

      - `"running"`

  - `ListsBulkOperationCompleted object { id, completed, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `completed: string`

      The RFC 3339 timestamp of when the operation was completed.

    - `status: "completed"`

      The current status of the asynchronous operation.

      - `"completed"`

  - `ListsBulkOperationFailed object { id, completed, error, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `completed: string`

      The RFC 3339 timestamp of when the operation was completed.

    - `error: string`

      A message describing the error when the status is `failed`.

    - `status: "failed"`

      The current status of the asynchronous operation.

      - `"failed"`

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/bulk_operations/$OPERATION_ID \
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
  "result": {
    "id": "4da8780eeb215e6cb7f48dd981c4ea02",
    "status": "pending"
  },
  "success": true
}
```

## Domain Types

### Bulk Operation Get Response

- `BulkOperationGetResponse = object { id, status }  or object { id, completed, status }  or object { id, completed, error, status }`

  - `ListsBulkOperationPendingOrRunning object { id, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `status: "pending" or "running"`

      The current status of the asynchronous operation.

      - `"pending"`

      - `"running"`

  - `ListsBulkOperationCompleted object { id, completed, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `completed: string`

      The RFC 3339 timestamp of when the operation was completed.

    - `status: "completed"`

      The current status of the asynchronous operation.

      - `"completed"`

  - `ListsBulkOperationFailed object { id, completed, error, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `completed: string`

      The RFC 3339 timestamp of when the operation was completed.

    - `error: string`

      A message describing the error when the status is `failed`.

    - `status: "failed"`

      The current status of the asynchronous operation.

      - `"failed"`

# Items

## Get list items

**get** `/accounts/{account_id}/rules/lists/{list_id}/items`

Fetches all the items in the list.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

### Query Parameters

- `cursor: optional string`

  The pagination cursor. An opaque string token indicating the position from which to continue when requesting the next/previous set of records. Cursor values are provided under `result_info.cursors` in the response. You should make no assumptions about a cursor's content or length.

- `per_page: optional number`

  Amount of results to include in each paginated response. A non-negative 32 bit integer.

- `search: optional string`

  A search query to filter returned items. Its meaning depends on the list type: IP addresses must start with the provided string, hostnames and bulk redirects must contain the string, and ASNs must match the string exactly.

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

- `result: array of object { id, created_on, ip, 2 more }  or object { id, created_on, hostname, 2 more }  or object { id, created_on, modified_on, 2 more }  or object { id, asn, created_on, 2 more }`

  - `ListsListItemIPFull object { id, created_on, ip, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `ip: string`

      An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemHostnameFull object { id, created_on, hostname, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `hostname: Hostname`

      Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

      - `url_hostname: string`

      - `exclude_exact_hostname: optional boolean`

        Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemRedirectFull object { id, created_on, modified_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `redirect: Redirect`

      The definition of the redirect.

      - `source_url: string`

      - `target_url: string`

      - `include_subdomains: optional boolean`

      - `preserve_path_suffix: optional boolean`

      - `preserve_query_string: optional boolean`

      - `status_code: optional 301 or 302 or 307 or 308`

        - `301`

        - `302`

        - `307`

        - `308`

      - `subpath_matching: optional boolean`

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemASNFull object { id, asn, created_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `asn: number`

      Defines a non-negative 32 bit integer.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { cursors }`

  - `cursors: optional ListCursor`

    - `after: optional string`

    - `before: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID/items \
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
  "result": [
    {
      "id": "34b12448945f11eaa1b71c4d701ab86e",
      "created_on": "2020-01-01T08:00:00Z",
      "ip": "10.0.0.1",
      "modified_on": "2020-01-10T14:00:00Z",
      "comment": "Private IP address"
    }
  ],
  "success": true,
  "result_info": {
    "cursors": {
      "after": "yyy",
      "before": "xxx"
    }
  }
}
```

## Get a list item

**get** `/accounts/{account_id}/rules/lists/{list_id}/items/{item_id}`

Fetches a list item in the list.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

- `item_id: string`

  Defines the unique ID of the item in the List.

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

- `result: object { id, created_on, ip, 2 more }  or object { id, created_on, hostname, 2 more }  or object { id, created_on, modified_on, 2 more }  or object { id, asn, created_on, 2 more }`

  - `ListsListItemIPFull object { id, created_on, ip, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `ip: string`

      An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemHostnameFull object { id, created_on, hostname, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `hostname: Hostname`

      Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

      - `url_hostname: string`

      - `exclude_exact_hostname: optional boolean`

        Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemRedirectFull object { id, created_on, modified_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `redirect: Redirect`

      The definition of the redirect.

      - `source_url: string`

      - `target_url: string`

      - `include_subdomains: optional boolean`

      - `preserve_path_suffix: optional boolean`

      - `preserve_query_string: optional boolean`

      - `status_code: optional 301 or 302 or 307 or 308`

        - `301`

        - `302`

        - `307`

        - `308`

      - `subpath_matching: optional boolean`

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemASNFull object { id, asn, created_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `asn: number`

      Defines a non-negative 32 bit integer.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID/items/$ITEM_ID \
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
  "result": {
    "id": "34b12448945f11eaa1b71c4d701ab86e",
    "created_on": "2020-01-01T08:00:00Z",
    "ip": "10.0.0.1",
    "modified_on": "2020-01-10T14:00:00Z",
    "comment": "Private IP address"
  },
  "success": true
}
```

## Create list items

**post** `/accounts/{account_id}/rules/lists/{list_id}/items`

Appends new items to the list.

This operation is asynchronous. To get current the operation status, invoke the `Get bulk operation status` endpoint with the returned `operation_id`.

There is a limit of 1 pending bulk operation per account. If an outstanding bulk operation is in progress, the request will be rejected.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

### Body Parameters

- `body: array of object { ip, comment }  or object { redirect, comment }  or object { hostname, comment }  or object { asn, comment }`

  - `ListsListItemIPComment object { ip, comment }`

    - `ip: string`

      An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemRedirectComment object { redirect, comment }`

    - `redirect: Redirect`

      The definition of the redirect.

      - `source_url: string`

      - `target_url: string`

      - `include_subdomains: optional boolean`

      - `preserve_path_suffix: optional boolean`

      - `preserve_query_string: optional boolean`

      - `status_code: optional 301 or 302 or 307 or 308`

        - `301`

        - `302`

        - `307`

        - `308`

      - `subpath_matching: optional boolean`

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemHostnameComment object { hostname, comment }`

    - `hostname: Hostname`

      Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

      - `url_hostname: string`

      - `exclude_exact_hostname: optional boolean`

        Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemASNComment object { asn, comment }`

    - `asn: number`

      Defines a non-negative 32 bit integer.

    - `comment: optional string`

      Defines an informative summary of the list item.

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

- `result: object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID/items \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "ip": "10.0.0.1",
            "comment": "Private IP address"
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
  "result": {
    "operation_id": "4da8780eeb215e6cb7f48dd981c4ea02"
  },
  "success": true
}
```

## Update all list items

**put** `/accounts/{account_id}/rules/lists/{list_id}/items`

Removes all existing items from the list and adds the provided items to the list.

This operation is asynchronous. To get current the operation status, invoke the `Get bulk operation status` endpoint with the returned `operation_id`.

There is a limit of 1 pending bulk operation per account. If an outstanding bulk operation is in progress, the request will be rejected.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

### Body Parameters

- `body: array of object { ip, comment }  or object { redirect, comment }  or object { hostname, comment }  or object { asn, comment }`

  - `ListsListItemIPComment object { ip, comment }`

    - `ip: string`

      An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemRedirectComment object { redirect, comment }`

    - `redirect: Redirect`

      The definition of the redirect.

      - `source_url: string`

      - `target_url: string`

      - `include_subdomains: optional boolean`

      - `preserve_path_suffix: optional boolean`

      - `preserve_query_string: optional boolean`

      - `status_code: optional 301 or 302 or 307 or 308`

        - `301`

        - `302`

        - `307`

        - `308`

      - `subpath_matching: optional boolean`

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemHostnameComment object { hostname, comment }`

    - `hostname: Hostname`

      Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

      - `url_hostname: string`

      - `exclude_exact_hostname: optional boolean`

        Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemASNComment object { asn, comment }`

    - `asn: number`

      Defines a non-negative 32 bit integer.

    - `comment: optional string`

      Defines an informative summary of the list item.

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

- `result: object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID/items \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "ip": "10.0.0.1",
            "comment": "Private IP address"
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
  "result": {
    "operation_id": "4da8780eeb215e6cb7f48dd981c4ea02"
  },
  "success": true
}
```

## Delete list items

**delete** `/accounts/{account_id}/rules/lists/{list_id}/items`

Removes one or more items from a list.

This operation is asynchronous. To get current the operation status, invoke the `Get bulk operation status` endpoint with the returned `operation_id`.

There is a limit of 1 pending bulk operation per account. If an outstanding bulk operation is in progress, the request will be rejected.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `list_id: string`

  The unique ID of the list.

### Body Parameters

- `items: optional array of object { id }`

  - `id: string`

    Defines the unique ID of the item in the List.

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

- `result: object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID/items \
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
  "result": {
    "operation_id": "4da8780eeb215e6cb7f48dd981c4ea02"
  },
  "success": true
}
```

## Domain Types

### List Cursor

- `ListCursor object { after, before }`

  - `after: optional string`

  - `before: optional string`

### List Item

- `ListItem object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.

### Item List Response

- `ItemListResponse = object { id, created_on, ip, 2 more }  or object { id, created_on, hostname, 2 more }  or object { id, created_on, modified_on, 2 more }  or object { id, asn, created_on, 2 more }`

  - `ListsListItemIPFull object { id, created_on, ip, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `ip: string`

      An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemHostnameFull object { id, created_on, hostname, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `hostname: Hostname`

      Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

      - `url_hostname: string`

      - `exclude_exact_hostname: optional boolean`

        Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemRedirectFull object { id, created_on, modified_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `redirect: Redirect`

      The definition of the redirect.

      - `source_url: string`

      - `target_url: string`

      - `include_subdomains: optional boolean`

      - `preserve_path_suffix: optional boolean`

      - `preserve_query_string: optional boolean`

      - `status_code: optional 301 or 302 or 307 or 308`

        - `301`

        - `302`

        - `307`

        - `308`

      - `subpath_matching: optional boolean`

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemASNFull object { id, asn, created_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `asn: number`

      Defines a non-negative 32 bit integer.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

### Item Get Response

- `ItemGetResponse = object { id, created_on, ip, 2 more }  or object { id, created_on, hostname, 2 more }  or object { id, created_on, modified_on, 2 more }  or object { id, asn, created_on, 2 more }`

  - `ListsListItemIPFull object { id, created_on, ip, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `ip: string`

      An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemHostnameFull object { id, created_on, hostname, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `hostname: Hostname`

      Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and the hyphen (-).

      - `url_hostname: string`

      - `exclude_exact_hostname: optional boolean`

        Only applies to wildcard hostnames (e.g., *.example.com). When true (default), only subdomains are blocked. When false, both the root domain and subdomains are blocked.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemRedirectFull object { id, created_on, modified_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `redirect: Redirect`

      The definition of the redirect.

      - `source_url: string`

      - `target_url: string`

      - `include_subdomains: optional boolean`

      - `preserve_path_suffix: optional boolean`

      - `preserve_query_string: optional boolean`

      - `status_code: optional 301 or 302 or 307 or 308`

        - `301`

        - `302`

        - `307`

        - `308`

      - `subpath_matching: optional boolean`

    - `comment: optional string`

      Defines an informative summary of the list item.

  - `ListsListItemASNFull object { id, asn, created_on, 2 more }`

    - `id: string`

      Defines the unique ID of the item in the List.

    - `asn: number`

      Defines a non-negative 32 bit integer.

    - `created_on: string`

      The RFC 3339 timestamp of when the list was created.

    - `modified_on: string`

      The RFC 3339 timestamp of when the list was last modified.

    - `comment: optional string`

      Defines an informative summary of the list item.

### Item Create Response

- `ItemCreateResponse object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.

### Item Update Response

- `ItemUpdateResponse object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.

### Item Delete Response

- `ItemDeleteResponse object { operation_id }`

  - `operation_id: string`

    The unique operation ID of the asynchronous action.
