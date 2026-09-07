# Live Inputs

## List live inputs

**get** `/accounts/{account_id}/stream/live_inputs`

Lists the live inputs created for an account. To get the credentials needed to stream to a specific live input, request a single live input.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `include_counts: optional boolean`

  Includes the total number of videos associated with the submitted query parameters.

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

- `result: optional object { liveInputs, range, total }`

  - `liveInputs: optional array of object { created, deleteRecordingAfterDays, enabled, 3 more }`

    - `created: optional string`

      The date and time the live input was created.

    - `deleteRecordingAfterDays: optional number`

      Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

    - `enabled: optional boolean`

      Indicates whether the live input is enabled and can accept streams.

    - `meta: optional unknown`

      A user modifiable key-value store used to reference other systems of record for managing live inputs.

    - `modified: optional string`

      The date and time the live input was last modified.

    - `uid: optional string`

      A unique identifier for a live input.

  - `range: optional number`

    The total number of remaining live inputs based on cursor position.

  - `total: optional number`

    The total number of live inputs that match the provided filters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs \
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
  "success": true,
  "result": {
    "liveInputs": [
      {
        "created": "2014-01-02T02:20:00Z",
        "deleteRecordingAfterDays": 45,
        "enabled": true,
        "meta": {
          "name": "test stream 1"
        },
        "modified": "2014-01-02T02:20:00Z",
        "uid": "66be4bf738797e01e1fca35a7bdecdcd"
      }
    ],
    "range": 1000,
    "total": 35586
  }
}
```

## Retrieve a live input

**get** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}`

Retrieves details of an existing live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

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

- `result: optional LiveInput`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
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
  "success": true,
  "result": {
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

## Create a live input

**post** `/accounts/{account_id}/stream/live_inputs`

Creates a live input, and returns credentials that you or your users can use to stream live video to Cloudflare Stream.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `defaultCreator: optional string`

  Sets the creator ID asssociated with this live input.

- `deleteRecordingAfterDays: optional number`

  Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

- `enabled: optional boolean`

  Indicates whether the live input is enabled and can accept streams.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing live inputs.

- `preferLowLatency: optional boolean`

  When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

- `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

  Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

  - `allowedOrigins: optional array of string`

    Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

  - `hideLiveViewerCount: optional boolean`

    Disables reporting the number of live viewers when this property is set to `true`.

  - `mode: optional "off" or "automatic"`

    Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

    - `"off"`

    - `"automatic"`

  - `requireSignedURLs: optional boolean`

    Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

  - `timeoutSeconds: optional number`

    Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

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

- `result: optional LiveInput`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deleteRecordingAfterDays": 45,
          "enabled": true,
          "meta": {
            "name": "test stream 1"
          },
          "preferLowLatency": true,
          "recording": {
            "hideLiveViewerCount": false,
            "mode": "off",
            "requireSignedURLs": false,
            "timeoutSeconds": 0
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
  "result": {
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

## Update a live input

**put** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}`

Updates a specified live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

### Body Parameters

- `defaultCreator: optional string`

  Sets the creator ID asssociated with this live input.

- `deleteRecordingAfterDays: optional number`

  Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

- `enabled: optional boolean`

  Indicates whether the live input is enabled and can accept streams.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing live inputs.

- `preferLowLatency: optional boolean`

  When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

- `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

  Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

  - `allowedOrigins: optional array of string`

    Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

  - `hideLiveViewerCount: optional boolean`

    Disables reporting the number of live viewers when this property is set to `true`.

  - `mode: optional "off" or "automatic"`

    Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

    - `"off"`

    - `"automatic"`

  - `requireSignedURLs: optional boolean`

    Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

  - `timeoutSeconds: optional number`

    Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

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

- `result: optional LiveInput`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deleteRecordingAfterDays": 45,
          "enabled": true,
          "meta": {
            "name": "test stream 1"
          },
          "preferLowLatency": true,
          "recording": {
            "hideLiveViewerCount": false,
            "mode": "off",
            "requireSignedURLs": false,
            "timeoutSeconds": 0
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
  "result": {
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

## Delete a live input

**delete** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}`

Prevents a live input from being streamed to and makes the live input inaccessible to any future API calls.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Domain Types

### Live Input

- `LiveInput object { created, deleteRecordingAfterDays, enabled, 13 more }`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Live Input List Response

- `LiveInputListResponse object { liveInputs, range, total }`

  - `liveInputs: optional array of object { created, deleteRecordingAfterDays, enabled, 3 more }`

    - `created: optional string`

      The date and time the live input was created.

    - `deleteRecordingAfterDays: optional number`

      Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

    - `enabled: optional boolean`

      Indicates whether the live input is enabled and can accept streams.

    - `meta: optional unknown`

      A user modifiable key-value store used to reference other systems of record for managing live inputs.

    - `modified: optional string`

      The date and time the live input was last modified.

    - `uid: optional string`

      A unique identifier for a live input.

  - `range: optional number`

    The total number of remaining live inputs based on cursor position.

  - `total: optional number`

    The total number of live inputs that match the provided filters.

# Outputs

## List all outputs associated with a specified live input

**get** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs`

Retrieves all outputs associated with a specified live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

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

- `result: optional array of Output`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs \
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
  "success": true,
  "result": [
    {
      "enabled": true,
      "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
      "uid": "baea4d9c515887b80289d5c33cf01145",
      "url": "rtmp://a.rtmp.youtube.com/live2"
    }
  ]
}
```

## Create a new output, connected to a live input

**post** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs`

Creates a new output that can be used to simulcast or restream live video to other RTMP or SRT destinations. Outputs are always linked to a specific live input —&nbsp;one live input can have many outputs.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

### Body Parameters

- `streamKey: string`

  The streamKey used to authenticate against an output's target.

- `url: string`

  The URL an output uses to restream.

- `enabled: optional boolean`

  When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

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

- `result: optional Output`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
          "url": "rtmp://a.rtmp.youtube.com/live2",
          "enabled": true
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
  "result": {
    "enabled": true,
    "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
    "uid": "baea4d9c515887b80289d5c33cf01145",
    "url": "rtmp://a.rtmp.youtube.com/live2"
  }
}
```

## Update an output

**put** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}`

Updates the state of an output.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

- `output_identifier: string`

  A unique identifier for the output.

### Body Parameters

- `enabled: boolean`

  When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

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

- `result: optional Output`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs/$OUTPUT_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
  "result": {
    "enabled": true,
    "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
    "uid": "baea4d9c515887b80289d5c33cf01145",
    "url": "rtmp://a.rtmp.youtube.com/live2"
  }
}
```

## Delete an output

**delete** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}`

Deletes an output and removes it from the associated live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

- `output_identifier: string`

  A unique identifier for the output.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs/$OUTPUT_IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Domain Types

### Output

- `Output object { enabled, streamKey, uid, url }`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.
