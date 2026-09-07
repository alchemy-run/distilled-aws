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
