## Get a zone snippet

**get** `/zones/{zone_id}/snippets/{snippet_name}`

Fetches a snippet belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

- `snippet_name: string`

  Identify the snippet.

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

- `result: object { created_on, snippet_name, modified_on }`

  Contain the response result.

  - `created_on: string`

    Indicates when the snippet was created.

  - `snippet_name: string`

    Identify the snippet.

  - `modified_on: optional string`

    Indicates when the snippet was last modified.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME \
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
  "result": {
    "created_on": "2000-01-01T00:00:00.000000Z",
    "snippet_name": "my_snippet",
    "modified_on": "2000-01-01T00:00:00.000000Z"
  },
  "success": true
}
```
