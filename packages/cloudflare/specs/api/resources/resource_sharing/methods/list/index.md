## List account shares

**get** `/accounts/{account_id}/shares`

Lists all account shares.

### Path Parameters

- `account_id: string`

  Account identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to sort objects.

  - `"asc"`

  - `"desc"`

- `include_recipient_counts: optional boolean`

  Include recipient counts in the response.

- `include_resources: optional boolean`

  Include resources in the response.

- `kind: optional "sent" or "received"`

  Filter shares by kind.

  - `"sent"`

  - `"received"`

- `order: optional "name" or "created"`

  Order shares by values in the given field.

  - `"name"`

  - `"created"`

- `page: optional number`

  Page number. Defaults to `1` when `per_page` is supplied without
  `page`. May be omitted entirely along with `per_page` to receive a
  non-paginated response.

- `per_page: optional number`

  Number of objects to return per page. Defaults to `20` when `page`
  is supplied without `per_page`. May be omitted entirely along with
  `page` to receive a non-paginated response.

- `resource_types: optional array of "custom-ruleset" or "gateway-policy" or "gateway-destination-ip" or 3 more`

  Filter share resources by resource_types.

  - `"custom-ruleset"`

  - `"gateway-policy"`

  - `"gateway-destination-ip"`

  - `"gateway-block-page-settings"`

  - `"gateway-extended-email-matching"`

  - `"idp-federation-grant"`

- `status: optional "active" or "deleting" or "deleted"`

  Filter shares by status.

  - `"active"`

  - `"deleting"`

  - `"deleted"`

- `tag: optional array of string`

  Filter shares by tag. Each value is either `key=value` (matches shares whose tags contain that key/value pair) or `key` alone (matches shares that have any value for that key). May be repeated; multiple `tag` parameters are ANDed together. Maximum 20 `tag` parameters per request.

- `target_type: optional "account" or "organization"`

  Filter shares by target_type.

  - `"account"`

  - `"organization"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional array of object { id, account_id, account_name, 12 more }`

  - `id: string`

    Share identifier tag.

  - `account_id: string`

    Account identifier.

  - `account_name: string`

    The display name of an account.

  - `created: string`

    When the share was created.

  - `modified: string`

    When the share was modified.

  - `name: string`

    The name of the share.

  - `organization_id: string`

    Organization identifier.

  - `status: "active" or "deleting" or "deleted"`

    - `"active"`

    - `"deleting"`

    - `"deleted"`

  - `target_type: "account" or "organization"`

    - `"account"`

    - `"organization"`

  - `associated_recipient_count: optional number`

    The number of recipients in the 'associated' state. This field is only included when requested via the 'include_recipient_counts' parameter.

  - `associating_recipient_count: optional number`

    The number of recipients in the 'associating' state. This field is only included when requested via the 'include_recipient_counts' parameter.

  - `disassociated_recipient_count: optional number`

    The number of recipients in the 'disassociated' state. This field is only included when requested via the 'include_recipient_counts' parameter.

  - `disassociating_recipient_count: optional number`

    The number of recipients in the 'disassociating' state. This field is only included when requested via the 'include_recipient_counts' parameter.

  - `kind: optional "sent" or "received"`

    - `"sent"`

    - `"received"`

  - `resources: optional array of object { id, created, meta, 6 more }`

    A list of resources that are part of the share. This field is only included when requested via the 'include_resources' parameter.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares \
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
      "account_name": "Account A",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "My Shared WAF Managed Rule",
      "organization_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "status": "active",
      "target_type": "account",
      "associated_recipient_count": 10,
      "associating_recipient_count": 1,
      "disassociated_recipient_count": 0,
      "disassociating_recipient_count": 0,
      "kind": "sent",
      "resources": [
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
