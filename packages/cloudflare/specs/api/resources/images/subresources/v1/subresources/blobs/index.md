# Blobs

## Download image

**get** `/accounts/{account_id}/images/v1/{image_id}/blob`

Download an image from CF Images. For most images this will be the originally uploaded file. For larger images it can be a near-lossless version of the original.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `image_id: string`

  Image unique identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/$IMAGE_ID/blob \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
