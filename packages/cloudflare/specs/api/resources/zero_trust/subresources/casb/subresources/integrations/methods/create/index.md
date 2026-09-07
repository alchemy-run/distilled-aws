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
