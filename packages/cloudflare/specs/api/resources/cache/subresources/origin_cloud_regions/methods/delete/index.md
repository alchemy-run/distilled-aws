## Delete an origin cloud region mapping

**delete** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Removes the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup. Returns the deleted IP on success. Returns 404 if no mapping exists for the specified IP. When the last mapping for the zone is removed the underlying rule record is also deleted.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { origin_ip }`

  Response result for a delete operation. Identifies the deleted mapping.

  - `origin_ip: string`

    The origin IP address whose mapping was deleted.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "origin_ip": "192.0.2.1"
  },
  "success": true
}
```
