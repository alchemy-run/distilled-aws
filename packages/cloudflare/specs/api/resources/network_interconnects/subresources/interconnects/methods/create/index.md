## Create a new interconnect

**post** `/accounts/{account_id}/cni/interconnects`

Create a new interconnect

### Path Parameters

- `account_id: string`

  Customer account tag

### Body Parameters

- `body: object { account, slot_id, type, speed }  or object { account, bandwidth, pairing_key, type }`

  - `NscInterconnectCreatePhysicalBody object { account, slot_id, type, speed }`

    - `account: string`

    - `slot_id: string`

    - `type: string`

    - `speed: optional string`

  - `NscInterconnectCreateGcpPartnerBody object { account, bandwidth, pairing_key, type }`

    - `account: string`

    - `bandwidth: "50M" or "100M" or "200M" or 9 more`

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

    - `pairing_key: string`

      Pairing key provided by GCP

    - `type: string`

### Returns

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account": "account",
          "slot_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "type": "type"
        }'
```

#### Response

```json
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
```
