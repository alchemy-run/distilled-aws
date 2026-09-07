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
