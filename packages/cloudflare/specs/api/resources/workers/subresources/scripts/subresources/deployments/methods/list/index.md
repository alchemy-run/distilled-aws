## List Deployments

**get** `/accounts/{account_id}/workers/scripts/{script_name}/deployments`

List of Worker Deployments. The first deployment in the list is the latest deployment actively serving traffic.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: object { deployments }`

  - `deployments: array of Deployment`

    - `id: string`

    - `created_on: string`

    - `source: string`

    - `strategy: "percentage"`

      - `"percentage"`

    - `versions: array of object { percentage, version_id }`

      - `percentage: number`

      - `version_id: string`

    - `annotations: optional object { "workers/message", "workers/triggered_by" }`

      - `"workers/message": optional string`

        Human-readable message about the deployment. Truncated to 1000 bytes if longer.

      - `"workers/triggered_by": optional string`

        Operation that triggered the creation of the deployment.

    - `author_email: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/deployments \
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
    "deployments": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_on": "2019-12-27T18:11:19.117Z",
        "source": "api",
        "strategy": "percentage",
        "versions": [
          {
            "percentage": 100,
            "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        ],
        "annotations": {
          "workers/message": "Deploy bug fix.",
          "workers/triggered_by": "deployment"
        },
        "author_email": "dev@stainless.com"
      }
    ]
  },
  "success": true
}
```
