## List applications

**get** `/accounts/{account_id}/one/applications`

Returns a list of available applications with use cases and permissions.

### Path Parameters

- `account_id: string`

### Query Parameters

- `environment: optional string`

  Filter by supported environment (standard, fedramp).

### Returns

- `auth_methods: array of object { display_name, slug }`

  Available auth methods.

  - `display_name: string`

    Human-readable auth method name.

  - `slug: string`

    Auth method identifier.

- `category: string`

  Vendor category (e.g. Productivity, AI).

- `description: string`

  Brief description of the integration.

- `display_name: string`

  Human-readable vendor name.

- `dlp_enabled: boolean`

  Whether DLP scanning is supported.

- `logo: string`

  Logo path.

- `permissions: array of object { display_name, scope, severity }`

  All permissions with severity.

  - `display_name: string`

    Human-readable permission name.

  - `scope: string`

    Vendor-native scope identifier.

  - `severity: "low" or "medium" or "high" or "critical"`

    Permission sensitivity level.

    * `low` - low
    * `medium` - medium
    * `high` - high
    * `critical` - critical

    - `"low"`

    - `"medium"`

    - `"high"`

    - `"critical"`

- `slug: "GITHUB" or "GOOGLE_WORKSPACE" or "MICROSOFT_INTERNAL" or 2 more`

  Vendor identifier (e.g. microsoft_internal, google_workspace).

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

- `supported_environments: array of string`

  Environments this vendor supports (standard, fedramp).

- `use_cases: array of object { display_name, slug }`

  Supported use cases.

  - `display_name: string`

    Human-readable use case name.

  - `slug: string`

    Use case identifier (e.g. casb, ces).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/applications \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "auth_methods": [
      {
        "display_name": "OAuth 2.0 Admin Consent",
        "slug": "oauth2_standard"
      }
    ],
    "category": "Productivity",
    "description": "Monitor OneDrive, SharePoint, Teams, and Outlook.",
    "display_name": "Microsoft",
    "dlp_enabled": true,
    "logo": "/api/v4/accounts/12345678/casb/static/microsoft_internal.svg",
    "permissions": [
      {
        "display_name": "Read all users' full profiles",
        "scope": "User.Read.All",
        "severity": "high"
      },
      {
        "display_name": "Read all files",
        "scope": "Files.Read.All",
        "severity": "high"
      },
      {
        "display_name": "Read and write mail",
        "scope": "Mail.ReadWrite",
        "severity": "critical"
      }
    ],
    "slug": "MICROSOFT_INTERNAL",
    "supported_environments": [
      "standard",
      "fedramp"
    ],
    "use_cases": [
      {
        "display_name": "Cloud Access Security Broker",
        "slug": "casb"
      },
      {
        "display_name": "Cloud Email Security",
        "slug": "ces"
      }
    ]
  }
]
```
