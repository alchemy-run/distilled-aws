## Get raw response

**get** `/accounts/{account_id}/urlscanner/v2/responses/{response_id}`

Returns the raw response of the network request. Find the `response_id` in the `data.requests.response.hash`.

### Path Parameters

- `account_id: string`

  Account ID.

- `response_id: string`

  Response hash.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/responses/$RESPONSE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
