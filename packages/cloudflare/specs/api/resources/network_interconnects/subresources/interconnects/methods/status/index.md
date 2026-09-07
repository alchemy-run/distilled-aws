## Get the current status of an interconnect object

**get** `/accounts/{account_id}/cni/interconnects/{icon}/status`

Get the current status of an interconnect object

### Path Parameters

- `account_id: string`

  Customer account tag

- `icon: string`

### Returns

- `Pending object { state }`

  - `state: "Pending"`

    - `"Pending"`

- `Down object { state, reason }`

  - `state: "Down"`

    - `"Down"`

  - `reason: optional string`

    Diagnostic information, if available

- `Unhealthy object { state, reason }`

  - `state: "Unhealthy"`

    - `"Unhealthy"`

  - `reason: optional string`

    Diagnostic information, if available

- `Healthy object { state }`

  - `state: "Healthy"`

    - `"Healthy"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cni/interconnects/$ICON/status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "state": "Pending"
}
```
