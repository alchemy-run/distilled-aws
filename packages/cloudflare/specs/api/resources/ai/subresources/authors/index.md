# Authors

## Author Search

**get** `/accounts/{account_id}/ai/authors/search`

Searches Workers AI models by author or organization name.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of string`

- `result: array of unknown`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/authors/search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {}
  ],
  "messages": [
    "string"
  ],
  "result": [
    {}
  ],
  "success": true
}
```

## Domain Types

### Author List Response

- `AuthorListResponse = unknown`
