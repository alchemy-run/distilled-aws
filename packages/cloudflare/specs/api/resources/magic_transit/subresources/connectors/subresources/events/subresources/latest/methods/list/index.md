## Get latest Events

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/latest`

Get latest Events

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `result: object { count, items }`

  - `count: number`

  - `items: array of object { e, n, t, v }`

    - `e: object { k }  or object { k }  or object { k }  or 18 more`

      - `Init object { k }`

        - `k: "Init"`

          Initialized process

          - `"Init"`

      - `Leave object { k }`

        - `k: "Leave"`

          Stopped process

          - `"Leave"`

      - `StartAttestation object { k }`

        - `k: "StartAttestation"`

          Started attestation

          - `"StartAttestation"`

      - `FinishAttestationSuccess object { k }`

        - `k: "FinishAttestationSuccess"`

          Finished attestation

          - `"FinishAttestationSuccess"`

      - `FinishAttestationFailure object { k }`

        - `k: "FinishAttestationFailure"`

          Failed attestation

          - `"FinishAttestationFailure"`

      - `StartRotateCryptKey object { k }`

        - `k: "StartRotateCryptKey"`

          Started crypt key rotation

          - `"StartRotateCryptKey"`

      - `FinishRotateCryptKeySuccess object { k }`

        - `k: "FinishRotateCryptKeySuccess"`

          Finished crypt key rotation

          - `"FinishRotateCryptKeySuccess"`

      - `FinishRotateCryptKeyFailure object { k }`

        - `k: "FinishRotateCryptKeyFailure"`

          Failed crypt key rotation

          - `"FinishRotateCryptKeyFailure"`

      - `StartRotatePki object { k }`

        - `k: "StartRotatePki"`

          Started PKI rotation

          - `"StartRotatePki"`

      - `FinishRotatePkiSuccess object { k }`

        - `k: "FinishRotatePkiSuccess"`

          Finished PKI rotation

          - `"FinishRotatePkiSuccess"`

      - `FinishRotatePkiFailure object { k }`

        - `k: "FinishRotatePkiFailure"`

          Failed PKI rotation

          - `"FinishRotatePkiFailure"`

      - `StartUpgrade object { k, url }`

        - `k: "StartUpgrade"`

          Started upgrade

          - `"StartUpgrade"`

        - `url: string`

          Location of upgrade bundle

      - `FinishUpgradeSuccess object { k }`

        - `k: "FinishUpgradeSuccess"`

          Finished upgrade

          - `"FinishUpgradeSuccess"`

      - `FinishUpgradeFailure object { k }`

        - `k: "FinishUpgradeFailure"`

          Failed upgrade

          - `"FinishUpgradeFailure"`

      - `Reconcile object { k }`

        - `k: "Reconcile"`

          Reconciled

          - `"Reconcile"`

      - `ConfigureCloudflaredTunnel object { k }`

        - `k: "ConfigureCloudflaredTunnel"`

          Configured Cloudflared tunnel

          - `"ConfigureCloudflaredTunnel"`

      - `RekeyInstallBoth object { k, tunnel_id }`

        - `k: "RekeyInstallBoth"`

          Installed initial inbound and outbound keys

          - `"RekeyInstallBoth"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyStart object { k, tunnel_id }`

        - `k: "RekeyStart"`

          Installed new inbound key, kept old outbound

          - `"RekeyStart"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyAdvance object { k, tunnel_id }`

        - `k: "RekeyAdvance"`

          Confirmed traffic on new inbound key, swapped outbound to new

          - `"RekeyAdvance"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyComplete object { k, tunnel_id }`

        - `k: "RekeyComplete"`

          Deleted old keys

          - `"RekeyComplete"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyReset object { k, tunnel_id }`

        - `k: "RekeyReset"`

          Deleted all keys after receiving an unexpected key

          - `"RekeyReset"`

        - `tunnel_id: string`

          Tunnel identifier

    - `n: number`

      Sequence number, used to order events with the same timestamp

    - `t: number`

      Time the Event was recorded (seconds since the Unix epoch)

    - `v: optional string`

      Version

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/events/latest \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "e": {
          "k": "Init"
        },
        "n": 0,
        "t": 0,
        "v": "v"
      }
    ]
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```
