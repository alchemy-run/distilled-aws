# RayID

## Get logs RayIDs

**get** `/zones/{zone_id}/logs/rayids/{ray_id}`

The `/rayids` api route allows lookups by specific rayid. The rayids route will return zero, one, or more records (ray ids are not unique).

### Path Parameters

- `zone_id: string`

  Identifier.

- `ray_id: string`

  Ray identifier.

### Query Parameters

- `fields: optional string`

  The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.

- `timestamps: optional "unix" or "unixnano" or "rfc3339"`

  By default, timestamps in responses are returned as Unix nanosecond integers. The `?timestamps=` argument can be set to change the format in which response timestamps are returned. Possible values are: `unix`, `unixnano`, `rfc3339`. Note that `unix` and `unixnano` return timestamps as integers; `rfc3339` returns timestamps as strings.

  - `"unix"`

  - `"unixnano"`

  - `"rfc3339"`

### Returns

- `string`

- `unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/rayids/$RAYID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
"{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}"
```

## Domain Types

### RayID Get Response

- `RayIDGetResponse = string or unknown`

  - `string`

  - `unknown`
