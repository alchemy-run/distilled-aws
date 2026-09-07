## Get logs received

**get** `/zones/{zone_id}/logs/received`

The `/received` api route allows customers to retrieve their edge HTTP logs. The basic access pattern is "give me all the logs for zone Z for minute M", where the minute M refers to the time records were received at Cloudflare's central data center. `start` is inclusive, and `end` is exclusive. Because of that, to get all data, at minutely cadence, starting at 10AM, the proper values are: `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap will be handled properly.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `end: string or number`

  Sets the (exclusive) end of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. `end` must be at least five minutes earlier than now and must be later than `start`. Difference between `start` and `end` must be not greater than one hour.

  - `string`

  - `number`

- `count: optional number`

  When `?count=` is provided, the response will contain up to `count` results. Since results are not sorted, you are likely to get different data for repeated requests. `count` must be an integer > 0.

- `fields: optional string`

  The `/received` route by default returns a limited set of fields, and allows customers to override the default field set by specifying individual fields. The reasons for this are: 1. Most customers require only a small subset of fields, but that subset varies from customer to customer; 2. Flat schema is much easier to work with downstream (importing into BigTable etc); 3. Performance (time to process, file size). If `?fields=` is not specified, default field set is returned. This default field set may change at any time. When `?fields=` is provided, each record is returned with the specified fields. `fields` must be specified as a comma separated list without any whitespaces, and all fields must exist. The order in which fields are specified does not matter, and the order of fields in the response is not specified.

- `sample: optional number`

  When `?sample=` is provided, a sample of matching records is returned. If `sample=0.1` then 10% of records will be returned. Sampling is random: repeated calls will not only return different records, but likely will also vary slightly in number of returned records. When `?count=` is also specified, `count` is applied to the number of returned records, not the sampled records. So, with `sample=0.05` and `count=7`, when there is a total of 100 records available, approximately five will be returned. When there are 1000 records, seven will be returned. When there are 10,000 records, seven will be returned.

- `start: optional string or number`

  Sets the (inclusive) beginning of the requested time frame. This can be a unix timestamp (in seconds or nanoseconds), or an absolute timestamp that conforms to RFC 3339. At this point in time, it cannot exceed a time in the past greater than seven days.

  - `string`

  - `number`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/received \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
"{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}\n{\"ClientIP\":\"192.0.2.1\",\"RayID\":\"41ddf1740f67442d\",\"EdgeStartTimestamp\":1526810289280000000}"
```
