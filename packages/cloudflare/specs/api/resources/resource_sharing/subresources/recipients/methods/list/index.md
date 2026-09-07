## List share recipients by share ID

**get** `/accounts/{account_id}/shares/{share_id}/recipients`

List share recipients by share ID.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Query Parameters

- `include_resources: optional boolean`

  Include resources in the response.

- `page: optional number`

  Page number. Defaults to `1` when `per_page` is supplied without
  `page`. May be omitted entirely along with `per_page` to receive a
  non-paginated response.

- `per_page: optional number`

  Number of objects to return per page. Defaults to `20` when `page`
  is supplied without `per_page`. May be omitted entirely along with
  `page` to receive a non-paginated response.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional array of object { id, account_id, association_status, 3 more }`

  - `id: string`

    Share Recipient identifier tag.

  - `account_id: string`

    Account identifier.

  - `association_status: "associating" or "associated" or "disassociating" or "disassociated"`

    Share Recipient association status.

    - `"associating"`

    - `"associated"`

    - `"disassociating"`

    - `"disassociated"`

  - `created: string`

    When the share was created.

  - `modified: string`

    When the share was modified.

  - `resources: optional array of object { error, resource_id, resource_version, terminal }`

    - `error: string`

      Share Recipient error message.

    - `resource_id: string`

      Share Resource identifier.

    - `resource_version: number`

      Resource Version.

    - `terminal: boolean`

      Whether the error is terminal or will be continually retried.

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

    Total number of pages using the given per page.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/recipients \
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
  "success": true,
  "result": [
    {
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "association_status": "associating",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "resources": [
        {
          "error": "Recipient is missing necessary entitlement",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_version": 0,
          "terminal": true
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 50
  }
}
```
