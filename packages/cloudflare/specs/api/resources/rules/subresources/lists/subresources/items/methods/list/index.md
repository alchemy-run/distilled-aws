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
