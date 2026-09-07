## Delete a zone snippet

**delete** `/zones/{zone_id}/snippets/{snippet_name}`

Deletes a snippet belonging to the zone.

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

- `result: unknown`

  Contain the response result.

- `success: true`

  Indicate whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME \
    -X DELETE \
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
  "result": {},
  "success": true
}
```
