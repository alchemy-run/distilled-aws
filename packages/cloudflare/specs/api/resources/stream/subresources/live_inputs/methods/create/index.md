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
