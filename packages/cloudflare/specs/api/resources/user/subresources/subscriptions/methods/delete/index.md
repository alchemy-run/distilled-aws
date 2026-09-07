## Delete User Subscription

**delete** `/user/subscriptions/{identifier}`

Deletes a user's subscription.

### Path Parameters

- `identifier: string`

  Subscription identifier tag.

### Returns

- `subscription_id: optional string`

  Subscription identifier tag.

### Example

```http
curl https://api.cloudflare.com/client/v4/user/subscriptions/$IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "subscription_id": "506e3185e9c882d175a2d0cb0093d9f2"
}
```
