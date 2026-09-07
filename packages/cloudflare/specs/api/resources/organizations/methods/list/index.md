## List organizations the user has access to

**get** `/organizations`

Retrieve a list of organizations a particular user has access to. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Query Parameters

- `id: optional array of string`

  Only return organizations with the specified IDs (ex. id=foo&id=bar). Send multiple elements
  by repeating the query value.

- `containing: optional object { account, organization, user }`

  - `account: optional string`

    Filter the list of organizations to the ones that contain this particular
    account.

  - `organization: optional string`

    Filter the list of organizations to the ones that contain this particular
    organization.

  - `user: optional string`

    Filter the list of organizations to the ones that contain this particular
    user.

    IMPORTANT: Just because an organization "contains" a user is not a
    representation of any authorization or privilege to manage any resources
    therein. An organization "containing" a user simply means the user is managed by
    that organization.

- `name: optional object { contains, endsWith, startsWith }`

  - `contains: optional string`

    (case-insensitive) Filter the list of organizations to where the name contains a particular
    string.

  - `endsWith: optional string`

    (case-insensitive) Filter the list of organizations to where the name ends with a particular
    string.

  - `startsWith: optional string`

    (case-insensitive) Filter the list of organizations to where the name starts with a
    particular string.

- `page_size: optional number`

  The amount of items to return. Defaults to 10.

- `page_token: optional string`

  An opaque token returned from the last list response that when
  provided will retrieve the next page.

  Parameters used to filter the retrieved list must remain in subsequent
  requests with a page token.

- `parent: optional object { id }`

  - `id: optional string or "null"`

    Filter the list of organizations to the ones that are a sub-organization
    of the specified organization.

    "null" is a valid value to provide for this parameter. It means "where
    an organization has no parent (i.e. it is a 'root' organization)."

    - `OrganizationsAPIOrganizationID = string`

    - `"null"`

      Filter the list of organizations to the ones that are a sub-organization
      of the specified organization.

      "null" is a valid value to provide for this parameter. It means "where
      an organization has no parent (i.e. it is a 'root' organization)."

      - `"null"`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of Organization`

  - `id: string`

  - `create_time: string`

  - `meta: object { flags, hierarchy_tags, managed_by }`

    - `flags: optional object { account_creation, account_deletion, account_migration, 2 more }`

      Enable features for Organizations.

      - `account_creation: string`

      - `account_deletion: string`

      - `account_migration: string`

      - `account_mobility: string`

      - `sub_org_creation: string`

    - `hierarchy_tags: optional array of string`

      Ordered chain of organization tags from the root organization down to
      (and including) this organization itself. Root organizations return a
      single-element array containing their own tag; sub-organizations return
      `[rootTag, ...intermediateTags, parentTag, selfTag]`. Useful for
      constructing authorization scopes that need to cover every ancestor
      in the hierarchy.

    - `managed_by: optional string`

  - `name: string`

  - `parent: optional object { id, name }`

    - `id: string`

    - `name: string`

  - `profile: optional AccountProfile`

    - `business_address: string`

    - `business_email: string`

    - `business_name: string`

    - `business_phone: string`

    - `external_metadata: string`

- `result_info: object { next_page_token, total_size }`

  - `next_page_token: optional string`

    Use this opaque token in the next request to retrieve the
    next page.

    Parameters used to filter the retrieved list must remain in subsequent
    requests with a page token.

  - `total_size: optional number`

    Counts the total amount of items in a list with the applied filters. The API omits next_page_token to indicate no more items in a particular list.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
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
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "flags": {
          "account_creation": "account_creation",
          "account_deletion": "account_deletion",
          "account_migration": "account_migration",
          "account_mobility": "account_mobility",
          "sub_org_creation": "sub_org_creation"
        },
        "hierarchy_tags": [
          "string"
        ],
        "managed_by": "managed_by"
      },
      "name": "name",
      "parent": {
        "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
        "name": "name"
      },
      "profile": {
        "business_address": "business_address",
        "business_email": "business_email",
        "business_name": "business_name",
        "business_phone": "business_phone",
        "external_metadata": "external_metadata"
      }
    }
  ],
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```
