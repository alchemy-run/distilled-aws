## Traceroute

**post** `/accounts/{account_id}/diagnostics/traceroute`

Run traceroutes from Cloudflare colos.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `targets: array of string`

- `colos: optional array of string`

  If no source colo names specified, all colos will be used. China colos are unavailable for traceroutes.

- `options: optional object { max_ttl, packet_type, packets_per_ttl, 2 more }`

  - `max_ttl: optional number`

    Max TTL.

  - `packet_type: optional "icmp" or "tcp" or "udp" or 2 more`

    Type of packet sent.

    - `"icmp"`

    - `"tcp"`

    - `"udp"`

    - `"gre"`

    - `"gre+icmp"`

  - `packets_per_ttl: optional number`

    Number of packets sent at each TTL.

  - `port: optional number`

    For UDP and TCP, specifies the destination port. For ICMP, specifies the initial ICMP sequence value. Default value 0 will choose the best value to use for each protocol.

  - `wait_time: optional number`

    Set the time (in seconds) to wait for a response to a probe.

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

- `result: optional array of Traceroute`

  - `colos: optional array of object { colo, error, hops, 2 more }`

    - `colo: optional object { city, name }`

      - `city: optional string`

        Source colo city.

      - `name: optional string`

        Source colo name.

    - `error: optional "" or "Could not gather traceroute data: Code 1" or "Could not gather traceroute data: Code 2" or 2 more`

      Errors resulting from collecting traceroute from colo to target.

      - `""`

      - `"Could not gather traceroute data: Code 1"`

      - `"Could not gather traceroute data: Code 2"`

      - `"Could not gather traceroute data: Code 3"`

      - `"Could not gather traceroute data: Code 4"`

    - `hops: optional array of object { nodes, packets_lost, packets_sent, packets_ttl }`

      - `nodes: optional array of object { asn, ip, labels, 6 more }`

        An array of node objects.

        - `asn: optional string`

          AS number associated with the node object.

        - `ip: optional string`

          IP address of the node.

        - `labels: optional array of string`

          Field appears if there is an additional annotation printed when the probe returns. Field also appears when running a GRE+ICMP traceroute to denote which traceroute a node comes from.

        - `max_rtt_ms: optional number`

          Maximum RTT in ms.

        - `mean_rtt_ms: optional number`

          Mean RTT in ms.

        - `min_rtt_ms: optional number`

          Minimum RTT in ms.

        - `name: optional string`

          Host name of the address, this may be the same as the IP address.

        - `packet_count: optional number`

          Number of packets with a response from this node.

        - `std_dev_rtt_ms: optional number`

          Standard deviation of the RTTs in ms.

      - `packets_lost: optional number`

        Number of packets where no response was received.

      - `packets_sent: optional number`

        Number of packets sent with specified TTL.

      - `packets_ttl: optional number`

        The time to live (TTL).

    - `target_summary: optional unknown`

      Aggregated statistics from all hops about the target.

    - `traceroute_time_ms: optional number`

      Total time of traceroute in ms.

  - `target: optional string`

    The target hostname, IPv6, or IPv6 address.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/diagnostics/traceroute \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "targets": [
            "203.0.113.1",
            "cloudflare.com"
          ],
          "colos": [
            "den",
            "sin"
          ],
          "options": {
            "max_ttl": 15,
            "packet_type": "icmp"
          }
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
  "result": [
    {
      "colos": [
        {
          "colo": {
            "city": "Denver, CO, US",
            "name": "den01"
          },
          "error": "",
          "hops": [
            {
              "nodes": [
                {
                  "asn": "AS13335",
                  "ip": "1.1.1.1",
                  "labels": [
                    "string"
                  ],
                  "max_rtt_ms": 0,
                  "mean_rtt_ms": 0,
                  "min_rtt_ms": 0,
                  "name": "one.one.one.one",
                  "packet_count": 3,
                  "std_dev_rtt_ms": 0
                }
              ],
              "packets_lost": 0,
              "packets_sent": 0,
              "packets_ttl": 0
            }
          ],
          "target_summary": {
            "asn": "",
            "ip": "1.1.1.1",
            "max_latency_ms": 0.034,
            "mean_latency_ms": 0.021,
            "min_latency_ms": 0.014,
            "name": "1.1.1.1",
            "packet_count": 3,
            "std_dev_latency_ms": 0.011269427669584647
          },
          "traceroute_time_ms": 0
        }
      ],
      "target": "1.1.1.1"
    }
  ]
}
```
