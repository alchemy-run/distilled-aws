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
