# Applications

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

## Domain Types

### Application List Response

- `ApplicationListResponse = array of object { auth_methods, category, description, 7 more }`

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

### Application Get Response

- `ApplicationGetResponse object { auth_methods, category, description, 6 more }`

  Full application detail for onboarding UI.

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

# Setup Flows

## Get application setup flows

**get** `/accounts/{account_id}/one/applications/{slug}/setup-flows`

Returns all available setup flows for the application, one per auth method.

### Path Parameters

- `account_id: string`

- `slug: string`

### Query Parameters

- `auth_method: optional string`

  Filter by auth method slug. Get available slugs from GET /v2/applications.

- `environment: optional "fedramp" or "standard"`

  Filter by environment.

  - `"fedramp"`

  - `"standard"`

### Returns

- `id: string`

  Setup flow identifier.

- `default: boolean`

  Whether this is the default auth method.

- `description: string`

  Flow description.

- `name: string`

  Human-readable flow name.

- `steps: array of object { type, component_id, description, 5 more }`

  Ordered list of setup steps.

  - `type: "component" or "instruction" or "form_input" or "oauth_redirect"`

    Step type.

    * `component` - component
    * `instruction` - instruction
    * `form_input` - form_input
    * `oauth_redirect` - oauth_redirect

    - `"component"`

    - `"instruction"`

    - `"form_input"`

    - `"oauth_redirect"`

  - `component_id: optional string`

    Component identifier (for component type).

  - `description: optional string`

    Step description with markdown support.

  - `dynamic_content: optional array of object { label, type, url_template, value_from }`

    Dynamic content blocks (for instruction/form_input).

    - `label: string`

      Display label.

    - `type: "copy_block" or "external_link"`

      Content type.

      * `copy_block` - copy_block
      * `external_link` - external_link

      - `"copy_block"`

      - `"external_link"`

    - `url_template: optional string`

      URL template with {{ variable }} interpolation (for external_link).

    - `value_from: optional string`

      Field path to get value from (for copy_block).

  - `form_fields: optional array of object { label, name, placeholder, 3 more }`

    Form fields (for form_input).

    - `label: string`

      Human-readable field label.

    - `name: string`

      Field identifier (maps to credentials key).

    - `placeholder: string`

      Placeholder text.

    - `required: boolean`

      Whether field is required.

    - `supported_file_types: array of string`

      Allowed file extensions for file_upload type.

    - `type: "text" or "password" or "email" or "file_upload"`

      Field input type.

      * `text` - text
      * `password` - password
      * `email` - email
      * `file_upload` - file_upload

      - `"text"`

      - `"password"`

      - `"email"`

      - `"file_upload"`

  - `is_required: optional boolean`

    Whether step is required (for form_input).

  - `parameters: optional map[string]`

    Component parameters (for component type).

  - `title: optional string`

    Step title (for instruction/form_input/oauth_redirect).

- `supported_environments: array of string`

  Environments this auth method supports (standard, fedramp).

- `auth_config: optional object { authorization_url, client_id, requires_pkce, 2 more }`

  OAuth configuration (present for OAuth-based flows).

  - `authorization_url: string`

    Authorization URL for the requested environment.

  - `client_id: string`

    OAuth client ID.

  - `requires_pkce: boolean`

    Whether PKCE is required.

  - `scopes: array of string`

    OAuth scopes to request.

  - `url_placeholders: array of string`

    Placeholders in authorization URL that frontend must fill.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/applications/$SLUG/setup-flows \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "default": true,
    "description": "Connect via a Google Cloud Service Account with Domain-Wide Delegation.",
    "id": "google_workspace_service_account",
    "name": "Google Workspace (Service Account)",
    "steps": [
      {
        "component_id": "common/name_integration",
        "parameters": null,
        "type": "component"
      },
      {
        "description": "In the Google Cloud Console, create a service account...",
        "dynamic_content": null,
        "title": "Create a Service Account",
        "type": "instruction"
      },
      {
        "description": "Upload the JSON service account key file.",
        "dynamic_content": null,
        "form_fields": [
          {
            "label": "Service Account JSON File",
            "name": "service_account_credentials",
            "placeholder": null,
            "required": true,
            "supported_file_types": [
              ".json"
            ],
            "type": "file_upload"
          }
        ],
        "is_required": true,
        "title": "Upload JSON Key",
        "type": "form_input"
      },
      {
        "description": "Navigate to your Google admin console and add the client ID.",
        "dynamic_content": [
          {
            "label": "Client ID",
            "type": "copy_block",
            "value_from": "credentials.client_id"
          },
          {
            "label": "OAuth Scopes",
            "type": "copy_block",
            "value_from": "required_scopes"
          },
          {
            "label": "Open Domain-Wide Delegation Settings",
            "type": "external_link",
            "url_template": "https://admin.google.com/ac/owl/domainwidedelegation"
          }
        ],
        "title": "Delegate Domain-Wide Authority",
        "type": "instruction"
      },
      {
        "description": "Provide the email of a Google Workspace Super Administrator.",
        "dynamic_content": null,
        "form_fields": [
          {
            "label": "Super Administrator Email",
            "name": "administrator_email",
            "placeholder": "admin@your-domain.com",
            "required": true,
            "supported_file_types": null,
            "type": "email"
          }
        ],
        "is_required": true,
        "title": "Confirm Administrator Email",
        "type": "form_input"
      }
    ],
    "supported_environments": [
      "standard"
    ]
  }
]
```

## Domain Types

### Setup Flow List Response

- `SetupFlowListResponse = array of object { id, default, description, 4 more }`

  - `id: string`

    Setup flow identifier.

  - `default: boolean`

    Whether this is the default auth method.

  - `description: string`

    Flow description.

  - `name: string`

    Human-readable flow name.

  - `steps: array of object { type, component_id, description, 5 more }`

    Ordered list of setup steps.

    - `type: "component" or "instruction" or "form_input" or "oauth_redirect"`

      Step type.

      * `component` - component
      * `instruction` - instruction
      * `form_input` - form_input
      * `oauth_redirect` - oauth_redirect

      - `"component"`

      - `"instruction"`

      - `"form_input"`

      - `"oauth_redirect"`

    - `component_id: optional string`

      Component identifier (for component type).

    - `description: optional string`

      Step description with markdown support.

    - `dynamic_content: optional array of object { label, type, url_template, value_from }`

      Dynamic content blocks (for instruction/form_input).

      - `label: string`

        Display label.

      - `type: "copy_block" or "external_link"`

        Content type.

        * `copy_block` - copy_block
        * `external_link` - external_link

        - `"copy_block"`

        - `"external_link"`

      - `url_template: optional string`

        URL template with {{ variable }} interpolation (for external_link).

      - `value_from: optional string`

        Field path to get value from (for copy_block).

    - `form_fields: optional array of object { label, name, placeholder, 3 more }`

      Form fields (for form_input).

      - `label: string`

        Human-readable field label.

      - `name: string`

        Field identifier (maps to credentials key).

      - `placeholder: string`

        Placeholder text.

      - `required: boolean`

        Whether field is required.

      - `supported_file_types: array of string`

        Allowed file extensions for file_upload type.

      - `type: "text" or "password" or "email" or "file_upload"`

        Field input type.

        * `text` - text
        * `password` - password
        * `email` - email
        * `file_upload` - file_upload

        - `"text"`

        - `"password"`

        - `"email"`

        - `"file_upload"`

    - `is_required: optional boolean`

      Whether step is required (for form_input).

    - `parameters: optional map[string]`

      Component parameters (for component type).

    - `title: optional string`

      Step title (for instruction/form_input/oauth_redirect).

  - `supported_environments: array of string`

    Environments this auth method supports (standard, fedramp).

  - `auth_config: optional object { authorization_url, client_id, requires_pkce, 2 more }`

    OAuth configuration (present for OAuth-based flows).

    - `authorization_url: string`

      Authorization URL for the requested environment.

    - `client_id: string`

      OAuth client ID.

    - `requires_pkce: boolean`

      Whether PKCE is required.

    - `scopes: array of string`

      OAuth scopes to request.

    - `url_placeholders: array of string`

      Placeholders in authorization URL that frontend must fill.
