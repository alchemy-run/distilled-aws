## Create CF1 Sites

**post** `/accounts/{account_id}/magic/cf1_sites`

Creates new CF1 Sites for an account. Each site must have a unique name within the account.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `body: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

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

- `result: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "name": "Pad 34",
            "description": "Launch Pad 34",
            "location": {
              "lat": 28.521339842093845,
              "long": -80.56092644815843,
              "name": "Cape Canaveral"
            }
          }
        ]'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "name": "Pad 34",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "description": "Launch Pad 34",
      "location": {
        "lat": 28.521339842093845,
        "long": -80.56092644815843,
        "name": "Cape Canaveral"
      },
      "modified_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```
