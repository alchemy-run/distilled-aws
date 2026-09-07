## Get application details

**get** `/accounts/{account_id}/one/applications/{slug}`

Returns full application details including auth methods, use cases, and permissions.

### Path Parameters

- `account_id: string`

- `slug: "GITHUB" or "GOOGLE_WORKSPACE" or "MICROSOFT_INTERNAL" or 2 more`

  - `"GITHUB"`

  - `"GOOGLE_WORKSPACE"`

  - `"MICROSOFT_INTERNAL"`

  - `"SALESFORCE"`

  - `"SLACK"`

### Returns

- `auth_methods: array of object { display_name, is_default, slug, supported_environments }`

  Available authentication methods.

  - `display_name: string`

    Human-readable auth method name.

  - `is_default: boolean`

    Whether this is the default auth method.

  - `slug: string`

    Auth method identifier.

  - `supported_environments: array of string`

    Environments this auth method supports.

- `category: string`

  Vendor category.

- `description: string`

  Brief description.

- `display_name: string`

  Human-readable vendor name.

- `dlp_enabled: boolean`

  Whether DLP scanning is supported.

- `instructions: string`

  Setup instructions for the user.

- `logo: string`

  Logo path.

- `slug: "GITHUB" or "GOOGLE_WORKSPACE" or "MICROSOFT_INTERNAL" or 2 more`

  Vendor identifier.

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

- `use_cases: array of object { base_scopes, description, display_name, 2 more }`

  Use cases with full scope details.

  - `base_scopes: array of object { display_name, scope, severity }`

    Scopes always required for this use case.

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

  - `description: string`

    Use case description.

  - `display_name: string`

    Human-readable use case name.

  - `features: array of object { description, display_name, scopes, slug }`

    Optional features with extra scopes.

    - `description: string`

      Feature description.

    - `display_name: string`

      Human-readable feature name.

    - `scopes: array of object { display_name, scope, severity }`

      Additional scopes when feature is enabled.

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

    - `slug: string`

      Feature identifier.

  - `slug: string`

    Use case identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/applications/$SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "auth_methods": [
    {
      "display_name": "OAuth 2.0 Admin Consent",
      "is_default": true,
      "slug": "oauth2",
      "supported_environments": [
        "standard",
        "fedramp"
      ]
    }
  ],
  "category": "Productivity",
  "description": "Monitor OneDrive, SharePoint, Teams, and Outlook.",
  "display_name": "Microsoft",
  "dlp_enabled": true,
  "instructions": "You'll need a Microsoft 365 admin account with Global Admin or Application Admin role.",
  "logo": "/api/v4/accounts/12345678/casb/static/microsoft_internal.svg",
  "slug": "MICROSOFT_INTERNAL",
  "use_cases": [
    {
      "base_scopes": [
        {
          "display_name": "Read all users' full profiles",
          "scope": "User.Read.All",
          "severity": "high"
        },
        {
          "display_name": "Read all files",
          "scope": "Files.Read.All",
          "severity": "high"
        }
      ],
      "description": "Discover and secure SaaS applications",
      "display_name": "Cloud Access Security Broker",
      "features": [
        {
          "description": "Automatically remediate security issues",
          "display_name": "Auto Remediation",
          "scopes": [
            {
              "display_name": "Read and write all files",
              "scope": "Files.ReadWrite.All",
              "severity": "critical"
            }
          ],
          "slug": "auto_remediation"
        }
      ],
      "slug": "casb"
    }
  ]
}
```
