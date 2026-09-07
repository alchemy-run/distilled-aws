## List Internet services categories

**get** `/radar/ranking/internet_services/categories`

Retrieves the list of Internet services categories.

### Query Parameters

- `date: optional array of string`

  Filters results by the specified array of dates.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `name: optional array of string`

  Array of names used to label the series in the response.

### Returns

- `result: object { categories_0 }`

  - `categories_0: array of object { name }`

    - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ranking/internet_services/categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "categories_0": [
      {
        "name": "Generative AI"
      }
    ]
  },
  "success": true
}
```
