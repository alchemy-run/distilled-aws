# OAuth Clients

## List OAuth Clients

**get** `/accounts/{account_id}/oauth_clients`

List all OAuth clients for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: optional array of object { client_id, visibility, allowed_cors_origins, 16 more }`

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
      "visibility": "private",
      "allowed_cors_origins": [
        "https://example.com"
      ],
      "client_name": "My OAuth App",
      "client_uri": "https://example.com",
      "client_uri_verification": {
        "status": "in_progress",
        "text": "cloudflare_oauth_client_publisher=example"
      },
      "created_at": "2025-01-01T00:00:00Z",
      "grant_types": [
        "authorization_code",
        "refresh_token"
      ],
      "has_rotated_secret": false,
      "logo_uri": "https://example.com/logo.png",
      "policy_uri": "https://example.com/privacy",
      "post_logout_redirect_uris": [
        "https://example.com/logout"
      ],
      "promoted_at": "2026-05-13T12:00:00Z",
      "redirect_uris": [
        "https://example.com/callback"
      ],
      "response_types": [
        "code"
      ],
      "scopes": [
        "account.read"
      ],
      "token_endpoint_auth_method": "client_secret_post",
      "tos_uri": "https://example.com/tos",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## OAuth Client Details

**get** `/accounts/{account_id}/oauth_clients/{oauth_client_id}`

Get details of a specific OAuth client.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "visibility": "private",
    "allowed_cors_origins": [
      "https://example.com"
    ],
    "client_name": "My OAuth App",
    "client_uri": "https://example.com",
    "client_uri_verification": {
      "status": "in_progress",
      "text": "cloudflare_oauth_client_publisher=example"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "has_rotated_secret": false,
    "logo_uri": "https://example.com/logo.png",
    "policy_uri": "https://example.com/privacy",
    "post_logout_redirect_uris": [
      "https://example.com/logout"
    ],
    "promoted_at": "2026-05-13T12:00:00Z",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "response_types": [
      "code"
    ],
    "scopes": [
      "account.read"
    ],
    "token_endpoint_auth_method": "client_secret_post",
    "tos_uri": "https://example.com/tos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Create OAuth Client

**post** `/accounts/{account_id}/oauth_clients`

Create a new OAuth client for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `client_name: string`

  Human-readable name of the OAuth client.

- `grant_types: array of "authorization_code" or "refresh_token"`

  Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

  - `"authorization_code"`

  - `"refresh_token"`

- `redirect_uris: array of string`

  Array of allowed redirect URIs for the client.

- `response_types: array of "token" or "id_token" or "code"`

  Array of OAuth response types the client is allowed to use.

  - `"token"`

  - `"id_token"`

  - `"code"`

- `scopes: array of string`

  Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

- `token_endpoint_auth_method: "none" or "client_secret_basic" or "client_secret_post"`

  The authentication method the client uses at the token endpoint.

  - `"none"`

  - `"client_secret_basic"`

  - `"client_secret_post"`

- `allowed_cors_origins: optional array of string`

  Array of allowed CORS origins.

- `client_uri: optional string`

  URL of the home page of the client.

- `logo_uri: optional string`

  URL of the client's logo.

- `policy_uri: optional string`

  URL that points to a privacy policy document.

- `post_logout_redirect_uris: optional array of string`

  Array of allowed post-logout redirect URIs.

- `tos_uri: optional string`

  URL that points to a terms of service document.

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

- `result: optional object { client_id, visibility, allowed_cors_origins, 17 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_secret: optional string`

    The client secret. This is the only time the secret is returned in a response.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "client_name": "My OAuth App",
          "grant_types": [
            "authorization_code",
            "refresh_token"
          ],
          "redirect_uris": [
            "https://example.com/callback"
          ],
          "response_types": [
            "code"
          ],
          "scopes": [
            "account.read"
          ],
          "token_endpoint_auth_method": "client_secret_post",
          "allowed_cors_origins": [
            "https://example.com"
          ],
          "client_uri": "https://example.com",
          "logo_uri": "https://example.com/logo.png",
          "policy_uri": "https://example.com/privacy",
          "post_logout_redirect_uris": [
            "https://example.com/logout"
          ],
          "tos_uri": "https://example.com/tos"
        }'
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
  "result": {
    "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "visibility": "private",
    "allowed_cors_origins": [
      "https://example.com"
    ],
    "client_name": "My OAuth App",
    "client_secret": "cf-oauth-secret-example",
    "client_uri": "https://example.com",
    "client_uri_verification": {
      "status": "in_progress",
      "text": "cloudflare_oauth_client_publisher=example"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "has_rotated_secret": false,
    "logo_uri": "https://example.com/logo.png",
    "policy_uri": "https://example.com/privacy",
    "post_logout_redirect_uris": [
      "https://example.com/logout"
    ],
    "promoted_at": "2026-05-13T12:00:00Z",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "response_types": [
      "code"
    ],
    "scopes": [
      "account.read"
    ],
    "token_endpoint_auth_method": "client_secret_post",
    "tos_uri": "https://example.com/tos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Update OAuth Client

**patch** `/accounts/{account_id}/oauth_clients/{oauth_client_id}`

Update an existing OAuth client. Only include fields you want to update.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

### Body Parameters

- `allowed_cors_origins: optional array of string`

  Array of allowed CORS origins.

- `client_name: optional string`

  Human-readable name of the OAuth client.

- `client_uri: optional string`

  URL of the home page of the client.

- `grant_types: optional array of "authorization_code" or "refresh_token"`

  Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

  - `"authorization_code"`

  - `"refresh_token"`

- `logo_uri: optional string`

  URL of the client's logo.

- `policy_uri: optional string`

  URL that points to a privacy policy document.

- `post_logout_redirect_uris: optional array of string`

  Array of allowed post-logout redirect URIs.

- `redirect_uris: optional array of string`

  Array of allowed redirect URIs for the client.

- `response_types: optional array of "token" or "id_token" or "code"`

  Array of OAuth response types the client is allowed to use.

  - `"token"`

  - `"id_token"`

  - `"code"`

- `scopes: optional array of string`

  Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

- `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

  The authentication method the client uses at the token endpoint.

  - `"none"`

  - `"client_secret_basic"`

  - `"client_secret_post"`

- `tos_uri: optional string`

  URL that points to a terms of service document.

- `visibility: optional "public"`

  Promote the OAuth client from private to public visibility. Only `public` is accepted; demotion to `private` is not supported. Promotion requires a non-empty client name, logo URI, verified client URI host, and at least one non-identity scope.

  - `"public"`

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

- `result: optional object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allowed_cors_origins": [
            "https://example.com"
          ],
          "client_name": "My OAuth App",
          "client_uri": "https://example.com",
          "grant_types": [
            "authorization_code",
            "refresh_token"
          ],
          "logo_uri": "https://example.com/logo.png",
          "policy_uri": "https://example.com/privacy",
          "post_logout_redirect_uris": [
            "https://example.com/logout"
          ],
          "redirect_uris": [
            "https://example.com/callback"
          ],
          "response_types": [
            "code"
          ],
          "scopes": [
            "account.read"
          ],
          "token_endpoint_auth_method": "client_secret_post",
          "tos_uri": "https://example.com/tos",
          "visibility": "public"
        }'
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
  "result": {
    "client_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "visibility": "private",
    "allowed_cors_origins": [
      "https://example.com"
    ],
    "client_name": "My OAuth App",
    "client_uri": "https://example.com",
    "client_uri_verification": {
      "status": "in_progress",
      "text": "cloudflare_oauth_client_publisher=example"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "grant_types": [
      "authorization_code",
      "refresh_token"
    ],
    "has_rotated_secret": false,
    "logo_uri": "https://example.com/logo.png",
    "policy_uri": "https://example.com/privacy",
    "post_logout_redirect_uris": [
      "https://example.com/logout"
    ],
    "promoted_at": "2026-05-13T12:00:00Z",
    "redirect_uris": [
      "https://example.com/callback"
    ],
    "response_types": [
      "code"
    ],
    "scopes": [
      "account.read"
    ],
    "token_endpoint_auth_method": "client_secret_post",
    "tos_uri": "https://example.com/tos",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

## Delete OAuth Client

**delete** `/accounts/{account_id}/oauth_clients/{oauth_client_id}`

Delete an OAuth client.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Rotate OAuth Client Secret

**post** `/accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret`

Creates a second client secret so you can update your client configuration before deleting the old one. The `has_rotated_secret` field on the client will be set to `true`.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { client_secret }`

  - `client_secret: optional string`

    The new client secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID/rotate_secret \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "client_secret": "cf-oauth-secret-new-example"
  }
}
```

## Delete Rotated OAuth Client Secret

**delete** `/accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret`

Removes the old client secret after a rotation, keeping only the new one. Use this after you have updated your client configuration to use the new secret. The `has_rotated_secret` field on the client indicates whether there is an old secret to delete.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID/rotate_secret \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### OAuth Client List Response

- `OAuthClientListResponse object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Get Response

- `OAuthClientGetResponse object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Create Response

- `OAuthClientCreateResponse object { client_id, visibility, allowed_cors_origins, 17 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_secret: optional string`

    The client secret. This is the only time the secret is returned in a response.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Update Response

- `OAuthClientUpdateResponse object { client_id, visibility, allowed_cors_origins, 16 more }`

  Fields shared by OAuth client responses and create/update requests.

  - `client_id: string`

    The unique identifier for an OAuth client.

  - `visibility: "public" or "private"`

    Visibility of the OAuth client.

    - `"public"`

    - `"private"`

  - `allowed_cors_origins: optional array of string`

    Array of allowed CORS origins.

  - `client_name: optional string`

    Human-readable name of the OAuth client.

  - `client_uri: optional string`

    URL of the home page of the client.

  - `client_uri_verification: optional object { status, text }`

    Client URI domain control verification state.

    - `status: optional "pending" or "in_progress" or "verified" or "failed"`

      Current verification status for the client URI host.

      - `"pending"`

      - `"in_progress"`

      - `"verified"`

      - `"failed"`

    - `text: optional string`

      Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

  - `created_at: optional string`

    Timestamp when the OAuth client was created.

  - `grant_types: optional array of "authorization_code" or "refresh_token"`

    Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.

    - `"authorization_code"`

    - `"refresh_token"`

  - `has_rotated_secret: optional boolean`

    Indicates whether the client has a rotated secret that has not yet been deleted.

  - `logo_uri: optional string`

    URL of the client's logo.

  - `policy_uri: optional string`

    URL that points to a privacy policy document.

  - `post_logout_redirect_uris: optional array of string`

    Array of allowed post-logout redirect URIs.

  - `promoted_at: optional string`

    Timestamp when the OAuth client was promoted to public visibility.

  - `redirect_uris: optional array of string`

    Array of allowed redirect URIs for the client.

  - `response_types: optional array of "token" or "id_token" or "code"`

    Array of OAuth response types the client is allowed to use.

    - `"token"`

    - `"id_token"`

    - `"code"`

  - `scopes: optional array of string`

    Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.

  - `token_endpoint_auth_method: optional "none" or "client_secret_basic" or "client_secret_post"`

    The authentication method the client uses at the token endpoint.

    - `"none"`

    - `"client_secret_basic"`

    - `"client_secret_post"`

  - `tos_uri: optional string`

    URL that points to a terms of service document.

  - `updated_at: optional string`

    Timestamp when the OAuth client was last updated.

### OAuth Client Delete Response

- `OAuthClientDeleteResponse object { id }`

  - `id: string`

    Identifier

### OAuth Client Rotate Secret Response

- `OAuthClientRotateSecretResponse object { client_secret }`

  - `client_secret: optional string`

    The new client secret.

### OAuth Client Delete Rotated Secret Response

- `OAuthClientDeleteRotatedSecretResponse object { id }`

  - `id: string`

    Identifier
