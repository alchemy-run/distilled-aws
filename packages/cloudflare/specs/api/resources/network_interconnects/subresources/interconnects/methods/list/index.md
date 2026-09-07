## List existing interconnects

**get** `/accounts/{account_id}/cni/interconnects`

List existing interconnects

### Path Parameters

- `account_id: string`

  Customer account tag

### Query Parameters

- `cursor: optional number`

- `limit: optional number`

- `site: optional string`

  If specified, only show interconnects located at the given site

- `type: optional string`

  If specified, only show interconnects of the given type

### Returns

- `items: array of object { account, facility, name, 5 more }  or object { account, name, region, 3 more }`

  - `NscInterconnectPhysicalBody object { account, facility, name, 5 more }`

    - `account: string`

    - `facility: object { address, name }`

      - `address: array of string`

      - `name: string`

    - `name: string`

    - `site: string`

      A Cloudflare site name.

    - `slot_id: string`

    - `speed: string`

    - `type: string`

    - `owner: optional string`

  - `NscInterconnectGcpPartnerBody object { account, name, region, 3 more }`

    - `account: string`

    - `name: string`

    - `region: string`

    - `type: string`

    - `owner: optional string`

    - `speed: optional "50M" or "100M" or "200M" or 9 more`

      Bandwidth structure as visible through the customer-facing API.

      - `"50M"`

      - `"100M"`

      - `"200M"`

      - `"300M"`

      - `"400M"`

      - `"500M"`

      - `"1G"`

      - `"2G"`

      - `"5G"`

      - `"10G"`

      - `"20G"`

      - `"50G"`

- `next: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": [
    {
      "account": "account",
      "facility": {
        "address": [
          "string"
        ],
        "name": "name"
      },
      "name": "name",
      "site": "site",
      "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "speed": "speed",
      "type": "type",
      "owner": "owner"
    }
  ],
  "next": 0
}
```
