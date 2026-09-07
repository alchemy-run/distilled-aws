## Get Account-Level Metrics

**get** `/accounts/{account_id}/r2/metrics`

Get Storage/Object Count Metrics across all buckets in your account. Note that Account-Level Metrics may not immediately reflect the latest data.

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { infrequentAccess, standard }`

  Metrics based on the class they belong to.

  - `infrequentAccess: optional object { published, uploaded }`

    Metrics based on what state they are in(uploaded or published).

    - `published: optional object { metadataSize, objects, payloadSize }`

      Metrics on number of objects/amount of storage used.

      - `metadataSize: optional number`

        Amount of.

      - `objects: optional number`

        Number of objects stored.

      - `payloadSize: optional number`

        Amount of storage used by object data.

    - `uploaded: optional object { metadataSize, objects, payloadSize }`

      Metrics on number of objects/amount of storage used.

      - `metadataSize: optional number`

        Amount of.

      - `objects: optional number`

        Number of objects stored.

      - `payloadSize: optional number`

        Amount of storage used by object data.

  - `standard: optional object { published, uploaded }`

    Metrics based on what state they are in(uploaded or published).

    - `published: optional object { metadataSize, objects, payloadSize }`

      Metrics on number of objects/amount of storage used.

      - `metadataSize: optional number`

        Amount of.

      - `objects: optional number`

        Number of objects stored.

      - `payloadSize: optional number`

        Amount of storage used by object data.

    - `uploaded: optional object { metadataSize, objects, payloadSize }`

      Metrics on number of objects/amount of storage used.

      - `metadataSize: optional number`

        Amount of.

      - `objects: optional number`

        Number of objects stored.

      - `payloadSize: optional number`

        Amount of storage used by object data.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/metrics \
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
    "string"
  ],
  "result": {
    "infrequentAccess": {
      "published": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      },
      "uploaded": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      }
    },
    "standard": {
      "published": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      },
      "uploaded": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      }
    }
  },
  "success": true
}
```
