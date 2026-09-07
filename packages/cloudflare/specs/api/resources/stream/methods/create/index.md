## Initiate video uploads using TUS

**post** `/accounts/{account_id}/stream`

Initiates a video upload using the TUS protocol. On success, the server responds with a status code 201 (created) and includes a `location` header to indicate where the content should be uploaded. Refer to https://tus.io for protocol details.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `direct_user: optional boolean`

  Provisions a URL to let your end users upload videos directly to Cloudflare Stream without exposing your API token to clients.

### Header Parameters

- `"Tus-Resumable": "1.0.0"`

  Specifies the TUS protocol version. This value must be included in every upload request.
  Notes: The only supported version of TUS protocol is 1.0.0.

  - `"1.0.0"`

- `"Upload-Length": number`

  Indicates the size of the entire upload in bytes. The value must be a non-negative integer.

- `"Upload-Creator": optional string`

  A user-defined identifier for the media creator.

- `"Upload-Metadata": optional string`

  Comma-separated key-value pairs following the TUS protocol specification. Values are Base-64 encoded.
  Supported keys: `name`, `requiresignedurls`, `allowedorigins`, `thumbnailtimestamppct`, `watermark`, `scheduleddeletion`, `maxdurationseconds`.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
