## List images V2

**get** `/accounts/{account_id}/images/v2`

List up to 10000 images from CF Images, with up to 1000 results per page. Use the optional parameters below to get a specific range of images.
Pagination is supported via continuation_token.

**Metadata Filtering (Optional):**

You can optionally filter images by custom metadata fields using the `meta.<field>[<operator>]=<value>` syntax.

**Supported Operators:**

- `eq` / `eq:string` / `eq:number` / `eq:boolean` - Exact match
- `gt` / `gt:number` - Greater than (number only)
- `gte` / `gte:number` - Greater than or equal (number only)
- `lt` / `lt:number` - Less than (number only)
- `lte` / `lte:number` - Less than or equal (number only)
- `in` / `in:string` / `in:number` - Match any value in list (pipe-separated)

**Metadata Filter Constraints:**

- Maximum 5 metadata filters per request
- Maximum 5 levels of nesting (e.g., `meta.first.second.third.fourth.fifth`)
- Maximum 10 elements for list operators (`in`)
- Supports string, number, and boolean value types
- Range operators (`gt`, `gte`, `lt`, `lte`) only accept numeric values

**Filter Consistency:**
Filters are combined with AND logic. The system does not validate whether filter combinations are logically consistent. For example, `meta.priority[eq:number]=5&meta.priority[lte:number]=3` will return zero results because no value can satisfy both conditions simultaneously. It is the caller's responsibility to ensure filter combinations make sense.

**Examples:**

```
# List all images
/images/v2

# Filter by metadata [eq]
/images/v2?meta.status[eq:string]=active

# Filter by metadata [in]
/images/v2?meta.status[in]=pending|deleted|flagged

# Filter by metadata [in:number]
/images/v2?meta.ratings[in:number]=4|5

# Filter by metadata range [gte:number]
/images/v2?meta.priority[gte:number]=1

# Filter by bounded range
/images/v2?meta.priority[gte:number]=1&meta.priority[lte:number]=5

# Filter by nested metadata
/images/v2?meta.region.name[eq]=eu-west

# Combine metadata filters with creator
/images/v2?meta.status[eq]=active&creator=user123

# Multiple metadata filters (AND logic)
/images/v2?meta.status[eq]=active&meta.priority[eq:number]=5
```

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `continuation_token: optional string`

  Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint.

- `creator: optional string`

  Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set

- `meta: optional object { "<field>[<operator>]" }`

  - `"<field>[<operator>]": optional string`

    Optional metadata filter(s). Multiple filters can be combined with AND logic.

    **Operators:**

    - `eq`, `eq:string`, `eq:number`, `eq:boolean` - Exact match
    - `gt`, `gt:number` - Greater than (number only)
    - `gte`, `gte:number` - Greater than or equal (number only)
    - `lt`, `lt:number` - Less than (number only)
    - `lte`, `lte:number` - Less than or equal (number only)
    - `in`, `in:string`, `in:number` - Match any value in pipe-separated list

    **Examples:**

    - `meta.status[eq]=active`
    - `meta.priority[eq:number]=5`
    - `meta.enabled[eq:boolean]=true`
    - `meta.priority[gte:number]=1`
    - `meta.score[lt:number]=100`
    - `meta.region[in]=us-east|us-west|eu-west`

    **Note:** Filter consistency is not validated. Contradictory filters (e.g., `meta.priority[eq:number]=5&meta.priority[lte:number]=3`) will return zero results.

- `per_page: optional number`

  Number of items per page

- `sort_order: optional "asc" or "desc"`

  Sorting order by upload time

  - `"asc"`

  - `"desc"`

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

- `result: object { continuation_token, images }`

  - `continuation_token: optional string`

    Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint.

  - `images: optional array of Image`

    - `id: optional string`

      Image unique identifier.

    - `creator: optional string`

      Can set the creator field with an internal user ID.

    - `filename: optional string`

      Image file name.

    - `meta: optional unknown`

      User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes.

    - `requireSignedURLs: optional boolean`

      Indicates whether the image can be a accessed only using it's UID. If set to true, a signed token needs to be generated with a signing key to view the image.

    - `uploaded: optional string`

      When the media item was uploaded.

    - `variants: optional array of string`

      Object specifying available variants for an image.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v2 \
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
    "continuation_token": "continuation_token",
    "images": [
      {
        "id": "id",
        "creator": "107b9558-dd06-4bbd-5fef-9c2c16bb7900",
        "filename": "logo.png",
        "meta": {
          "key": "value"
        },
        "requireSignedURLs": true,
        "uploaded": "2014-01-02T02:20:00.123Z",
        "variants": [
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/thumbnail",
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/hero",
          "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/original"
        ]
      }
    ]
  },
  "success": true
}
```
