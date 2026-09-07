## Task Search

**get** `/accounts/{account_id}/ai/tasks/search`

Searches Workers AI models by task type (e.g., text-generation, embeddings).

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of string`

- `result: array of unknown`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/tasks/search \
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
