## List dispatch namespaces

**get** `/accounts/{account_id}/workers/dispatch/namespaces`

Fetch a list of Workers for Platforms namespaces.

### Path Parameters

- `account_id: string`

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

- `result: optional array of object { created_by, created_on, modified_by, 5 more }`

  - `created_by: optional string`

    Identifier.

  - `created_on: optional string`

    When the script was created.

  - `modified_by: optional string`

    Identifier.

  - `modified_on: optional string`

    When the script was last modified.

  - `namespace_id: optional string`

    API Resource UUID tag.

  - `namespace_name: optional string`

    Name of the Workers for Platforms dispatch namespace.

  - `script_count: optional number`

    The current number of scripts in this Dispatch Namespace.

  - `trusted_workers: optional boolean`

    Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for the zone in the Cache API, and has access to the `request.cf` object on incoming Requests. When a Worker is untrusted, caches are not shared across the zone, and `request.cf` is undefined. By default, Workers in a namespace are "untrusted".

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces \
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
      "created_by": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2017-01-01T00:00:00Z",
      "modified_by": "023e105f4ecef8ad9ca31a8372d0c353",
      "modified_on": "2017-01-01T00:00:00Z",
      "namespace_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "namespace_name": "my-dispatch-namespace",
      "script_count": 800,
      "trusted_workers": false
    }
  ]
}
```
