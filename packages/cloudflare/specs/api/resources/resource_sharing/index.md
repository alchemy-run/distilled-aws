# Resource Sharing

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

## Get account share by ID

**get** `/accounts/{account_id}/shares/{share_id}`

Fetches share by ID.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Query Parameters

- `include_recipient_counts: optional boolean`

  Include recipient counts in the response.

- `include_resources: optional boolean`

  Include resources in the response.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, account_name, 12 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID \
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
  "result": {
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
}
```

## Create a new share

**post** `/accounts/{account_id}/shares`

Creates a new resource share for sharing Cloudflare resources with other accounts or organizations.

### Path Parameters

- `account_id: string`

  Account identifier.

### Body Parameters

- `name: string`

  The name of the share.

- `recipients: array of object { account_id, organization_id, recipient_account_id }`

  - `account_id: optional string`

    Deprecated alias for `recipient_account_id`. Use `recipient_account_id` instead.
    The body field collided with the URL path parameter of the same name, which prevented SDK generators from distinguishing the source account (in the URL) from the recipient account (in the body). Both names will continue to be accepted until 2027-05-26 (see `x-sunset`).

  - `organization_id: optional string`

    Organization identifier.

  - `recipient_account_id: optional string`

    The account that will receive the share.

- `resources: array of object { meta, resource_account_id, resource_id, resource_type }`

  - `meta: unknown`

    Resource Metadata.

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

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, account_name, 12 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "My Shared WAF Managed Rule",
          "recipients": [
            {}
          ],
          "resources": [
            {
              "meta": {},
              "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
              "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
              "resource_type": "custom-ruleset"
            }
          ]
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
  "success": true,
  "result": {
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
}
```

## Update a share

**put** `/accounts/{account_id}/shares/{share_id}`

Updating is not immediate, an updated share object with a new status will be returned.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Body Parameters

- `name: string`

  The name of the share.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, account_name, 12 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "My Shared WAF Managed Rule"
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
  "success": true,
  "result": {
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
}
```

## Delete a share

**delete** `/accounts/{account_id}/shares/{share_id}`

Deletion is not immediate, an updated share object with a new status will be returned.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, account_name, 12 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID \
    -X DELETE \
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
  "result": {
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
}
```

## Domain Types

### Resource Sharing List Response

- `ResourceSharingListResponse object { id, account_id, account_name, 12 more }`

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

### Resource Sharing Get Response

- `ResourceSharingGetResponse object { id, account_id, account_name, 12 more }`

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

### Resource Sharing Create Response

- `ResourceSharingCreateResponse object { id, account_id, account_name, 12 more }`

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

### Resource Sharing Update Response

- `ResourceSharingUpdateResponse object { id, account_id, account_name, 12 more }`

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

### Resource Sharing Delete Response

- `ResourceSharingDeleteResponse object { id, account_id, account_name, 12 more }`

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

# Recipients

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

## Get share recipient by ID

**get** `/accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}`

Get share recipient by ID.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

- `recipient_id: string`

  Share Recipient identifier tag.

### Query Parameters

- `include_resources: optional boolean`

  Include resources in the response.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, association_status, 3 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/recipients/$RECIPIENT_ID \
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
  "result": {
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
}
```

## Create a new share recipient

**post** `/accounts/{account_id}/shares/{share_id}/recipients`

Adds a recipient to a resource share, granting them access to the shared resources.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Body Parameters

- `account_id: optional string`

  Deprecated alias for `recipient_account_id`. Use `recipient_account_id` instead.
  The body field collided with the URL path parameter of the same name, which prevented SDK generators from distinguishing the source account (in the URL) from the recipient account (in the body). Both names will continue to be accepted until 2027-05-26 (see `x-sunset`).

- `organization_id: optional string`

  Organization identifier.

- `recipient_account_id: optional string`

  The account that will receive the share.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, association_status, 3 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/recipients \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "organization_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "recipient_account_id": "023e105f4ecef8ad9ca31a8372d0c353"
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
  "success": true,
  "result": {
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
}
```

## Delete a share recipient

**delete** `/accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}`

Deletion is not immediate, an updated share recipient object with a new status will be returned.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

- `recipient_id: string`

  Share Recipient identifier tag.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, account_id, association_status, 3 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/recipients/$RECIPIENT_ID \
    -X DELETE \
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
  "result": {
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
}
```

## Domain Types

### Recipient List Response

- `RecipientListResponse object { id, account_id, association_status, 3 more }`

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

### Recipient Get Response

- `RecipientGetResponse object { id, account_id, association_status, 3 more }`

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

### Recipient Create Response

- `RecipientCreateResponse object { id, account_id, association_status, 3 more }`

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

### Recipient Delete Response

- `RecipientDeleteResponse object { id, account_id, association_status, 3 more }`

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

# Resources

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

## Get share resource by ID

**get** `/accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}`

Get share resource by ID.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

- `share_resource_id: string`

  Share Resource identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, created, meta, 6 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/resources/$SHARE_RESOURCE_ID \
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
  "result": {
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
}
```

## Create a new share resource

**post** `/accounts/{account_id}/shares/{share_id}/resources`

Adds a resource to an existing share, making it available to share recipients.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Body Parameters

- `meta: unknown`

  Resource Metadata.

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

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, created, meta, 6 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/resources \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "meta": {},
          "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_type": "custom-ruleset"
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
  "success": true,
  "result": {
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
}
```

## Update a share resource

**put** `/accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}`

Update is not immediate, an updated share resource object with a new status will be returned.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

- `share_resource_id: string`

  Share Resource identifier.

### Body Parameters

- `meta: unknown`

  Resource Metadata.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, created, meta, 6 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/resources/$SHARE_RESOURCE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "meta": {}
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
  "success": true,
  "result": {
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
}
```

## Delete a share resource

**delete** `/accounts/{account_id}/shares/{share_id}/resources/{share_resource_id}`

Deletion is not immediate, an updated share resource object with a new status will be returned.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

- `share_resource_id: string`

  Share Resource identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, created, meta, 6 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/resources/$SHARE_RESOURCE_ID \
    -X DELETE \
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
  "result": {
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
}
```

## Domain Types

### Resource List Response

- `ResourceListResponse object { id, created, meta, 6 more }`

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

### Resource Get Response

- `ResourceGetResponse object { id, created, meta, 6 more }`

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

### Resource Create Response

- `ResourceCreateResponse object { id, created, meta, 6 more }`

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

### Resource Update Response

- `ResourceUpdateResponse object { id, created, meta, 6 more }`

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

### Resource Delete Response

- `ResourceDeleteResponse object { id, created, meta, 6 more }`

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
