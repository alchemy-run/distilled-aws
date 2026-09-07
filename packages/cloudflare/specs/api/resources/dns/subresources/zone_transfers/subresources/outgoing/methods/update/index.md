## Update Primary Zone Configuration

**put** `/zones/{zone_id}/secondary_dns/outgoing`

Update primary zone configuration for outgoing zone transfers.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `name: string`

  Zone name.

- `peers: array of string`

  A list of peer tags.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "www.example.com.",
          "peers": [
            "23ff594956f20c2a721606e94745a8aa",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ]
        }'
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "last_transferred_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```
