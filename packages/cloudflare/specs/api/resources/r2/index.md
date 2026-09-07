# R2

# Buckets

## List Buckets

**get** `/accounts/{account_id}/r2/buckets`

Lists all R2 buckets on your account.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cursor: optional string`

  Pagination cursor received during the last List Buckets call. R2 buckets are paginated using cursors instead of page numbers.

- `direction: optional "asc" or "desc"`

  Direction to order buckets.

  - `"asc"`

  - `"desc"`

- `name_contains: optional string`

  Bucket names to filter by. Only buckets with this phrase in their name will be returned.

- `order: optional "name"`

  Field to order buckets by.

  - `"name"`

- `per_page: optional number`

  Maximum number of buckets to return in a single call.

- `start_after: optional string`

  Bucket name to start searching after. Buckets are ordered lexicographically.

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

- `result: object { buckets }`

  - `buckets: optional array of Bucket`

    - `creation_date: optional string`

      Creation timestamp.

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      Jurisdiction where objects in this bucket are guaranteed to be stored.

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `location: optional "apac" or "eeur" or "enam" or 3 more`

      Location of the bucket.

      - `"apac"`

      - `"eeur"`

      - `"enam"`

      - `"weur"`

      - `"wnam"`

      - `"oc"`

    - `name: optional string`

      Name of the bucket.

    - `storage_class: optional "Standard" or "InfrequentAccess"`

      Storage class for newly uploaded objects, unless specified otherwise.

      - `"Standard"`

      - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { cursor, per_page }`

  - `cursor: optional string`

    A continuation token that should be used to fetch the next page of results.

  - `per_page: optional number`

    Maximum number of results on this page.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets \
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
    "buckets": [
      {
        "creation_date": "creation_date",
        "jurisdiction": "default",
        "location": "apac",
        "name": "example-bucket",
        "storage_class": "Standard"
      }
    ]
  },
  "success": true,
  "result_info": {
    "cursor": "1-JTdCJTIydiUyMiUzQTElMkMlMjJzdGFydEFmdGVyJTIyJTNBJTIyZGF2aWRwdWJsaWMlMjIlN0Q=",
    "per_page": 20
  }
}
```

## Get Bucket

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}`

Gets properties of an existing R2 bucket.

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

- `result: Bucket`

  A single R2 bucket.

  - `creation_date: optional string`

    Creation timestamp.

  - `jurisdiction: optional "default" or "eu" or "fedramp"`

    Jurisdiction where objects in this bucket are guaranteed to be stored.

    - `"default"`

    - `"eu"`

    - `"fedramp"`

  - `location: optional "apac" or "eeur" or "enam" or 3 more`

    Location of the bucket.

    - `"apac"`

    - `"eeur"`

    - `"enam"`

    - `"weur"`

    - `"wnam"`

    - `"oc"`

  - `name: optional string`

    Name of the bucket.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME \
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
    "creation_date": "creation_date",
    "jurisdiction": "default",
    "location": "apac",
    "name": "example-bucket",
    "storage_class": "Standard"
  },
  "success": true
}
```

## Create Bucket

**post** `/accounts/{account_id}/r2/buckets`

Creates a new R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Body Parameters

- `name: string`

  Name of the bucket.

- `locationHint: optional "apac" or "eeur" or "enam" or 3 more`

  Location of the bucket.

  - `"apac"`

  - `"eeur"`

  - `"enam"`

  - `"weur"`

  - `"wnam"`

  - `"oc"`

- `storageClass: optional "Standard" or "InfrequentAccess"`

  Storage class for newly uploaded objects, unless specified otherwise.

  - `"Standard"`

  - `"InfrequentAccess"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: Bucket`

  A single R2 bucket.

  - `creation_date: optional string`

    Creation timestamp.

  - `jurisdiction: optional "default" or "eu" or "fedramp"`

    Jurisdiction where objects in this bucket are guaranteed to be stored.

    - `"default"`

    - `"eu"`

    - `"fedramp"`

  - `location: optional "apac" or "eeur" or "enam" or 3 more`

    Location of the bucket.

    - `"apac"`

    - `"eeur"`

    - `"enam"`

    - `"weur"`

    - `"wnam"`

    - `"oc"`

  - `name: optional string`

    Name of the bucket.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "example-bucket"
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
    "string"
  ],
  "result": {
    "creation_date": "creation_date",
    "jurisdiction": "default",
    "location": "apac",
    "name": "example-bucket",
    "storage_class": "Standard"
  },
  "success": true
}
```

## Patch Bucket

**patch** `/accounts/{account_id}/r2/buckets/{bucket_name}`

Updates properties of an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Header Parameters

- `"cf-r2-storage-class": "Standard" or "InfrequentAccess"`

  Storage class for newly uploaded objects, unless specified otherwise.

  - `"Standard"`

  - `"InfrequentAccess"`

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

- `result: Bucket`

  A single R2 bucket.

  - `creation_date: optional string`

    Creation timestamp.

  - `jurisdiction: optional "default" or "eu" or "fedramp"`

    Jurisdiction where objects in this bucket are guaranteed to be stored.

    - `"default"`

    - `"eu"`

    - `"fedramp"`

  - `location: optional "apac" or "eeur" or "enam" or 3 more`

    Location of the bucket.

    - `"apac"`

    - `"eeur"`

    - `"enam"`

    - `"weur"`

    - `"wnam"`

    - `"oc"`

  - `name: optional string`

    Name of the bucket.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME \
    -X PATCH \
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
    "creation_date": "creation_date",
    "jurisdiction": "default",
    "location": "apac",
    "name": "example-bucket",
    "storage_class": "Standard"
  },
  "success": true
}
```

## Delete Bucket

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}`

Deletes an existing R2 bucket.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME \
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
    "string"
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Bucket

- `Bucket object { creation_date, jurisdiction, location, 2 more }`

  A single R2 bucket.

  - `creation_date: optional string`

    Creation timestamp.

  - `jurisdiction: optional "default" or "eu" or "fedramp"`

    Jurisdiction where objects in this bucket are guaranteed to be stored.

    - `"default"`

    - `"eu"`

    - `"fedramp"`

  - `location: optional "apac" or "eeur" or "enam" or 3 more`

    Location of the bucket.

    - `"apac"`

    - `"eeur"`

    - `"enam"`

    - `"weur"`

    - `"wnam"`

    - `"oc"`

  - `name: optional string`

    Name of the bucket.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

### Bucket List Response

- `BucketListResponse object { buckets }`

  - `buckets: optional array of Bucket`

    - `creation_date: optional string`

      Creation timestamp.

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      Jurisdiction where objects in this bucket are guaranteed to be stored.

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `location: optional "apac" or "eeur" or "enam" or 3 more`

      Location of the bucket.

      - `"apac"`

      - `"eeur"`

      - `"enam"`

      - `"weur"`

      - `"wnam"`

      - `"oc"`

    - `name: optional string`

      Name of the bucket.

    - `storage_class: optional "Standard" or "InfrequentAccess"`

      Storage class for newly uploaded objects, unless specified otherwise.

      - `"Standard"`

      - `"InfrequentAccess"`

### Bucket Delete Response

- `BucketDeleteResponse = unknown`

# Lifecycle

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

## Put Object Lifecycle Rules

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle`

Set the object lifecycle rules for a bucket.

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

### Body Parameters

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

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/lifecycle \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": {},
  "success": true
}
```

## Domain Types

### Lifecycle Get Response

- `LifecycleGetResponse object { rules }`

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

### Lifecycle Update Response

- `LifecycleUpdateResponse = unknown`

# CORS

## Get Bucket CORS Policy

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/cors`

Get the CORS policy for a bucket.

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

  - `rules: optional array of object { allowed, id, exposeHeaders, maxAgeSeconds }`

    - `allowed: object { methods, origins, headers }`

      Object specifying allowed origins, methods and headers for this CORS rule.

      - `methods: array of "GET" or "PUT" or "POST" or 2 more`

        Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.

        - `"GET"`

        - `"PUT"`

        - `"POST"`

        - `"DELETE"`

        - `"HEAD"`

      - `origins: array of string`

        Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.

      - `headers: optional array of string`

        Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.

    - `id: optional string`

      Identifier for this rule.

    - `exposeHeaders: optional array of string`

      Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.

    - `maxAgeSeconds: optional number`

      Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/cors \
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
        "allowed": {
          "methods": [
            "GET"
          ],
          "origins": [
            "http://localhost:3000"
          ],
          "headers": [
            "x-requested-by"
          ]
        },
        "id": "Allow Local Development",
        "exposeHeaders": [
          "Content-Encoding"
        ],
        "maxAgeSeconds": 3600
      }
    ]
  },
  "success": true
}
```

## Put Bucket CORS Policy

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/cors`

Set the CORS policy for a bucket.

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

### Body Parameters

- `rules: optional array of object { allowed, id, exposeHeaders, maxAgeSeconds }`

  - `allowed: object { methods, origins, headers }`

    Object specifying allowed origins, methods and headers for this CORS rule.

    - `methods: array of "GET" or "PUT" or "POST" or 2 more`

      Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.

      - `"GET"`

      - `"PUT"`

      - `"POST"`

      - `"DELETE"`

      - `"HEAD"`

    - `origins: array of string`

      Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.

    - `headers: optional array of string`

      Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.

  - `id: optional string`

    Identifier for this rule.

  - `exposeHeaders: optional array of string`

    Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.

  - `maxAgeSeconds: optional number`

    Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/cors \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": {},
  "success": true
}
```

## Delete Bucket CORS Policy

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/cors`

Delete the CORS policy for a bucket.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/cors \
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
    "string"
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### CORS Get Response

- `CORSGetResponse object { rules }`

  - `rules: optional array of object { allowed, id, exposeHeaders, maxAgeSeconds }`

    - `allowed: object { methods, origins, headers }`

      Object specifying allowed origins, methods and headers for this CORS rule.

      - `methods: array of "GET" or "PUT" or "POST" or 2 more`

        Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.

        - `"GET"`

        - `"PUT"`

        - `"POST"`

        - `"DELETE"`

        - `"HEAD"`

      - `origins: array of string`

        Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.

      - `headers: optional array of string`

        Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.

    - `id: optional string`

      Identifier for this rule.

    - `exposeHeaders: optional array of string`

      Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.

    - `maxAgeSeconds: optional number`

      Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.

### CORS Update Response

- `CORSUpdateResponse = unknown`

### CORS Delete Response

- `CORSDeleteResponse = unknown`

# Domains

# Custom

## List Custom Domains of Bucket

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom`

Gets a list of all custom domains registered with an existing R2 bucket.

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

- `result: object { domains }`

  - `domains: array of object { domain, enabled, status, 4 more }`

    - `domain: string`

      Domain name of the custom domain to be added.

    - `enabled: boolean`

      Whether this bucket is publicly accessible at the specified custom domain.

    - `status: object { ownership, ssl }`

      - `ownership: "pending" or "active" or "deactivated" or 3 more`

        Ownership status of the domain.

        - `"pending"`

        - `"active"`

        - `"deactivated"`

        - `"blocked"`

        - `"error"`

        - `"unknown"`

      - `ssl: "initializing" or "pending" or "active" or 3 more`

        SSL certificate status.

        - `"initializing"`

        - `"pending"`

        - `"active"`

        - `"deactivated"`

        - `"error"`

        - `"unknown"`

    - `ciphers: optional array of string`

      An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

      Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `zoneId: optional string`

      Zone ID of the custom domain resides in.

    - `zoneName: optional string`

      Zone that the custom domain resides in.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom \
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
    "domains": [
      {
        "domain": "prefix.example-domain.one.com",
        "enabled": false,
        "status": {
          "ownership": "deactivated",
          "ssl": "pending"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
        "zoneName": "example-domain.one.com"
      },
      {
        "domain": "prefix.example-domain.two.com",
        "enabled": true,
        "status": {
          "ownership": "active",
          "ssl": "active"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "d9d28585d5f8f5b0f857b055bf574f19",
        "zoneName": "zoneName"
      }
    ]
  },
  "success": true
}
```

## Get Custom Domain Settings

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Get the configuration for a custom domain on an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `domain: string`

  Name of the custom domain.

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

- `result: object { domain, enabled, status, 4 more }`

  - `domain: string`

    Domain name of the custom domain to be added.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `status: object { ownership, ssl }`

    - `ownership: "pending" or "active" or "deactivated" or 3 more`

      Ownership status of the domain.

      - `"pending"`

      - `"active"`

      - `"deactivated"`

      - `"blocked"`

      - `"error"`

      - `"unknown"`

    - `ssl: "initializing" or "pending" or "active" or 3 more`

      SSL certificate status.

      - `"initializing"`

      - `"pending"`

      - `"active"`

      - `"deactivated"`

      - `"error"`

      - `"unknown"`

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

  - `zoneId: optional string`

    Zone ID of the custom domain resides in.

  - `zoneName: optional string`

    Zone that the custom domain resides in.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
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
    "domain": "prefix.example-domain.one.com",
    "enabled": false,
    "status": {
      "ownership": "deactivated",
      "ssl": "pending"
    },
    "ciphers": [
      "string"
    ],
    "minTLS": "1.0",
    "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
    "zoneName": "example-domain.one.com"
  },
  "success": true
}
```

## Attach Custom Domain To Bucket

**post** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom`

Register a new custom domain for an existing R2 bucket.

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

### Body Parameters

- `domain: string`

  Name of the custom domain to be added.

- `enabled: boolean`

  Whether to enable public bucket access at the custom domain. If undefined, the domain will be enabled.

- `zoneId: string`

  Zone ID of the custom domain.

- `ciphers: optional array of string`

  An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

- `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

  Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

  - `"1.0"`

  - `"1.1"`

  - `"1.2"`

  - `"1.3"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { domain, enabled, zoneId, 2 more }`

  - `domain: string`

    Domain name of the affected custom domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `zoneId: string`

    Zone ID of the custom domain.

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain": "prefix.example-domain.com",
          "enabled": true,
          "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd"
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
    "string"
  ],
  "result": {
    "domain": "example-domain.com",
    "enabled": true,
    "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
    "ciphers": [
      "string"
    ],
    "minTLS": "1.0"
  },
  "success": true
}
```

## Configure Custom Domain Settings

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Edit the configuration for a custom domain on an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `domain: string`

  Name of the custom domain.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Body Parameters

- `ciphers: optional array of string`

  An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

- `enabled: optional boolean`

  Whether to enable public bucket access at the specified custom domain.

- `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

  Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to previous value.

  - `"1.0"`

  - `"1.1"`

  - `"1.2"`

  - `"1.3"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { domain, ciphers, enabled, minTLS }`

  - `domain: string`

    Domain name of the affected custom domain.

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `enabled: optional boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "domain": "example-domain.com",
    "ciphers": [
      "string"
    ],
    "enabled": true,
    "minTLS": "1.0"
  },
  "success": true
}
```

## Remove Custom Domain From Bucket

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Remove custom domain registration from an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `domain: string`

  Name of the custom domain.

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

- `result: object { domain }`

  - `domain: string`

    Name of the removed custom domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
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
    "string"
  ],
  "result": {
    "domain": "example-domain/custom-domain.com"
  },
  "success": true
}
```

## Domain Types

### Custom List Response

- `CustomListResponse object { domains }`

  - `domains: array of object { domain, enabled, status, 4 more }`

    - `domain: string`

      Domain name of the custom domain to be added.

    - `enabled: boolean`

      Whether this bucket is publicly accessible at the specified custom domain.

    - `status: object { ownership, ssl }`

      - `ownership: "pending" or "active" or "deactivated" or 3 more`

        Ownership status of the domain.

        - `"pending"`

        - `"active"`

        - `"deactivated"`

        - `"blocked"`

        - `"error"`

        - `"unknown"`

      - `ssl: "initializing" or "pending" or "active" or 3 more`

        SSL certificate status.

        - `"initializing"`

        - `"pending"`

        - `"active"`

        - `"deactivated"`

        - `"error"`

        - `"unknown"`

    - `ciphers: optional array of string`

      An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

      Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `zoneId: optional string`

      Zone ID of the custom domain resides in.

    - `zoneName: optional string`

      Zone that the custom domain resides in.

### Custom Get Response

- `CustomGetResponse object { domain, enabled, status, 4 more }`

  - `domain: string`

    Domain name of the custom domain to be added.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `status: object { ownership, ssl }`

    - `ownership: "pending" or "active" or "deactivated" or 3 more`

      Ownership status of the domain.

      - `"pending"`

      - `"active"`

      - `"deactivated"`

      - `"blocked"`

      - `"error"`

      - `"unknown"`

    - `ssl: "initializing" or "pending" or "active" or 3 more`

      SSL certificate status.

      - `"initializing"`

      - `"pending"`

      - `"active"`

      - `"deactivated"`

      - `"error"`

      - `"unknown"`

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

  - `zoneId: optional string`

    Zone ID of the custom domain resides in.

  - `zoneName: optional string`

    Zone that the custom domain resides in.

### Custom Create Response

- `CustomCreateResponse object { domain, enabled, zoneId, 2 more }`

  - `domain: string`

    Domain name of the affected custom domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `zoneId: string`

    Zone ID of the custom domain.

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

### Custom Update Response

- `CustomUpdateResponse object { domain, ciphers, enabled, minTLS }`

  - `domain: string`

    Domain name of the affected custom domain.

  - `ciphers: optional array of string`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `enabled: optional boolean`

    Whether this bucket is publicly accessible at the specified custom domain.

  - `minTLS: optional "1.0" or "1.1" or "1.2" or "1.3"`

    Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

### Custom Delete Response

- `CustomDeleteResponse object { domain }`

  - `domain: string`

    Name of the removed custom domain.

# Managed

## Get r2.dev Domain of Bucket

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed`

Gets state of public access over the bucket's R2-managed (r2.dev) domain.

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

- `result: object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/managed \
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
    "bucketId": "0113a9e4549cf9b1ff1bf56e04da0cef",
    "domain": "pub-0113a9e4549cf9b1ff1bf56e04da0cef.r2.dev",
    "enabled": true
  },
  "success": true
}
```

## Update r2.dev Domain of Bucket

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed`

Updates state of public access over the bucket's R2-managed (r2.dev) domain.

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

### Body Parameters

- `enabled: boolean`

  Whether to enable public bucket access at the r2.dev domain.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/managed \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "string"
  ],
  "result": {
    "bucketId": "0113a9e4549cf9b1ff1bf56e04da0cef",
    "domain": "pub-0113a9e4549cf9b1ff1bf56e04da0cef.r2.dev",
    "enabled": true
  },
  "success": true
}
```

## Domain Types

### Managed List Response

- `ManagedListResponse object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

### Managed Update Response

- `ManagedUpdateResponse object { bucketId, domain, enabled }`

  - `bucketId: string`

    Bucket ID.

  - `domain: string`

    Domain name of the bucket's r2.dev domain.

  - `enabled: boolean`

    Whether this bucket is publicly accessible at the r2.dev domain.

# Event Notifications

## List Event Notification Rules

**get** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration`

List all event notification rules for a bucket.

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

- `result: object { bucketName, queues }`

  - `bucketName: optional string`

    Name of the bucket.

  - `queues: optional array of object { queueId, queueName, rules }`

    List of queues associated with the bucket.

    - `queueId: optional string`

      Queue ID.

    - `queueName: optional string`

      Name of the queue.

    - `rules: optional array of object { actions, createdAt, description, 3 more }`

      - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

        Array of R2 object actions that will trigger notifications.

        - `"PutObject"`

        - `"CopyObject"`

        - `"DeleteObject"`

        - `"CompleteMultipartUpload"`

        - `"LifecycleDeletion"`

      - `createdAt: optional string`

        Timestamp when the rule was created.

      - `description: optional string`

        A description that can be used to identify the event notification rule after creation.

      - `prefix: optional string`

        Notifications will be sent only for objects with this prefix.

      - `ruleId: optional string`

        Rule ID.

      - `suffix: optional string`

        Notifications will be sent only for objects with this suffix.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration \
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
    "bucketName": "bucketName",
    "queues": [
      {
        "queueId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
        "queueName": "first-queue",
        "rules": [
          {
            "actions": [
              "PutObject",
              "CopyObject"
            ],
            "createdAt": "2024-09-19T21:54:48.405Z",
            "description": "Notifications from source bucket to queue",
            "prefix": "img/",
            "ruleId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
            "suffix": ".jpeg"
          }
        ]
      }
    ]
  },
  "success": true
}
```

## Get Event Notification Rule

**get** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}`

Get a single event notification rule.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `queue_id: string`

  Queue ID.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  The bucket jurisdiction.

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

- `result: object { queueId, queueName, rules }`

  - `queueId: optional string`

    Queue ID.

  - `queueName: optional string`

    Name of the queue.

  - `rules: optional array of object { actions, createdAt, description, 3 more }`

    - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

      Array of R2 object actions that will trigger notifications.

      - `"PutObject"`

      - `"CopyObject"`

      - `"DeleteObject"`

      - `"CompleteMultipartUpload"`

      - `"LifecycleDeletion"`

    - `createdAt: optional string`

      Timestamp when the rule was created.

    - `description: optional string`

      A description that can be used to identify the event notification rule after creation.

    - `prefix: optional string`

      Notifications will be sent only for objects with this prefix.

    - `ruleId: optional string`

      Rule ID.

    - `suffix: optional string`

      Notifications will be sent only for objects with this suffix.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration/queues/$QUEUE_ID \
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
    "queueId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
    "queueName": "first-queue",
    "rules": [
      {
        "actions": [
          "PutObject",
          "CopyObject"
        ],
        "createdAt": "2024-09-19T21:54:48.405Z",
        "description": "Notifications from source bucket to queue",
        "prefix": "img/",
        "ruleId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
        "suffix": ".jpeg"
      }
    ]
  },
  "success": true
}
```

## Create Event Notification Rule

**put** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}`

Create event notification rule.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `queue_id: string`

  Queue ID.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Body Parameters

- `rules: array of object { actions, description, prefix, suffix }`

  Array of rules to drive notifications.

  - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

    Array of R2 object actions that will trigger notifications.

    - `"PutObject"`

    - `"CopyObject"`

    - `"DeleteObject"`

    - `"CompleteMultipartUpload"`

    - `"LifecycleDeletion"`

  - `description: optional string`

    A description that can be used to identify the event notification rule after creation.

  - `prefix: optional string`

    Notifications will be sent only for objects with this prefix.

  - `suffix: optional string`

    Notifications will be sent only for objects with this suffix.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration/queues/$QUEUE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "rules": [
            {
              "actions": [
                "PutObject",
                "CopyObject"
              ]
            }
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
    "string"
  ],
  "result": {},
  "success": true
}
```

## Delete Event Notification Rules

**delete** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}`

Delete an event notification rule. **If no body is provided, all rules for specified queue will be deleted**.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `queue_id: string`

  Queue ID.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration/queues/$QUEUE_ID \
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
    "string"
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Event Notification List Response

- `EventNotificationListResponse object { bucketName, queues }`

  - `bucketName: optional string`

    Name of the bucket.

  - `queues: optional array of object { queueId, queueName, rules }`

    List of queues associated with the bucket.

    - `queueId: optional string`

      Queue ID.

    - `queueName: optional string`

      Name of the queue.

    - `rules: optional array of object { actions, createdAt, description, 3 more }`

      - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

        Array of R2 object actions that will trigger notifications.

        - `"PutObject"`

        - `"CopyObject"`

        - `"DeleteObject"`

        - `"CompleteMultipartUpload"`

        - `"LifecycleDeletion"`

      - `createdAt: optional string`

        Timestamp when the rule was created.

      - `description: optional string`

        A description that can be used to identify the event notification rule after creation.

      - `prefix: optional string`

        Notifications will be sent only for objects with this prefix.

      - `ruleId: optional string`

        Rule ID.

      - `suffix: optional string`

        Notifications will be sent only for objects with this suffix.

### Event Notification Get Response

- `EventNotificationGetResponse object { queueId, queueName, rules }`

  - `queueId: optional string`

    Queue ID.

  - `queueName: optional string`

    Name of the queue.

  - `rules: optional array of object { actions, createdAt, description, 3 more }`

    - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

      Array of R2 object actions that will trigger notifications.

      - `"PutObject"`

      - `"CopyObject"`

      - `"DeleteObject"`

      - `"CompleteMultipartUpload"`

      - `"LifecycleDeletion"`

    - `createdAt: optional string`

      Timestamp when the rule was created.

    - `description: optional string`

      A description that can be used to identify the event notification rule after creation.

    - `prefix: optional string`

      Notifications will be sent only for objects with this prefix.

    - `ruleId: optional string`

      Rule ID.

    - `suffix: optional string`

      Notifications will be sent only for objects with this suffix.

### Event Notification Update Response

- `EventNotificationUpdateResponse = unknown`

### Event Notification Delete Response

- `EventNotificationDeleteResponse = unknown`

# Locks

## Get Bucket Lock Rules

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/lock`

Get lock rules for a bucket.

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

  - `rules: optional array of object { id, condition, enabled, prefix }`

    - `id: string`

      Unique identifier for this rule.

    - `condition: object { maxAgeSeconds, type }  or object { date, type }  or object { type }`

      Condition to apply a lock rule to an object for how long in seconds.

      - `R2LockRuleAgeCondition object { maxAgeSeconds, type }`

        Condition to apply a lock rule to an object for how long in seconds.

        - `maxAgeSeconds: number`

        - `type: "Age"`

          - `"Age"`

      - `R2LockRuleDateCondition object { date, type }`

        Condition to apply a lock rule to an object until a specific date.

        - `date: string`

        - `type: "Date"`

          - `"Date"`

      - `R2LockRuleIndefiniteCondition object { type }`

        Condition to apply a lock rule indefinitely.

        - `type: "Indefinite"`

          - `"Indefinite"`

    - `enabled: boolean`

      Whether or not this rule is in effect.

    - `prefix: optional string`

      Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/lock \
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
        "id": "Lock all objects for 24 hours",
        "condition": {
          "maxAgeSeconds": 100,
          "type": "Age"
        },
        "enabled": true,
        "prefix": "prefix"
      }
    ]
  },
  "success": true
}
```

## Put Bucket Lock Rules

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/lock`

Set lock rules for a bucket.

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

### Body Parameters

- `rules: optional array of object { id, condition, enabled, prefix }`

  - `id: string`

    Unique identifier for this rule.

  - `condition: object { maxAgeSeconds, type }  or object { date, type }  or object { type }`

    Condition to apply a lock rule to an object for how long in seconds.

    - `R2LockRuleAgeCondition object { maxAgeSeconds, type }`

      Condition to apply a lock rule to an object for how long in seconds.

      - `maxAgeSeconds: number`

      - `type: "Age"`

        - `"Age"`

    - `R2LockRuleDateCondition object { date, type }`

      Condition to apply a lock rule to an object until a specific date.

      - `date: string`

      - `type: "Date"`

        - `"Date"`

    - `R2LockRuleIndefiniteCondition object { type }`

      Condition to apply a lock rule indefinitely.

      - `type: "Indefinite"`

        - `"Indefinite"`

  - `enabled: boolean`

    Whether or not this rule is in effect.

  - `prefix: optional string`

    Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/lock \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": {},
  "success": true
}
```

## Domain Types

### Lock Get Response

- `LockGetResponse object { rules }`

  - `rules: optional array of object { id, condition, enabled, prefix }`

    - `id: string`

      Unique identifier for this rule.

    - `condition: object { maxAgeSeconds, type }  or object { date, type }  or object { type }`

      Condition to apply a lock rule to an object for how long in seconds.

      - `R2LockRuleAgeCondition object { maxAgeSeconds, type }`

        Condition to apply a lock rule to an object for how long in seconds.

        - `maxAgeSeconds: number`

        - `type: "Age"`

          - `"Age"`

      - `R2LockRuleDateCondition object { date, type }`

        Condition to apply a lock rule to an object until a specific date.

        - `date: string`

        - `type: "Date"`

          - `"Date"`

      - `R2LockRuleIndefiniteCondition object { type }`

        Condition to apply a lock rule indefinitely.

        - `type: "Indefinite"`

          - `"Indefinite"`

    - `enabled: boolean`

      Whether or not this rule is in effect.

    - `prefix: optional string`

      Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

### Lock Update Response

- `LockUpdateResponse = unknown`

# Metrics

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

## Domain Types

### Metric List Response

- `MetricListResponse object { infrequentAccess, standard }`

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

# Sippy

## Get Sippy Configuration

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/sippy`

Gets configuration for Sippy for an existing R2 bucket.

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

- `result: Sippy`

  - `destination: optional object { accessKeyId, account, bucket, provider }`

    Details about the configured destination bucket.

    - `accessKeyId: optional string`

      ID of the Cloudflare API token used when writing objects to this
      bucket.

    - `account: optional string`

    - `bucket: optional string`

      Name of the bucket on the provider.

    - `provider: optional Provider`

      - `"r2"`

  - `enabled: optional boolean`

    State of Sippy for this bucket.

  - `source: optional object { bucket, bucketUrl, provider, region }`

    Details about the configured source bucket.

    - `bucket: optional string`

      Name of the bucket on the provider (AWS, GCS only).

    - `bucketUrl: optional string`

      S3-compatible URL (Generic S3-compatible providers only).

    - `provider: optional "aws" or "gcs" or "s3"`

      - `"aws"`

      - `"gcs"`

      - `"s3"`

    - `region: optional string`

      Region where the bucket resides (AWS only).

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/sippy \
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
    "destination": {
      "accessKeyId": "accessKeyId",
      "account": "account",
      "bucket": "bucket",
      "provider": "r2"
    },
    "enabled": true,
    "source": {
      "bucket": "bucket",
      "bucketUrl": "bucketUrl",
      "provider": "aws",
      "region": "region"
    }
  },
  "success": true
}
```

## Enable Sippy

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/sippy`

Sets configuration for Sippy for an existing R2 bucket.

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

### Body Parameters

- `body: object { destination, source }  or object { destination, source }  or object { destination, source }`

  - `R2EnableSippyAws object { destination, source }`

    - `destination: optional object { accessKeyId, provider, secretAccessKey }`

      R2 bucket to copy objects to.

      - `accessKeyId: optional string`

        ID of a Cloudflare API token.
        This is the value labelled "Access Key ID" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

      - `provider: optional Provider`

        - `"r2"`

      - `secretAccessKey: optional string`

        Value of a Cloudflare API token.
        This is the value labelled "Secret Access Key" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

    - `source: optional object { accessKeyId, bucket, provider, 2 more }`

      AWS S3 bucket to copy objects from.

      - `accessKeyId: optional string`

        Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).

      - `bucket: optional string`

        Name of the AWS S3 bucket.

      - `provider: optional "aws"`

        - `"aws"`

      - `region: optional string`

        Name of the AWS availability zone.

      - `secretAccessKey: optional string`

        Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

  - `R2EnableSippyGcs object { destination, source }`

    - `destination: optional object { accessKeyId, provider, secretAccessKey }`

      R2 bucket to copy objects to.

      - `accessKeyId: optional string`

        ID of a Cloudflare API token.
        This is the value labelled "Access Key ID" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

      - `provider: optional Provider`

      - `secretAccessKey: optional string`

        Value of a Cloudflare API token.
        This is the value labelled "Secret Access Key" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

    - `source: optional object { bucket, clientEmail, privateKey, provider }`

      GCS bucket to copy objects from.

      - `bucket: optional string`

        Name of the GCS bucket.

      - `clientEmail: optional string`

        Client email of an IAM credential (ideally scoped to a single GCS bucket).

      - `privateKey: optional string`

        Private Key of an IAM credential (ideally scoped to a single GCS bucket).

      - `provider: optional "gcs"`

        - `"gcs"`

  - `R2EnableSippyS3 object { destination, source }`

    - `destination: optional object { accessKeyId, provider, secretAccessKey }`

      R2 bucket to copy objects to.

      - `accessKeyId: optional string`

        ID of a Cloudflare API token.
        This is the value labelled "Access Key ID" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

      - `provider: optional Provider`

      - `secretAccessKey: optional string`

        Value of a Cloudflare API token.
        This is the value labelled "Secret Access Key" when creating an API.
        token from the [R2 dashboard](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).

        Sippy will use this token when writing objects to R2, so it is
        best to scope this token to the bucket you're enabling Sippy for.

    - `source: optional object { accessKeyId, bucketUrl, provider, secretAccessKey }`

      General S3-compatible provider to copy objects from.

      - `accessKeyId: optional string`

        Access Key ID of an IAM credential (ideally scoped to a single S3 bucket).

      - `bucketUrl: optional string`

        URL to the S3-compatible API of the bucket.

      - `provider: optional "s3"`

        - `"s3"`

      - `secretAccessKey: optional string`

        Secret Access Key of an IAM credential (ideally scoped to a single S3 bucket).

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: Sippy`

  - `destination: optional object { accessKeyId, account, bucket, provider }`

    Details about the configured destination bucket.

    - `accessKeyId: optional string`

      ID of the Cloudflare API token used when writing objects to this
      bucket.

    - `account: optional string`

    - `bucket: optional string`

      Name of the bucket on the provider.

    - `provider: optional Provider`

      - `"r2"`

  - `enabled: optional boolean`

    State of Sippy for this bucket.

  - `source: optional object { bucket, bucketUrl, provider, region }`

    Details about the configured source bucket.

    - `bucket: optional string`

      Name of the bucket on the provider (AWS, GCS only).

    - `bucketUrl: optional string`

      S3-compatible URL (Generic S3-compatible providers only).

    - `provider: optional "aws" or "gcs" or "s3"`

      - `"aws"`

      - `"gcs"`

      - `"s3"`

    - `region: optional string`

      Region where the bucket resides (AWS only).

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/sippy \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "destination": {
      "accessKeyId": "accessKeyId",
      "account": "account",
      "bucket": "bucket",
      "provider": "r2"
    },
    "enabled": true,
    "source": {
      "bucket": "bucket",
      "bucketUrl": "bucketUrl",
      "provider": "aws",
      "region": "region"
    }
  },
  "success": true
}
```

## Disable Sippy

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/sippy`

Disables Sippy on this bucket.

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

- `result: object { enabled }`

  - `enabled: optional false`

    - `false`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/sippy \
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
    "string"
  ],
  "result": {
    "enabled": false
  },
  "success": true
}
```

## Domain Types

### Provider

- `Provider = "r2"`

  - `"r2"`

### Sippy

- `Sippy object { destination, enabled, source }`

  - `destination: optional object { accessKeyId, account, bucket, provider }`

    Details about the configured destination bucket.

    - `accessKeyId: optional string`

      ID of the Cloudflare API token used when writing objects to this
      bucket.

    - `account: optional string`

    - `bucket: optional string`

      Name of the bucket on the provider.

    - `provider: optional Provider`

      - `"r2"`

  - `enabled: optional boolean`

    State of Sippy for this bucket.

  - `source: optional object { bucket, bucketUrl, provider, region }`

    Details about the configured source bucket.

    - `bucket: optional string`

      Name of the bucket on the provider (AWS, GCS only).

    - `bucketUrl: optional string`

      S3-compatible URL (Generic S3-compatible providers only).

    - `provider: optional "aws" or "gcs" or "s3"`

      - `"aws"`

      - `"gcs"`

      - `"s3"`

    - `region: optional string`

      Region where the bucket resides (AWS only).

### Sippy Delete Response

- `SippyDeleteResponse object { enabled }`

  - `enabled: optional false`

    - `false`

# Objects

## List Objects

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects`

Lists objects in an R2 bucket. Returns object metadata including key, size, etag, last modified date, HTTP metadata, and custom metadata.

For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Query Parameters

- `cursor: optional string`

  Pagination cursor received from a previous List Objects call. Used to retrieve the next page of results.

- `delimiter: optional string`

  A single character used to group keys. All keys that contain the delimiter between the prefix and the first occurrence of the delimiter after the prefix are grouped under a single result element.

- `per_page: optional number`

  Maximum number of objects to return per page.

- `prefix: optional string`

  Restricts results to only those objects whose keys begin with the specified prefix.

- `start_after: optional string`

  Returns objects with keys that come after the specified key in lexicographic order.

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

- `result: array of object { custom_metadata, etag, http_metadata, 5 more }`

  - `custom_metadata: optional map[string]`

    Custom metadata key-value pairs associated with the object.

  - `etag: optional string`

    The entity tag for the object. In JSON list/get responses this is the raw
    hex digest (without surrounding quotes). The HTTP `ETag` response header on
    Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

  - `http_metadata: optional object { cacheControl, cacheExpiry, contentDisposition, 3 more }`

    HTTP metadata associated with an R2 object.

    - `cacheControl: optional string`

      Specifies caching behavior for the object.

    - `cacheExpiry: optional string`

      The date and time at which the object's cache entry expires.

    - `contentDisposition: optional string`

      Specifies presentational information for the object.

    - `contentEncoding: optional string`

      Specifies the content encoding applied to the object.

    - `contentLanguage: optional string`

      The language of the object content.

    - `contentType: optional string`

      The MIME type of the object.

  - `key: optional string`

    The object key (name).

  - `last_modified: optional string`

    The date and time the object was last modified.

  - `size: optional number`

    The size of the object in bytes.

  - `ssec: optional boolean`

    Whether the object is encrypted with a customer-supplied encryption key.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { cursor, delimited, is_truncated, per_page }`

  Pagination information for list objects responses.

  - `cursor: optional string`

    Pagination cursor to use in the next List Objects call to retrieve the next page of results.

  - `delimited: optional array of string`

    Common prefixes found when a delimiter is specified. Each entry represents a group
    of keys sharing a common prefix up to the delimiter. Equivalent to S3's `CommonPrefixes`
    in `ListObjectsV2`; the field name differs because of the existing R2 API wire format.

  - `is_truncated: optional boolean`

    Whether the result was truncated. If true, use the cursor to retrieve the next page.

  - `per_page: optional number`

    The maximum number of objects returned per page.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects \
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
  "result": [
    {
      "custom_metadata": {},
      "etag": "d41d8cd98f00b204e9800998ecf8427e",
      "http_metadata": {
        "cacheControl": "max-age=3600",
        "cacheExpiry": "2024-12-31T23:59:59Z",
        "contentDisposition": "attachment; filename=\"example.jpg\"",
        "contentEncoding": "gzip",
        "contentLanguage": "en-US",
        "contentType": "image/jpeg"
      },
      "key": "path/to/my-object.txt",
      "last_modified": "2024-01-15T10:30:00Z",
      "size": 1048576,
      "ssec": false,
      "storage_class": "Standard"
    }
  ],
  "success": true,
  "result_info": {
    "cursor": "eyJrZXkiOiJwYXRoL3RvL215LW9iamVjdC50eHQifQ==",
    "delimited": [
      "path/to/",
      "another/path/"
    ],
    "is_truncated": true,
    "per_page": 20
  }
}
```

## Get Object

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}`

Retrieves an object from an R2 bucket. Returns the object body along with metadata headers.

For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `object_key: string`

  The key (name) of the object to retrieve. May contain slashes for path-like keys.
  Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded
  (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

- `"If-Modified-Since": optional string`

  Returns the object only if it has been modified since the specified time.
  Must be formatted as an HTTP-date (RFC 7231), e.g. `Tue, 15 Jan 2024 10:30:00 GMT`.

- `"If-None-Match": optional string`

  Returns the object only if its ETag does not match the given value.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Upload Object

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}`

Uploads an object to an R2 bucket. The object body is provided as the request body. Returns metadata about the uploaded object.

The maximum upload size for this endpoint is 300 MB. For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `object_key: string`

  The key (name) to assign to the object. May contain slashes for path-like keys.
  Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded
  (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

- `"cf-r2-storage-class": optional "Standard" or "InfrequentAccess"`

  Storage class for newly uploaded objects, unless specified otherwise.

  - `"Standard"`

  - `"InfrequentAccess"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { etag, key, size, 3 more }`

  Result of a successful object upload.

  - `etag: optional string`

    The entity tag for the uploaded object.

  - `key: optional string`

    The key (name) of the uploaded object.

  - `size: optional string`

    The size of the uploaded object in bytes (as a string).

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

  - `uploaded: optional string`

    The date and time the object was uploaded.

  - `version: optional string`

    The version UUID of the uploaded object.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -X PUT \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
    "etag": "d41d8cd98f00b204e9800998ecf8427e",
    "key": "path/to/my-object.txt",
    "size": "1048576",
    "storage_class": "Standard",
    "uploaded": "2024-01-15T10:30:00Z",
    "version": "3fd5b4a8-1234-5678-abcd-ef0123456789"
  },
  "success": true
}
```

## Delete Object

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}`

Deletes an object from an R2 bucket.

For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `object_key: string`

  The key (name) of the object to delete. May contain slashes for path-like keys.
  Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded
  (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

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

- `result: object { key }`

  Result of a successful object deletion.

  - `key: optional string`

    The key (name) of the deleted object.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
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
    "string"
  ],
  "result": {
    "key": "path/to/my-object.txt"
  },
  "success": true
}
```

## Domain Types

### Object List Response

- `ObjectListResponse object { custom_metadata, etag, http_metadata, 5 more }`

  Metadata for an R2 object.

  - `custom_metadata: optional map[string]`

    Custom metadata key-value pairs associated with the object.

  - `etag: optional string`

    The entity tag for the object. In JSON list/get responses this is the raw
    hex digest (without surrounding quotes). The HTTP `ETag` response header on
    Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

  - `http_metadata: optional object { cacheControl, cacheExpiry, contentDisposition, 3 more }`

    HTTP metadata associated with an R2 object.

    - `cacheControl: optional string`

      Specifies caching behavior for the object.

    - `cacheExpiry: optional string`

      The date and time at which the object's cache entry expires.

    - `contentDisposition: optional string`

      Specifies presentational information for the object.

    - `contentEncoding: optional string`

      Specifies the content encoding applied to the object.

    - `contentLanguage: optional string`

      The language of the object content.

    - `contentType: optional string`

      The MIME type of the object.

  - `key: optional string`

    The object key (name).

  - `last_modified: optional string`

    The date and time the object was last modified.

  - `size: optional number`

    The size of the object in bytes.

  - `ssec: optional boolean`

    Whether the object is encrypted with a customer-supplied encryption key.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

### Object Upload Response

- `ObjectUploadResponse object { etag, key, size, 3 more }`

  Result of a successful object upload.

  - `etag: optional string`

    The entity tag for the uploaded object.

  - `key: optional string`

    The key (name) of the uploaded object.

  - `size: optional string`

    The size of the uploaded object in bytes (as a string).

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

  - `uploaded: optional string`

    The date and time the object was uploaded.

  - `version: optional string`

    The version UUID of the uploaded object.

### Object Delete Response

- `ObjectDeleteResponse object { key }`

  Result of a successful object deletion.

  - `key: optional string`

    The key (name) of the deleted object.

# Temporary Credentials

## Create Temporary Access Credentials

**post** `/accounts/{account_id}/r2/temp-access-credentials`

Creates temporary access credentials on a bucket that can be optionally scoped to prefixes or objects.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `bucket: string`

  Name of the R2 bucket.

- `parentAccessKeyId: string`

  The parent access key id to use for signing.

- `permission: "admin-read-write" or "admin-read-only" or "object-read-write" or "object-read-only"`

  Permissions allowed on the credentials.

  - `"admin-read-write"`

  - `"admin-read-only"`

  - `"object-read-write"`

  - `"object-read-only"`

- `ttlSeconds: number`

  How long the credentials will live for in seconds.

- `objects: optional array of string`

  Optional object paths to scope the credentials to.

- `prefixes: optional array of string`

  Optional prefix paths to scope the credentials to.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { accessKeyId, secretAccessKey, sessionToken }`

  - `accessKeyId: optional string`

    ID for new access key.

  - `secretAccessKey: optional string`

    Secret access key.

  - `sessionToken: optional string`

    Security token.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/temp-access-credentials \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "example-bucket",
          "parentAccessKeyId": "example-access-key-id",
          "permission": "object-read-write",
          "ttlSeconds": 3600
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
    "string"
  ],
  "result": {
    "accessKeyId": "example-access-key-id",
    "secretAccessKey": "example-secret-key",
    "sessionToken": "example-session-token"
  },
  "success": true
}
```

## Domain Types

### Temporary Credential

- `TemporaryCredential object { bucket, parentAccessKeyId, permission, 3 more }`

  - `bucket: string`

    Name of the R2 bucket.

  - `parentAccessKeyId: string`

    The parent access key id to use for signing.

  - `permission: "admin-read-write" or "admin-read-only" or "object-read-write" or "object-read-only"`

    Permissions allowed on the credentials.

    - `"admin-read-write"`

    - `"admin-read-only"`

    - `"object-read-write"`

    - `"object-read-only"`

  - `ttlSeconds: number`

    How long the credentials will live for in seconds.

  - `objects: optional array of string`

    Optional object paths to scope the credentials to.

  - `prefixes: optional array of string`

    Optional prefix paths to scope the credentials to.

### Temporary Credential Create Response

- `TemporaryCredentialCreateResponse object { accessKeyId, secretAccessKey, sessionToken }`

  - `accessKeyId: optional string`

    ID for new access key.

  - `secretAccessKey: optional string`

    Secret access key.

  - `sessionToken: optional string`

    Security token.

# Super Slurper

# Jobs

## List jobs

**get** `/accounts/{account_id}/slurper/jobs`

Lists all R2 Super Slurper migration jobs for the account with their status.

### Path Parameters

- `account_id: string`

### Query Parameters

- `limit: optional number`

- `offset: optional number`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "id": "id",
      "createdAt": "createdAt",
      "finishedAt": "finishedAt",
      "overwrite": true,
      "source": {
        "bucket": "bucket",
        "endpoint": "https://example.com",
        "keys": [
          "string"
        ],
        "pathPrefix": "pathPrefix",
        "vendor": "s3"
      },
      "status": "running",
      "target": {
        "bucket": "bucket",
        "jurisdiction": "default",
        "vendor": "r2"
      }
    }
  ],
  "success": true
}
```

## Get job details

**get** `/accounts/{account_id}/slurper/jobs/{job_id}`

Retrieves detailed status and configuration for a specific R2 Super Slurper migration job.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
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
    "id": "id",
    "createdAt": "createdAt",
    "finishedAt": "finishedAt",
    "overwrite": true,
    "source": {
      "bucket": "bucket",
      "endpoint": "https://example.com",
      "keys": [
        "string"
      ],
      "pathPrefix": "pathPrefix",
      "vendor": "s3"
    },
    "status": "running",
    "target": {
      "bucket": "bucket",
      "jurisdiction": "default",
      "vendor": "r2"
    }
  },
  "success": true
}
```

## Create a job

**post** `/accounts/{account_id}/slurper/jobs`

Creates a new R2 Super Slurper migration job to transfer objects from a source bucket (e.g. S3, GCS, R2) to R2.

### Path Parameters

- `account_id: string`

### Body Parameters

- `overwrite: optional boolean`

- `source: optional object { bucket, secret, vendor, 4 more }  or object { bucket, secret, vendor, 2 more }  or object { bucket, secret, vendor, 3 more }`

  - `R2SlurperS3SourceSchema object { bucket, secret, vendor, 4 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: "s3"`

      - `"s3"`

    - `endpoint: optional string`

      Custom S3-compatible endpoint that must use https://.

    - `keys: optional array of string`

    - `pathPrefix: optional string`

    - `region: optional string`

  - `R2SlurperGcsSourceSchema object { bucket, secret, vendor, 2 more }`

    - `bucket: string`

    - `secret: object { clientEmail, privateKey }`

      - `clientEmail: string`

      - `privateKey: string`

    - `vendor: "gcs"`

      - `"gcs"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

  - `R2SlurperR2SourceSchema object { bucket, secret, vendor, 3 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: Provider`

      - `"r2"`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

- `target: optional object { bucket, secret, vendor, jurisdiction }`

  - `bucket: string`

  - `secret: object { accessKeyId, secretAccessKey }`

    - `accessKeyId: string`

    - `secretAccessKey: string`

  - `vendor: Provider`

  - `jurisdiction: optional "default" or "eu" or "fedramp"`

    - `"default"`

    - `"eu"`

    - `"fedramp"`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id }`

  - `id: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
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
    "id": "id"
  },
  "success": true
}
```

## Abort all jobs

**put** `/accounts/{account_id}/slurper/jobs/abortAll`

Cancels all running R2 Super Slurper migration jobs for the account. Any objects in the middle of a transfer will finish, but no new objects will start transferring.

### Path Parameters

- `account_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/abortAll \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Abort a job

**put** `/accounts/{account_id}/slurper/jobs/{job_id}/abort`

Cancels a specific R2 Super Slurper migration job. Any objects in the middle of a transfer will finish, but no new objects will start transferring.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/abort \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Pause a job

**put** `/accounts/{account_id}/slurper/jobs/{job_id}/pause`

Pauses a running R2 Super Slurper migration job. The job can be resumed later to continue transferring.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/pause \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Get job progress

**get** `/accounts/{account_id}/slurper/jobs/{job_id}/progress`

Retrieves current progress metrics for an R2 Super Slurper migration job

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { id, createdAt, failedObjects, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `failedObjects: optional number`

  - `objects: optional number`

  - `skippedObjects: optional number`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `transferredObjects: optional number`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/progress \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
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
    "id": "id",
    "createdAt": "createdAt",
    "failedObjects": 0,
    "objects": 0,
    "skippedObjects": 0,
    "status": "running",
    "transferredObjects": 0
  },
  "success": true
}
```

## Resume a job

**put** `/accounts/{account_id}/slurper/jobs/{job_id}/resume`

Resumes a paused R2 Super Slurper migration job, continuing the transfer from where it stopped.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/resume \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": "result",
  "success": true
}
```

## Domain Types

### Job List Response

- `JobListResponse object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

### Job Get Response

- `JobGetResponse object { id, createdAt, finishedAt, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `finishedAt: optional string`

  - `overwrite: optional boolean`

  - `source: optional object { bucket, endpoint, keys, 2 more }  or object { bucket, keys, pathPrefix, vendor }  or object { bucket, jurisdiction, keys, 2 more }`

    - `S3SourceResponseSchema object { bucket, endpoint, keys, 2 more }`

      - `bucket: optional string`

      - `endpoint: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "s3"`

        - `"s3"`

    - `GcsSourceResponseSchema object { bucket, keys, pathPrefix, vendor }`

      - `bucket: optional string`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional "gcs"`

        - `"gcs"`

    - `R2SourceResponseSchema object { bucket, jurisdiction, keys, 2 more }`

      - `bucket: optional string`

      - `jurisdiction: optional "default" or "eu" or "fedramp"`

        - `"default"`

        - `"eu"`

        - `"fedramp"`

      - `keys: optional array of string`

      - `pathPrefix: optional string`

      - `vendor: optional Provider`

        - `"r2"`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `target: optional object { bucket, jurisdiction, vendor }`

    - `bucket: optional string`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `vendor: optional Provider`

### Job Create Response

- `JobCreateResponse object { id }`

  - `id: optional string`

### Job Abort All Response

- `JobAbortAllResponse = string`

### Job Abort Response

- `JobAbortResponse = string`

### Job Pause Response

- `JobPauseResponse = string`

### Job Progress Response

- `JobProgressResponse object { id, createdAt, failedObjects, 4 more }`

  - `id: optional string`

  - `createdAt: optional string`

  - `failedObjects: optional number`

  - `objects: optional number`

  - `skippedObjects: optional number`

  - `status: optional "running" or "paused" or "aborted" or "completed"`

    - `"running"`

    - `"paused"`

    - `"aborted"`

    - `"completed"`

  - `transferredObjects: optional number`

### Job Resume Response

- `JobResumeResponse = string`

# Logs

## Get job logs

**get** `/accounts/{account_id}/slurper/jobs/{job_id}/logs`

Gets log entries for an R2 Super Slurper migration job, showing migration status changes, errors, etc.

### Path Parameters

- `account_id: string`

- `job_id: string`

### Query Parameters

- `limit: optional number`

- `offset: optional number`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional array of object { createdAt, job, logType, 2 more }`

  - `createdAt: optional string`

  - `job: optional string`

  - `logType: optional "migrationStart" or "migrationComplete" or "migrationAbort" or 12 more`

    - `"migrationStart"`

    - `"migrationComplete"`

    - `"migrationAbort"`

    - `"migrationError"`

    - `"migrationPause"`

    - `"migrationResume"`

    - `"migrationErrorFailedContinuation"`

    - `"importErrorRetryExhaustion"`

    - `"importSkippedStorageClass"`

    - `"importSkippedOversized"`

    - `"importSkippedEmptyObject"`

    - `"importSkippedUnsupportedContentType"`

    - `"importSkippedExcludedContentType"`

    - `"importSkippedInvalidMedia"`

    - `"importSkippedRequiresRetrieval"`

  - `message: optional string`

  - `objectKey: optional string`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/jobs/$JOB_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "createdAt": "createdAt",
      "job": "job",
      "logType": "migrationStart",
      "message": "message",
      "objectKey": "objectKey"
    }
  ],
  "success": true
}
```

## Domain Types

### Log List Response

- `LogListResponse object { createdAt, job, logType, 2 more }`

  - `createdAt: optional string`

  - `job: optional string`

  - `logType: optional "migrationStart" or "migrationComplete" or "migrationAbort" or 12 more`

    - `"migrationStart"`

    - `"migrationComplete"`

    - `"migrationAbort"`

    - `"migrationError"`

    - `"migrationPause"`

    - `"migrationResume"`

    - `"migrationErrorFailedContinuation"`

    - `"importErrorRetryExhaustion"`

    - `"importSkippedStorageClass"`

    - `"importSkippedOversized"`

    - `"importSkippedEmptyObject"`

    - `"importSkippedUnsupportedContentType"`

    - `"importSkippedExcludedContentType"`

    - `"importSkippedInvalidMedia"`

    - `"importSkippedRequiresRetrieval"`

  - `message: optional string`

  - `objectKey: optional string`

# Connectivity Precheck

## Check source connectivity

**put** `/accounts/{account_id}/slurper/source/connectivity-precheck`

Check whether tokens are valid against the source bucket

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: object { bucket, secret, vendor, 4 more }  or object { bucket, secret, vendor, 2 more }  or object { bucket, secret, vendor, 3 more }`

  - `R2SlurperS3SourceSchema object { bucket, secret, vendor, 4 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: "s3"`

      - `"s3"`

    - `endpoint: optional string`

      Custom S3-compatible endpoint that must use https://.

    - `keys: optional array of string`

    - `pathPrefix: optional string`

    - `region: optional string`

  - `R2SlurperGcsSourceSchema object { bucket, secret, vendor, 2 more }`

    - `bucket: string`

    - `secret: object { clientEmail, privateKey }`

      - `clientEmail: string`

      - `privateKey: string`

    - `vendor: "gcs"`

      - `"gcs"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

  - `R2SlurperR2SourceSchema object { bucket, secret, vendor, 3 more }`

    - `bucket: string`

    - `secret: object { accessKeyId, secretAccessKey }`

      - `accessKeyId: string`

      - `secretAccessKey: string`

    - `vendor: Provider`

      - `"r2"`

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `keys: optional array of string`

    - `pathPrefix: optional string`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/source/connectivity-precheck \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "bucket",
          "secret": {
            "accessKeyId": "accessKeyId",
            "secretAccessKey": "secretAccessKey"
          },
          "vendor": "s3"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
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
    "connectivityStatus": "success"
  },
  "success": true
}
```

## Check target connectivity

**put** `/accounts/{account_id}/slurper/target/connectivity-precheck`

Check whether tokens are valid against the target bucket

### Path Parameters

- `account_id: string`

### Body Parameters

- `bucket: string`

- `secret: object { accessKeyId, secretAccessKey }`

  - `accessKeyId: string`

  - `secretAccessKey: string`

- `vendor: Provider`

  - `"r2"`

- `jurisdiction: optional "default" or "eu" or "fedramp"`

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of string`

- `result: optional object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

- `success: optional true`

  Indicates if the API call was successful or not.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/slurper/target/connectivity-precheck \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "bucket",
          "secret": {
            "accessKeyId": "accessKeyId",
            "secretAccessKey": "secretAccessKey"
          },
          "vendor": "r2"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
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
    "connectivityStatus": "success"
  },
  "success": true
}
```

## Domain Types

### Connectivity Precheck Source Response

- `ConnectivityPrecheckSourceResponse object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`

### Connectivity Precheck Target Response

- `ConnectivityPrecheckTargetResponse object { connectivityStatus }`

  - `connectivityStatus: optional "success" or "error"`

    - `"success"`

    - `"error"`
