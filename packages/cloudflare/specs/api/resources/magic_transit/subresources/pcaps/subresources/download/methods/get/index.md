## Download Simple PCAP

**get** `/accounts/{account_id}/pcaps/{pcap_id}/download`

Download PCAP information into a file. Response is a binary PCAP file.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
