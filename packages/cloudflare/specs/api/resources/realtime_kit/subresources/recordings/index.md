# Recordings

## Fetch all recordings for an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/recordings`

Returns all recordings for an App. If the `meeting_id` parameter is passed, returns all recordings for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional string`

  The end time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `expired: optional boolean`

  If passed, only shows expired/non-expired recordings on RealtimeKit's bucket

- `meeting_id: optional string`

  ID of a meeting. Optional. Will limit results to only this meeting if passed.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  The search query string. You can search using the meeting ID or title.

- `sort_by: optional "invokedTime"`

  - `"invokedTime"`

- `sort_order: optional "ASC" or "DESC"`

  - `"ASC"`

  - `"DESC"`

- `start_time: optional string`

  The start time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `status: optional array of "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

  Filter by one or more recording status

  - `"INVOKED"`

  - `"RECORDING"`

  - `"UPLOADING"`

  - `"UPLOADED"`

  - `"ERRORED"`

  - `"PAUSED"`

### Returns

- `data: array of object { id, audio_download_url, download_url, 11 more }`

  - `id: string`

    ID of the recording

  - `audio_download_url: string`

    If the audio_config is passed, the URL for downloading the audio recording is returned.

  - `download_url: string`

    URL where the recording can be downloaded.

  - `download_url_expiry: string`

    Timestamp when the download URL expires.

  - `file_size: number`

    File size of the recording, in bytes.

  - `invoked_time: string`

    Timestamp when this recording was invoked.

  - `output_file_name: string`

    File name of the recording.

  - `session_id: string`

    ID of the meeting session this recording is for.

  - `started_time: string`

    Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

  - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

    Current status of the recording.

    - `"INVOKED"`

    - `"RECORDING"`

    - `"UPLOADING"`

    - `"UPLOADED"`

    - `"ERRORED"`

    - `"PAUSED"`

  - `stopped_time: string`

    Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

  - `meeting: optional object { id, created_at, updated_at, 9 more }`

    - `id: string`

      ID of the meeting.

    - `created_at: string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `updated_at: string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `live_stream_on_start: optional boolean`

      Specifies if the meeting should start getting livestreamed on start.

    - `persist_chat: optional boolean`

      Specifies if Chat within a meeting should persist for a week.

    - `record_on_start: optional boolean`

      Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

    - `recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }`

      Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

      - `audio_config: optional object { channel, codec, export_file }`

        Object containing configuration regarding the audio that is being recorded.

        - `channel: optional "mono" or "stereo"`

          Audio signal pathway within an audio file that carries a specific sound source.

          - `"mono"`

          - `"stereo"`

        - `codec: optional "MP3" or "AAC"`

          Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

          - `"MP3"`

          - `"AAC"`

        - `export_file: optional boolean`

          Controls whether to export audio file seperately

      - `file_name_prefix: optional string`

        Adds a prefix to the beginning of the file name of the recording.

      - `live_streaming_config: optional object { rtmp_url }`

        - `rtmp_url: optional string`

          RTMP URL to stream to

      - `max_seconds: optional number`

        Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

      - `realtimekit_bucket_config: optional object { enabled }`

        - `enabled: boolean`

          Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won't be generated for a recording.

      - `storage_config: optional object { type, access_key, auth_method, 9 more }`

        - `type: "aws" or "azure" or "digitalocean" or 2 more`

          Type of storage media.

          - `"aws"`

          - `"azure"`

          - `"digitalocean"`

          - `"gcs"`

          - `"sftp"`

        - `access_key: optional string`

          Access key of the storage medium. Access key is not required for the `gcs` storage media type.

          Note that this field is not readable by clients, only writeable.

        - `auth_method: optional "KEY" or "PASSWORD"`

          Authentication method used for "sftp" type storage medium

          - `"KEY"`

          - `"PASSWORD"`

        - `bucket: optional string`

          Name of the storage medium's bucket.

        - `host: optional string`

          SSH destination server host for SFTP type storage medium

        - `password: optional string`

          SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

        - `path: optional string`

          Path relative to the bucket root at which the recording will be placed.

        - `port: optional number`

          SSH destination server port for SFTP type storage medium

        - `private_key: optional string`

          Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

        - `region: optional string`

          Region of the storage medium.

        - `secret: optional string`

          Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

        - `username: optional string`

          SSH destination server username for SFTP type storage medium

      - `video_config: optional object { codec, export_file, height, 2 more }`

        - `codec: optional "H264" or "VP8"`

          Codec using which the recording will be encoded.

          - `"H264"`

          - `"VP8"`

        - `export_file: optional boolean`

          Controls whether to export video file seperately

        - `height: optional number`

          Height of the recording video in pixels

        - `watermark: optional object { position, size, url }`

          Watermark to be added to the recording

          - `position: optional "left top" or "right top" or "left bottom" or "right bottom"`

            Position of the watermark

            - `"left top"`

            - `"right top"`

            - `"left bottom"`

            - `"right bottom"`

          - `size: optional object { height, width }`

            Size of the watermark

            - `height: optional number`

              Height of the watermark in px

            - `width: optional number`

              Width of the watermark in px

          - `url: optional string`

            URL of the watermark image

        - `width: optional number`

          Width of the recording video in pixels

    - `session_keep_alive_time_in_secs: optional number`

      Time in seconds, for which a session remains active, after the last participant has left the meeting.

    - `status: optional "ACTIVE" or "INACTIVE"`

      Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

      - `"ACTIVE"`

      - `"INACTIVE"`

    - `summarize_on_end: optional boolean`

      Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

    - `title: optional string`

      Title of the meeting.

    - `transcribe_on_end: optional boolean`

      Automatically generate transcripts when the meeting ends.

  - `recording_duration: optional number`

    Total recording time in seconds.

  - `storage_config: optional object { type, access_key, auth_method, 9 more }`

    - `type: "aws" or "azure" or "digitalocean" or 2 more`

      Type of storage media.

      - `"aws"`

      - `"azure"`

      - `"digitalocean"`

      - `"gcs"`

      - `"sftp"`

    - `access_key: optional string`

      Access key of the storage medium. Access key is not required for the `gcs` storage media type.

      Note that this field is not readable by clients, only writeable.

    - `auth_method: optional "KEY" or "PASSWORD"`

      Authentication method used for "sftp" type storage medium

      - `"KEY"`

      - `"PASSWORD"`

    - `bucket: optional string`

      Name of the storage medium's bucket.

    - `host: optional string`

      SSH destination server host for SFTP type storage medium

    - `password: optional string`

      SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

    - `path: optional string`

      Path relative to the bucket root at which the recording will be placed.

    - `port: optional number`

      SSH destination server port for SFTP type storage medium

    - `private_key: optional string`

      Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

    - `region: optional string`

      Region of the storage medium.

    - `secret: optional string`

      Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

    - `username: optional string`

      SSH destination server username for SFTP type storage medium

- `paging: object { end_offset, start_offset, total_count }`

  - `end_offset: number`

  - `start_offset: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "audio_download_url": "https://example.com",
      "download_url": "https://example.com",
      "download_url_expiry": "2019-12-27T18:11:19.117Z",
      "file_size": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "output_file_name": "output_file_name",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "started_time": "2019-12-27T18:11:19.117Z",
      "status": "INVOKED",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "meeting": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "updated_at": "2019-12-27T18:11:19.117Z",
        "live_stream_on_start": true,
        "persist_chat": true,
        "record_on_start": true,
        "recording_config": {
          "audio_config": {
            "channel": "mono",
            "codec": "MP3",
            "export_file": true
          },
          "file_name_prefix": "file_name_prefix",
          "live_streaming_config": {
            "rtmp_url": "rtmp://a.rtmp.youtube.com/live2"
          },
          "max_seconds": 60,
          "realtimekit_bucket_config": {
            "enabled": true
          },
          "storage_config": {
            "type": "aws",
            "auth_method": "KEY",
            "bucket": "bucket",
            "host": "host",
            "password": "password",
            "path": "path",
            "port": 0,
            "private_key": "private_key",
            "region": "us-east-1",
            "secret": "secret",
            "username": "username"
          },
          "video_config": {
            "codec": "H264",
            "export_file": true,
            "height": 720,
            "watermark": {
              "position": "left top",
              "size": {
                "height": 1,
                "width": 1
              },
              "url": "https://example.com"
            },
            "width": 1280
          }
        },
        "session_keep_alive_time_in_secs": 60,
        "status": "ACTIVE",
        "summarize_on_end": true,
        "title": "title",
        "transcribe_on_end": true
      },
      "recording_duration": 0,
      "storage_config": {
        "type": "aws",
        "auth_method": "KEY",
        "bucket": "bucket",
        "host": "host",
        "password": "password",
        "path": "path",
        "port": 0,
        "private_key": "private_key",
        "region": "us-east-1",
        "secret": "secret",
        "username": "username"
      }
    }
  ],
  "paging": {
    "end_offset": 30,
    "start_offset": 1,
    "total_count": 30
  },
  "success": true
}
```

## Start recording a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/recordings`

Starts recording a meeting. The meeting can be started by an App admin directly, or a participant with permissions to start a recording, based on the type of authorization used.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `meeting_id: string`

  ID of the meeting to record.

- `allow_multiple_recordings: optional boolean`

  By default, a meeting allows only one recording to run at a time. Enabling the `allow_multiple_recordings` parameter to true allows you to initiate multiple recordings concurrently in the same meeting. This allows you to record separate videos of the same meeting with different configurations, such as portrait mode or landscape mode.

- `audio_config: optional object { channel, codec, export_file }`

  Object containing configuration regarding the audio that is being recorded.

  - `channel: optional "mono" or "stereo"`

    Audio signal pathway within an audio file that carries a specific sound source.

    - `"mono"`

    - `"stereo"`

  - `codec: optional "MP3" or "AAC"`

    Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

    - `"MP3"`

    - `"AAC"`

  - `export_file: optional boolean`

    Controls whether to export audio file seperately

- `file_name_prefix: optional string`

  Update the recording file name.

- `interactive_config: optional object { type }`

  Allows you to add timed metadata to your recordings, which are digital markers inserted into a video file to provide contextual information at specific points in the content range. The ID3 tags containing this information are available to clients on the playback timeline in HLS format. The output files are generated in a compressed .tar format.

  - `type: optional "ID3"`

    The metadata is presented in the form of ID3 tags.

    - `"ID3"`

- `max_seconds: optional number`

  Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

- `realtimekit_bucket_config: optional object { enabled }`

  - `enabled: boolean`

    Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won't be generated for a recording.

- `rtmp_out_config: optional object { rtmp_url }`

  - `rtmp_url: optional string`

    RTMP URL to stream to

- `storage_config: optional object { type, access_key, auth_method, 9 more }`

  - `type: "aws" or "azure" or "digitalocean" or 2 more`

    Type of storage media.

    - `"aws"`

    - `"azure"`

    - `"digitalocean"`

    - `"gcs"`

    - `"sftp"`

  - `access_key: optional string`

    Access key of the storage medium. Access key is not required for the `gcs` storage media type.

    Note that this field is not readable by clients, only writeable.

  - `auth_method: optional "KEY" or "PASSWORD"`

    Authentication method used for "sftp" type storage medium

    - `"KEY"`

    - `"PASSWORD"`

  - `bucket: optional string`

    Name of the storage medium's bucket.

  - `host: optional string`

    SSH destination server host for SFTP type storage medium

  - `password: optional string`

    SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

  - `path: optional string`

    Path relative to the bucket root at which the recording will be placed.

  - `port: optional number`

    SSH destination server port for SFTP type storage medium

  - `private_key: optional string`

    Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

  - `region: optional string`

    Region of the storage medium.

  - `secret: optional string`

    Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

  - `username: optional string`

    SSH destination server username for SFTP type storage medium

- `url: optional string`

  Pass a custom url to record arbitary screen

- `video_config: optional object { codec, export_file, height, 2 more }`

  - `codec: optional "H264" or "VP8"`

    Codec using which the recording will be encoded.

    - `"H264"`

    - `"VP8"`

  - `export_file: optional boolean`

    Controls whether to export video file seperately

  - `height: optional number`

    Height of the recording video in pixels

  - `watermark: optional object { position, size, url }`

    Watermark to be added to the recording

    - `position: optional "left top" or "right top" or "left bottom" or "right bottom"`

      Position of the watermark

      - `"left top"`

      - `"right top"`

      - `"left bottom"`

      - `"right bottom"`

    - `size: optional object { height, width }`

      Size of the watermark

      - `height: optional number`

        Height of the watermark in px

      - `width: optional number`

        Width of the watermark in px

    - `url: optional string`

      URL of the watermark image

  - `width: optional number`

    Width of the recording video in pixels

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, audio_download_url, download_url, 12 more }`

  Data returned by the operation

  - `id: string`

    ID of the recording

  - `audio_download_url: string`

    If the audio_config is passed, the URL for downloading the audio recording is returned.

  - `download_url: string`

    URL where the recording can be downloaded.

  - `download_url_expiry: string`

    Timestamp when the download URL expires.

  - `file_size: number`

    File size of the recording, in bytes.

  - `invoked_time: string`

    Timestamp when this recording was invoked.

  - `output_file_name: string`

    File name of the recording.

  - `session_id: string`

    ID of the meeting session this recording is for.

  - `started_time: string`

    Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

  - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

    Current status of the recording.

    - `"INVOKED"`

    - `"RECORDING"`

    - `"UPLOADING"`

    - `"UPLOADED"`

    - `"ERRORED"`

    - `"PAUSED"`

  - `stopped_time: string`

    Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

  - `recording_duration: optional number`

    Total recording time in seconds.

  - `start_reason: optional object { caller, reason }`

    - `caller: optional object { name, type, user_Id }`

      - `name: optional string`

        Name of the user who started the recording.

      - `type: optional "ORGANIZATION" or "USER"`

        The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

        - `"ORGANIZATION"`

        - `"USER"`

      - `user_Id: optional string`

        The user ID of the person who started the recording.

    - `reason: optional "API_CALL" or "RECORD_ON_START"`

      Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API.

      If the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.

      - `"API_CALL"`

      - `"RECORD_ON_START"`

  - `stop_reason: optional object { caller, reason }`

    - `caller: optional object { name, type, user_Id }`

      - `name: optional string`

        Name of the user who stopped the recording.

      - `type: optional "ORGANIZATION" or "USER"`

        The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

        - `"ORGANIZATION"`

        - `"USER"`

      - `user_Id: optional string`

        The user ID of the person who stopped the recording.

    - `reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"`

      Specifies the reason why the recording stopped.

      - `"API_CALL"`

      - `"INTERNAL_ERROR"`

      - `"ALL_PEERS_LEFT"`

  - `storage_config: optional object { type, access_key, auth_method, 9 more }`

    - `type: "aws" or "azure" or "digitalocean" or 2 more`

      Type of storage media.

      - `"aws"`

      - `"azure"`

      - `"digitalocean"`

      - `"gcs"`

      - `"sftp"`

    - `access_key: optional string`

      Access key of the storage medium. Access key is not required for the `gcs` storage media type.

      Note that this field is not readable by clients, only writeable.

    - `auth_method: optional "KEY" or "PASSWORD"`

      Authentication method used for "sftp" type storage medium

      - `"KEY"`

      - `"PASSWORD"`

    - `bucket: optional string`

      Name of the storage medium's bucket.

    - `host: optional string`

      SSH destination server host for SFTP type storage medium

    - `password: optional string`

      SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

    - `path: optional string`

      Path relative to the bucket root at which the recording will be placed.

    - `port: optional number`

      SSH destination server port for SFTP type storage medium

    - `private_key: optional string`

      Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

    - `region: optional string`

      Region of the storage medium.

    - `secret: optional string`

      Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

    - `username: optional string`

      SSH destination server username for SFTP type storage medium

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a"
        }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "audio_download_url": "https://example.com",
    "download_url": "https://example.com",
    "download_url_expiry": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "invoked_time": "2019-12-27T18:11:19.117Z",
    "output_file_name": "output_file_name",
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "started_time": "2019-12-27T18:11:19.117Z",
    "status": "INVOKED",
    "stopped_time": "2019-12-27T18:11:19.117Z",
    "recording_duration": 0,
    "start_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "stop_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "storage_config": {
      "type": "aws",
      "auth_method": "KEY",
      "bucket": "bucket",
      "host": "host",
      "password": "password",
      "path": "path",
      "port": 0,
      "private_key": "private_key",
      "region": "us-east-1",
      "secret": "secret",
      "username": "username"
    }
  }
}
```

## Fetch active recording

**get** `/accounts/{account_id}/realtime/kit/{app_id}/recordings/active-recording/{meeting_id}`

Returns the active recording details for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: object { id, audio_download_url, download_url, 9 more }`

  Data returned by the operation

  - `id: string`

    ID of the recording

  - `audio_download_url: string`

    If the audio_config is passed, the URL for downloading the audio recording is returned.

  - `download_url: string`

    URL where the recording can be downloaded.

  - `download_url_expiry: string`

    Timestamp when the download URL expires.

  - `file_size: number`

    File size of the recording, in bytes.

  - `invoked_time: string`

    Timestamp when this recording was invoked.

  - `output_file_name: string`

    File name of the recording.

  - `session_id: string`

    ID of the meeting session this recording is for.

  - `started_time: string`

    Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

  - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

    Current status of the recording.

    - `"INVOKED"`

    - `"RECORDING"`

    - `"UPLOADING"`

    - `"UPLOADED"`

    - `"ERRORED"`

    - `"PAUSED"`

  - `stopped_time: string`

    Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

  - `recording_duration: optional number`

    Total recording time in seconds.

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/active-recording/$MEETING_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "audio_download_url": "https://example.com",
    "download_url": "https://example.com",
    "download_url_expiry": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "invoked_time": "2019-12-27T18:11:19.117Z",
    "output_file_name": "output_file_name",
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "started_time": "2019-12-27T18:11:19.117Z",
    "status": "INVOKED",
    "stopped_time": "2019-12-27T18:11:19.117Z",
    "recording_duration": 0
  },
  "success": true
}
```

## Fetch details of a recording

**get** `/accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}`

Returns details of a recording for the given recording ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `recording_id: string`

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, audio_download_url, download_url, 12 more }`

  Data returned by the operation

  - `id: string`

    ID of the recording

  - `audio_download_url: string`

    If the audio_config is passed, the URL for downloading the audio recording is returned.

  - `download_url: string`

    URL where the recording can be downloaded.

  - `download_url_expiry: string`

    Timestamp when the download URL expires.

  - `file_size: number`

    File size of the recording, in bytes.

  - `invoked_time: string`

    Timestamp when this recording was invoked.

  - `output_file_name: string`

    File name of the recording.

  - `session_id: string`

    ID of the meeting session this recording is for.

  - `started_time: string`

    Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

  - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

    Current status of the recording.

    - `"INVOKED"`

    - `"RECORDING"`

    - `"UPLOADING"`

    - `"UPLOADED"`

    - `"ERRORED"`

    - `"PAUSED"`

  - `stopped_time: string`

    Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

  - `recording_duration: optional number`

    Total recording time in seconds.

  - `start_reason: optional object { caller, reason }`

    - `caller: optional object { name, type, user_Id }`

      - `name: optional string`

        Name of the user who started the recording.

      - `type: optional "ORGANIZATION" or "USER"`

        The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

        - `"ORGANIZATION"`

        - `"USER"`

      - `user_Id: optional string`

        The user ID of the person who started the recording.

    - `reason: optional "API_CALL" or "RECORD_ON_START"`

      Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API.

      If the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.

      - `"API_CALL"`

      - `"RECORD_ON_START"`

  - `stop_reason: optional object { caller, reason }`

    - `caller: optional object { name, type, user_Id }`

      - `name: optional string`

        Name of the user who stopped the recording.

      - `type: optional "ORGANIZATION" or "USER"`

        The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

        - `"ORGANIZATION"`

        - `"USER"`

      - `user_Id: optional string`

        The user ID of the person who stopped the recording.

    - `reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"`

      Specifies the reason why the recording stopped.

      - `"API_CALL"`

      - `"INTERNAL_ERROR"`

      - `"ALL_PEERS_LEFT"`

  - `storage_config: optional object { type, access_key, auth_method, 9 more }`

    - `type: "aws" or "azure" or "digitalocean" or 2 more`

      Type of storage media.

      - `"aws"`

      - `"azure"`

      - `"digitalocean"`

      - `"gcs"`

      - `"sftp"`

    - `access_key: optional string`

      Access key of the storage medium. Access key is not required for the `gcs` storage media type.

      Note that this field is not readable by clients, only writeable.

    - `auth_method: optional "KEY" or "PASSWORD"`

      Authentication method used for "sftp" type storage medium

      - `"KEY"`

      - `"PASSWORD"`

    - `bucket: optional string`

      Name of the storage medium's bucket.

    - `host: optional string`

      SSH destination server host for SFTP type storage medium

    - `password: optional string`

      SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

    - `path: optional string`

      Path relative to the bucket root at which the recording will be placed.

    - `port: optional number`

      SSH destination server port for SFTP type storage medium

    - `private_key: optional string`

      Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

    - `region: optional string`

      Region of the storage medium.

    - `secret: optional string`

      Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

    - `username: optional string`

      SSH destination server username for SFTP type storage medium

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/$RECORDING_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "audio_download_url": "https://example.com",
    "download_url": "https://example.com",
    "download_url_expiry": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "invoked_time": "2019-12-27T18:11:19.117Z",
    "output_file_name": "output_file_name",
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "started_time": "2019-12-27T18:11:19.117Z",
    "status": "INVOKED",
    "stopped_time": "2019-12-27T18:11:19.117Z",
    "recording_duration": 0,
    "start_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "stop_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "storage_config": {
      "type": "aws",
      "auth_method": "KEY",
      "bucket": "bucket",
      "host": "host",
      "password": "password",
      "path": "path",
      "port": 0,
      "private_key": "private_key",
      "region": "us-east-1",
      "secret": "secret",
      "username": "username"
    }
  }
}
```

## Pause/Resume/Stop recording

**put** `/accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}`

Pause/Resume/Stop a given recording ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

- `recording_id: string`

### Body Parameters

- `action: "stop" or "pause" or "resume"`

  - `"stop"`

  - `"pause"`

  - `"resume"`

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, audio_download_url, download_url, 12 more }`

  Data returned by the operation

  - `id: string`

    ID of the recording

  - `audio_download_url: string`

    If the audio_config is passed, the URL for downloading the audio recording is returned.

  - `download_url: string`

    URL where the recording can be downloaded.

  - `download_url_expiry: string`

    Timestamp when the download URL expires.

  - `file_size: number`

    File size of the recording, in bytes.

  - `invoked_time: string`

    Timestamp when this recording was invoked.

  - `output_file_name: string`

    File name of the recording.

  - `session_id: string`

    ID of the meeting session this recording is for.

  - `started_time: string`

    Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

  - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

    Current status of the recording.

    - `"INVOKED"`

    - `"RECORDING"`

    - `"UPLOADING"`

    - `"UPLOADED"`

    - `"ERRORED"`

    - `"PAUSED"`

  - `stopped_time: string`

    Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

  - `recording_duration: optional number`

    Total recording time in seconds.

  - `start_reason: optional object { caller, reason }`

    - `caller: optional object { name, type, user_Id }`

      - `name: optional string`

        Name of the user who started the recording.

      - `type: optional "ORGANIZATION" or "USER"`

        The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

        - `"ORGANIZATION"`

        - `"USER"`

      - `user_Id: optional string`

        The user ID of the person who started the recording.

    - `reason: optional "API_CALL" or "RECORD_ON_START"`

      Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API.

      If the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.

      - `"API_CALL"`

      - `"RECORD_ON_START"`

  - `stop_reason: optional object { caller, reason }`

    - `caller: optional object { name, type, user_Id }`

      - `name: optional string`

        Name of the user who stopped the recording.

      - `type: optional "ORGANIZATION" or "USER"`

        The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

        - `"ORGANIZATION"`

        - `"USER"`

      - `user_Id: optional string`

        The user ID of the person who stopped the recording.

    - `reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"`

      Specifies the reason why the recording stopped.

      - `"API_CALL"`

      - `"INTERNAL_ERROR"`

      - `"ALL_PEERS_LEFT"`

  - `storage_config: optional object { type, access_key, auth_method, 9 more }`

    - `type: "aws" or "azure" or "digitalocean" or 2 more`

      Type of storage media.

      - `"aws"`

      - `"azure"`

      - `"digitalocean"`

      - `"gcs"`

      - `"sftp"`

    - `access_key: optional string`

      Access key of the storage medium. Access key is not required for the `gcs` storage media type.

      Note that this field is not readable by clients, only writeable.

    - `auth_method: optional "KEY" or "PASSWORD"`

      Authentication method used for "sftp" type storage medium

      - `"KEY"`

      - `"PASSWORD"`

    - `bucket: optional string`

      Name of the storage medium's bucket.

    - `host: optional string`

      SSH destination server host for SFTP type storage medium

    - `password: optional string`

      SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

    - `path: optional string`

      Path relative to the bucket root at which the recording will be placed.

    - `port: optional number`

      SSH destination server port for SFTP type storage medium

    - `private_key: optional string`

      Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

    - `region: optional string`

      Region of the storage medium.

    - `secret: optional string`

      Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

    - `username: optional string`

      SSH destination server username for SFTP type storage medium

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/$RECORDING_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "stop"
        }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "audio_download_url": "https://example.com",
    "download_url": "https://example.com",
    "download_url_expiry": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "invoked_time": "2019-12-27T18:11:19.117Z",
    "output_file_name": "output_file_name",
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "started_time": "2019-12-27T18:11:19.117Z",
    "status": "INVOKED",
    "stopped_time": "2019-12-27T18:11:19.117Z",
    "recording_duration": 0,
    "start_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "stop_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "storage_config": {
      "type": "aws",
      "auth_method": "KEY",
      "bucket": "bucket",
      "host": "host",
      "password": "password",
      "path": "path",
      "port": 0,
      "private_key": "private_key",
      "region": "us-east-1",
      "secret": "secret",
      "username": "username"
    }
  }
}
```

## Start recording participant audio tracks

**post** `/accounts/{account_id}/realtime/kit/{app_id}/recordings/track`

Starts track recording for a meeting. Track recording currently records separate participant audio tracks as WebM files in the RealtimeKit bucket. Video track recording is in development. For more information, refer to [Track recording](/realtime/realtimekit/recording-guide/track-recording/).

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `meeting_id: string`

  ID of the meeting to record.

- `layers: optional map[object { file_name_prefix, media_kind } ]`

  Optional audio layer configuration. If omitted, RealtimeKit records all participant audio using the default file name prefix.

  - `file_name_prefix: optional string`

    A file name prefix to apply for files generated from this layer

  - `media_kind: optional "audio"`

    Media kind to record. Track recording currently supports audio only.

    - `"audio"`

- `user_ids: optional array of string`

  Optional list of participant user IDs to record. Selective track recording (`user_ids`) is in early beta contact support to use this feature.

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { recording }`

  Data returned by the operation

  - `recording: object { id, audio_download_url, download_url, 9 more }`

    - `id: string`

      ID of the recording

    - `audio_download_url: string`

      If the audio_config is passed, the URL for downloading the audio recording is returned.

    - `download_url: string`

      URL where the recording can be downloaded.

    - `download_url_expiry: string`

      Timestamp when the download URL expires.

    - `file_size: number`

      File size of the recording, in bytes.

    - `invoked_time: string`

      Timestamp when this recording was invoked.

    - `output_file_name: string`

      File name of the recording.

    - `session_id: string`

      ID of the meeting session this recording is for.

    - `started_time: string`

      Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

    - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

      Current status of the recording.

      - `"INVOKED"`

      - `"RECORDING"`

      - `"UPLOADING"`

      - `"UPLOADED"`

      - `"ERRORED"`

      - `"PAUSED"`

    - `stopped_time: string`

      Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

    - `recording_duration: optional number`

      Total recording time in seconds.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/track \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a"
        }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "recording": {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "audio_download_url": "https://example.com",
      "download_url": "https://example.com",
      "download_url_expiry": "2019-12-27T18:11:19.117Z",
      "file_size": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "output_file_name": "output_file_name",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "started_time": "2019-12-27T18:11:19.117Z",
      "status": "INVOKED",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "recording_duration": 0
    }
  }
}
```

## Domain Types

### Recording Get Recordings Response

- `RecordingGetRecordingsResponse object { data, paging, success }`

  - `data: array of object { id, audio_download_url, download_url, 11 more }`

    - `id: string`

      ID of the recording

    - `audio_download_url: string`

      If the audio_config is passed, the URL for downloading the audio recording is returned.

    - `download_url: string`

      URL where the recording can be downloaded.

    - `download_url_expiry: string`

      Timestamp when the download URL expires.

    - `file_size: number`

      File size of the recording, in bytes.

    - `invoked_time: string`

      Timestamp when this recording was invoked.

    - `output_file_name: string`

      File name of the recording.

    - `session_id: string`

      ID of the meeting session this recording is for.

    - `started_time: string`

      Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

    - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

      Current status of the recording.

      - `"INVOKED"`

      - `"RECORDING"`

      - `"UPLOADING"`

      - `"UPLOADED"`

      - `"ERRORED"`

      - `"PAUSED"`

    - `stopped_time: string`

      Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

    - `meeting: optional object { id, created_at, updated_at, 9 more }`

      - `id: string`

        ID of the meeting.

      - `created_at: string`

        Timestamp the object was created at. The time is returned in ISO format.

      - `updated_at: string`

        Timestamp the object was updated at. The time is returned in ISO format.

      - `live_stream_on_start: optional boolean`

        Specifies if the meeting should start getting livestreamed on start.

      - `persist_chat: optional boolean`

        Specifies if Chat within a meeting should persist for a week.

      - `record_on_start: optional boolean`

        Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

      - `recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }`

        Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

        - `audio_config: optional object { channel, codec, export_file }`

          Object containing configuration regarding the audio that is being recorded.

          - `channel: optional "mono" or "stereo"`

            Audio signal pathway within an audio file that carries a specific sound source.

            - `"mono"`

            - `"stereo"`

          - `codec: optional "MP3" or "AAC"`

            Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

            - `"MP3"`

            - `"AAC"`

          - `export_file: optional boolean`

            Controls whether to export audio file seperately

        - `file_name_prefix: optional string`

          Adds a prefix to the beginning of the file name of the recording.

        - `live_streaming_config: optional object { rtmp_url }`

          - `rtmp_url: optional string`

            RTMP URL to stream to

        - `max_seconds: optional number`

          Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

        - `realtimekit_bucket_config: optional object { enabled }`

          - `enabled: boolean`

            Controls whether recordings are uploaded to RealtimeKit's bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won't be generated for a recording.

        - `storage_config: optional object { type, access_key, auth_method, 9 more }`

          - `type: "aws" or "azure" or "digitalocean" or 2 more`

            Type of storage media.

            - `"aws"`

            - `"azure"`

            - `"digitalocean"`

            - `"gcs"`

            - `"sftp"`

          - `access_key: optional string`

            Access key of the storage medium. Access key is not required for the `gcs` storage media type.

            Note that this field is not readable by clients, only writeable.

          - `auth_method: optional "KEY" or "PASSWORD"`

            Authentication method used for "sftp" type storage medium

            - `"KEY"`

            - `"PASSWORD"`

          - `bucket: optional string`

            Name of the storage medium's bucket.

          - `host: optional string`

            SSH destination server host for SFTP type storage medium

          - `password: optional string`

            SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

          - `path: optional string`

            Path relative to the bucket root at which the recording will be placed.

          - `port: optional number`

            SSH destination server port for SFTP type storage medium

          - `private_key: optional string`

            Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

          - `region: optional string`

            Region of the storage medium.

          - `secret: optional string`

            Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

          - `username: optional string`

            SSH destination server username for SFTP type storage medium

        - `video_config: optional object { codec, export_file, height, 2 more }`

          - `codec: optional "H264" or "VP8"`

            Codec using which the recording will be encoded.

            - `"H264"`

            - `"VP8"`

          - `export_file: optional boolean`

            Controls whether to export video file seperately

          - `height: optional number`

            Height of the recording video in pixels

          - `watermark: optional object { position, size, url }`

            Watermark to be added to the recording

            - `position: optional "left top" or "right top" or "left bottom" or "right bottom"`

              Position of the watermark

              - `"left top"`

              - `"right top"`

              - `"left bottom"`

              - `"right bottom"`

            - `size: optional object { height, width }`

              Size of the watermark

              - `height: optional number`

                Height of the watermark in px

              - `width: optional number`

                Width of the watermark in px

            - `url: optional string`

              URL of the watermark image

          - `width: optional number`

            Width of the recording video in pixels

      - `session_keep_alive_time_in_secs: optional number`

        Time in seconds, for which a session remains active, after the last participant has left the meeting.

      - `status: optional "ACTIVE" or "INACTIVE"`

        Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

        - `"ACTIVE"`

        - `"INACTIVE"`

      - `summarize_on_end: optional boolean`

        Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

      - `title: optional string`

        Title of the meeting.

      - `transcribe_on_end: optional boolean`

        Automatically generate transcripts when the meeting ends.

    - `recording_duration: optional number`

      Total recording time in seconds.

    - `storage_config: optional object { type, access_key, auth_method, 9 more }`

      - `type: "aws" or "azure" or "digitalocean" or 2 more`

        Type of storage media.

        - `"aws"`

        - `"azure"`

        - `"digitalocean"`

        - `"gcs"`

        - `"sftp"`

      - `access_key: optional string`

        Access key of the storage medium. Access key is not required for the `gcs` storage media type.

        Note that this field is not readable by clients, only writeable.

      - `auth_method: optional "KEY" or "PASSWORD"`

        Authentication method used for "sftp" type storage medium

        - `"KEY"`

        - `"PASSWORD"`

      - `bucket: optional string`

        Name of the storage medium's bucket.

      - `host: optional string`

        SSH destination server host for SFTP type storage medium

      - `password: optional string`

        SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

      - `path: optional string`

        Path relative to the bucket root at which the recording will be placed.

      - `port: optional number`

        SSH destination server port for SFTP type storage medium

      - `private_key: optional string`

        Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

      - `region: optional string`

        Region of the storage medium.

      - `secret: optional string`

        Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

      - `username: optional string`

        SSH destination server username for SFTP type storage medium

  - `paging: object { end_offset, start_offset, total_count }`

    - `end_offset: number`

    - `start_offset: number`

    - `total_count: number`

  - `success: boolean`

### Recording Start Recordings Response

- `RecordingStartRecordingsResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, audio_download_url, download_url, 12 more }`

    Data returned by the operation

    - `id: string`

      ID of the recording

    - `audio_download_url: string`

      If the audio_config is passed, the URL for downloading the audio recording is returned.

    - `download_url: string`

      URL where the recording can be downloaded.

    - `download_url_expiry: string`

      Timestamp when the download URL expires.

    - `file_size: number`

      File size of the recording, in bytes.

    - `invoked_time: string`

      Timestamp when this recording was invoked.

    - `output_file_name: string`

      File name of the recording.

    - `session_id: string`

      ID of the meeting session this recording is for.

    - `started_time: string`

      Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

    - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

      Current status of the recording.

      - `"INVOKED"`

      - `"RECORDING"`

      - `"UPLOADING"`

      - `"UPLOADED"`

      - `"ERRORED"`

      - `"PAUSED"`

    - `stopped_time: string`

      Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

    - `recording_duration: optional number`

      Total recording time in seconds.

    - `start_reason: optional object { caller, reason }`

      - `caller: optional object { name, type, user_Id }`

        - `name: optional string`

          Name of the user who started the recording.

        - `type: optional "ORGANIZATION" or "USER"`

          The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

          - `"ORGANIZATION"`

          - `"USER"`

        - `user_Id: optional string`

          The user ID of the person who started the recording.

      - `reason: optional "API_CALL" or "RECORD_ON_START"`

        Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API.

        If the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.

        - `"API_CALL"`

        - `"RECORD_ON_START"`

    - `stop_reason: optional object { caller, reason }`

      - `caller: optional object { name, type, user_Id }`

        - `name: optional string`

          Name of the user who stopped the recording.

        - `type: optional "ORGANIZATION" or "USER"`

          The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

          - `"ORGANIZATION"`

          - `"USER"`

        - `user_Id: optional string`

          The user ID of the person who stopped the recording.

      - `reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"`

        Specifies the reason why the recording stopped.

        - `"API_CALL"`

        - `"INTERNAL_ERROR"`

        - `"ALL_PEERS_LEFT"`

    - `storage_config: optional object { type, access_key, auth_method, 9 more }`

      - `type: "aws" or "azure" or "digitalocean" or 2 more`

        Type of storage media.

        - `"aws"`

        - `"azure"`

        - `"digitalocean"`

        - `"gcs"`

        - `"sftp"`

      - `access_key: optional string`

        Access key of the storage medium. Access key is not required for the `gcs` storage media type.

        Note that this field is not readable by clients, only writeable.

      - `auth_method: optional "KEY" or "PASSWORD"`

        Authentication method used for "sftp" type storage medium

        - `"KEY"`

        - `"PASSWORD"`

      - `bucket: optional string`

        Name of the storage medium's bucket.

      - `host: optional string`

        SSH destination server host for SFTP type storage medium

      - `password: optional string`

        SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

      - `path: optional string`

        Path relative to the bucket root at which the recording will be placed.

      - `port: optional number`

        SSH destination server port for SFTP type storage medium

      - `private_key: optional string`

        Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

      - `region: optional string`

        Region of the storage medium.

      - `secret: optional string`

        Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

      - `username: optional string`

        SSH destination server username for SFTP type storage medium

### Recording Get Active Recordings Response

- `RecordingGetActiveRecordingsResponse object { data, success }`

  - `data: object { id, audio_download_url, download_url, 9 more }`

    Data returned by the operation

    - `id: string`

      ID of the recording

    - `audio_download_url: string`

      If the audio_config is passed, the URL for downloading the audio recording is returned.

    - `download_url: string`

      URL where the recording can be downloaded.

    - `download_url_expiry: string`

      Timestamp when the download URL expires.

    - `file_size: number`

      File size of the recording, in bytes.

    - `invoked_time: string`

      Timestamp when this recording was invoked.

    - `output_file_name: string`

      File name of the recording.

    - `session_id: string`

      ID of the meeting session this recording is for.

    - `started_time: string`

      Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

    - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

      Current status of the recording.

      - `"INVOKED"`

      - `"RECORDING"`

      - `"UPLOADING"`

      - `"UPLOADED"`

      - `"ERRORED"`

      - `"PAUSED"`

    - `stopped_time: string`

      Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

    - `recording_duration: optional number`

      Total recording time in seconds.

  - `success: boolean`

    Success status of the operation

### Recording Get One Recording Response

- `RecordingGetOneRecordingResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, audio_download_url, download_url, 12 more }`

    Data returned by the operation

    - `id: string`

      ID of the recording

    - `audio_download_url: string`

      If the audio_config is passed, the URL for downloading the audio recording is returned.

    - `download_url: string`

      URL where the recording can be downloaded.

    - `download_url_expiry: string`

      Timestamp when the download URL expires.

    - `file_size: number`

      File size of the recording, in bytes.

    - `invoked_time: string`

      Timestamp when this recording was invoked.

    - `output_file_name: string`

      File name of the recording.

    - `session_id: string`

      ID of the meeting session this recording is for.

    - `started_time: string`

      Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

    - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

      Current status of the recording.

      - `"INVOKED"`

      - `"RECORDING"`

      - `"UPLOADING"`

      - `"UPLOADED"`

      - `"ERRORED"`

      - `"PAUSED"`

    - `stopped_time: string`

      Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

    - `recording_duration: optional number`

      Total recording time in seconds.

    - `start_reason: optional object { caller, reason }`

      - `caller: optional object { name, type, user_Id }`

        - `name: optional string`

          Name of the user who started the recording.

        - `type: optional "ORGANIZATION" or "USER"`

          The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

          - `"ORGANIZATION"`

          - `"USER"`

        - `user_Id: optional string`

          The user ID of the person who started the recording.

      - `reason: optional "API_CALL" or "RECORD_ON_START"`

        Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API.

        If the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.

        - `"API_CALL"`

        - `"RECORD_ON_START"`

    - `stop_reason: optional object { caller, reason }`

      - `caller: optional object { name, type, user_Id }`

        - `name: optional string`

          Name of the user who stopped the recording.

        - `type: optional "ORGANIZATION" or "USER"`

          The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

          - `"ORGANIZATION"`

          - `"USER"`

        - `user_Id: optional string`

          The user ID of the person who stopped the recording.

      - `reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"`

        Specifies the reason why the recording stopped.

        - `"API_CALL"`

        - `"INTERNAL_ERROR"`

        - `"ALL_PEERS_LEFT"`

    - `storage_config: optional object { type, access_key, auth_method, 9 more }`

      - `type: "aws" or "azure" or "digitalocean" or 2 more`

        Type of storage media.

        - `"aws"`

        - `"azure"`

        - `"digitalocean"`

        - `"gcs"`

        - `"sftp"`

      - `access_key: optional string`

        Access key of the storage medium. Access key is not required for the `gcs` storage media type.

        Note that this field is not readable by clients, only writeable.

      - `auth_method: optional "KEY" or "PASSWORD"`

        Authentication method used for "sftp" type storage medium

        - `"KEY"`

        - `"PASSWORD"`

      - `bucket: optional string`

        Name of the storage medium's bucket.

      - `host: optional string`

        SSH destination server host for SFTP type storage medium

      - `password: optional string`

        SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

      - `path: optional string`

        Path relative to the bucket root at which the recording will be placed.

      - `port: optional number`

        SSH destination server port for SFTP type storage medium

      - `private_key: optional string`

        Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

      - `region: optional string`

        Region of the storage medium.

      - `secret: optional string`

        Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

      - `username: optional string`

        SSH destination server username for SFTP type storage medium

### Recording Pause Resume Stop Recording Response

- `RecordingPauseResumeStopRecordingResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, audio_download_url, download_url, 12 more }`

    Data returned by the operation

    - `id: string`

      ID of the recording

    - `audio_download_url: string`

      If the audio_config is passed, the URL for downloading the audio recording is returned.

    - `download_url: string`

      URL where the recording can be downloaded.

    - `download_url_expiry: string`

      Timestamp when the download URL expires.

    - `file_size: number`

      File size of the recording, in bytes.

    - `invoked_time: string`

      Timestamp when this recording was invoked.

    - `output_file_name: string`

      File name of the recording.

    - `session_id: string`

      ID of the meeting session this recording is for.

    - `started_time: string`

      Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

    - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

      Current status of the recording.

      - `"INVOKED"`

      - `"RECORDING"`

      - `"UPLOADING"`

      - `"UPLOADED"`

      - `"ERRORED"`

      - `"PAUSED"`

    - `stopped_time: string`

      Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

    - `recording_duration: optional number`

      Total recording time in seconds.

    - `start_reason: optional object { caller, reason }`

      - `caller: optional object { name, type, user_Id }`

        - `name: optional string`

          Name of the user who started the recording.

        - `type: optional "ORGANIZATION" or "USER"`

          The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

          - `"ORGANIZATION"`

          - `"USER"`

        - `user_Id: optional string`

          The user ID of the person who started the recording.

      - `reason: optional "API_CALL" or "RECORD_ON_START"`

        Specifies if the recording was started using the "Start a Recording"API or using the parameter RECORD_ON_START in the "Create a meeting" API.

        If the recording is initiated using the "RECORD_ON_START" parameter, the user details will not be populated.

        - `"API_CALL"`

        - `"RECORD_ON_START"`

    - `stop_reason: optional object { caller, reason }`

      - `caller: optional object { name, type, user_Id }`

        - `name: optional string`

          Name of the user who stopped the recording.

        - `type: optional "ORGANIZATION" or "USER"`

          The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

          - `"ORGANIZATION"`

          - `"USER"`

        - `user_Id: optional string`

          The user ID of the person who stopped the recording.

      - `reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"`

        Specifies the reason why the recording stopped.

        - `"API_CALL"`

        - `"INTERNAL_ERROR"`

        - `"ALL_PEERS_LEFT"`

    - `storage_config: optional object { type, access_key, auth_method, 9 more }`

      - `type: "aws" or "azure" or "digitalocean" or 2 more`

        Type of storage media.

        - `"aws"`

        - `"azure"`

        - `"digitalocean"`

        - `"gcs"`

        - `"sftp"`

      - `access_key: optional string`

        Access key of the storage medium. Access key is not required for the `gcs` storage media type.

        Note that this field is not readable by clients, only writeable.

      - `auth_method: optional "KEY" or "PASSWORD"`

        Authentication method used for "sftp" type storage medium

        - `"KEY"`

        - `"PASSWORD"`

      - `bucket: optional string`

        Name of the storage medium's bucket.

      - `host: optional string`

        SSH destination server host for SFTP type storage medium

      - `password: optional string`

        SSH destination server password for SFTP type storage medium when auth_method is "PASSWORD". If auth_method is "KEY", this specifies the password for the ssh private key.

      - `path: optional string`

        Path relative to the bucket root at which the recording will be placed.

      - `port: optional number`

        SSH destination server port for SFTP type storage medium

      - `private_key: optional string`

        Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is "KEY"

      - `region: optional string`

        Region of the storage medium.

      - `secret: optional string`

        Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

      - `username: optional string`

        SSH destination server username for SFTP type storage medium

### Recording Start Track Recording Response

- `RecordingStartTrackRecordingResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { recording }`

    Data returned by the operation

    - `recording: object { id, audio_download_url, download_url, 9 more }`

      - `id: string`

        ID of the recording

      - `audio_download_url: string`

        If the audio_config is passed, the URL for downloading the audio recording is returned.

      - `download_url: string`

        URL where the recording can be downloaded.

      - `download_url_expiry: string`

        Timestamp when the download URL expires.

      - `file_size: number`

        File size of the recording, in bytes.

      - `invoked_time: string`

        Timestamp when this recording was invoked.

      - `output_file_name: string`

        File name of the recording.

      - `session_id: string`

        ID of the meeting session this recording is for.

      - `started_time: string`

        Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

      - `status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more`

        Current status of the recording.

        - `"INVOKED"`

        - `"RECORDING"`

        - `"UPLOADING"`

        - `"UPLOADED"`

        - `"ERRORED"`

        - `"PAUSED"`

      - `stopped_time: string`

        Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

      - `recording_duration: optional number`

        Total recording time in seconds.
