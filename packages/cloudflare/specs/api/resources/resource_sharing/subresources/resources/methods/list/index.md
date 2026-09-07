## List share resources by share ID

**get** `/accounts/{account_id}/shares/{share_id}/resources`

List share resources by share ID.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Query Parameters

- `page: optional number`

  Page number. Defaults to `1` when `per_page` is supplied without
  `page`. May be omitted entirely along with `per_page` to receive a
  non-paginated response.

- `per_page: optional number`

  Number of objects to return per page. Defaults to `20` when `page`
  is supplied without `per_page`. May be omitted entirely along with
  `page` to receive a non-paginated response.

- `resource_type: optional "custom-ruleset" or "gateway-policy" or "gateway-destination-ip" or 3 more`

  Filter share resources by resource_type.

  - `"custom-ruleset"`

  - `"gateway-policy"`

  - `"gateway-destination-ip"`

  - `"gateway-block-page-settings"`

  - `"gateway-extended-email-matching"`

  - `"idp-federation-grant"`

- `status: optional "active" or "deleting" or "deleted"`

  Filter share resources by status.

  - `"active"`

  - `"deleting"`

  - `"deleted"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional array of object { id, created, meta, 6 more }`

  - `id: string`

    Share Resource identifier.

  - `created: string`

    When the share was created.

  - `meta: unknown`

    Resource Metadata.

  - `modified: string`

    When the share was modified.

  - `resource_account_id: string`

    Account identifier.

  - `resource_id: string`

    Share Resource identifier.

  - `resource_type: "custom-ruleset" or "gateway-policy" or "gateway-destination-ip" or 3 more`

    Resource Type.

    - `"custom-ruleset"`

    - `"gateway-policy"`

    - `"gateway-destination-ip"`

    - `"gateway-block-page-settings"`

    - `"gateway-extended-email-matching"`

    - `"idp-federation-grant"`

  - `resource_version: number`

    Resource Version.

  - `status: "active" or "deleting" or "deleted"`

    Resource Status.

    - `"active"`

    - `"deleting"`

    - `"deleted"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/resources \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created": "2023-09-21T18:56:32.624632Z",
      "meta": {},
      "modified": "2023-09-21T18:56:32.624632Z",
      "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "resource_type": "custom-ruleset",
      "resource_version": 0,
      "status": "active"
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
