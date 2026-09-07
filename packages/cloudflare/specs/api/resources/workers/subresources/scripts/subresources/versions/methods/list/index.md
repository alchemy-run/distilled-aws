## List Versions

**get** `/accounts/{account_id}/workers/scripts/{script_name}/versions`

List of Worker Versions. The first version in the list is the latest version.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script.

### Query Parameters

- `deployable: optional boolean`

  Only return versions that can be used in a deployment. Ignores pagination.

- `page: optional number`

  Current page.

- `per_page: optional number`

  Items per-page.

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

- `result: object { items }`

  - `items: optional array of object { id, metadata, number }`

    - `id: optional string`

      Unique identifier for the version.

    - `metadata: optional object { author_email, author_id, created_on, 3 more }`

      - `author_email: optional string`

        Email of the user who created the version.

      - `author_id: optional string`

        Identifier of the user who created the version.

      - `created_on: optional string`

        When the version was created.

      - `hasPreview: optional boolean`

        Whether the version can be previewed.

      - `modified_on: optional string`

        When the version was last modified.

      - `source: optional "unknown" or "api" or "wrangler" or 8 more`

        The source of the version upload.

        - `"unknown"`

        - `"api"`

        - `"wrangler"`

        - `"terraform"`

        - `"dash"`

        - `"cf_cli"`

        - `"dash_template"`

        - `"integration"`

        - `"quick_editor"`

        - `"playground"`

        - `"workersci"`

    - `number: optional number`

      Sequential version number.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/versions \
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
  "result": {
    "items": [
      {
        "id": "18f97339-c287-4872-9bdd-e2135c07ec12",
        "metadata": {
          "author_email": "user@example.com",
          "author_id": "408cbcdfd4dda4617efef40b04d168a1",
          "created_on": "2022-11-08T17:19:29.176266Z",
          "hasPreview": true,
          "modified_on": "2022-11-08T17:19:29.176266Z",
          "source": "api"
        },
        "number": 1
      }
    ]
  },
  "success": true
}
```
