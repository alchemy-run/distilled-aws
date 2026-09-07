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
