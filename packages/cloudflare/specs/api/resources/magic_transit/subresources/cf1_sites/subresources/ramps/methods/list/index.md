## List CF1 Site Ramps

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps`

Lists ramps (network connections) associated with a CF1 Site. Ramps represent GRE tunnels, IPsec tunnels, interconnects, or MCONN links.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: array of Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps \
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
      "created_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "primary_gre_ramp",
      "type": "gre",
      "description": "Primary CF GRE tunnel",
      "gre": {
        "managed_by": "managed_by"
      },
      "gre_interconnect": {
        "managed_by": "managed_by"
      },
      "ipsec": {
        "managed_by": "managed_by"
      },
      "mconn": {
        "managed_by": "managed_by"
      },
      "mpls_interconnect": {
        "managed_by": "managed_by"
      }
    }
  ],
  "success": true
}
```
