# Updates

## List Access SCIM update logs

**get** `/accounts/{account_id}/access/logs/scim/updates`

Lists Access SCIM update logs that maintain a record of updates made to User and Group resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `idp_id: array of string`

  The unique Id of the IdP that has SCIM enabled.

- `cf_resource_id: optional array of string`

  The unique Cloudflare-generated Id of the SCIM resource. Pass once for
  a single lookup (`?cf_resource_id=A`) or repeat the parameter
  (`?cf_resource_id=A&cf_resource_id=B`) to filter by multiple resources
  in one request.

- `direction: optional "desc" or "asc"`

  The chronological order used to sort the logs.

  - `"desc"`

  - `"asc"`

- `idp_resource_id: optional array of string`

  The IdP-generated Id of the SCIM resource. Pass once for a single
  lookup (`?idp_resource_id=A`) or repeat the parameter
  (`?idp_resource_id=A&idp_resource_id=B`) to filter by multiple
  resources in one request.

- `limit: optional number`

  The maximum number of update logs to retrieve.

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `request_method: optional array of "DELETE" or "PATCH" or "POST" or "PUT"`

  The request method of the SCIM request.

  - `"DELETE"`

  - `"PATCH"`

  - `"POST"`

  - `"PUT"`

- `resource_group_name: optional array of string`

  The display name of the SCIM Group resource. Pass once for a single
  lookup (`?resource_group_name=A`) or repeat the parameter
  (`?resource_group_name=A&resource_group_name=B`) to filter by multiple
  group names in one request.

- `resource_type: optional array of "USER" or "GROUP"`

  The resource type of the SCIM request.

  - `"USER"`

  - `"GROUP"`

- `resource_user_email: optional array of string`

  The email address of the SCIM User resource. Pass once for a single
  lookup (`?resource_user_email=A`) or repeat the parameter
  (`?resource_user_email=A&resource_user_email=B`) to filter by multiple
  emails in one request.

- `since: optional string`

  the timestamp of the earliest update log.

- `status: optional array of "FAILURE" or "SUCCESS"`

  The status of the SCIM request.

  - `"FAILURE"`

  - `"SUCCESS"`

- `until: optional string`

  the timestamp of the most-recent update log.

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

- `result: optional array of object { cf_resource_id, error_description, idp_id, 8 more }`

  - `cf_resource_id: optional string`

    The unique Cloudflare-generated Id of the SCIM resource.

  - `error_description: optional string`

    The error message which is generated when the status of the SCIM request is 'FAILURE'.

  - `idp_id: optional string`

    The unique Id of the IdP that has SCIM enabled.

  - `idp_resource_id: optional string`

    The IdP-generated Id of the SCIM resource.

  - `logged_at: optional string`

  - `request_body: optional string`

    The JSON-encoded string body of the SCIM request.

  - `request_method: optional string`

    The request method of the SCIM request.

  - `resource_group_name: optional string`

    The display name of the SCIM Group resource if it exists.

  - `resource_type: optional string`

    The resource type of the SCIM request.

  - `resource_user_email: optional string`

    The email address of the SCIM User resource if it exists.

  - `status: optional string`

    The status of the SCIM request.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/logs/scim/updates \
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
      "cf_resource_id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "error_description": "Invalid JSON body",
      "idp_id": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
      "idp_resource_id": "all_employees",
      "logged_at": "2014-01-01T05:20:00.12345Z",
      "request_body": "{}}",
      "request_method": "DELETE",
      "resource_group_name": "ALL_EMPLOYEES",
      "resource_type": "GROUP",
      "resource_user_email": "john.smith@example.com",
      "status": "FAILURE"
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

## Domain Types

### Update List Response

- `UpdateListResponse object { cf_resource_id, error_description, idp_id, 8 more }`

  - `cf_resource_id: optional string`

    The unique Cloudflare-generated Id of the SCIM resource.

  - `error_description: optional string`

    The error message which is generated when the status of the SCIM request is 'FAILURE'.

  - `idp_id: optional string`

    The unique Id of the IdP that has SCIM enabled.

  - `idp_resource_id: optional string`

    The IdP-generated Id of the SCIM resource.

  - `logged_at: optional string`

  - `request_body: optional string`

    The JSON-encoded string body of the SCIM request.

  - `request_method: optional string`

    The request method of the SCIM request.

  - `resource_group_name: optional string`

    The display name of the SCIM Group resource if it exists.

  - `resource_type: optional string`

    The resource type of the SCIM request.

  - `resource_user_email: optional string`

    The email address of the SCIM User resource if it exists.

  - `status: optional string`

    The status of the SCIM request.
