# Integrations

## List integrations

**get** `/accounts/{account_id}/one/integrations`

Returns a paginated list of integrations for the account.

### Path Parameters

- `account_id: string`

### Query Parameters

- `application: optional string`

  Filter by application/vendor (e.g., GOOGLE_WORKSPACE, MICROSOFT_INTERNAL).

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `dlp_enabled: optional boolean`

  Filter by DLP enabled status (true/false).

- `order: optional "application" or "created" or "name" or "status"`

  Field to order results by.

  - `"application"`

  - `"created"`

  - `"name"`

  - `"status"`

- `page: optional number`

  Page number within the paginated result set.

- `page_size: optional number`

  Number of results per page.

- `search: optional string`

  Search integrations by name or application.

- `status: optional "Healthy" or "Initializing" or "Offline" or "Unhealthy"`

  Filter by integration status.

  - `"Healthy"`

  - `"Initializing"`

  - `"Offline"`

  - `"Unhealthy"`

- `use_cases: optional string`

  Filter by enabled use cases (e.g., casb, ces). Matches integrations enrolled in any of the specified values. Can be specified multiple times.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "application": {
        "category": "Productivity",
        "display_name": "Google Workspace",
        "logo": "https://onprem.cloudflare.com/static/google_workspace.png"
      },
      "created": "2025-01-15T10:00:00Z",
      "id": "019d2e6a-d995-7185-afbd-4feead9e42ec",
      "is_paused": false,
      "name": "My Google Workspace",
      "status": "Healthy",
      "updated": "2025-04-10T08:30:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
  },
  "success": true
}
```

## Get integration details

**get** `/accounts/{account_id}/one/integrations/{id}`

Returns full integration details including use cases and permissions.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `id: string`

  Integration ID.

- `application: map[string]`

- `auth_method: map[string]`

  The integration's authentication method.

- `authorization_link: object { components, link }`

  Authorization link for the integration.

  - `components: map[unknown]`

  - `link: string`

- `created: string`

  When the integration was created.

- `credentials_expiry: string`

  Credentials expiry time.

- `dlp_profiles: array of string`

  DLP Profiles enabled for the integration.

- `health_details: array of map[unknown]`

  Health details with remediation hints.

- `is_paused: boolean`

  Whether the user paused the integration.

- `last_hydrated: string`

  Last time the integration was hydrated.

- `name: string`

  Name of the integration.

- `organization_id: number`

  Organization ID.

- `status: string`

  Integration status.

- `updated: string`

  When the integration was last updated.

- `use_cases: array of map[unknown]`

  Use cases enabled for the integration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "application": {
    "foo": "string"
  },
  "auth_method": {
    "foo": "string"
  },
  "authorization_link": {
    "components": {
      "foo": "bar"
    },
    "link": "link"
  },
  "created": "2019-12-27T18:11:19.117Z",
  "credentials_expiry": "2019-12-27T18:11:19.117Z",
  "dlp_profiles": [
    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  ],
  "health_details": [
    {
      "foo": "bar"
    }
  ],
  "is_paused": true,
  "last_hydrated": "2019-12-27T18:11:19.117Z",
  "name": "name",
  "organization_id": 0,
  "status": "status",
  "updated": "2019-12-27T18:11:19.117Z",
  "use_cases": [
    {
      "foo": "bar"
    }
  ]
}
```

## Create integration

**post** `/accounts/{account_id}/one/integrations`

Creates a new integration for the specified application.

### Path Parameters

- `account_id: string`

### Body Parameters

- `application: "GITHUB" or "GOOGLE_WORKSPACE" or "MICROSOFT_INTERNAL" or 2 more`

  Vendor/application slug (e.g., GOOGLE_WORKSPACE).

  * `GITHUB` - GITHUB
  * `GOOGLE_WORKSPACE` - GOOGLE_WORKSPACE
  * `MICROSOFT_INTERNAL` - MICROSOFT_INTERNAL
  * `SALESFORCE` - SALESFORCE
  * `SLACK` - SLACK

  - `"GITHUB"`

  - `"GOOGLE_WORKSPACE"`

  - `"MICROSOFT_INTERNAL"`

  - `"SALESFORCE"`

  - `"SLACK"`

- `credentials: map[unknown]`

  Credentials for the integration.

- `name: string`

  Name of the integration.

- `auth_method: optional string`

  Authentication method slug (uses default if omitted).

- `dlp_profiles: optional array of string`

  List of DLP profile IDs to associate.

- `permissions: optional array of string`

  List of permission scopes (uses policy defaults if empty).

- `use_cases: optional array of "casb" or "ces" or "auto_remediation"`

  List of use case or feature slugs to enroll (e.g., ['casb', 'ces', 'auto_remediation']).

  - `"casb"`

  - `"ces"`

  - `"auto_remediation"`

### Returns

- `id: string`

  Integration ID.

- `application: map[string]`

- `auth_method: map[string]`

  The integration's authentication method.

- `authorization_link: object { components, link }`

  Authorization link for the integration.

  - `components: map[unknown]`

  - `link: string`

- `created: string`

  When the integration was created.

- `credentials_expiry: string`

  Credentials expiry time.

- `dlp_profiles: array of string`

  DLP Profiles enabled for the integration.

- `health_details: array of map[unknown]`

  Health details with remediation hints.

- `is_paused: boolean`

  Whether the user paused the integration.

- `last_hydrated: string`

  Last time the integration was hydrated.

- `name: string`

  Name of the integration.

- `organization_id: number`

  Organization ID.

- `status: string`

  Integration status.

- `updated: string`

  When the integration was last updated.

- `use_cases: array of map[unknown]`

  Use cases enabled for the integration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "application": "GOOGLE_WORKSPACE",
          "credentials": {
            "admin_email": "bar"
          },
          "name": "My Google Workspace"
        }'
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "application": {
    "foo": "string"
  },
  "auth_method": {
    "foo": "string"
  },
  "authorization_link": {
    "components": {
      "foo": "bar"
    },
    "link": "link"
  },
  "created": "2019-12-27T18:11:19.117Z",
  "credentials_expiry": "2019-12-27T18:11:19.117Z",
  "dlp_profiles": [
    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  ],
  "health_details": [
    {
      "foo": "bar"
    }
  ],
  "is_paused": true,
  "last_hydrated": "2019-12-27T18:11:19.117Z",
  "name": "name",
  "organization_id": 0,
  "status": "status",
  "updated": "2019-12-27T18:11:19.117Z",
  "use_cases": [
    {
      "foo": "bar"
    }
  ]
}
```

## Update integration

**patch** `/accounts/{account_id}/one/integrations/{id}`

Updates an integration's name, permissions, DLP profiles, use cases, or credentials.

### Path Parameters

- `account_id: string`

- `id: string`

### Body Parameters

- `credentials: optional map[unknown]`

  Partial credential fields to merge with existing.

- `dlp_profiles: optional array of string`

  List of DLP profile IDs to associate with the integration.

- `name: optional string`

  Name of the integration.

- `permissions: optional array of string`

  List of permission scopes granted to the integration.

- `use_cases: optional array of "casb" or "ces" or "auto_remediation"`

  List of use case or feature slugs to enroll (e.g., ['casb', 'ces', 'auto_remediation']).

  - `"casb"`

  - `"ces"`

  - `"auto_remediation"`

### Returns

- `id: string`

  Integration ID.

- `application: map[string]`

- `auth_method: map[string]`

  The integration's authentication method.

- `authorization_link: object { components, link }`

  Authorization link for the integration.

  - `components: map[unknown]`

  - `link: string`

- `created: string`

  When the integration was created.

- `credentials_expiry: string`

  Credentials expiry time.

- `dlp_profiles: array of string`

  DLP Profiles enabled for the integration.

- `health_details: array of map[unknown]`

  Health details with remediation hints.

- `is_paused: boolean`

  Whether the user paused the integration.

- `last_hydrated: string`

  Last time the integration was hydrated.

- `name: string`

  Name of the integration.

- `organization_id: number`

  Organization ID.

- `status: string`

  Integration status.

- `updated: string`

  When the integration was last updated.

- `use_cases: array of map[unknown]`

  Use cases enabled for the integration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "application": {
    "foo": "string"
  },
  "auth_method": {
    "foo": "string"
  },
  "authorization_link": {
    "components": {
      "foo": "bar"
    },
    "link": "link"
  },
  "created": "2019-12-27T18:11:19.117Z",
  "credentials_expiry": "2019-12-27T18:11:19.117Z",
  "dlp_profiles": [
    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  ],
  "health_details": [
    {
      "foo": "bar"
    }
  ],
  "is_paused": true,
  "last_hydrated": "2019-12-27T18:11:19.117Z",
  "name": "name",
  "organization_id": 0,
  "status": "status",
  "updated": "2019-12-27T18:11:19.117Z",
  "use_cases": [
    {
      "foo": "bar"
    }
  ]
}
```

## Delete integration

**delete** `/accounts/{account_id}/one/integrations/{id}`

Delete an integration by soft-deleting it.

### Path Parameters

- `account_id: string`

- `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Pause integration

**post** `/accounts/{account_id}/one/integrations/{id}/pause`

Pauses an integration, stopping all crawlers.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `id: string`

  Integration ID.

- `application: map[string]`

- `auth_method: map[string]`

  The integration's authentication method.

- `authorization_link: object { components, link }`

  Authorization link for the integration.

  - `components: map[unknown]`

  - `link: string`

- `created: string`

  When the integration was created.

- `credentials_expiry: string`

  Credentials expiry time.

- `dlp_profiles: array of string`

  DLP Profiles enabled for the integration.

- `health_details: array of map[unknown]`

  Health details with remediation hints.

- `is_paused: boolean`

  Whether the user paused the integration.

- `last_hydrated: string`

  Last time the integration was hydrated.

- `name: string`

  Name of the integration.

- `organization_id: number`

  Organization ID.

- `status: string`

  Integration status.

- `updated: string`

  When the integration was last updated.

- `use_cases: array of map[unknown]`

  Use cases enabled for the integration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID/pause \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "application": {
    "foo": "string"
  },
  "auth_method": {
    "foo": "string"
  },
  "authorization_link": {
    "components": {
      "foo": "bar"
    },
    "link": "link"
  },
  "created": "2019-12-27T18:11:19.117Z",
  "credentials_expiry": "2019-12-27T18:11:19.117Z",
  "dlp_profiles": [
    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  ],
  "health_details": [
    {
      "foo": "bar"
    }
  ],
  "is_paused": true,
  "last_hydrated": "2019-12-27T18:11:19.117Z",
  "name": "name",
  "organization_id": 0,
  "status": "status",
  "updated": "2019-12-27T18:11:19.117Z",
  "use_cases": [
    {
      "foo": "bar"
    }
  ]
}
```

## Resume integration

**post** `/accounts/{account_id}/one/integrations/{id}/resume`

Resumes a paused integration, restarting crawlers.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `id: string`

  Integration ID.

- `application: map[string]`

- `auth_method: map[string]`

  The integration's authentication method.

- `authorization_link: object { components, link }`

  Authorization link for the integration.

  - `components: map[unknown]`

  - `link: string`

- `created: string`

  When the integration was created.

- `credentials_expiry: string`

  Credentials expiry time.

- `dlp_profiles: array of string`

  DLP Profiles enabled for the integration.

- `health_details: array of map[unknown]`

  Health details with remediation hints.

- `is_paused: boolean`

  Whether the user paused the integration.

- `last_hydrated: string`

  Last time the integration was hydrated.

- `name: string`

  Name of the integration.

- `organization_id: number`

  Organization ID.

- `status: string`

  Integration status.

- `updated: string`

  When the integration was last updated.

- `use_cases: array of map[unknown]`

  Use cases enabled for the integration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID/resume \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "application": {
    "foo": "string"
  },
  "auth_method": {
    "foo": "string"
  },
  "authorization_link": {
    "components": {
      "foo": "bar"
    },
    "link": "link"
  },
  "created": "2019-12-27T18:11:19.117Z",
  "credentials_expiry": "2019-12-27T18:11:19.117Z",
  "dlp_profiles": [
    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  ],
  "health_details": [
    {
      "foo": "bar"
    }
  ],
  "is_paused": true,
  "last_hydrated": "2019-12-27T18:11:19.117Z",
  "name": "name",
  "organization_id": 0,
  "status": "status",
  "updated": "2019-12-27T18:11:19.117Z",
  "use_cases": [
    {
      "foo": "bar"
    }
  ]
}
```

## Domain Types

### Integration List Response

- `IntegrationListResponse = unknown`

### Integration Get Response

- `IntegrationGetResponse object { id, application, auth_method, 12 more }`

  Serializer for v2 integration detail response with use cases.

  - `id: string`

    Integration ID.

  - `application: map[string]`

  - `auth_method: map[string]`

    The integration's authentication method.

  - `authorization_link: object { components, link }`

    Authorization link for the integration.

    - `components: map[unknown]`

    - `link: string`

  - `created: string`

    When the integration was created.

  - `credentials_expiry: string`

    Credentials expiry time.

  - `dlp_profiles: array of string`

    DLP Profiles enabled for the integration.

  - `health_details: array of map[unknown]`

    Health details with remediation hints.

  - `is_paused: boolean`

    Whether the user paused the integration.

  - `last_hydrated: string`

    Last time the integration was hydrated.

  - `name: string`

    Name of the integration.

  - `organization_id: number`

    Organization ID.

  - `status: string`

    Integration status.

  - `updated: string`

    When the integration was last updated.

  - `use_cases: array of map[unknown]`

    Use cases enabled for the integration.

### Integration Create Response

- `IntegrationCreateResponse object { id, application, auth_method, 12 more }`

  Serializer for v2 integration detail response with use cases.

  - `id: string`

    Integration ID.

  - `application: map[string]`

  - `auth_method: map[string]`

    The integration's authentication method.

  - `authorization_link: object { components, link }`

    Authorization link for the integration.

    - `components: map[unknown]`

    - `link: string`

  - `created: string`

    When the integration was created.

  - `credentials_expiry: string`

    Credentials expiry time.

  - `dlp_profiles: array of string`

    DLP Profiles enabled for the integration.

  - `health_details: array of map[unknown]`

    Health details with remediation hints.

  - `is_paused: boolean`

    Whether the user paused the integration.

  - `last_hydrated: string`

    Last time the integration was hydrated.

  - `name: string`

    Name of the integration.

  - `organization_id: number`

    Organization ID.

  - `status: string`

    Integration status.

  - `updated: string`

    When the integration was last updated.

  - `use_cases: array of map[unknown]`

    Use cases enabled for the integration.

### Integration Update Response

- `IntegrationUpdateResponse object { id, application, auth_method, 12 more }`

  Serializer for v2 integration detail response with use cases.

  - `id: string`

    Integration ID.

  - `application: map[string]`

  - `auth_method: map[string]`

    The integration's authentication method.

  - `authorization_link: object { components, link }`

    Authorization link for the integration.

    - `components: map[unknown]`

    - `link: string`

  - `created: string`

    When the integration was created.

  - `credentials_expiry: string`

    Credentials expiry time.

  - `dlp_profiles: array of string`

    DLP Profiles enabled for the integration.

  - `health_details: array of map[unknown]`

    Health details with remediation hints.

  - `is_paused: boolean`

    Whether the user paused the integration.

  - `last_hydrated: string`

    Last time the integration was hydrated.

  - `name: string`

    Name of the integration.

  - `organization_id: number`

    Organization ID.

  - `status: string`

    Integration status.

  - `updated: string`

    When the integration was last updated.

  - `use_cases: array of map[unknown]`

    Use cases enabled for the integration.

### Integration Pause Response

- `IntegrationPauseResponse object { id, application, auth_method, 12 more }`

  Serializer for v2 integration detail response with use cases.

  - `id: string`

    Integration ID.

  - `application: map[string]`

  - `auth_method: map[string]`

    The integration's authentication method.

  - `authorization_link: object { components, link }`

    Authorization link for the integration.

    - `components: map[unknown]`

    - `link: string`

  - `created: string`

    When the integration was created.

  - `credentials_expiry: string`

    Credentials expiry time.

  - `dlp_profiles: array of string`

    DLP Profiles enabled for the integration.

  - `health_details: array of map[unknown]`

    Health details with remediation hints.

  - `is_paused: boolean`

    Whether the user paused the integration.

  - `last_hydrated: string`

    Last time the integration was hydrated.

  - `name: string`

    Name of the integration.

  - `organization_id: number`

    Organization ID.

  - `status: string`

    Integration status.

  - `updated: string`

    When the integration was last updated.

  - `use_cases: array of map[unknown]`

    Use cases enabled for the integration.

### Integration Resume Response

- `IntegrationResumeResponse object { id, application, auth_method, 12 more }`

  Serializer for v2 integration detail response with use cases.

  - `id: string`

    Integration ID.

  - `application: map[string]`

  - `auth_method: map[string]`

    The integration's authentication method.

  - `authorization_link: object { components, link }`

    Authorization link for the integration.

    - `components: map[unknown]`

    - `link: string`

  - `created: string`

    When the integration was created.

  - `credentials_expiry: string`

    Credentials expiry time.

  - `dlp_profiles: array of string`

    DLP Profiles enabled for the integration.

  - `health_details: array of map[unknown]`

    Health details with remediation hints.

  - `is_paused: boolean`

    Whether the user paused the integration.

  - `last_hydrated: string`

    Last time the integration was hydrated.

  - `name: string`

    Name of the integration.

  - `organization_id: number`

    Organization ID.

  - `status: string`

    Integration status.

  - `updated: string`

    When the integration was last updated.

  - `use_cases: array of map[unknown]`

    Use cases enabled for the integration.
