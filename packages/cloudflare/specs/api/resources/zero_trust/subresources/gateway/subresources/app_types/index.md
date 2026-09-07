# App Types

## List application and application type mappings

**get** `/accounts/{account_id}/gateway/app_types`

List all application and application type mappings.

### Path Parameters

- `account_id: string`

  Provide the identifier string.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of AppType`

  - `ZeroTrustGatewayApplication object { id, application_type_id, created_at, name }`

    - `id: optional number`

      Identify this application. Only one application per ID.

    - `application_type_id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `name: optional string`

      Specify the name of the application or application type.

  - `ZeroTrustGatewayApplicationType object { id, created_at, description, name }`

    - `id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `description: optional string`

      Provide a short summary of applications with this type.

    - `name: optional string`

      Specify the name of the application or application type.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/app_types \
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
      "id": 0,
      "application_type_id": 0,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "name": "Facebook"
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

## Domain Types

### App Type

- `AppType = object { id, application_type_id, created_at, name }  or object { id, created_at, description, name }`

  - `ZeroTrustGatewayApplication object { id, application_type_id, created_at, name }`

    - `id: optional number`

      Identify this application. Only one application per ID.

    - `application_type_id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `name: optional string`

      Specify the name of the application or application type.

  - `ZeroTrustGatewayApplicationType object { id, created_at, description, name }`

    - `id: optional number`

      Identify the type of this application. Multiple applications can share the same type. Refers to the `id` of a returned application type.

    - `created_at: optional string`

    - `description: optional string`

      Provide a short summary of applications with this type.

    - `name: optional string`

      Specify the name of the application or application type.
