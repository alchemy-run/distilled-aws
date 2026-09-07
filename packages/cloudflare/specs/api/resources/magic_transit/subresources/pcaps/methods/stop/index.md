## Stop full PCAP

**put** `/accounts/{account_id}/pcaps/{pcap_id}/stop`

Stop full PCAP.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID/stop \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
