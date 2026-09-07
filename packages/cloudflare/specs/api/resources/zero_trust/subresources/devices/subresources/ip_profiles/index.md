# IP Profiles

## List IP profiles

**get** `/accounts/{account_id}/devices/ip-profiles`

Lists WARP Device IP profiles.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  The page number to return.

- `per_page: optional number`

  The number of IP profiles to return per page.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

    Number of records in the response.

  - `page: number`

    The page size number of the response.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: number`

    Total number of records available.

  - `total_pages: optional number`

    Total number of pages available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "created_at": "2025-02-14T13:17:00.123456789Z",
      "description": "example comment",
      "enabled": true,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "IPv4 Cloudflare Source IPs",
      "precedence": 100,
      "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2025-02-14T13:17:00.123456789Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 10,
    "total_count": 10,
    "total_pages": 1
  }
}
```

## Get IP profile

**get** `/accounts/{account_id}/devices/ip-profiles/{profile_id}`

Fetches a single WARP Device IP profile.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles/$PROFILE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```

## Create IP profile

**post** `/accounts/{account_id}/devices/ip-profiles`

Creates a WARP Device IP profile. Currently, only IPv4 Device subnets can be associated.

### Path Parameters

- `account_id: string`

### Body Parameters

- `match: string`

  The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

- `name: string`

  A user-friendly name for the Device IP profile.

- `precedence: number`

  The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

- `subnet_id: string`

  The ID of the Subnet.

- `description: optional string`

  An optional description of the Device IP profile.

- `enabled: optional boolean`

  Whether the Device IP profile will be applied to matching devices.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "IPv4 Cloudflare Source IPs",
          "precedence": 100,
          "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
          "description": "example comment",
          "enabled": true
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```

## Update IP profile

**patch** `/accounts/{account_id}/devices/ip-profiles/{profile_id}`

Updates a WARP Device IP profile. Currently, only IPv4 Device subnets can be associated.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Body Parameters

- `description: optional string`

  An optional description of the Device IP profile.

- `enabled: optional boolean`

  Whether the Device IP profile is enabled.

- `match: optional string`

  The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

- `name: optional string`

  A user-friendly name for the Device IP profile.

- `precedence: optional number`

  The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

- `subnet_id: optional string`

  The ID of the Subnet.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles/$PROFILE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "example comment",
          "enabled": true,
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "IPv4 Cloudflare Source IPs",
          "precedence": 100,
          "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```

## Delete IP profile

**delete** `/accounts/{account_id}/devices/ip-profiles/{profile_id}`

Delete a WARP Device IP profile.

### Path Parameters

- `account_id: string`

- `profile_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id }`

  - `id: optional string`

    ID of the deleted Device IP profile.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles/$PROFILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Domain Types

### IP Profile

- `IPProfile object { id, created_at, description, 6 more }`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

### IP Profile Delete Response

- `IPProfileDeleteResponse object { id }`

  - `id: optional string`

    ID of the deleted Device IP profile.
