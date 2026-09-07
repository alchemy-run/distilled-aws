## Retrieve a list of all slots matching the specified parameters

**get** `/accounts/{account_id}/cni/slots`

Retrieve a list of all slots matching the specified parameters

### Path Parameters

- `account_id: string`

  Customer account tag

### Query Parameters

- `address_contains: optional string`

  If specified, only show slots with the given text in their address field

- `cursor: optional number`

- `limit: optional number`

- `occupied: optional boolean`

  If specified, only show slots with a specific occupied/unoccupied state

- `site: optional string`

  If specified, only show slots located at the given site

- `speed: optional string`

  If specified, only show slots that support the given speed

### Returns

- `items: array of object { id, facility, occupied, 3 more }`

  - `id: string`

    Slot ID

  - `facility: object { address, name }`

    - `address: array of string`

    - `name: string`

  - `occupied: boolean`

    Whether the slot is occupied or not

  - `site: string`

  - `speed: string`

  - `account: optional string`

    Customer account tag

- `next: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/slots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "facility": {
        "address": [
          "string"
        ],
        "name": "name"
      },
      "occupied": true,
      "site": "site",
      "speed": "speed",
      "account": "account"
    }
  ],
  "next": 0
}
```
