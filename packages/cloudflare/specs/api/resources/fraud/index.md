# Fraud

## Get Fraud Detection Settings

**get** `/zones/{zone_id}/fraud_detection/settings`

Retrieve Fraud Detection settings for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional FraudSettings`

  - `authentication_settings: optional object { failure_criteria, success_criteria }`

    Configuration for classifying login authentication outcomes based on the origin response.
    Requires `user_profiles` to be enabled.

    - Success and failure criteria are independently updatable — sending only `success_criteria`
      leaves failure codes untouched, and vice versa.
    - Omit `authentication_settings` entirely to leave both unchanged.
    - Status codes must not overlap between success and failure criteria.

    - `failure_criteria: optional object { kind, status_codes }`

      Criterion for identifying failed login responses.

      - `kind: "status_code"`

        The type of criterion. Currently only `status_code` is supported.

        - `"status_code"`

      - `status_codes: optional array of number`

        HTTP status codes to match against the origin response.

        - Maximum of 10 codes per criterion.
        - Each code must be a valid HTTP status code (100-599).
        - Codes are deduplicated and sorted on save.
        - Omit to leave unchanged on update.
        - Provide an empty array `[]` to clear codes on update.

    - `success_criteria: optional object { kind, status_codes }`

      Criterion for identifying successful login responses.

      - `kind: "status_code"`

        The type of criterion. Currently only `status_code` is supported.

        - `"status_code"`

      - `status_codes: optional array of number`

        HTTP status codes to match against the origin response.

        - Maximum of 10 codes per criterion.
        - Each code must be a valid HTTP status code (100-599).
        - Codes are deduplicated and sorted on save.
        - Omit to leave unchanged on update.
        - Provide an empty array `[]` to clear codes on update.

  - `user_profiles: optional "enabled" or "disabled"`

    Whether Fraud User Profiles is enabled for the zone.

    - `"enabled"`

    - `"disabled"`

  - `username_expressions: optional array of string`

    List of expressions to detect usernames in write HTTP requests.

    - Maximum of 10 expressions.
    - Omit or set to null to leave unchanged on update.
    - Provide an empty array `[]` to clear all expressions on update.
    - Invalid expressions will result in a 10400 Bad Request with details in the `messages` array.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/fraud_detection/settings \
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
    "authentication_settings": {
      "failure_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      },
      "success_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      }
    },
    "user_profiles": "disabled",
    "username_expressions": [
      "http.request.body.form[\"username\"][0]",
      "lookup_json_string(http.request.body.raw, \"username\")"
    ]
  }
}
```

## Update Fraud Detection Settings

**put** `/zones/{zone_id}/fraud_detection/settings`

Update Fraud Detection settings for a zone.

Notes on `username_expressions` behavior:

- If omitted or set to null, expressions are not modified.
- If provided as an empty array `[]`, all expressions will be cleared.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `authentication_settings: optional object { failure_criteria, success_criteria }`

  Configuration for classifying login authentication outcomes based on the origin response.
  Requires `user_profiles` to be enabled.

  - Success and failure criteria are independently updatable — sending only `success_criteria`
    leaves failure codes untouched, and vice versa.
  - Omit `authentication_settings` entirely to leave both unchanged.
  - Status codes must not overlap between success and failure criteria.

  - `failure_criteria: optional object { kind, status_codes }`

    Criterion for identifying failed login responses.

    - `kind: "status_code"`

      The type of criterion. Currently only `status_code` is supported.

      - `"status_code"`

    - `status_codes: optional array of number`

      HTTP status codes to match against the origin response.

      - Maximum of 10 codes per criterion.
      - Each code must be a valid HTTP status code (100-599).
      - Codes are deduplicated and sorted on save.
      - Omit to leave unchanged on update.
      - Provide an empty array `[]` to clear codes on update.

  - `success_criteria: optional object { kind, status_codes }`

    Criterion for identifying successful login responses.

    - `kind: "status_code"`

      The type of criterion. Currently only `status_code` is supported.

      - `"status_code"`

    - `status_codes: optional array of number`

      HTTP status codes to match against the origin response.

      - Maximum of 10 codes per criterion.
      - Each code must be a valid HTTP status code (100-599).
      - Codes are deduplicated and sorted on save.
      - Omit to leave unchanged on update.
      - Provide an empty array `[]` to clear codes on update.

- `user_profiles: optional "enabled" or "disabled"`

  Whether Fraud User Profiles is enabled for the zone.

  - `"enabled"`

  - `"disabled"`

- `username_expressions: optional array of string`

  List of expressions to detect usernames in write HTTP requests.

  - Maximum of 10 expressions.
  - Omit or set to null to leave unchanged on update.
  - Provide an empty array `[]` to clear all expressions on update.
  - Invalid expressions will result in a 10400 Bad Request with details in the `messages` array.

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

- `result: optional FraudSettings`

  - `authentication_settings: optional object { failure_criteria, success_criteria }`

    Configuration for classifying login authentication outcomes based on the origin response.
    Requires `user_profiles` to be enabled.

    - Success and failure criteria are independently updatable — sending only `success_criteria`
      leaves failure codes untouched, and vice versa.
    - Omit `authentication_settings` entirely to leave both unchanged.
    - Status codes must not overlap between success and failure criteria.

    - `failure_criteria: optional object { kind, status_codes }`

      Criterion for identifying failed login responses.

      - `kind: "status_code"`

        The type of criterion. Currently only `status_code` is supported.

        - `"status_code"`

      - `status_codes: optional array of number`

        HTTP status codes to match against the origin response.

        - Maximum of 10 codes per criterion.
        - Each code must be a valid HTTP status code (100-599).
        - Codes are deduplicated and sorted on save.
        - Omit to leave unchanged on update.
        - Provide an empty array `[]` to clear codes on update.

    - `success_criteria: optional object { kind, status_codes }`

      Criterion for identifying successful login responses.

      - `kind: "status_code"`

        The type of criterion. Currently only `status_code` is supported.

        - `"status_code"`

      - `status_codes: optional array of number`

        HTTP status codes to match against the origin response.

        - Maximum of 10 codes per criterion.
        - Each code must be a valid HTTP status code (100-599).
        - Codes are deduplicated and sorted on save.
        - Omit to leave unchanged on update.
        - Provide an empty array `[]` to clear codes on update.

  - `user_profiles: optional "enabled" or "disabled"`

    Whether Fraud User Profiles is enabled for the zone.

    - `"enabled"`

    - `"disabled"`

  - `username_expressions: optional array of string`

    List of expressions to detect usernames in write HTTP requests.

    - Maximum of 10 expressions.
    - Omit or set to null to leave unchanged on update.
    - Provide an empty array `[]` to clear all expressions on update.
    - Invalid expressions will result in a 10400 Bad Request with details in the `messages` array.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/fraud_detection/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "user_profiles": "disabled",
          "username_expressions": [
            "string"
          ]
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
    "authentication_settings": {
      "failure_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      },
      "success_criteria": {
        "kind": "status_code",
        "status_codes": [
          200,
          201
        ]
      }
    },
    "user_profiles": "disabled",
    "username_expressions": [
      "http.request.body.form[\"username\"][0]",
      "lookup_json_string(http.request.body.raw, \"username\")"
    ]
  }
}
```

## Domain Types

### Fraud Settings

- `FraudSettings object { authentication_settings, user_profiles, username_expressions }`

  - `authentication_settings: optional object { failure_criteria, success_criteria }`

    Configuration for classifying login authentication outcomes based on the origin response.
    Requires `user_profiles` to be enabled.

    - Success and failure criteria are independently updatable — sending only `success_criteria`
      leaves failure codes untouched, and vice versa.
    - Omit `authentication_settings` entirely to leave both unchanged.
    - Status codes must not overlap between success and failure criteria.

    - `failure_criteria: optional object { kind, status_codes }`

      Criterion for identifying failed login responses.

      - `kind: "status_code"`

        The type of criterion. Currently only `status_code` is supported.

        - `"status_code"`

      - `status_codes: optional array of number`

        HTTP status codes to match against the origin response.

        - Maximum of 10 codes per criterion.
        - Each code must be a valid HTTP status code (100-599).
        - Codes are deduplicated and sorted on save.
        - Omit to leave unchanged on update.
        - Provide an empty array `[]` to clear codes on update.

    - `success_criteria: optional object { kind, status_codes }`

      Criterion for identifying successful login responses.

      - `kind: "status_code"`

        The type of criterion. Currently only `status_code` is supported.

        - `"status_code"`

      - `status_codes: optional array of number`

        HTTP status codes to match against the origin response.

        - Maximum of 10 codes per criterion.
        - Each code must be a valid HTTP status code (100-599).
        - Codes are deduplicated and sorted on save.
        - Omit to leave unchanged on update.
        - Provide an empty array `[]` to clear codes on update.

  - `user_profiles: optional "enabled" or "disabled"`

    Whether Fraud User Profiles is enabled for the zone.

    - `"enabled"`

    - `"disabled"`

  - `username_expressions: optional array of string`

    List of expressions to detect usernames in write HTTP requests.

    - Maximum of 10 expressions.
    - Omit or set to null to leave unchanged on update.
    - Provide an empty array `[]` to clear all expressions on update.
    - Invalid expressions will result in a 10400 Bad Request with details in the `messages` array.
