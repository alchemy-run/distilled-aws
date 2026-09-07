## List Sites

**get** `/accounts/{account_id}/magic/sites`

Lists Sites associated with an account. Use connectorid query param to return sites where connectorid matches either site.ConnectorID or site.SecondaryConnectorID.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `connectorid: optional string`

  Identifier

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

- `result: array of Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "connector_id": "ac60d3d0435248289d446cedd870bcf4",
      "description": "description",
      "ha_mode": true,
      "location": {
        "lat": "37.6192",
        "lon": "122.3816"
      },
      "name": "site_1",
      "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
    }
  ],
  "success": true
}
```
