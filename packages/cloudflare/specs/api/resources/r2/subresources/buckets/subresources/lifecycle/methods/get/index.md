## Get Object Lifecycle Rules

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle`

Get object lifecycle rules for a bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { rules }`

  - `rules: optional array of object { id, conditions, enabled, 3 more }`

    - `id: string`

      Unique identifier for this rule.

    - `conditions: object { prefix }`

      Conditions that apply to all transitions of this rule.

      - `prefix: string`

        Transitions will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

    - `enabled: boolean`

      Whether or not this rule is in effect.

    - `abortMultipartUploadsTransition: optional object { condition }`

      Transition to abort ongoing multipart uploads.

      - `condition: optional object { maxAge, type }`

        Condition for lifecycle transitions to apply after an object reaches an age in seconds.

        - `maxAge: number`

        - `type: "Age"`

          - `"Age"`

    - `deleteObjectsTransition: optional object { condition }`

      Transition to delete objects.

      - `condition: optional object { maxAge, type }  or object { date, type }`

        Condition for lifecycle transitions to apply after an object reaches an age in seconds.

        - `R2LifecycleAgeCondition object { maxAge, type }`

          Condition for lifecycle transitions to apply after an object reaches an age in seconds.

          - `maxAge: number`

          - `type: "Age"`

            - `"Age"`

        - `R2LifecycleDateCondition object { date, type }`

          Condition for lifecycle transitions to apply on a specific date.

          - `date: string`

          - `type: "Date"`

            - `"Date"`

    - `storageClassTransitions: optional array of object { condition, storageClass }`

      Transitions to change the storage class of objects.

      - `condition: object { maxAge, type }  or object { date, type }`

        Condition for lifecycle transitions to apply after an object reaches an age in seconds.

        - `R2LifecycleAgeCondition object { maxAge, type }`

          Condition for lifecycle transitions to apply after an object reaches an age in seconds.

          - `maxAge: number`

          - `type: "Age"`

            - `"Age"`

        - `R2LifecycleDateCondition object { date, type }`

          Condition for lifecycle transitions to apply on a specific date.

          - `date: string`

          - `type: "Date"`

            - `"Date"`

      - `storageClass: "InfrequentAccess"`

        - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/lifecycle \
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
    "rules": [
      {
        "id": "Expire all objects older than 24 hours",
        "conditions": {
          "prefix": "prefix"
        },
        "enabled": true,
        "abortMultipartUploadsTransition": {
          "condition": {
            "maxAge": 0,
            "type": "Age"
          }
        },
        "deleteObjectsTransition": {
          "condition": {
            "maxAge": 0,
            "type": "Age"
          }
        },
        "storageClassTransitions": [
          {
            "condition": {
              "maxAge": 0,
              "type": "Age"
            },
            "storageClass": "InfrequentAccess"
          }
        ]
      }
    ]
  },
  "success": true
}
```
