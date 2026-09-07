## Modify organization profile.

**put** `/organizations/{organization_id}/profile`

Modify organization profile. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Body Parameters

- `business_address: string`

- `business_email: string`

- `business_name: string`

- `business_phone: string`

- `external_metadata: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/profile \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "business_address": "business_address",
          "business_email": "business_email",
          "business_name": "business_name",
          "business_phone": "business_phone",
          "external_metadata": "external_metadata"
        }'
```
