# Content

## Get a zone snippet content

**get** `/zones/{zone_id}/snippets/{snippet_name}/content`

Fetches the content of a snippet belonging to the zone.

### Path Parameters

- `zone_id: string`

  Use this field to specify the unique ID of the zone.

- `snippet_name: string`

  Identify the snippet.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME/content \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
