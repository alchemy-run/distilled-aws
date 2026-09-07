## List zone snippets

**get** `/zones/{zone_id}/snippets`

Fetches all snippets belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

### Query Parameters

- `page: optional number`

  Specifies the current page number.

- `per_page: optional number`

  Specifies how many results to return per page.

### Returns

- `errors: array of object { message, code }`

  Lists error messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `messages: array of object { message, code }`

  Contain warning messages.

  - `message: string`

    Describes the message text.

  - `code: optional number`

    Identify the message code.

- `result: array of object { created_on, snippet_name, modified_on }`

  Contain snippets.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  Additional information to navigate the results.

  - `count: number`

    Specify the number of results in the current page.

  - `page: number`

    Specifies the current page number.

  - `per_page: number`

    Specifies how many results to return per page.

  - `total_count: number`

    Specify the total number of results.

  - `total_pages: number`

    Specify the total number of pages.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000
    }
  ],
  "result": [
    {
      "created_on": "2000-01-01T00:00:00.000000Z",
      "snippet_name": "my_snippet",
      "modified_on": "2000-01-01T00:00:00.000000Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 25,
    "total_count": 100,
    "total_pages": 10
  }
}
```
