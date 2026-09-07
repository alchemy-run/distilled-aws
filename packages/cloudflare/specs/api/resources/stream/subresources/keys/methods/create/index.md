## Create signing keys

**post** `/accounts/{account_id}/stream/keys`

Creates an RSA private key in PEM and JWK formats. Key files are only displayed once after creation. Keys are created, used, and deleted independently of videos, and every key can sign any video.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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

- `result: optional Keys`

  - `id: optional string`

    Identifier.

  - `created: optional string`

    The date and time a signing key was created.

  - `jwk: optional string`

    The signing key in JWK format.

  - `pem: optional string`

    The signing key in PEM format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created": "2014-01-02T02:20:00Z",
    "jwk": "eyJ1c2UiOiJzaWciLCJrdHkiOiJSU0EiLCJraWQiOiI1MjEzY2ZhMTIxZjcwYjhjMTM4MDY4NmZmYzM3MWJhMyIsImFsZyI6IlJTMjU2IiwibiI6IjBUandqT2laV21KNDN2ZjNUbzREb1htWFd0SkdOR3lYZmh5dHRMYUJnRjEtRVFXUURLaG9LYm9hS21xakNBc21za3V0YkxVN1BVOGRrUU5ER1p3S3VWczA4elNaNGt4aTR0RWdQUFp5dDdkWEMtbFlSWW95ckFHRjRBWGh5MzI5YkhDUDFJbHJCQl9Ba0dnbmRMQWd1bnhZMHJSZ2N2T3ppYXc2S0p4Rm5jMlVLMFdVOGIwcDRLS0hHcDFLTDlkazBXVDhkVllxYmVSaUpqQ2xVRW1oOHl2OUNsT1ZhUzRLeGlYNnhUUTREWnc2RGFKZklWM1F0Tmd2cG1ieWxOSmFQSG5zc3JodDJHS1A5NjJlS2poUVJsaWd2SFhKTE9uSm9KZkxlSUVIWi1peFdmY1RETUg5MnNHdm93MURPanhMaUNOMXpISy1oN2JMb1hUaUxnYzRrdyIsImUiOiJBUUFCIiwiZCI6IndpQWEwaU5mWnNYSGNOcVMxSWhnUmdzVHJHay1TcFlYV2lReDZHTU9kWlJKekhGazN0bkRERFJvNHNKZTBxX0dEOWkzNlEyZkVadS15elpEcEJkc3U5OHNtaHhNU19Ta0s5X3VFYUo1Zm96V2IyN3JRRnFoLVliUU9MUThkUnNPRHZmQl9Hb2txWWJzblJDR3kzWkFaOGZJZ25ocXBUNEpiOHdsaWxpMUgxeFpzM3RnTWtkTEluTm1yMFAtcTYxZEtNd3JYZVRoSWNEc0kyb2Z1LTFtRm1MWndQb2ZGbmxaTW9QN1pfRU5pUGNfWGtWNzFhaHBOZE9pcW5ablZtMHBCNE5QS1UweDRWTjQyYlAzWEhMUmpkV2hJOGt3SC1BdXhqb3BLaHJ0R2tvcG1jZFRkM1ZRdElaOGRpZHByMXpBaEpvQi16ZVlIaTFUel9ZSFFld0FRUSIsInAiOiIyVTZFVUJka3U3TndDYXoyNzZuWGMxRXgwVHpNZjU4U0UtU2M2eUNaYWk2TkwzVURpWi1mNHlIdkRLYnFGUXdLWDNwZ0l2aVE3Y05QYUpkbE9NeS1mU21GTXU3V3hlbVZYamFlTjJCMkRDazhQY0NEOVgxU2hhR3E1ZUdSSHNObVUtSDNxTG1FRGpjLWliazRHZ0RNb2lVYjQ2OGxFZHAwU2pIOXdsOUdsYTgiLCJxIjoiOW5ucXg5ZnNNY2dIZ29DemhfVjJmaDhoRUxUSUM5aFlIOVBCTG9aQjZIaE1TWG1ja1BSazVnUlpPWlFEN002TzlMaWZjNmFDVXdEbjBlQzU2YkFDNUNrcWxjODJsVDhzTWlMeWJyTjh3bWotcjNjSTBGQTlfSGQySEY1ZkgycnJmenVqd0NWM3czb09Ud3p4d1g3c2xKbklRanphel91SzEyWEtucVZZcUYwIiwiZHAiOiJxQklTUTlfVUNWaV9Ucng0UU9VYnZoVU9jc2FUWkNHajJiNzNudU9YeElnOHFuZldSSnN4RG5zd2FKaXdjNWJjYnZ3M1h0VGhRd1BNWnhpeE1UMHFGNlFGWVY5WXZibnJ6UEp4YkdNdTZqajZYc2lIUjFlbWU3U09lVDM4Xzg0aFZyOXV6UkN2RWstb0R0MHlodW9YVzFGWVFNRTE2cGtMV0ZkUjdRUERsQUUiLCJkcSI6Im5zQUp3eXZFbW8tdW5wU01qYjVBMHB6MExCRjBZNFMxeGRJYXNfLVBSYzd0dThsVFdWMl8teExEOFR6dmhqX0lmY0RJR3JJZGNKNjlzVVZnR1M3ZnZkcng3Y21uNjFyai1XcmU0UVJFRC1lV1dxZDlpc2FVRmg5UGVKZ2tCbFZVVnYtdnladVlWdFF2a1NUU05ZR3RtVXl2V2xKZDBPWEFHRm9jdGlfak9aVSIsInFpIjoib0dYaWxLQ2NKRXNFdEE1eG54WUdGQW5UUjNwdkZLUXR5S0F0UGhHaHkybm5ya2VzN1RRaEFxMGhLRWZtU1RzaE1hNFhfd05aMEstX1F0dkdoNDhpeHdTTDVLTEwxZnFsY0k2TF9XUnF0cFQxS21LRERlUHR2bDVCUzFGbjgwSGFwR215cmZRWUU4S09QR2UwUl82S1BOZE1vc3dYQ3Nfd0RYMF92ZzNoNUxRIn0=",
    "pem": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcGdJQkFBS0NBUUVBMFRqd2pPaVpXbUo0M3ZmM1RvNERvWG1YV3RKR05HeVhmaHl0dExhQmdGMStFUVdRCkRLaG9LYm9hS21xakNBc21za3V0YkxVN1BVOGRrUU5ER1p3S3VWczA4elNaNGt4aTR0RWdQUFp5dDdkWEMrbFkKUllveXJBR0Y0QVhoeTMyOWJIQ1AxSWxyQkIvQWtHZ25kTEFndW54WTByUmdjdk96aWF3NktKeEZuYzJVSzBXVQo4YjBwNEtLSEdwMUtMOWRrMFdUOGRWWXFiZVJpSmpDbFVFbWg4eXY5Q2xPVmFTNEt4aVg2eFRRNERadzZEYUpmCklWM1F0Tmd2cG1ieWxOSmFQSG5zc3JodDJHS1A5NjJlS2poUVJsaWd2SFhKTE9uSm9KZkxlSUVIWitpeFdmY1QKRE1IOTJzR3ZvdzFET2p4TGlDTjF6SEsraDdiTG9YVGlMZ2M0a3dJREFRQUJBb0lCQVFEQ0lCclNJMTlteGNkdwoycExVaUdCR0N4T3NhVDVLbGhkYUpESG9ZdzUxbEVuTWNXVGUyY01NTkdqaXdsN1NyOFlQMkxmcERaOFJtNzdMCk5rT2tGMnk3M3l5YUhFeEw5S1FyMys0Um9ubCtqTlp2YnV0QVdxSDVodEE0dER4MUd3NE85OEg4YWlTcGh1eWQKRUliTGRrQm54OGlDZUdxbFBnbHZ6Q1dLV0xVZlhGbXplMkF5UjBzaWMyYXZRLzZyclYwb3pDdGQ1T0Vod093agphaCs3N1dZV1l0bkEraDhXZVZreWcvdG44UTJJOXo5ZVJYdlZxR2sxMDZLcWRtZFdiU2tIZzA4cFRUSGhVM2paCnMvZGNjdEdOMWFFanlUQWY0QzdHT2lrcUd1MGFTaW1aeDFOM2RWQzBobngySjJtdlhNQ0VtZ0g3TjVnZUxWUFAKOWdkQjdBQkJBb0dCQU5sT2hGQVhaTHV6Y0Ftczl1K3AxM05STWRFOHpIK2ZFaFBrbk9zZ21Xb3VqUzkxQTRtZgpuK01oN3d5bTZoVU1DbDk2WUNMNGtPM0RUMmlYWlRqTXZuMHBoVEx1MXNYcGxWNDJuamRnZGd3cFBEM0FnL1Y5ClVvV2hxdVhoa1I3RFpsUGg5Nmk1aEE0M1BvbTVPQm9BektJbEcrT3ZKUkhhZEVveC9jSmZScFd2QW9HQkFQWjUKNnNmWDdESElCNEtBczRmMWRuNGZJUkMweUF2WVdCL1R3UzZHUWVoNFRFbDVuSkQwWk9ZRVdUbVVBK3pPanZTNApuM09tZ2xNQTU5SGd1ZW13QXVRcEtwWFBOcFUvTERJaThtNnpmTUpvL3E5M0NOQlFQZngzZGh4ZVh4OXE2Mzg3Cm84QWxkOE42RGs4TThjRis3SlNaeUVJODJzLzdpdGRseXA2bFdLaGRBb0dCQUtnU0VrUGYxQWxZdjA2OGVFRGwKRzc0VkRuTEdrMlFobzltKzk1N2psOFNJUEtwMzFrU2JNUTU3TUdpWXNIT1czRzc4TjE3VTRVTUR6R2NZc1RFOQpLaGVrQldGZldMMjU2OHp5Y1d4akx1bzQrbDdJaDBkWHBudTBqbms5L1AvT0lWYS9iczBRcnhKUHFBN2RNb2JxCkYxdFJXRURCTmVxWkMxaFhVZTBEdzVRQkFvR0JBSjdBQ2NNcnhKcVBycDZVakkyK1FOS2M5Q3dSZEdPRXRjWFMKR3JQL2owWE83YnZKVTFsZHYvc1N3L0U4NzRZL3lIM0F5QnF5SFhDZXZiRkZZQmt1MzczYThlM0pwK3RhNC9scQozdUVFUkEvbmxscW5mWXJHbEJZZlQzaVlKQVpWVkZiL3I4bWJtRmJVTDVFazBqV0JyWmxNcjFwU1hkRGx3QmhhCkhMWXY0em1WQW9HQkFLQmw0cFNnbkNSTEJMUU9jWjhXQmhRSjAwZDZieFNrTGNpZ0xUNFJvY3RwNTY1SHJPMDAKSVFLdElTaEg1a2s3SVRHdUYvOERXZEN2djBMYnhvZVBJc2NFaStTaXk5WDZwWENPaS8xa2FyYVU5U3BpZ3czago3YjVlUVV0UlovTkIycVJwc3EzMEdCUENqanhudEVmK2lqelhUS0xNRndyUDhBMTlQNzRONGVTMAotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="
  }
}
```
