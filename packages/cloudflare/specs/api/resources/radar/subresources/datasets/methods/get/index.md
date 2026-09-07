## Get dataset CSV stream

**get** `/radar/datasets/{alias}`

Retrieves the CSV content of a given dataset by alias or ID. When getting the content by alias the latest dataset is returned, optionally filtered by the latest available at a given date.

### Path Parameters

- `alias: string`

  Dataset alias or ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/datasets/$ALIAS \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
