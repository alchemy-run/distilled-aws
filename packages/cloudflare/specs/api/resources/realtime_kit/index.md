# Realtime Kit

# Apps

## Fetch all apps

**get** `/accounts/{account_id}/realtime/kit/apps`

Fetch all apps for your account

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Search string that matches apps by name.

- `sort_order: optional "ASC" or "DESC"`

  Sort order for apps by creation time.

  - `"ASC"`

  - `"DESC"`

### Returns

- `data: optional array of object { id, created_at, name }`

  - `id: optional string`

  - `created_at: optional string`

  - `name: optional string`

- `paging: optional object { end_offset, start_offset, total_count }`

  - `end_offset: optional number`

  - `start_offset: optional number`

  - `total_count: optional number`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-first-app"
    }
  ],
  "paging": {
    "end_offset": 1,
    "start_offset": 1,
    "total_count": 1
  },
  "success": true
}
```

## Create App

**post** `/accounts/{account_id}/realtime/kit/apps`

Create new app for your account

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `name: string`

### Returns

- `data: optional object { app }`

  - `app: optional object { id, created_at, name }`

    - `id: optional string`

    - `created_at: optional string`

    - `name: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "x"
        }'
```

#### Response

```json
{
  "data": {
    "app": {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-new-app"
    }
  },
  "success": true
}
```

## Domain Types

### App Get Response

- `AppGetResponse object { data, paging, success }`

  - `data: optional array of object { id, created_at, name }`

    - `id: optional string`

    - `created_at: optional string`

    - `name: optional string`

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

  - `success: optional boolean`

### App Post Response

- `AppPostResponse object { data, success }`

  - `data: optional object { app }`

    - `app: optional object { id, created_at, name }`

      - `id: optional string`

      - `created_at: optional string`

      - `name: optional string`

  - `success: optional boolean`

# Meetings

## Fetch all meetings for an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings`

Returns all meetings for the given App ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional string`

  The end time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  The search query string. You can search using the meeting ID or title.

- `start_time: optional string`

  The start time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `status: optional "ACTIVE" or "INACTIVE"`

  Filter meetings by status.

  - `"ACTIVE"`

  - `"INACTIVE"`

### Returns

- `data: array of object { id, created_at, updated_at, 9 more }`

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

- `paging: object { end_offset, start_offset, total_count }`

  - `end_offset: number`

  - `start_offset: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
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

## Create a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings`

Create a meeting for the given App ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `ai_config: optional object { summarization, transcription }`

  The AI Config allows you to customize the behavior of meeting transcriptions and summaries

  - `summarization: optional object { summary_type, text_format, word_limit }`

    Summary Config

    - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

      Defines the style of the summary, such as general, team meeting, or sales call.

      - `"general"`

      - `"team_meeting"`

      - `"sales_call"`

      - `"client_check_in"`

      - `"interview"`

      - `"daily_standup"`

      - `"one_on_one_meeting"`

      - `"lecture"`

      - `"code_review"`

    - `text_format: optional "plain_text" or "markdown"`

      Determines the text format of the summary, such as plain text or markdown.

      - `"plain_text"`

      - `"markdown"`

    - `word_limit: optional number`

      Sets the maximum number of words in the meeting summary.

  - `transcription: optional object { keywords, language, profanity_filter }`

    Transcription Configurations

    - `keywords: optional array of string`

      Adds specific terms to improve accurate detection during transcription.

    - `language: optional "en-US" or "en-IN" or "de" or 7 more`

      Specifies the language code for transcription to ensure accurate results.

      - `"en-US"`

      - `"en-IN"`

      - `"de"`

      - `"hi"`

      - `"sv"`

      - `"ru"`

      - `"pl"`

      - `"el"`

      - `"fr"`

      - `"nl"`

    - `profanity_filter: optional boolean`

      Control the inclusion of offensive language in transcriptions.

- `live_stream_on_start: optional boolean`

  Specifies if the meeting should start getting livestreamed on start.

- `persist_chat: optional boolean`

  If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space.

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

- `summarize_on_end: optional boolean`

  Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

- `title: optional string`

  Title of the meeting

- `transcribe_on_end: optional boolean`

  Automatically generate transcripts when the meeting ends.

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, created_at, updated_at, 10 more }`

  Data returned by the operation

  - `id: string`

    ID of the meeting.

  - `created_at: string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `updated_at: string`

    Timestamp the object was updated at. The time is returned in ISO format.

  - `ai_config: optional object { summarization, transcription }`

    The AI Config allows you to customize the behavior of meeting transcriptions and summaries

    - `summarization: optional object { summary_type, text_format, word_limit }`

      Summary Config

      - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

        Defines the style of the summary, such as general, team meeting, or sales call.

        - `"general"`

        - `"team_meeting"`

        - `"sales_call"`

        - `"client_check_in"`

        - `"interview"`

        - `"daily_standup"`

        - `"one_on_one_meeting"`

        - `"lecture"`

        - `"code_review"`

      - `text_format: optional "plain_text" or "markdown"`

        Determines the text format of the summary, such as plain text or markdown.

        - `"plain_text"`

        - `"markdown"`

      - `word_limit: optional number`

        Sets the maximum number of words in the meeting summary.

    - `transcription: optional object { keywords, language, profanity_filter }`

      Transcription Configurations

      - `keywords: optional array of string`

        Adds specific terms to improve accurate detection during transcription.

      - `language: optional "en-US" or "en-IN" or "de" or 7 more`

        Specifies the language code for transcription to ensure accurate results.

        - `"en-US"`

        - `"en-IN"`

        - `"de"`

        - `"hi"`

        - `"sv"`

        - `"ru"`

        - `"pl"`

        - `"el"`

        - `"fr"`

        - `"nl"`

      - `profanity_filter: optional boolean`

        Control the inclusion of offensive language in transcriptions.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_config": {
      "summarization": {
        "summary_type": "general",
        "text_format": "plain_text",
        "word_limit": 150
      },
      "transcription": {
        "keywords": [
          "string"
        ],
        "language": "en-US",
        "profanity_filter": true
      }
    },
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
  }
}
```

## Fetch a meeting for an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}`

Returns a meeting details in an App for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Query Parameters

- `name: optional string`

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, created_at, updated_at, 10 more }`

  Data returned by the operation

  - `id: string`

    ID of the meeting.

  - `created_at: string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `updated_at: string`

    Timestamp the object was updated at. The time is returned in ISO format.

  - `ai_config: optional object { summarization, transcription }`

    The AI Config allows you to customize the behavior of meeting transcriptions and summaries

    - `summarization: optional object { summary_type, text_format, word_limit }`

      Summary Config

      - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

        Defines the style of the summary, such as general, team meeting, or sales call.

        - `"general"`

        - `"team_meeting"`

        - `"sales_call"`

        - `"client_check_in"`

        - `"interview"`

        - `"daily_standup"`

        - `"one_on_one_meeting"`

        - `"lecture"`

        - `"code_review"`

      - `text_format: optional "plain_text" or "markdown"`

        Determines the text format of the summary, such as plain text or markdown.

        - `"plain_text"`

        - `"markdown"`

      - `word_limit: optional number`

        Sets the maximum number of words in the meeting summary.

    - `transcription: optional object { keywords, language, profanity_filter }`

      Transcription Configurations

      - `keywords: optional array of string`

        Adds specific terms to improve accurate detection during transcription.

      - `language: optional "en-US" or "en-IN" or "de" or 7 more`

        Specifies the language code for transcription to ensure accurate results.

        - `"en-US"`

        - `"en-IN"`

        - `"de"`

        - `"hi"`

        - `"sv"`

        - `"ru"`

        - `"pl"`

        - `"el"`

        - `"fr"`

        - `"nl"`

      - `profanity_filter: optional boolean`

        Control the inclusion of offensive language in transcriptions.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_config": {
      "summarization": {
        "summary_type": "general",
        "text_format": "plain_text",
        "word_limit": 150
      },
      "transcription": {
        "keywords": [
          "string"
        ],
        "language": "en-US",
        "profanity_filter": true
      }
    },
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
  }
}
```

## Update a meeting

**patch** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}`

Updates a meeting in an App for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `ai_config: optional object { summarization, transcription }`

  The AI Config allows you to customize the behavior of meeting transcriptions and summaries

  - `summarization: optional object { summary_type, text_format, word_limit }`

    Summary Config

    - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

      Defines the style of the summary, such as general, team meeting, or sales call.

      - `"general"`

      - `"team_meeting"`

      - `"sales_call"`

      - `"client_check_in"`

      - `"interview"`

      - `"daily_standup"`

      - `"one_on_one_meeting"`

      - `"lecture"`

      - `"code_review"`

    - `text_format: optional "plain_text" or "markdown"`

      Determines the text format of the summary, such as plain text or markdown.

      - `"plain_text"`

      - `"markdown"`

    - `word_limit: optional number`

      Sets the maximum number of words in the meeting summary.

  - `transcription: optional object { keywords, language, profanity_filter }`

    Transcription Configurations

    - `keywords: optional array of string`

      Adds specific terms to improve accurate detection during transcription.

    - `language: optional "en-US" or "en-IN" or "de" or 7 more`

      Specifies the language code for transcription to ensure accurate results.

      - `"en-US"`

      - `"en-IN"`

      - `"de"`

      - `"hi"`

      - `"sv"`

      - `"ru"`

      - `"pl"`

      - `"el"`

      - `"fr"`

      - `"nl"`

    - `profanity_filter: optional boolean`

      Control the inclusion of offensive language in transcriptions.

- `live_stream_on_start: optional boolean`

  Specifies if the meeting should start getting livestreamed on start.

- `persist_chat: optional boolean`

  If a meeting is updated to persist_chat, meeting chat would remain for a week within the meeting space.

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

  Title of the meeting

- `transcribe_on_end: optional boolean`

  Automatically generate transcripts when the meeting ends.

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, created_at, updated_at, 10 more }`

  Data returned by the operation

  - `id: string`

    ID of the meeting.

  - `created_at: string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `updated_at: string`

    Timestamp the object was updated at. The time is returned in ISO format.

  - `ai_config: optional object { summarization, transcription }`

    The AI Config allows you to customize the behavior of meeting transcriptions and summaries

    - `summarization: optional object { summary_type, text_format, word_limit }`

      Summary Config

      - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

        Defines the style of the summary, such as general, team meeting, or sales call.

        - `"general"`

        - `"team_meeting"`

        - `"sales_call"`

        - `"client_check_in"`

        - `"interview"`

        - `"daily_standup"`

        - `"one_on_one_meeting"`

        - `"lecture"`

        - `"code_review"`

      - `text_format: optional "plain_text" or "markdown"`

        Determines the text format of the summary, such as plain text or markdown.

        - `"plain_text"`

        - `"markdown"`

      - `word_limit: optional number`

        Sets the maximum number of words in the meeting summary.

    - `transcription: optional object { keywords, language, profanity_filter }`

      Transcription Configurations

      - `keywords: optional array of string`

        Adds specific terms to improve accurate detection during transcription.

      - `language: optional "en-US" or "en-IN" or "de" or 7 more`

        Specifies the language code for transcription to ensure accurate results.

        - `"en-US"`

        - `"en-IN"`

        - `"de"`

        - `"hi"`

        - `"sv"`

        - `"ru"`

        - `"pl"`

        - `"el"`

        - `"fr"`

        - `"nl"`

      - `profanity_filter: optional boolean`

        Control the inclusion of offensive language in transcriptions.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "status": "INACTIVE"
        }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_config": {
      "summarization": {
        "summary_type": "general",
        "text_format": "plain_text",
        "word_limit": 150
      },
      "transcription": {
        "keywords": [
          "string"
        ],
        "language": "en-US",
        "profanity_filter": true
      }
    },
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
  }
}
```

## Replace a meeting

**put** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}`

Replaces all the details for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `ai_config: optional object { summarization, transcription }`

  The AI Config allows you to customize the behavior of meeting transcriptions and summaries

  - `summarization: optional object { summary_type, text_format, word_limit }`

    Summary Config

    - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

      Defines the style of the summary, such as general, team meeting, or sales call.

      - `"general"`

      - `"team_meeting"`

      - `"sales_call"`

      - `"client_check_in"`

      - `"interview"`

      - `"daily_standup"`

      - `"one_on_one_meeting"`

      - `"lecture"`

      - `"code_review"`

    - `text_format: optional "plain_text" or "markdown"`

      Determines the text format of the summary, such as plain text or markdown.

      - `"plain_text"`

      - `"markdown"`

    - `word_limit: optional number`

      Sets the maximum number of words in the meeting summary.

  - `transcription: optional object { keywords, language, profanity_filter }`

    Transcription Configurations

    - `keywords: optional array of string`

      Adds specific terms to improve accurate detection during transcription.

    - `language: optional "en-US" or "en-IN" or "de" or 7 more`

      Specifies the language code for transcription to ensure accurate results.

      - `"en-US"`

      - `"en-IN"`

      - `"de"`

      - `"hi"`

      - `"sv"`

      - `"ru"`

      - `"pl"`

      - `"el"`

      - `"fr"`

      - `"nl"`

    - `profanity_filter: optional boolean`

      Control the inclusion of offensive language in transcriptions.

- `live_stream_on_start: optional boolean`

  Specifies if the meeting should start getting livestreamed on start.

- `persist_chat: optional boolean`

  If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space.

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

- `summarize_on_end: optional boolean`

  Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

- `title: optional string`

  Title of the meeting

- `transcribe_on_end: optional boolean`

  Automatically generate transcripts when the meeting ends.

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, created_at, updated_at, 10 more }`

  Data returned by the operation

  - `id: string`

    ID of the meeting.

  - `created_at: string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `updated_at: string`

    Timestamp the object was updated at. The time is returned in ISO format.

  - `ai_config: optional object { summarization, transcription }`

    The AI Config allows you to customize the behavior of meeting transcriptions and summaries

    - `summarization: optional object { summary_type, text_format, word_limit }`

      Summary Config

      - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

        Defines the style of the summary, such as general, team meeting, or sales call.

        - `"general"`

        - `"team_meeting"`

        - `"sales_call"`

        - `"client_check_in"`

        - `"interview"`

        - `"daily_standup"`

        - `"one_on_one_meeting"`

        - `"lecture"`

        - `"code_review"`

      - `text_format: optional "plain_text" or "markdown"`

        Determines the text format of the summary, such as plain text or markdown.

        - `"plain_text"`

        - `"markdown"`

      - `word_limit: optional number`

        Sets the maximum number of words in the meeting summary.

    - `transcription: optional object { keywords, language, profanity_filter }`

      Transcription Configurations

      - `keywords: optional array of string`

        Adds specific terms to improve accurate detection during transcription.

      - `language: optional "en-US" or "en-IN" or "de" or 7 more`

        Specifies the language code for transcription to ensure accurate results.

        - `"en-US"`

        - `"en-IN"`

        - `"de"`

        - `"hi"`

        - `"sv"`

        - `"ru"`

        - `"pl"`

        - `"el"`

        - `"fr"`

        - `"nl"`

      - `profanity_filter: optional boolean`

        Control the inclusion of offensive language in transcriptions.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_config": {
      "summarization": {
        "summary_type": "general",
        "text_format": "plain_text",
        "word_limit": 150
      },
      "transcription": {
        "keywords": [
          "string"
        ],
        "language": "en-US",
        "profanity_filter": true
      }
    },
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
  }
}
```

## Fetch all participants of a meeting

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants`

Returns all participants detail for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

### Returns

- `data: array of object { id, created_at, custom_participant_id, 4 more }`

  - `id: string`

    ID of the participant.

  - `created_at: string`

    When this object was created. The time is returned in ISO format.

  - `custom_participant_id: string`

    A unique participant ID generated by the client.

  - `preset_name: string`

    Preset applied to the participant.

  - `updated_at: string`

    When this object was updated. The time is returned in ISO format.

  - `name: optional string`

    Name of the participant.

  - `picture: optional string`

    URL to a picture of the participant.

- `paging: object { end_offset, start_offset, total_count }`

  - `end_offset: number`

  - `start_offset: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "custom_participant_id": "custom_participant_id",
      "preset_name": "preset_name",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "picture": "https://example.com"
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

## Add a participant

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants`

Adds a participant to the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `custom_participant_id: string`

  A unique participant ID. You must specify a unique ID for the participant, for example, UUID, email address, and so on.

- `preset_name: string`

  Name of the preset to apply to this participant.

- `name: optional string`

  (Optional) Name of the participant.

- `picture: optional string`

  (Optional) A URL to a picture to be used for the participant.

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, token, created_at, 5 more }`

  Represents a participant.

  - `id: string`

    ID of the participant.

  - `token: string`

    The participant's auth token that can be used for joining a meeting from the client side.

  - `created_at: string`

    When this object was created. The time is returned in ISO format.

  - `custom_participant_id: string`

    A unique participant ID generated by the client.

  - `preset_name: string`

    Preset applied to the participant.

  - `updated_at: string`

    When this object was updated. The time is returned in ISO format.

  - `name: optional string`

    Name of the participant.

  - `picture: optional string`

    URL to a picture of the participant.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_participant_id": "custom_participant_id",
          "preset_name": "preset_name",
          "name": "Mary Sue",
          "picture": "https://i.imgur.com/test.jpg"
        }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "token": "token",
    "created_at": "2019-12-27T18:11:19.117Z",
    "custom_participant_id": "custom_participant_id",
    "preset_name": "preset_name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "picture": "https://example.com"
  }
}
```

## Fetch a participant's detail

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}`

Returns a participant details for the given meeting and participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

- `participant_id: string`

### Returns

- `data: object { id, created_at, custom_participant_id, 4 more }`

  Data returned by the operation

  - `id: string`

    ID of the participant.

  - `created_at: string`

    When this object was created. The time is returned in ISO format.

  - `custom_participant_id: string`

    A unique participant ID generated by the client.

  - `preset_name: string`

    Preset applied to the participant.

  - `updated_at: string`

    When this object was updated. The time is returned in ISO format.

  - `name: optional string`

    Name of the participant.

  - `picture: optional string`

    URL to a picture of the participant.

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants/$PARTICIPANT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "custom_participant_id": "custom_participant_id",
    "preset_name": "preset_name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "picture": "https://example.com"
  },
  "success": true
}
```

## Edit a participant's detail

**patch** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}`

Updates a participant's details for the given meeting and participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

- `participant_id: string`

### Body Parameters

- `name: optional string`

  (Optional) Name of the participant.

- `picture: optional string`

  (Optional) A URL to a picture to be used for the participant.

- `preset_name: optional string`

  (Optional) Name of the preset to apply to this participant.

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { id, token, created_at, 5 more }`

  Represents a participant.

  - `id: string`

    ID of the participant.

  - `token: string`

    The participant's auth token that can be used for joining a meeting from the client side.

  - `created_at: string`

    When this object was created. The time is returned in ISO format.

  - `custom_participant_id: string`

    A unique participant ID generated by the client.

  - `preset_name: string`

    Preset applied to the participant.

  - `updated_at: string`

    When this object was updated. The time is returned in ISO format.

  - `name: optional string`

    Name of the participant.

  - `picture: optional string`

    URL to a picture of the participant.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants/$PARTICIPANT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Jane Doe"
        }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "token": "token",
    "created_at": "2019-12-27T18:11:19.117Z",
    "custom_participant_id": "custom_participant_id",
    "preset_name": "preset_name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "picture": "https://example.com"
  }
}
```

## Delete a participant

**delete** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}`

Deletes a participant for the given meeting and participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

- `participant_id: string`

### Returns

- `success: boolean`

  Success status of the operation

- `data: optional object { created_at, custom_participant_id, preset_id, updated_at }`

  Data returned by the operation

  - `created_at: string`

    Timestamp this object was created at. The time is returned in ISO format.

  - `custom_participant_id: string`

    A unique participant ID generated by the client.

  - `preset_id: string`

    ID of the preset applied to this participant.

  - `updated_at: string`

    Timestamp this object was updated at. The time is returned in ISO format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants/$PARTICIPANT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true,
  "data": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "custom_participant_id": "custom_participant_id",
    "preset_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "updated_at": "2019-12-27T18:11:19.117Z"
  }
}
```

## Refresh participant's authentication token

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token`

Regenerates participant's authentication token for the given meeting and participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

- `participant_id: string`

### Returns

- `data: object { token }`

  Data returned by the operation

  - `token: string`

    Regenerated participant's authentication token.

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants/$PARTICIPANT_ID/token \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "token": "token"
  },
  "success": true
}
```

## Domain Types

### Meeting Get Response

- `MeetingGetResponse object { data, paging, success }`

  - `data: array of object { id, created_at, updated_at, 9 more }`

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

  - `paging: object { end_offset, start_offset, total_count }`

    - `end_offset: number`

    - `start_offset: number`

    - `total_count: number`

  - `success: boolean`

### Meeting Create Response

- `MeetingCreateResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, created_at, updated_at, 10 more }`

    Data returned by the operation

    - `id: string`

      ID of the meeting.

    - `created_at: string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `updated_at: string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `ai_config: optional object { summarization, transcription }`

      The AI Config allows you to customize the behavior of meeting transcriptions and summaries

      - `summarization: optional object { summary_type, text_format, word_limit }`

        Summary Config

        - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

          Defines the style of the summary, such as general, team meeting, or sales call.

          - `"general"`

          - `"team_meeting"`

          - `"sales_call"`

          - `"client_check_in"`

          - `"interview"`

          - `"daily_standup"`

          - `"one_on_one_meeting"`

          - `"lecture"`

          - `"code_review"`

        - `text_format: optional "plain_text" or "markdown"`

          Determines the text format of the summary, such as plain text or markdown.

          - `"plain_text"`

          - `"markdown"`

        - `word_limit: optional number`

          Sets the maximum number of words in the meeting summary.

      - `transcription: optional object { keywords, language, profanity_filter }`

        Transcription Configurations

        - `keywords: optional array of string`

          Adds specific terms to improve accurate detection during transcription.

        - `language: optional "en-US" or "en-IN" or "de" or 7 more`

          Specifies the language code for transcription to ensure accurate results.

          - `"en-US"`

          - `"en-IN"`

          - `"de"`

          - `"hi"`

          - `"sv"`

          - `"ru"`

          - `"pl"`

          - `"el"`

          - `"fr"`

          - `"nl"`

        - `profanity_filter: optional boolean`

          Control the inclusion of offensive language in transcriptions.

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

### Meeting Get Meeting By ID Response

- `MeetingGetMeetingByIDResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, created_at, updated_at, 10 more }`

    Data returned by the operation

    - `id: string`

      ID of the meeting.

    - `created_at: string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `updated_at: string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `ai_config: optional object { summarization, transcription }`

      The AI Config allows you to customize the behavior of meeting transcriptions and summaries

      - `summarization: optional object { summary_type, text_format, word_limit }`

        Summary Config

        - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

          Defines the style of the summary, such as general, team meeting, or sales call.

          - `"general"`

          - `"team_meeting"`

          - `"sales_call"`

          - `"client_check_in"`

          - `"interview"`

          - `"daily_standup"`

          - `"one_on_one_meeting"`

          - `"lecture"`

          - `"code_review"`

        - `text_format: optional "plain_text" or "markdown"`

          Determines the text format of the summary, such as plain text or markdown.

          - `"plain_text"`

          - `"markdown"`

        - `word_limit: optional number`

          Sets the maximum number of words in the meeting summary.

      - `transcription: optional object { keywords, language, profanity_filter }`

        Transcription Configurations

        - `keywords: optional array of string`

          Adds specific terms to improve accurate detection during transcription.

        - `language: optional "en-US" or "en-IN" or "de" or 7 more`

          Specifies the language code for transcription to ensure accurate results.

          - `"en-US"`

          - `"en-IN"`

          - `"de"`

          - `"hi"`

          - `"sv"`

          - `"ru"`

          - `"pl"`

          - `"el"`

          - `"fr"`

          - `"nl"`

        - `profanity_filter: optional boolean`

          Control the inclusion of offensive language in transcriptions.

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

### Meeting Update Meeting By ID Response

- `MeetingUpdateMeetingByIDResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, created_at, updated_at, 10 more }`

    Data returned by the operation

    - `id: string`

      ID of the meeting.

    - `created_at: string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `updated_at: string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `ai_config: optional object { summarization, transcription }`

      The AI Config allows you to customize the behavior of meeting transcriptions and summaries

      - `summarization: optional object { summary_type, text_format, word_limit }`

        Summary Config

        - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

          Defines the style of the summary, such as general, team meeting, or sales call.

          - `"general"`

          - `"team_meeting"`

          - `"sales_call"`

          - `"client_check_in"`

          - `"interview"`

          - `"daily_standup"`

          - `"one_on_one_meeting"`

          - `"lecture"`

          - `"code_review"`

        - `text_format: optional "plain_text" or "markdown"`

          Determines the text format of the summary, such as plain text or markdown.

          - `"plain_text"`

          - `"markdown"`

        - `word_limit: optional number`

          Sets the maximum number of words in the meeting summary.

      - `transcription: optional object { keywords, language, profanity_filter }`

        Transcription Configurations

        - `keywords: optional array of string`

          Adds specific terms to improve accurate detection during transcription.

        - `language: optional "en-US" or "en-IN" or "de" or 7 more`

          Specifies the language code for transcription to ensure accurate results.

          - `"en-US"`

          - `"en-IN"`

          - `"de"`

          - `"hi"`

          - `"sv"`

          - `"ru"`

          - `"pl"`

          - `"el"`

          - `"fr"`

          - `"nl"`

        - `profanity_filter: optional boolean`

          Control the inclusion of offensive language in transcriptions.

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

### Meeting Replace Meeting By ID Response

- `MeetingReplaceMeetingByIDResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, created_at, updated_at, 10 more }`

    Data returned by the operation

    - `id: string`

      ID of the meeting.

    - `created_at: string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `updated_at: string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `ai_config: optional object { summarization, transcription }`

      The AI Config allows you to customize the behavior of meeting transcriptions and summaries

      - `summarization: optional object { summary_type, text_format, word_limit }`

        Summary Config

        - `summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more`

          Defines the style of the summary, such as general, team meeting, or sales call.

          - `"general"`

          - `"team_meeting"`

          - `"sales_call"`

          - `"client_check_in"`

          - `"interview"`

          - `"daily_standup"`

          - `"one_on_one_meeting"`

          - `"lecture"`

          - `"code_review"`

        - `text_format: optional "plain_text" or "markdown"`

          Determines the text format of the summary, such as plain text or markdown.

          - `"plain_text"`

          - `"markdown"`

        - `word_limit: optional number`

          Sets the maximum number of words in the meeting summary.

      - `transcription: optional object { keywords, language, profanity_filter }`

        Transcription Configurations

        - `keywords: optional array of string`

          Adds specific terms to improve accurate detection during transcription.

        - `language: optional "en-US" or "en-IN" or "de" or 7 more`

          Specifies the language code for transcription to ensure accurate results.

          - `"en-US"`

          - `"en-IN"`

          - `"de"`

          - `"hi"`

          - `"sv"`

          - `"ru"`

          - `"pl"`

          - `"el"`

          - `"fr"`

          - `"nl"`

        - `profanity_filter: optional boolean`

          Control the inclusion of offensive language in transcriptions.

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

### Meeting Get Meeting Participants Response

- `MeetingGetMeetingParticipantsResponse object { data, paging, success }`

  - `data: array of object { id, created_at, custom_participant_id, 4 more }`

    - `id: string`

      ID of the participant.

    - `created_at: string`

      When this object was created. The time is returned in ISO format.

    - `custom_participant_id: string`

      A unique participant ID generated by the client.

    - `preset_name: string`

      Preset applied to the participant.

    - `updated_at: string`

      When this object was updated. The time is returned in ISO format.

    - `name: optional string`

      Name of the participant.

    - `picture: optional string`

      URL to a picture of the participant.

  - `paging: object { end_offset, start_offset, total_count }`

    - `end_offset: number`

    - `start_offset: number`

    - `total_count: number`

  - `success: boolean`

### Meeting Add Participant Response

- `MeetingAddParticipantResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, token, created_at, 5 more }`

    Represents a participant.

    - `id: string`

      ID of the participant.

    - `token: string`

      The participant's auth token that can be used for joining a meeting from the client side.

    - `created_at: string`

      When this object was created. The time is returned in ISO format.

    - `custom_participant_id: string`

      A unique participant ID generated by the client.

    - `preset_name: string`

      Preset applied to the participant.

    - `updated_at: string`

      When this object was updated. The time is returned in ISO format.

    - `name: optional string`

      Name of the participant.

    - `picture: optional string`

      URL to a picture of the participant.

### Meeting Get Meeting Participant Response

- `MeetingGetMeetingParticipantResponse object { data, success }`

  - `data: object { id, created_at, custom_participant_id, 4 more }`

    Data returned by the operation

    - `id: string`

      ID of the participant.

    - `created_at: string`

      When this object was created. The time is returned in ISO format.

    - `custom_participant_id: string`

      A unique participant ID generated by the client.

    - `preset_name: string`

      Preset applied to the participant.

    - `updated_at: string`

      When this object was updated. The time is returned in ISO format.

    - `name: optional string`

      Name of the participant.

    - `picture: optional string`

      URL to a picture of the participant.

  - `success: boolean`

    Success status of the operation

### Meeting Edit Participant Response

- `MeetingEditParticipantResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { id, token, created_at, 5 more }`

    Represents a participant.

    - `id: string`

      ID of the participant.

    - `token: string`

      The participant's auth token that can be used for joining a meeting from the client side.

    - `created_at: string`

      When this object was created. The time is returned in ISO format.

    - `custom_participant_id: string`

      A unique participant ID generated by the client.

    - `preset_name: string`

      Preset applied to the participant.

    - `updated_at: string`

      When this object was updated. The time is returned in ISO format.

    - `name: optional string`

      Name of the participant.

    - `picture: optional string`

      URL to a picture of the participant.

### Meeting Delete Meeting Participant Response

- `MeetingDeleteMeetingParticipantResponse object { success, data }`

  - `success: boolean`

    Success status of the operation

  - `data: optional object { created_at, custom_participant_id, preset_id, updated_at }`

    Data returned by the operation

    - `created_at: string`

      Timestamp this object was created at. The time is returned in ISO format.

    - `custom_participant_id: string`

      A unique participant ID generated by the client.

    - `preset_id: string`

      ID of the preset applied to this participant.

    - `updated_at: string`

      Timestamp this object was updated at. The time is returned in ISO format.

### Meeting Refresh Participant Token Response

- `MeetingRefreshParticipantTokenResponse object { data, success }`

  - `data: object { token }`

    Data returned by the operation

    - `token: string`

      Regenerated participant's authentication token.

  - `success: boolean`

    Success status of the operation

# Presets

## Fetch all presets

**get** `/accounts/{account_id}/realtime/kit/{app_id}/presets`

Fetches all the presets belonging to an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  Search presets by name.

### Returns

- `data: array of object { id, created_at, name, updated_at }`

  - `id: optional string`

    ID of the preset

  - `created_at: optional string`

    Timestamp this preset was created at

  - `name: optional string`

    Name of the preset

  - `updated_at: optional string`

    Timestamp this preset was last updated

- `paging: object { end_offset, start_offset, total_count }`

  - `end_offset: number`

  - `start_offset: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "updated_at": "2019-12-27T18:11:19.117Z"
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

## Create a preset

**post** `/accounts/{account_id}/realtime/kit/{app_id}/presets`

Creates a preset belonging to the current App

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

  - `max_screenshare_count: number`

    Maximum number of screen shares that can be active at a given time

  - `max_video_streams: object { desktop, mobile }`

    Maximum number of streams that are visible on a device

    - `desktop: number`

      Maximum number of video streams visible on desktop devices

    - `mobile: number`

      Maximum number of streams visible on mobile devices

  - `media: object { screenshare, video, audio }`

    Media configuration options. eg: Video quality

    - `screenshare: object { frame_rate, quality }`

      Configuration options for participant screen shares

      - `frame_rate: number`

        Frame rate of screen share

      - `quality: "hd" or "vga" or "qvga" or 2 more`

        Quality of screen share

        - `"hd"`

        - `"vga"`

        - `"qvga"`

        - `"fhd"`

        - `"uhd"`

    - `video: object { frame_rate, quality, simulcast }`

      Configuration options for participant videos

      - `frame_rate: number`

        Frame rate of participants' video

      - `quality: "hd" or "vga" or "qvga" or 2 more`

        Video quality of participants

        - `"hd"`

        - `"vga"`

        - `"qvga"`

        - `"fhd"`

        - `"uhd"`

      - `simulcast: optional boolean`

        Enable simulcast for participant videos.

    - `audio: optional object { enable_high_bitrate, enable_stereo }`

      Control options for Audio quality.

      - `enable_high_bitrate: optional boolean`

        Enable High Quality Audio for your meetings

      - `enable_stereo: optional boolean`

        Enable Stereo for your meetings

  - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

    Type of the meeting

    - `"GROUP_CALL"`

    - `"WEBINAR"`

    - `"AUDIO_ROOM"`

    - `"LIVESTREAM"`

  - `livestream_viewer_qualities: optional array of number`

    Livestream viewer quality levels.

- `name: string`

  Name of the preset

- `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

  - `accept_waiting_requests: boolean`

    Whether this participant can accept waiting requests

  - `can_accept_production_requests: boolean`

  - `can_change_participant_permissions: boolean`

  - `can_edit_display_name: boolean`

  - `can_livestream: boolean`

  - `can_record: boolean`

  - `can_spotlight: boolean`

  - `chat: object { private, public }`

    - `private: object { can_receive, can_send, files, text }`

      - `can_receive: boolean`

      - `can_send: boolean`

      - `files: boolean`

      - `text: boolean`

    - `public: object { can_send, files, text }`

      - `can_send: boolean`

        Can send messages in general

      - `files: boolean`

        Can send file messages

      - `text: boolean`

        Can send text messages

  - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

    - `can_alter_connected_meetings: boolean`

    - `can_switch_connected_meetings: boolean`

    - `can_switch_to_parent_meeting: boolean`

  - `disable_participant_audio: boolean`

  - `disable_participant_screensharing: boolean`

  - `disable_participant_video: boolean`

  - `hidden_participant: boolean`

    Whether this participant is visible to others or not

  - `kick_participant: boolean`

  - `media: object { audio, screenshare, video }`

    Media permissions

    - `audio: object { can_produce }`

      Audio permissions

      - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        Can produce audio

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

    - `screenshare: object { can_produce }`

      Screenshare permissions

      - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        Can produce screen share video

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

    - `video: object { can_produce }`

      Video permissions

      - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        Can produce video

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

  - `pin_participant: boolean`

  - `plugins: object { can_close, can_edit_config, can_start, config }`

    Plugin permissions

    - `can_close: boolean`

      Can close plugins that are already open

    - `can_edit_config: boolean`

      Can edit plugin config

    - `can_start: boolean`

      Can start plugins

    - `config: map[object { access_control, handles_view_only } ]`

      Plugin configuration keyed by plugin UUID.

      - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

        - `"FULL_ACCESS"`

        - `"VIEW_ONLY"`

      - `handles_view_only: optional boolean`

  - `polls: object { can_create, can_view, can_vote }`

    Poll permissions

    - `can_create: boolean`

      Can create polls

    - `can_view: boolean`

      Can view polls

    - `can_vote: boolean`

      Can vote on polls

  - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

    Type of the recording peer

    - `"RECORDER"`

    - `"LIVESTREAMER"`

    - `"NONE"`

  - `show_participant_list: boolean`

  - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

    Waiting room type

    - `"SKIP"`

    - `"ON_PRIVILEGED_USER_ENTRY"`

    - `"SKIP_ON_ACCEPT"`

  - `accept_stage_requests: optional boolean`

  - `is_recorder: optional boolean`

  - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

    - `"ALLOWED"`

    - `"NOT_ALLOWED"`

    - `"CAN_REQUEST"`

  - `stage_enabled: optional boolean`

  - `transcription_enabled: optional boolean`

- `ui: object { design_tokens }`

  - `design_tokens: object { border_radius, border_width, colors, 5 more }`

    - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

      - `"sharp"`

      - `"rounded"`

      - `"extra-rounded"`

      - `"circular"`

    - `border_width: "none" or "thin" or "fat"`

      - `"none"`

      - `"thin"`

      - `"fat"`

    - `colors: object { background, brand, danger, 5 more }`

      - `background: object { "1000", "600", "700", 2 more }`

        - `"1000": string`

        - `"600": string`

        - `"700": string`

        - `"800": string`

        - `"900": string`

      - `brand: object { "300", "400", "500", 2 more }`

        - `"300": string`

        - `"400": string`

        - `"500": string`

        - `"600": string`

        - `"700": string`

      - `danger: string`

      - `success: string`

      - `text: string`

      - `text_on_brand: string`

      - `video_bg: string`

      - `warning: string`

    - `spacing_base: number`

    - `theme: "darkest" or "dark" or "light"`

      - `"darkest"`

      - `"dark"`

      - `"light"`

    - `font_family: optional string`

    - `google_font: optional string`

    - `logo: optional string`

### Returns

- `data: object { id, config, created_at, 4 more }`

  Data returned by the operation

  - `id: string`

    ID of the preset

  - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

    - `max_screenshare_count: number`

      Maximum number of screen shares that can be active at a given time

    - `max_video_streams: object { desktop, mobile }`

      Maximum number of streams that are visible on a device

      - `desktop: number`

        Maximum number of video streams visible on desktop devices

      - `mobile: number`

        Maximum number of streams visible on mobile devices

    - `media: object { screenshare, video, audio }`

      Media configuration options. eg: Video quality

      - `screenshare: object { frame_rate, quality }`

        Configuration options for participant screen shares

        - `frame_rate: number`

          Frame rate of screen share

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Quality of screen share

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

      - `video: object { frame_rate, quality, simulcast }`

        Configuration options for participant videos

        - `frame_rate: number`

          Frame rate of participants' video

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Video quality of participants

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

        - `simulcast: optional boolean`

          Enable simulcast for participant videos.

      - `audio: optional object { enable_high_bitrate, enable_stereo }`

        Control options for Audio quality.

        - `enable_high_bitrate: optional boolean`

          Enable High Quality Audio for your meetings

        - `enable_stereo: optional boolean`

          Enable Stereo for your meetings

    - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

      Type of the meeting

      - `"GROUP_CALL"`

      - `"WEBINAR"`

      - `"AUDIO_ROOM"`

      - `"LIVESTREAM"`

    - `livestream_viewer_qualities: optional array of number`

      Livestream viewer quality levels.

  - `created_at: string`

    Timestamp this preset was created at

  - `name: string`

    Name of the preset

  - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

    - `accept_waiting_requests: boolean`

      Whether this participant can accept waiting requests

    - `can_accept_production_requests: boolean`

    - `can_change_participant_permissions: boolean`

    - `can_edit_display_name: boolean`

    - `can_livestream: boolean`

    - `can_record: boolean`

    - `can_spotlight: boolean`

    - `chat: object { private, public }`

      - `private: object { can_receive, can_send, files, text }`

        - `can_receive: boolean`

        - `can_send: boolean`

        - `files: boolean`

        - `text: boolean`

      - `public: object { can_send, files, text }`

        - `can_send: boolean`

          Can send messages in general

        - `files: boolean`

          Can send file messages

        - `text: boolean`

          Can send text messages

    - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

      - `can_alter_connected_meetings: boolean`

      - `can_switch_connected_meetings: boolean`

      - `can_switch_to_parent_meeting: boolean`

    - `disable_participant_audio: boolean`

    - `disable_participant_screensharing: boolean`

    - `disable_participant_video: boolean`

    - `hidden_participant: boolean`

      Whether this participant is visible to others or not

    - `kick_participant: boolean`

    - `media: object { audio, screenshare, video }`

      Media permissions

      - `audio: object { can_produce }`

        Audio permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce audio

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `screenshare: object { can_produce }`

        Screenshare permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce screen share video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `video: object { can_produce }`

        Video permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

    - `pin_participant: boolean`

    - `plugins: object { can_close, can_edit_config, can_start, config }`

      Plugin permissions

      - `can_close: boolean`

        Can close plugins that are already open

      - `can_edit_config: boolean`

        Can edit plugin config

      - `can_start: boolean`

        Can start plugins

      - `config: map[object { access_control, handles_view_only } ]`

        Plugin configuration keyed by plugin UUID.

        - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

          - `"FULL_ACCESS"`

          - `"VIEW_ONLY"`

        - `handles_view_only: optional boolean`

    - `polls: object { can_create, can_view, can_vote }`

      Poll permissions

      - `can_create: boolean`

        Can create polls

      - `can_view: boolean`

        Can view polls

      - `can_vote: boolean`

        Can vote on polls

    - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

      Type of the recording peer

      - `"RECORDER"`

      - `"LIVESTREAMER"`

      - `"NONE"`

    - `show_participant_list: boolean`

    - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

      Waiting room type

      - `"SKIP"`

      - `"ON_PRIVILEGED_USER_ENTRY"`

      - `"SKIP_ON_ACCEPT"`

    - `accept_stage_requests: optional boolean`

    - `is_recorder: optional boolean`

    - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

      - `"ALLOWED"`

      - `"NOT_ALLOWED"`

      - `"CAN_REQUEST"`

    - `stage_enabled: optional boolean`

    - `transcription_enabled: optional boolean`

  - `ui: object { design_tokens }`

    - `design_tokens: object { border_radius, border_width, colors, 5 more }`

      - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

        - `"sharp"`

        - `"rounded"`

        - `"extra-rounded"`

        - `"circular"`

      - `border_width: "none" or "thin" or "fat"`

        - `"none"`

        - `"thin"`

        - `"fat"`

      - `colors: object { background, brand, danger, 5 more }`

        - `background: object { "1000", "600", "700", 2 more }`

          - `"1000": string`

          - `"600": string`

          - `"700": string`

          - `"800": string`

          - `"900": string`

        - `brand: object { "300", "400", "500", 2 more }`

          - `"300": string`

          - `"400": string`

          - `"500": string`

          - `"600": string`

          - `"700": string`

        - `danger: string`

        - `success: string`

        - `text: string`

        - `text_on_brand: string`

        - `video_bg: string`

        - `warning: string`

      - `spacing_base: number`

      - `theme: "darkest" or "dark" or "light"`

        - `"darkest"`

        - `"dark"`

        - `"light"`

      - `font_family: optional string`

      - `google_font: optional string`

      - `logo: optional string`

  - `updated_at: string`

    Timestamp this preset was last updated

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "max_screenshare_count": 0,
            "max_video_streams": {
              "desktop": 0,
              "mobile": 0
            },
            "media": {
              "screenshare": {
                "frame_rate": 0,
                "quality": "hd"
              },
              "video": {
                "frame_rate": 30,
                "quality": "hd"
              }
            },
            "view_type": "GROUP_CALL"
          },
          "name": "name",
          "permissions": {
            "accept_waiting_requests": true,
            "can_accept_production_requests": true,
            "can_change_participant_permissions": true,
            "can_edit_display_name": true,
            "can_livestream": true,
            "can_record": true,
            "can_spotlight": true,
            "chat": {
              "private": {
                "can_receive": true,
                "can_send": true,
                "files": true,
                "text": true
              },
              "public": {
                "can_send": true,
                "files": true,
                "text": true
              }
            },
            "connected_meetings": {
              "can_alter_connected_meetings": true,
              "can_switch_connected_meetings": true,
              "can_switch_to_parent_meeting": true
            },
            "disable_participant_audio": true,
            "disable_participant_screensharing": true,
            "disable_participant_video": true,
            "hidden_participant": true,
            "kick_participant": true,
            "media": {
              "audio": {
                "can_produce": "ALLOWED"
              },
              "screenshare": {
                "can_produce": "ALLOWED"
              },
              "video": {
                "can_produce": "ALLOWED"
              }
            },
            "pin_participant": true,
            "plugins": {
              "can_close": true,
              "can_edit_config": true,
              "can_start": true,
              "config": {
                "foo": {}
              }
            },
            "polls": {
              "can_create": true,
              "can_view": true,
              "can_vote": true
            },
            "recorder_type": "RECORDER",
            "show_participant_list": true,
            "waiting_room_type": "SKIP"
          },
          "ui": {
            "design_tokens": {
              "border_radius": "sharp",
              "border_width": "none",
              "colors": {
                "background": {
                  "600": "600",
                  "700": "700",
                  "800": "800",
                  "900": "900",
                  "1000": "1000"
                },
                "brand": {
                  "300": "300",
                  "400": "400",
                  "500": "500",
                  "600": "600",
                  "700": "700"
                },
                "danger": "danger",
                "success": "success",
                "text": "text",
                "text_on_brand": "text_on_brand",
                "video_bg": "video_bg",
                "warning": "warning"
              },
              "spacing_base": 1,
              "theme": "darkest"
            }
          }
        }'
```

#### Response

```json
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "config": {
      "max_screenshare_count": 0,
      "max_video_streams": {
        "desktop": 0,
        "mobile": 0
      },
      "media": {
        "screenshare": {
          "frame_rate": 0,
          "quality": "hd"
        },
        "video": {
          "frame_rate": 30,
          "quality": "hd",
          "simulcast": true
        },
        "audio": {
          "enable_high_bitrate": true,
          "enable_stereo": true
        }
      },
      "view_type": "GROUP_CALL",
      "livestream_viewer_qualities": [
        0
      ]
    },
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "permissions": {
      "accept_waiting_requests": true,
      "can_accept_production_requests": true,
      "can_change_participant_permissions": true,
      "can_edit_display_name": true,
      "can_livestream": true,
      "can_record": true,
      "can_spotlight": true,
      "chat": {
        "private": {
          "can_receive": true,
          "can_send": true,
          "files": true,
          "text": true
        },
        "public": {
          "can_send": true,
          "files": true,
          "text": true
        }
      },
      "connected_meetings": {
        "can_alter_connected_meetings": true,
        "can_switch_connected_meetings": true,
        "can_switch_to_parent_meeting": true
      },
      "disable_participant_audio": true,
      "disable_participant_screensharing": true,
      "disable_participant_video": true,
      "hidden_participant": true,
      "kick_participant": true,
      "media": {
        "audio": {
          "can_produce": "ALLOWED"
        },
        "screenshare": {
          "can_produce": "ALLOWED"
        },
        "video": {
          "can_produce": "ALLOWED"
        }
      },
      "pin_participant": true,
      "plugins": {
        "can_close": true,
        "can_edit_config": true,
        "can_start": true,
        "config": {
          "foo": {
            "access_control": "FULL_ACCESS",
            "handles_view_only": true
          }
        }
      },
      "polls": {
        "can_create": true,
        "can_view": true,
        "can_vote": true
      },
      "recorder_type": "RECORDER",
      "show_participant_list": true,
      "waiting_room_type": "SKIP",
      "accept_stage_requests": true,
      "is_recorder": true,
      "stage_access": "ALLOWED",
      "stage_enabled": true,
      "transcription_enabled": true
    },
    "ui": {
      "design_tokens": {
        "border_radius": "sharp",
        "border_width": "none",
        "colors": {
          "background": {
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "1000": "1000"
          },
          "brand": {
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700"
          },
          "danger": "danger",
          "success": "success",
          "text": "text",
          "text_on_brand": "text_on_brand",
          "video_bg": "video_bg",
          "warning": "warning"
        },
        "spacing_base": 1,
        "theme": "darkest",
        "font_family": "font_family",
        "google_font": "google_font",
        "logo": "https://example.com"
      }
    },
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Fetch details of a preset

**get** `/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}`

Fetches details of a preset using the provided preset ID

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `preset_id: string`

### Returns

- `data: object { id, config, created_at, 4 more }`

  Data returned by the operation

  - `id: string`

    ID of the preset

  - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

    - `max_screenshare_count: number`

      Maximum number of screen shares that can be active at a given time

    - `max_video_streams: object { desktop, mobile }`

      Maximum number of streams that are visible on a device

      - `desktop: number`

        Maximum number of video streams visible on desktop devices

      - `mobile: number`

        Maximum number of streams visible on mobile devices

    - `media: object { screenshare, video, audio }`

      Media configuration options. eg: Video quality

      - `screenshare: object { frame_rate, quality }`

        Configuration options for participant screen shares

        - `frame_rate: number`

          Frame rate of screen share

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Quality of screen share

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

      - `video: object { frame_rate, quality, simulcast }`

        Configuration options for participant videos

        - `frame_rate: number`

          Frame rate of participants' video

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Video quality of participants

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

        - `simulcast: optional boolean`

          Enable simulcast for participant videos.

      - `audio: optional object { enable_high_bitrate, enable_stereo }`

        Control options for Audio quality.

        - `enable_high_bitrate: optional boolean`

          Enable High Quality Audio for your meetings

        - `enable_stereo: optional boolean`

          Enable Stereo for your meetings

    - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

      Type of the meeting

      - `"GROUP_CALL"`

      - `"WEBINAR"`

      - `"AUDIO_ROOM"`

      - `"LIVESTREAM"`

    - `livestream_viewer_qualities: optional array of number`

      Livestream viewer quality levels.

  - `created_at: string`

    Timestamp this preset was created at

  - `name: string`

    Name of the preset

  - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

    - `accept_waiting_requests: boolean`

      Whether this participant can accept waiting requests

    - `can_accept_production_requests: boolean`

    - `can_change_participant_permissions: boolean`

    - `can_edit_display_name: boolean`

    - `can_livestream: boolean`

    - `can_record: boolean`

    - `can_spotlight: boolean`

    - `chat: object { private, public }`

      - `private: object { can_receive, can_send, files, text }`

        - `can_receive: boolean`

        - `can_send: boolean`

        - `files: boolean`

        - `text: boolean`

      - `public: object { can_send, files, text }`

        - `can_send: boolean`

          Can send messages in general

        - `files: boolean`

          Can send file messages

        - `text: boolean`

          Can send text messages

    - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

      - `can_alter_connected_meetings: boolean`

      - `can_switch_connected_meetings: boolean`

      - `can_switch_to_parent_meeting: boolean`

    - `disable_participant_audio: boolean`

    - `disable_participant_screensharing: boolean`

    - `disable_participant_video: boolean`

    - `hidden_participant: boolean`

      Whether this participant is visible to others or not

    - `kick_participant: boolean`

    - `media: object { audio, screenshare, video }`

      Media permissions

      - `audio: object { can_produce }`

        Audio permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce audio

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `screenshare: object { can_produce }`

        Screenshare permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce screen share video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `video: object { can_produce }`

        Video permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

    - `pin_participant: boolean`

    - `plugins: object { can_close, can_edit_config, can_start, config }`

      Plugin permissions

      - `can_close: boolean`

        Can close plugins that are already open

      - `can_edit_config: boolean`

        Can edit plugin config

      - `can_start: boolean`

        Can start plugins

      - `config: map[object { access_control, handles_view_only } ]`

        Plugin configuration keyed by plugin UUID.

        - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

          - `"FULL_ACCESS"`

          - `"VIEW_ONLY"`

        - `handles_view_only: optional boolean`

    - `polls: object { can_create, can_view, can_vote }`

      Poll permissions

      - `can_create: boolean`

        Can create polls

      - `can_view: boolean`

        Can view polls

      - `can_vote: boolean`

        Can vote on polls

    - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

      Type of the recording peer

      - `"RECORDER"`

      - `"LIVESTREAMER"`

      - `"NONE"`

    - `show_participant_list: boolean`

    - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

      Waiting room type

      - `"SKIP"`

      - `"ON_PRIVILEGED_USER_ENTRY"`

      - `"SKIP_ON_ACCEPT"`

    - `accept_stage_requests: optional boolean`

    - `is_recorder: optional boolean`

    - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

      - `"ALLOWED"`

      - `"NOT_ALLOWED"`

      - `"CAN_REQUEST"`

    - `stage_enabled: optional boolean`

    - `transcription_enabled: optional boolean`

  - `ui: object { design_tokens }`

    - `design_tokens: object { border_radius, border_width, colors, 5 more }`

      - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

        - `"sharp"`

        - `"rounded"`

        - `"extra-rounded"`

        - `"circular"`

      - `border_width: "none" or "thin" or "fat"`

        - `"none"`

        - `"thin"`

        - `"fat"`

      - `colors: object { background, brand, danger, 5 more }`

        - `background: object { "1000", "600", "700", 2 more }`

          - `"1000": string`

          - `"600": string`

          - `"700": string`

          - `"800": string`

          - `"900": string`

        - `brand: object { "300", "400", "500", 2 more }`

          - `"300": string`

          - `"400": string`

          - `"500": string`

          - `"600": string`

          - `"700": string`

        - `danger: string`

        - `success: string`

        - `text: string`

        - `text_on_brand: string`

        - `video_bg: string`

        - `warning: string`

      - `spacing_base: number`

      - `theme: "darkest" or "dark" or "light"`

        - `"darkest"`

        - `"dark"`

        - `"light"`

      - `font_family: optional string`

      - `google_font: optional string`

      - `logo: optional string`

  - `updated_at: string`

    Timestamp this preset was last updated

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets/$PRESET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "config": {
      "max_screenshare_count": 0,
      "max_video_streams": {
        "desktop": 0,
        "mobile": 0
      },
      "media": {
        "screenshare": {
          "frame_rate": 0,
          "quality": "hd"
        },
        "video": {
          "frame_rate": 30,
          "quality": "hd",
          "simulcast": true
        },
        "audio": {
          "enable_high_bitrate": true,
          "enable_stereo": true
        }
      },
      "view_type": "GROUP_CALL",
      "livestream_viewer_qualities": [
        0
      ]
    },
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "permissions": {
      "accept_waiting_requests": true,
      "can_accept_production_requests": true,
      "can_change_participant_permissions": true,
      "can_edit_display_name": true,
      "can_livestream": true,
      "can_record": true,
      "can_spotlight": true,
      "chat": {
        "private": {
          "can_receive": true,
          "can_send": true,
          "files": true,
          "text": true
        },
        "public": {
          "can_send": true,
          "files": true,
          "text": true
        }
      },
      "connected_meetings": {
        "can_alter_connected_meetings": true,
        "can_switch_connected_meetings": true,
        "can_switch_to_parent_meeting": true
      },
      "disable_participant_audio": true,
      "disable_participant_screensharing": true,
      "disable_participant_video": true,
      "hidden_participant": true,
      "kick_participant": true,
      "media": {
        "audio": {
          "can_produce": "ALLOWED"
        },
        "screenshare": {
          "can_produce": "ALLOWED"
        },
        "video": {
          "can_produce": "ALLOWED"
        }
      },
      "pin_participant": true,
      "plugins": {
        "can_close": true,
        "can_edit_config": true,
        "can_start": true,
        "config": {
          "foo": {
            "access_control": "FULL_ACCESS",
            "handles_view_only": true
          }
        }
      },
      "polls": {
        "can_create": true,
        "can_view": true,
        "can_vote": true
      },
      "recorder_type": "RECORDER",
      "show_participant_list": true,
      "waiting_room_type": "SKIP",
      "accept_stage_requests": true,
      "is_recorder": true,
      "stage_access": "ALLOWED",
      "stage_enabled": true,
      "transcription_enabled": true
    },
    "ui": {
      "design_tokens": {
        "border_radius": "sharp",
        "border_width": "none",
        "colors": {
          "background": {
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "1000": "1000"
          },
          "brand": {
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700"
          },
          "danger": "danger",
          "success": "success",
          "text": "text",
          "text_on_brand": "text_on_brand",
          "video_bg": "video_bg",
          "warning": "warning"
        },
        "spacing_base": 1,
        "theme": "darkest",
        "font_family": "font_family",
        "google_font": "google_font",
        "logo": "https://example.com"
      }
    },
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Delete a preset

**delete** `/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}`

Deletes a preset using the provided preset ID

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `preset_id: string`

### Returns

- `data: object { id, config, created_at, 4 more }`

  Data returned by the operation

  - `id: string`

    ID of the preset

  - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

    - `max_screenshare_count: number`

      Maximum number of screen shares that can be active at a given time

    - `max_video_streams: object { desktop, mobile }`

      Maximum number of streams that are visible on a device

      - `desktop: number`

        Maximum number of video streams visible on desktop devices

      - `mobile: number`

        Maximum number of streams visible on mobile devices

    - `media: object { screenshare, video, audio }`

      Media configuration options. eg: Video quality

      - `screenshare: object { frame_rate, quality }`

        Configuration options for participant screen shares

        - `frame_rate: number`

          Frame rate of screen share

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Quality of screen share

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

      - `video: object { frame_rate, quality, simulcast }`

        Configuration options for participant videos

        - `frame_rate: number`

          Frame rate of participants' video

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Video quality of participants

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

        - `simulcast: optional boolean`

          Enable simulcast for participant videos.

      - `audio: optional object { enable_high_bitrate, enable_stereo }`

        Control options for Audio quality.

        - `enable_high_bitrate: optional boolean`

          Enable High Quality Audio for your meetings

        - `enable_stereo: optional boolean`

          Enable Stereo for your meetings

    - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

      Type of the meeting

      - `"GROUP_CALL"`

      - `"WEBINAR"`

      - `"AUDIO_ROOM"`

      - `"LIVESTREAM"`

    - `livestream_viewer_qualities: optional array of number`

      Livestream viewer quality levels.

  - `created_at: string`

    Timestamp this preset was created at

  - `name: string`

    Name of the preset

  - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

    - `accept_waiting_requests: boolean`

      Whether this participant can accept waiting requests

    - `can_accept_production_requests: boolean`

    - `can_change_participant_permissions: boolean`

    - `can_edit_display_name: boolean`

    - `can_livestream: boolean`

    - `can_record: boolean`

    - `can_spotlight: boolean`

    - `chat: object { private, public }`

      - `private: object { can_receive, can_send, files, text }`

        - `can_receive: boolean`

        - `can_send: boolean`

        - `files: boolean`

        - `text: boolean`

      - `public: object { can_send, files, text }`

        - `can_send: boolean`

          Can send messages in general

        - `files: boolean`

          Can send file messages

        - `text: boolean`

          Can send text messages

    - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

      - `can_alter_connected_meetings: boolean`

      - `can_switch_connected_meetings: boolean`

      - `can_switch_to_parent_meeting: boolean`

    - `disable_participant_audio: boolean`

    - `disable_participant_screensharing: boolean`

    - `disable_participant_video: boolean`

    - `hidden_participant: boolean`

      Whether this participant is visible to others or not

    - `kick_participant: boolean`

    - `media: object { audio, screenshare, video }`

      Media permissions

      - `audio: object { can_produce }`

        Audio permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce audio

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `screenshare: object { can_produce }`

        Screenshare permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce screen share video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `video: object { can_produce }`

        Video permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

    - `pin_participant: boolean`

    - `plugins: object { can_close, can_edit_config, can_start, config }`

      Plugin permissions

      - `can_close: boolean`

        Can close plugins that are already open

      - `can_edit_config: boolean`

        Can edit plugin config

      - `can_start: boolean`

        Can start plugins

      - `config: map[object { access_control, handles_view_only } ]`

        Plugin configuration keyed by plugin UUID.

        - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

          - `"FULL_ACCESS"`

          - `"VIEW_ONLY"`

        - `handles_view_only: optional boolean`

    - `polls: object { can_create, can_view, can_vote }`

      Poll permissions

      - `can_create: boolean`

        Can create polls

      - `can_view: boolean`

        Can view polls

      - `can_vote: boolean`

        Can vote on polls

    - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

      Type of the recording peer

      - `"RECORDER"`

      - `"LIVESTREAMER"`

      - `"NONE"`

    - `show_participant_list: boolean`

    - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

      Waiting room type

      - `"SKIP"`

      - `"ON_PRIVILEGED_USER_ENTRY"`

      - `"SKIP_ON_ACCEPT"`

    - `accept_stage_requests: optional boolean`

    - `is_recorder: optional boolean`

    - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

      - `"ALLOWED"`

      - `"NOT_ALLOWED"`

      - `"CAN_REQUEST"`

    - `stage_enabled: optional boolean`

    - `transcription_enabled: optional boolean`

  - `ui: object { design_tokens }`

    - `design_tokens: object { border_radius, border_width, colors, 5 more }`

      - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

        - `"sharp"`

        - `"rounded"`

        - `"extra-rounded"`

        - `"circular"`

      - `border_width: "none" or "thin" or "fat"`

        - `"none"`

        - `"thin"`

        - `"fat"`

      - `colors: object { background, brand, danger, 5 more }`

        - `background: object { "1000", "600", "700", 2 more }`

          - `"1000": string`

          - `"600": string`

          - `"700": string`

          - `"800": string`

          - `"900": string`

        - `brand: object { "300", "400", "500", 2 more }`

          - `"300": string`

          - `"400": string`

          - `"500": string`

          - `"600": string`

          - `"700": string`

        - `danger: string`

        - `success: string`

        - `text: string`

        - `text_on_brand: string`

        - `video_bg: string`

        - `warning: string`

      - `spacing_base: number`

      - `theme: "darkest" or "dark" or "light"`

        - `"darkest"`

        - `"dark"`

        - `"light"`

      - `font_family: optional string`

      - `google_font: optional string`

      - `logo: optional string`

  - `updated_at: string`

    Timestamp this preset was last updated

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets/$PRESET_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "config": {
      "max_screenshare_count": 0,
      "max_video_streams": {
        "desktop": 0,
        "mobile": 0
      },
      "media": {
        "screenshare": {
          "frame_rate": 0,
          "quality": "hd"
        },
        "video": {
          "frame_rate": 30,
          "quality": "hd",
          "simulcast": true
        },
        "audio": {
          "enable_high_bitrate": true,
          "enable_stereo": true
        }
      },
      "view_type": "GROUP_CALL",
      "livestream_viewer_qualities": [
        0
      ]
    },
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "permissions": {
      "accept_waiting_requests": true,
      "can_accept_production_requests": true,
      "can_change_participant_permissions": true,
      "can_edit_display_name": true,
      "can_livestream": true,
      "can_record": true,
      "can_spotlight": true,
      "chat": {
        "private": {
          "can_receive": true,
          "can_send": true,
          "files": true,
          "text": true
        },
        "public": {
          "can_send": true,
          "files": true,
          "text": true
        }
      },
      "connected_meetings": {
        "can_alter_connected_meetings": true,
        "can_switch_connected_meetings": true,
        "can_switch_to_parent_meeting": true
      },
      "disable_participant_audio": true,
      "disable_participant_screensharing": true,
      "disable_participant_video": true,
      "hidden_participant": true,
      "kick_participant": true,
      "media": {
        "audio": {
          "can_produce": "ALLOWED"
        },
        "screenshare": {
          "can_produce": "ALLOWED"
        },
        "video": {
          "can_produce": "ALLOWED"
        }
      },
      "pin_participant": true,
      "plugins": {
        "can_close": true,
        "can_edit_config": true,
        "can_start": true,
        "config": {
          "foo": {
            "access_control": "FULL_ACCESS",
            "handles_view_only": true
          }
        }
      },
      "polls": {
        "can_create": true,
        "can_view": true,
        "can_vote": true
      },
      "recorder_type": "RECORDER",
      "show_participant_list": true,
      "waiting_room_type": "SKIP",
      "accept_stage_requests": true,
      "is_recorder": true,
      "stage_access": "ALLOWED",
      "stage_enabled": true,
      "transcription_enabled": true
    },
    "ui": {
      "design_tokens": {
        "border_radius": "sharp",
        "border_width": "none",
        "colors": {
          "background": {
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "1000": "1000"
          },
          "brand": {
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700"
          },
          "danger": "danger",
          "success": "success",
          "text": "text",
          "text_on_brand": "text_on_brand",
          "video_bg": "video_bg",
          "warning": "warning"
        },
        "spacing_base": 1,
        "theme": "darkest",
        "font_family": "font_family",
        "google_font": "google_font",
        "logo": "https://example.com"
      }
    },
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Update a preset

**patch** `/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}`

Update a preset by the provided preset ID

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `preset_id: string`

### Body Parameters

- `config: optional object { livestream_viewer_qualities, max_screenshare_count, max_video_streams, 2 more }`

  - `livestream_viewer_qualities: optional array of number`

    Livestream viewer quality levels.

  - `max_screenshare_count: optional number`

    Maximum number of screen shares that can be active at a given time

  - `max_video_streams: optional object { desktop, mobile }`

    Maximum number of streams that are visible on a device

    - `desktop: optional number`

      Maximum number of video streams visible on desktop devices

    - `mobile: optional number`

      Maximum number of streams visible on mobile devices

  - `media: optional object { audio, screenshare, video }`

    Media configuration options. eg: Video quality

    - `audio: optional object { enable_high_bitrate, enable_stereo }`

      Control options for Audio quality.

      - `enable_high_bitrate: optional boolean`

        Enable High Quality Audio for your meetings

      - `enable_stereo: optional boolean`

        Enable Stereo for your meetings

    - `screenshare: optional object { frame_rate, quality }`

      Configuration options for participant screen shares

      - `frame_rate: optional number`

        Frame rate of screen share

      - `quality: optional "hd" or "vga" or "qvga" or 2 more`

        Quality of screen share

        - `"hd"`

        - `"vga"`

        - `"qvga"`

        - `"fhd"`

        - `"uhd"`

    - `video: optional object { frame_rate, quality, simulcast }`

      Configuration options for participant videos

      - `frame_rate: optional number`

        Frame rate of participants' video

      - `quality: optional "hd" or "vga" or "qvga" or 2 more`

        Video quality of participants

        - `"hd"`

        - `"vga"`

        - `"qvga"`

        - `"fhd"`

        - `"uhd"`

      - `simulcast: optional boolean`

        Enable simulcast for participant videos.

  - `view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

    Type of the meeting

    - `"GROUP_CALL"`

    - `"WEBINAR"`

    - `"AUDIO_ROOM"`

    - `"LIVESTREAM"`

- `name: optional string`

  Name of the preset

- `permissions: optional object { accept_stage_requests, accept_waiting_requests, can_accept_production_requests, 23 more }`

  - `accept_stage_requests: optional boolean`

  - `accept_waiting_requests: optional boolean`

    Whether this participant can accept waiting requests

  - `can_accept_production_requests: optional boolean`

  - `can_change_participant_permissions: optional boolean`

  - `can_edit_display_name: optional boolean`

  - `can_livestream: optional boolean`

  - `can_record: optional boolean`

  - `can_spotlight: optional boolean`

  - `chat: optional object { private, public }`

    - `private: optional object { can_receive, can_send, files, text }`

      - `can_receive: optional boolean`

      - `can_send: optional boolean`

      - `files: optional boolean`

      - `text: optional boolean`

    - `public: optional object { can_send, files, text }`

      - `can_send: optional boolean`

        Can send messages in general

      - `files: optional boolean`

        Can send file messages

      - `text: optional boolean`

        Can send text messages

  - `connected_meetings: optional object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

    - `can_alter_connected_meetings: optional boolean`

    - `can_switch_connected_meetings: optional boolean`

    - `can_switch_to_parent_meeting: optional boolean`

  - `disable_participant_audio: optional boolean`

  - `disable_participant_screensharing: optional boolean`

  - `disable_participant_video: optional boolean`

  - `hidden_participant: optional boolean`

    Whether this participant is visible to others or not

  - `is_recorder: optional boolean`

  - `kick_participant: optional boolean`

  - `media: optional object { audio, screenshare, video }`

    Media permissions

    - `audio: optional object { can_produce }`

      Audio permissions

      - `can_produce: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        Can produce audio

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

    - `screenshare: optional object { can_produce }`

      Screenshare permissions

      - `can_produce: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        Can produce screen share video

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

    - `video: optional object { can_produce }`

      Video permissions

      - `can_produce: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        Can produce video

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

  - `pin_participant: optional boolean`

  - `plugins: optional object { can_close, can_edit_config, can_start, config }`

    Plugin permissions

    - `can_close: optional boolean`

      Can close plugins that are already open

    - `can_edit_config: optional boolean`

      Can edit plugin config

    - `can_start: optional boolean`

      Can start plugins

    - `config: optional map[object { access_control, handles_view_only } ]`

      Plugin configuration keyed by plugin UUID.

      - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

        - `"FULL_ACCESS"`

        - `"VIEW_ONLY"`

      - `handles_view_only: optional boolean`

  - `polls: optional object { can_create, can_view, can_vote }`

    Poll permissions

    - `can_create: optional boolean`

      Can create polls

    - `can_view: optional boolean`

      Can view polls

    - `can_vote: optional boolean`

      Can vote on polls

  - `recorder_type: optional "RECORDER" or "LIVESTREAMER" or "NONE"`

    Type of the recording peer

    - `"RECORDER"`

    - `"LIVESTREAMER"`

    - `"NONE"`

  - `show_participant_list: optional boolean`

  - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

    - `"ALLOWED"`

    - `"NOT_ALLOWED"`

    - `"CAN_REQUEST"`

  - `stage_enabled: optional boolean`

  - `transcription_enabled: optional boolean`

  - `waiting_room_type: optional "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

    Waiting room type

    - `"SKIP"`

    - `"ON_PRIVILEGED_USER_ENTRY"`

    - `"SKIP_ON_ACCEPT"`

- `ui: optional object { design_tokens }`

  - `design_tokens: optional object { border_radius, border_width, colors, 5 more }`

    - `border_radius: optional "sharp" or "rounded" or "extra-rounded" or "circular"`

      - `"sharp"`

      - `"rounded"`

      - `"extra-rounded"`

      - `"circular"`

    - `border_width: optional "none" or "thin" or "fat"`

      - `"none"`

      - `"thin"`

      - `"fat"`

    - `colors: optional object { background, brand, danger, 5 more }`

      - `background: optional object { "1000", "600", "700", 2 more }`

        - `"1000": optional string`

        - `"600": optional string`

        - `"700": optional string`

        - `"800": optional string`

        - `"900": optional string`

      - `brand: optional object { "300", "400", "500", 2 more }`

        - `"300": optional string`

        - `"400": optional string`

        - `"500": optional string`

        - `"600": optional string`

        - `"700": optional string`

      - `danger: optional string`

      - `success: optional string`

      - `text: optional string`

      - `text_on_brand: optional string`

      - `video_bg: optional string`

      - `warning: optional string`

    - `font_family: optional string`

    - `google_font: optional string`

    - `logo: optional string`

    - `spacing_base: optional number`

    - `theme: optional "darkest" or "dark" or "light"`

      - `"darkest"`

      - `"dark"`

      - `"light"`

### Returns

- `data: object { id, config, created_at, 4 more }`

  Data returned by the operation

  - `id: string`

    ID of the preset

  - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

    - `max_screenshare_count: number`

      Maximum number of screen shares that can be active at a given time

    - `max_video_streams: object { desktop, mobile }`

      Maximum number of streams that are visible on a device

      - `desktop: number`

        Maximum number of video streams visible on desktop devices

      - `mobile: number`

        Maximum number of streams visible on mobile devices

    - `media: object { screenshare, video, audio }`

      Media configuration options. eg: Video quality

      - `screenshare: object { frame_rate, quality }`

        Configuration options for participant screen shares

        - `frame_rate: number`

          Frame rate of screen share

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Quality of screen share

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

      - `video: object { frame_rate, quality, simulcast }`

        Configuration options for participant videos

        - `frame_rate: number`

          Frame rate of participants' video

        - `quality: "hd" or "vga" or "qvga" or 2 more`

          Video quality of participants

          - `"hd"`

          - `"vga"`

          - `"qvga"`

          - `"fhd"`

          - `"uhd"`

        - `simulcast: optional boolean`

          Enable simulcast for participant videos.

      - `audio: optional object { enable_high_bitrate, enable_stereo }`

        Control options for Audio quality.

        - `enable_high_bitrate: optional boolean`

          Enable High Quality Audio for your meetings

        - `enable_stereo: optional boolean`

          Enable Stereo for your meetings

    - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

      Type of the meeting

      - `"GROUP_CALL"`

      - `"WEBINAR"`

      - `"AUDIO_ROOM"`

      - `"LIVESTREAM"`

    - `livestream_viewer_qualities: optional array of number`

      Livestream viewer quality levels.

  - `created_at: string`

    Timestamp this preset was created at

  - `name: string`

    Name of the preset

  - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

    - `accept_waiting_requests: boolean`

      Whether this participant can accept waiting requests

    - `can_accept_production_requests: boolean`

    - `can_change_participant_permissions: boolean`

    - `can_edit_display_name: boolean`

    - `can_livestream: boolean`

    - `can_record: boolean`

    - `can_spotlight: boolean`

    - `chat: object { private, public }`

      - `private: object { can_receive, can_send, files, text }`

        - `can_receive: boolean`

        - `can_send: boolean`

        - `files: boolean`

        - `text: boolean`

      - `public: object { can_send, files, text }`

        - `can_send: boolean`

          Can send messages in general

        - `files: boolean`

          Can send file messages

        - `text: boolean`

          Can send text messages

    - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

      - `can_alter_connected_meetings: boolean`

      - `can_switch_connected_meetings: boolean`

      - `can_switch_to_parent_meeting: boolean`

    - `disable_participant_audio: boolean`

    - `disable_participant_screensharing: boolean`

    - `disable_participant_video: boolean`

    - `hidden_participant: boolean`

      Whether this participant is visible to others or not

    - `kick_participant: boolean`

    - `media: object { audio, screenshare, video }`

      Media permissions

      - `audio: object { can_produce }`

        Audio permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce audio

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `screenshare: object { can_produce }`

        Screenshare permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce screen share video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

      - `video: object { can_produce }`

        Video permissions

        - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

          Can produce video

          - `"ALLOWED"`

          - `"NOT_ALLOWED"`

          - `"CAN_REQUEST"`

    - `pin_participant: boolean`

    - `plugins: object { can_close, can_edit_config, can_start, config }`

      Plugin permissions

      - `can_close: boolean`

        Can close plugins that are already open

      - `can_edit_config: boolean`

        Can edit plugin config

      - `can_start: boolean`

        Can start plugins

      - `config: map[object { access_control, handles_view_only } ]`

        Plugin configuration keyed by plugin UUID.

        - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

          - `"FULL_ACCESS"`

          - `"VIEW_ONLY"`

        - `handles_view_only: optional boolean`

    - `polls: object { can_create, can_view, can_vote }`

      Poll permissions

      - `can_create: boolean`

        Can create polls

      - `can_view: boolean`

        Can view polls

      - `can_vote: boolean`

        Can vote on polls

    - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

      Type of the recording peer

      - `"RECORDER"`

      - `"LIVESTREAMER"`

      - `"NONE"`

    - `show_participant_list: boolean`

    - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

      Waiting room type

      - `"SKIP"`

      - `"ON_PRIVILEGED_USER_ENTRY"`

      - `"SKIP_ON_ACCEPT"`

    - `accept_stage_requests: optional boolean`

    - `is_recorder: optional boolean`

    - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

      - `"ALLOWED"`

      - `"NOT_ALLOWED"`

      - `"CAN_REQUEST"`

    - `stage_enabled: optional boolean`

    - `transcription_enabled: optional boolean`

  - `ui: object { design_tokens }`

    - `design_tokens: object { border_radius, border_width, colors, 5 more }`

      - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

        - `"sharp"`

        - `"rounded"`

        - `"extra-rounded"`

        - `"circular"`

      - `border_width: "none" or "thin" or "fat"`

        - `"none"`

        - `"thin"`

        - `"fat"`

      - `colors: object { background, brand, danger, 5 more }`

        - `background: object { "1000", "600", "700", 2 more }`

          - `"1000": string`

          - `"600": string`

          - `"700": string`

          - `"800": string`

          - `"900": string`

        - `brand: object { "300", "400", "500", 2 more }`

          - `"300": string`

          - `"400": string`

          - `"500": string`

          - `"600": string`

          - `"700": string`

        - `danger: string`

        - `success: string`

        - `text: string`

        - `text_on_brand: string`

        - `video_bg: string`

        - `warning: string`

      - `spacing_base: number`

      - `theme: "darkest" or "dark" or "light"`

        - `"darkest"`

        - `"dark"`

        - `"light"`

      - `font_family: optional string`

      - `google_font: optional string`

      - `logo: optional string`

  - `updated_at: string`

    Timestamp this preset was last updated

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets/$PRESET_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "config": {
      "max_screenshare_count": 0,
      "max_video_streams": {
        "desktop": 0,
        "mobile": 0
      },
      "media": {
        "screenshare": {
          "frame_rate": 0,
          "quality": "hd"
        },
        "video": {
          "frame_rate": 30,
          "quality": "hd",
          "simulcast": true
        },
        "audio": {
          "enable_high_bitrate": true,
          "enable_stereo": true
        }
      },
      "view_type": "GROUP_CALL",
      "livestream_viewer_qualities": [
        0
      ]
    },
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "permissions": {
      "accept_waiting_requests": true,
      "can_accept_production_requests": true,
      "can_change_participant_permissions": true,
      "can_edit_display_name": true,
      "can_livestream": true,
      "can_record": true,
      "can_spotlight": true,
      "chat": {
        "private": {
          "can_receive": true,
          "can_send": true,
          "files": true,
          "text": true
        },
        "public": {
          "can_send": true,
          "files": true,
          "text": true
        }
      },
      "connected_meetings": {
        "can_alter_connected_meetings": true,
        "can_switch_connected_meetings": true,
        "can_switch_to_parent_meeting": true
      },
      "disable_participant_audio": true,
      "disable_participant_screensharing": true,
      "disable_participant_video": true,
      "hidden_participant": true,
      "kick_participant": true,
      "media": {
        "audio": {
          "can_produce": "ALLOWED"
        },
        "screenshare": {
          "can_produce": "ALLOWED"
        },
        "video": {
          "can_produce": "ALLOWED"
        }
      },
      "pin_participant": true,
      "plugins": {
        "can_close": true,
        "can_edit_config": true,
        "can_start": true,
        "config": {
          "foo": {
            "access_control": "FULL_ACCESS",
            "handles_view_only": true
          }
        }
      },
      "polls": {
        "can_create": true,
        "can_view": true,
        "can_vote": true
      },
      "recorder_type": "RECORDER",
      "show_participant_list": true,
      "waiting_room_type": "SKIP",
      "accept_stage_requests": true,
      "is_recorder": true,
      "stage_access": "ALLOWED",
      "stage_enabled": true,
      "transcription_enabled": true
    },
    "ui": {
      "design_tokens": {
        "border_radius": "sharp",
        "border_width": "none",
        "colors": {
          "background": {
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "1000": "1000"
          },
          "brand": {
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700"
          },
          "danger": "danger",
          "success": "success",
          "text": "text",
          "text_on_brand": "text_on_brand",
          "video_bg": "video_bg",
          "warning": "warning"
        },
        "spacing_base": 1,
        "theme": "darkest",
        "font_family": "font_family",
        "google_font": "google_font",
        "logo": "https://example.com"
      }
    },
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Domain Types

### Preset Get Response

- `PresetGetResponse object { data, paging, success }`

  - `data: array of object { id, created_at, name, updated_at }`

    - `id: optional string`

      ID of the preset

    - `created_at: optional string`

      Timestamp this preset was created at

    - `name: optional string`

      Name of the preset

    - `updated_at: optional string`

      Timestamp this preset was last updated

  - `paging: object { end_offset, start_offset, total_count }`

    - `end_offset: number`

    - `start_offset: number`

    - `total_count: number`

  - `success: boolean`

### Preset Create Response

- `PresetCreateResponse object { data, success }`

  - `data: object { id, config, created_at, 4 more }`

    Data returned by the operation

    - `id: string`

      ID of the preset

    - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

      - `max_screenshare_count: number`

        Maximum number of screen shares that can be active at a given time

      - `max_video_streams: object { desktop, mobile }`

        Maximum number of streams that are visible on a device

        - `desktop: number`

          Maximum number of video streams visible on desktop devices

        - `mobile: number`

          Maximum number of streams visible on mobile devices

      - `media: object { screenshare, video, audio }`

        Media configuration options. eg: Video quality

        - `screenshare: object { frame_rate, quality }`

          Configuration options for participant screen shares

          - `frame_rate: number`

            Frame rate of screen share

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Quality of screen share

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

        - `video: object { frame_rate, quality, simulcast }`

          Configuration options for participant videos

          - `frame_rate: number`

            Frame rate of participants' video

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Video quality of participants

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

          - `simulcast: optional boolean`

            Enable simulcast for participant videos.

        - `audio: optional object { enable_high_bitrate, enable_stereo }`

          Control options for Audio quality.

          - `enable_high_bitrate: optional boolean`

            Enable High Quality Audio for your meetings

          - `enable_stereo: optional boolean`

            Enable Stereo for your meetings

      - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

        Type of the meeting

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

      - `livestream_viewer_qualities: optional array of number`

        Livestream viewer quality levels.

    - `created_at: string`

      Timestamp this preset was created at

    - `name: string`

      Name of the preset

    - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

      - `accept_waiting_requests: boolean`

        Whether this participant can accept waiting requests

      - `can_accept_production_requests: boolean`

      - `can_change_participant_permissions: boolean`

      - `can_edit_display_name: boolean`

      - `can_livestream: boolean`

      - `can_record: boolean`

      - `can_spotlight: boolean`

      - `chat: object { private, public }`

        - `private: object { can_receive, can_send, files, text }`

          - `can_receive: boolean`

          - `can_send: boolean`

          - `files: boolean`

          - `text: boolean`

        - `public: object { can_send, files, text }`

          - `can_send: boolean`

            Can send messages in general

          - `files: boolean`

            Can send file messages

          - `text: boolean`

            Can send text messages

      - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

        - `can_alter_connected_meetings: boolean`

        - `can_switch_connected_meetings: boolean`

        - `can_switch_to_parent_meeting: boolean`

      - `disable_participant_audio: boolean`

      - `disable_participant_screensharing: boolean`

      - `disable_participant_video: boolean`

      - `hidden_participant: boolean`

        Whether this participant is visible to others or not

      - `kick_participant: boolean`

      - `media: object { audio, screenshare, video }`

        Media permissions

        - `audio: object { can_produce }`

          Audio permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce audio

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `screenshare: object { can_produce }`

          Screenshare permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce screen share video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `video: object { can_produce }`

          Video permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

      - `pin_participant: boolean`

      - `plugins: object { can_close, can_edit_config, can_start, config }`

        Plugin permissions

        - `can_close: boolean`

          Can close plugins that are already open

        - `can_edit_config: boolean`

          Can edit plugin config

        - `can_start: boolean`

          Can start plugins

        - `config: map[object { access_control, handles_view_only } ]`

          Plugin configuration keyed by plugin UUID.

          - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

            - `"FULL_ACCESS"`

            - `"VIEW_ONLY"`

          - `handles_view_only: optional boolean`

      - `polls: object { can_create, can_view, can_vote }`

        Poll permissions

        - `can_create: boolean`

          Can create polls

        - `can_view: boolean`

          Can view polls

        - `can_vote: boolean`

          Can vote on polls

      - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

        Type of the recording peer

        - `"RECORDER"`

        - `"LIVESTREAMER"`

        - `"NONE"`

      - `show_participant_list: boolean`

      - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

        Waiting room type

        - `"SKIP"`

        - `"ON_PRIVILEGED_USER_ENTRY"`

        - `"SKIP_ON_ACCEPT"`

      - `accept_stage_requests: optional boolean`

      - `is_recorder: optional boolean`

      - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

      - `stage_enabled: optional boolean`

      - `transcription_enabled: optional boolean`

    - `ui: object { design_tokens }`

      - `design_tokens: object { border_radius, border_width, colors, 5 more }`

        - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

          - `"sharp"`

          - `"rounded"`

          - `"extra-rounded"`

          - `"circular"`

        - `border_width: "none" or "thin" or "fat"`

          - `"none"`

          - `"thin"`

          - `"fat"`

        - `colors: object { background, brand, danger, 5 more }`

          - `background: object { "1000", "600", "700", 2 more }`

            - `"1000": string`

            - `"600": string`

            - `"700": string`

            - `"800": string`

            - `"900": string`

          - `brand: object { "300", "400", "500", 2 more }`

            - `"300": string`

            - `"400": string`

            - `"500": string`

            - `"600": string`

            - `"700": string`

          - `danger: string`

          - `success: string`

          - `text: string`

          - `text_on_brand: string`

          - `video_bg: string`

          - `warning: string`

        - `spacing_base: number`

        - `theme: "darkest" or "dark" or "light"`

          - `"darkest"`

          - `"dark"`

          - `"light"`

        - `font_family: optional string`

        - `google_font: optional string`

        - `logo: optional string`

    - `updated_at: string`

      Timestamp this preset was last updated

  - `success: boolean`

    Success status of the operation

### Preset Get Preset By ID Response

- `PresetGetPresetByIDResponse object { data, success }`

  - `data: object { id, config, created_at, 4 more }`

    Data returned by the operation

    - `id: string`

      ID of the preset

    - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

      - `max_screenshare_count: number`

        Maximum number of screen shares that can be active at a given time

      - `max_video_streams: object { desktop, mobile }`

        Maximum number of streams that are visible on a device

        - `desktop: number`

          Maximum number of video streams visible on desktop devices

        - `mobile: number`

          Maximum number of streams visible on mobile devices

      - `media: object { screenshare, video, audio }`

        Media configuration options. eg: Video quality

        - `screenshare: object { frame_rate, quality }`

          Configuration options for participant screen shares

          - `frame_rate: number`

            Frame rate of screen share

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Quality of screen share

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

        - `video: object { frame_rate, quality, simulcast }`

          Configuration options for participant videos

          - `frame_rate: number`

            Frame rate of participants' video

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Video quality of participants

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

          - `simulcast: optional boolean`

            Enable simulcast for participant videos.

        - `audio: optional object { enable_high_bitrate, enable_stereo }`

          Control options for Audio quality.

          - `enable_high_bitrate: optional boolean`

            Enable High Quality Audio for your meetings

          - `enable_stereo: optional boolean`

            Enable Stereo for your meetings

      - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

        Type of the meeting

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

      - `livestream_viewer_qualities: optional array of number`

        Livestream viewer quality levels.

    - `created_at: string`

      Timestamp this preset was created at

    - `name: string`

      Name of the preset

    - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

      - `accept_waiting_requests: boolean`

        Whether this participant can accept waiting requests

      - `can_accept_production_requests: boolean`

      - `can_change_participant_permissions: boolean`

      - `can_edit_display_name: boolean`

      - `can_livestream: boolean`

      - `can_record: boolean`

      - `can_spotlight: boolean`

      - `chat: object { private, public }`

        - `private: object { can_receive, can_send, files, text }`

          - `can_receive: boolean`

          - `can_send: boolean`

          - `files: boolean`

          - `text: boolean`

        - `public: object { can_send, files, text }`

          - `can_send: boolean`

            Can send messages in general

          - `files: boolean`

            Can send file messages

          - `text: boolean`

            Can send text messages

      - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

        - `can_alter_connected_meetings: boolean`

        - `can_switch_connected_meetings: boolean`

        - `can_switch_to_parent_meeting: boolean`

      - `disable_participant_audio: boolean`

      - `disable_participant_screensharing: boolean`

      - `disable_participant_video: boolean`

      - `hidden_participant: boolean`

        Whether this participant is visible to others or not

      - `kick_participant: boolean`

      - `media: object { audio, screenshare, video }`

        Media permissions

        - `audio: object { can_produce }`

          Audio permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce audio

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `screenshare: object { can_produce }`

          Screenshare permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce screen share video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `video: object { can_produce }`

          Video permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

      - `pin_participant: boolean`

      - `plugins: object { can_close, can_edit_config, can_start, config }`

        Plugin permissions

        - `can_close: boolean`

          Can close plugins that are already open

        - `can_edit_config: boolean`

          Can edit plugin config

        - `can_start: boolean`

          Can start plugins

        - `config: map[object { access_control, handles_view_only } ]`

          Plugin configuration keyed by plugin UUID.

          - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

            - `"FULL_ACCESS"`

            - `"VIEW_ONLY"`

          - `handles_view_only: optional boolean`

      - `polls: object { can_create, can_view, can_vote }`

        Poll permissions

        - `can_create: boolean`

          Can create polls

        - `can_view: boolean`

          Can view polls

        - `can_vote: boolean`

          Can vote on polls

      - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

        Type of the recording peer

        - `"RECORDER"`

        - `"LIVESTREAMER"`

        - `"NONE"`

      - `show_participant_list: boolean`

      - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

        Waiting room type

        - `"SKIP"`

        - `"ON_PRIVILEGED_USER_ENTRY"`

        - `"SKIP_ON_ACCEPT"`

      - `accept_stage_requests: optional boolean`

      - `is_recorder: optional boolean`

      - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

      - `stage_enabled: optional boolean`

      - `transcription_enabled: optional boolean`

    - `ui: object { design_tokens }`

      - `design_tokens: object { border_radius, border_width, colors, 5 more }`

        - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

          - `"sharp"`

          - `"rounded"`

          - `"extra-rounded"`

          - `"circular"`

        - `border_width: "none" or "thin" or "fat"`

          - `"none"`

          - `"thin"`

          - `"fat"`

        - `colors: object { background, brand, danger, 5 more }`

          - `background: object { "1000", "600", "700", 2 more }`

            - `"1000": string`

            - `"600": string`

            - `"700": string`

            - `"800": string`

            - `"900": string`

          - `brand: object { "300", "400", "500", 2 more }`

            - `"300": string`

            - `"400": string`

            - `"500": string`

            - `"600": string`

            - `"700": string`

          - `danger: string`

          - `success: string`

          - `text: string`

          - `text_on_brand: string`

          - `video_bg: string`

          - `warning: string`

        - `spacing_base: number`

        - `theme: "darkest" or "dark" or "light"`

          - `"darkest"`

          - `"dark"`

          - `"light"`

        - `font_family: optional string`

        - `google_font: optional string`

        - `logo: optional string`

    - `updated_at: string`

      Timestamp this preset was last updated

  - `success: boolean`

    Success status of the operation

### Preset Delete Response

- `PresetDeleteResponse object { data, success }`

  - `data: object { id, config, created_at, 4 more }`

    Data returned by the operation

    - `id: string`

      ID of the preset

    - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

      - `max_screenshare_count: number`

        Maximum number of screen shares that can be active at a given time

      - `max_video_streams: object { desktop, mobile }`

        Maximum number of streams that are visible on a device

        - `desktop: number`

          Maximum number of video streams visible on desktop devices

        - `mobile: number`

          Maximum number of streams visible on mobile devices

      - `media: object { screenshare, video, audio }`

        Media configuration options. eg: Video quality

        - `screenshare: object { frame_rate, quality }`

          Configuration options for participant screen shares

          - `frame_rate: number`

            Frame rate of screen share

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Quality of screen share

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

        - `video: object { frame_rate, quality, simulcast }`

          Configuration options for participant videos

          - `frame_rate: number`

            Frame rate of participants' video

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Video quality of participants

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

          - `simulcast: optional boolean`

            Enable simulcast for participant videos.

        - `audio: optional object { enable_high_bitrate, enable_stereo }`

          Control options for Audio quality.

          - `enable_high_bitrate: optional boolean`

            Enable High Quality Audio for your meetings

          - `enable_stereo: optional boolean`

            Enable Stereo for your meetings

      - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

        Type of the meeting

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

      - `livestream_viewer_qualities: optional array of number`

        Livestream viewer quality levels.

    - `created_at: string`

      Timestamp this preset was created at

    - `name: string`

      Name of the preset

    - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

      - `accept_waiting_requests: boolean`

        Whether this participant can accept waiting requests

      - `can_accept_production_requests: boolean`

      - `can_change_participant_permissions: boolean`

      - `can_edit_display_name: boolean`

      - `can_livestream: boolean`

      - `can_record: boolean`

      - `can_spotlight: boolean`

      - `chat: object { private, public }`

        - `private: object { can_receive, can_send, files, text }`

          - `can_receive: boolean`

          - `can_send: boolean`

          - `files: boolean`

          - `text: boolean`

        - `public: object { can_send, files, text }`

          - `can_send: boolean`

            Can send messages in general

          - `files: boolean`

            Can send file messages

          - `text: boolean`

            Can send text messages

      - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

        - `can_alter_connected_meetings: boolean`

        - `can_switch_connected_meetings: boolean`

        - `can_switch_to_parent_meeting: boolean`

      - `disable_participant_audio: boolean`

      - `disable_participant_screensharing: boolean`

      - `disable_participant_video: boolean`

      - `hidden_participant: boolean`

        Whether this participant is visible to others or not

      - `kick_participant: boolean`

      - `media: object { audio, screenshare, video }`

        Media permissions

        - `audio: object { can_produce }`

          Audio permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce audio

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `screenshare: object { can_produce }`

          Screenshare permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce screen share video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `video: object { can_produce }`

          Video permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

      - `pin_participant: boolean`

      - `plugins: object { can_close, can_edit_config, can_start, config }`

        Plugin permissions

        - `can_close: boolean`

          Can close plugins that are already open

        - `can_edit_config: boolean`

          Can edit plugin config

        - `can_start: boolean`

          Can start plugins

        - `config: map[object { access_control, handles_view_only } ]`

          Plugin configuration keyed by plugin UUID.

          - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

            - `"FULL_ACCESS"`

            - `"VIEW_ONLY"`

          - `handles_view_only: optional boolean`

      - `polls: object { can_create, can_view, can_vote }`

        Poll permissions

        - `can_create: boolean`

          Can create polls

        - `can_view: boolean`

          Can view polls

        - `can_vote: boolean`

          Can vote on polls

      - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

        Type of the recording peer

        - `"RECORDER"`

        - `"LIVESTREAMER"`

        - `"NONE"`

      - `show_participant_list: boolean`

      - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

        Waiting room type

        - `"SKIP"`

        - `"ON_PRIVILEGED_USER_ENTRY"`

        - `"SKIP_ON_ACCEPT"`

      - `accept_stage_requests: optional boolean`

      - `is_recorder: optional boolean`

      - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

      - `stage_enabled: optional boolean`

      - `transcription_enabled: optional boolean`

    - `ui: object { design_tokens }`

      - `design_tokens: object { border_radius, border_width, colors, 5 more }`

        - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

          - `"sharp"`

          - `"rounded"`

          - `"extra-rounded"`

          - `"circular"`

        - `border_width: "none" or "thin" or "fat"`

          - `"none"`

          - `"thin"`

          - `"fat"`

        - `colors: object { background, brand, danger, 5 more }`

          - `background: object { "1000", "600", "700", 2 more }`

            - `"1000": string`

            - `"600": string`

            - `"700": string`

            - `"800": string`

            - `"900": string`

          - `brand: object { "300", "400", "500", 2 more }`

            - `"300": string`

            - `"400": string`

            - `"500": string`

            - `"600": string`

            - `"700": string`

          - `danger: string`

          - `success: string`

          - `text: string`

          - `text_on_brand: string`

          - `video_bg: string`

          - `warning: string`

        - `spacing_base: number`

        - `theme: "darkest" or "dark" or "light"`

          - `"darkest"`

          - `"dark"`

          - `"light"`

        - `font_family: optional string`

        - `google_font: optional string`

        - `logo: optional string`

    - `updated_at: string`

      Timestamp this preset was last updated

  - `success: boolean`

    Success status of the operation

### Preset Update Response

- `PresetUpdateResponse object { data, success }`

  - `data: object { id, config, created_at, 4 more }`

    Data returned by the operation

    - `id: string`

      ID of the preset

    - `config: object { max_screenshare_count, max_video_streams, media, 2 more }`

      - `max_screenshare_count: number`

        Maximum number of screen shares that can be active at a given time

      - `max_video_streams: object { desktop, mobile }`

        Maximum number of streams that are visible on a device

        - `desktop: number`

          Maximum number of video streams visible on desktop devices

        - `mobile: number`

          Maximum number of streams visible on mobile devices

      - `media: object { screenshare, video, audio }`

        Media configuration options. eg: Video quality

        - `screenshare: object { frame_rate, quality }`

          Configuration options for participant screen shares

          - `frame_rate: number`

            Frame rate of screen share

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Quality of screen share

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

        - `video: object { frame_rate, quality, simulcast }`

          Configuration options for participant videos

          - `frame_rate: number`

            Frame rate of participants' video

          - `quality: "hd" or "vga" or "qvga" or 2 more`

            Video quality of participants

            - `"hd"`

            - `"vga"`

            - `"qvga"`

            - `"fhd"`

            - `"uhd"`

          - `simulcast: optional boolean`

            Enable simulcast for participant videos.

        - `audio: optional object { enable_high_bitrate, enable_stereo }`

          Control options for Audio quality.

          - `enable_high_bitrate: optional boolean`

            Enable High Quality Audio for your meetings

          - `enable_stereo: optional boolean`

            Enable Stereo for your meetings

      - `view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"`

        Type of the meeting

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

      - `livestream_viewer_qualities: optional array of number`

        Livestream viewer quality levels.

    - `created_at: string`

      Timestamp this preset was created at

    - `name: string`

      Name of the preset

    - `permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }`

      - `accept_waiting_requests: boolean`

        Whether this participant can accept waiting requests

      - `can_accept_production_requests: boolean`

      - `can_change_participant_permissions: boolean`

      - `can_edit_display_name: boolean`

      - `can_livestream: boolean`

      - `can_record: boolean`

      - `can_spotlight: boolean`

      - `chat: object { private, public }`

        - `private: object { can_receive, can_send, files, text }`

          - `can_receive: boolean`

          - `can_send: boolean`

          - `files: boolean`

          - `text: boolean`

        - `public: object { can_send, files, text }`

          - `can_send: boolean`

            Can send messages in general

          - `files: boolean`

            Can send file messages

          - `text: boolean`

            Can send text messages

      - `connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }`

        - `can_alter_connected_meetings: boolean`

        - `can_switch_connected_meetings: boolean`

        - `can_switch_to_parent_meeting: boolean`

      - `disable_participant_audio: boolean`

      - `disable_participant_screensharing: boolean`

      - `disable_participant_video: boolean`

      - `hidden_participant: boolean`

        Whether this participant is visible to others or not

      - `kick_participant: boolean`

      - `media: object { audio, screenshare, video }`

        Media permissions

        - `audio: object { can_produce }`

          Audio permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce audio

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `screenshare: object { can_produce }`

          Screenshare permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce screen share video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

        - `video: object { can_produce }`

          Video permissions

          - `can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

            Can produce video

            - `"ALLOWED"`

            - `"NOT_ALLOWED"`

            - `"CAN_REQUEST"`

      - `pin_participant: boolean`

      - `plugins: object { can_close, can_edit_config, can_start, config }`

        Plugin permissions

        - `can_close: boolean`

          Can close plugins that are already open

        - `can_edit_config: boolean`

          Can edit plugin config

        - `can_start: boolean`

          Can start plugins

        - `config: map[object { access_control, handles_view_only } ]`

          Plugin configuration keyed by plugin UUID.

          - `access_control: optional "FULL_ACCESS" or "VIEW_ONLY"`

            - `"FULL_ACCESS"`

            - `"VIEW_ONLY"`

          - `handles_view_only: optional boolean`

      - `polls: object { can_create, can_view, can_vote }`

        Poll permissions

        - `can_create: boolean`

          Can create polls

        - `can_view: boolean`

          Can view polls

        - `can_vote: boolean`

          Can vote on polls

      - `recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"`

        Type of the recording peer

        - `"RECORDER"`

        - `"LIVESTREAMER"`

        - `"NONE"`

      - `show_participant_list: boolean`

      - `waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"`

        Waiting room type

        - `"SKIP"`

        - `"ON_PRIVILEGED_USER_ENTRY"`

        - `"SKIP_ON_ACCEPT"`

      - `accept_stage_requests: optional boolean`

      - `is_recorder: optional boolean`

      - `stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"`

        - `"ALLOWED"`

        - `"NOT_ALLOWED"`

        - `"CAN_REQUEST"`

      - `stage_enabled: optional boolean`

      - `transcription_enabled: optional boolean`

    - `ui: object { design_tokens }`

      - `design_tokens: object { border_radius, border_width, colors, 5 more }`

        - `border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"`

          - `"sharp"`

          - `"rounded"`

          - `"extra-rounded"`

          - `"circular"`

        - `border_width: "none" or "thin" or "fat"`

          - `"none"`

          - `"thin"`

          - `"fat"`

        - `colors: object { background, brand, danger, 5 more }`

          - `background: object { "1000", "600", "700", 2 more }`

            - `"1000": string`

            - `"600": string`

            - `"700": string`

            - `"800": string`

            - `"900": string`

          - `brand: object { "300", "400", "500", 2 more }`

            - `"300": string`

            - `"400": string`

            - `"500": string`

            - `"600": string`

            - `"700": string`

          - `danger: string`

          - `success: string`

          - `text: string`

          - `text_on_brand: string`

          - `video_bg: string`

          - `warning: string`

        - `spacing_base: number`

        - `theme: "darkest" or "dark" or "light"`

          - `"darkest"`

          - `"dark"`

          - `"light"`

        - `font_family: optional string`

        - `google_font: optional string`

        - `logo: optional string`

    - `updated_at: string`

      Timestamp this preset was last updated

  - `success: boolean`

    Success status of the operation

# Sessions

## Fetch all sessions of an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions`

Returns details of all sessions of an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `associated_id: optional string`

  ID of the meeting that sessions should be associated with

- `end_time: optional string`

  The end time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `participants: optional string`

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  Search string that matches sessions based on meeting title, meeting ID, and session ID

- `sort_by: optional "minutesConsumed" or "createdAt"`

  - `"minutesConsumed"`

  - `"createdAt"`

- `sort_order: optional "ASC" or "DESC"`

  - `"ASC"`

  - `"DESC"`

- `start_time: optional string`

  The start time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `status: optional "LIVE" or "ENDED"`

  - `"LIVE"`

  - `"ENDED"`

### Returns

- `data: optional object { sessions }`

  - `sessions: optional array of object { id, associated_id, created_at, 11 more }`

    - `id: string`

      ID of the session

    - `associated_id: string`

      ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

    - `created_at: string`

      timestamp when session created

    - `live_participants: number`

      number of participants currently in the session

    - `max_concurrent_participants: number`

      number of maximum participants that were in the session

    - `meeting_display_name: string`

      Title of the meeting this session belongs to

    - `minutes_consumed: number`

      number of minutes consumed since the session started

    - `organization_id: string`

      App id that hosted this session

    - `started_at: string`

      timestamp when session started

    - `status: "LIVE" or "ENDED"`

      current status of session

      - `"LIVE"`

      - `"ENDED"`

    - `type: "meeting" or "livestream" or "participant"`

      type of session

      - `"meeting"`

      - `"livestream"`

      - `"participant"`

    - `updated_at: string`

      timestamp when session was last updated

    - `breakout_rooms: optional array of unknown`

    - `ended_at: optional string`

      timestamp when session ended

- `paging: optional object { end_offset, start_offset, total_count }`

  - `end_offset: optional number`

  - `start_offset: optional number`

  - `total_count: optional number`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "sessions": [
      {
        "id": "id",
        "associated_id": "associated_id",
        "created_at": "created_at",
        "live_participants": 0,
        "max_concurrent_participants": 0,
        "meeting_display_name": "meeting_display_name",
        "minutes_consumed": 0,
        "organization_id": "organization_id",
        "started_at": "started_at",
        "status": "LIVE",
        "type": "meeting",
        "updated_at": "updated_at",
        "breakout_rooms": [
          {}
        ],
        "ended_at": "ended_at"
      }
    ]
  },
  "paging": {
    "end_offset": 0,
    "start_offset": 0,
    "total_count": 0
  },
  "success": true
}
```

## Fetch details of a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}`

Returns data of the given session ID including recording details.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Query Parameters

- `include_breakout_rooms: optional boolean`

  List all breakout rooms

### Returns

- `data: optional object { id, associated_id, created_at, 11 more }`

  - `id: string`

    ID of the session

  - `associated_id: string`

    ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

  - `created_at: string`

    timestamp when session created

  - `live_participants: number`

    number of participants currently in the session

  - `max_concurrent_participants: number`

    number of maximum participants that were in the session

  - `meeting_display_name: string`

    Title of the meeting this session belongs to

  - `minutes_consumed: number`

    number of minutes consumed since the session started

  - `organization_id: string`

    App id that hosted this session

  - `started_at: string`

    timestamp when session started

  - `status: "LIVE" or "ENDED"`

    current status of session

    - `"LIVE"`

    - `"ENDED"`

  - `type: "meeting" or "livestream" or "participant"`

    type of session

    - `"meeting"`

    - `"livestream"`

    - `"participant"`

  - `updated_at: string`

    timestamp when session was last updated

  - `breakout_rooms: optional array of unknown`

  - `ended_at: optional string`

    timestamp when session ended

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "associated_id": "associated_id",
    "created_at": "created_at",
    "live_participants": 0,
    "max_concurrent_participants": 0,
    "meeting_display_name": "meeting_display_name",
    "minutes_consumed": 0,
    "organization_id": "organization_id",
    "started_at": "started_at",
    "status": "LIVE",
    "type": "meeting",
    "updated_at": "updated_at",
    "breakout_rooms": [
      {}
    ],
    "ended_at": "ended_at"
  },
  "success": true
}
```

## Fetch participants list of a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants`

Returns a list of participants for the given session ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Query Parameters

- `include_peer_events: optional boolean`

  if true, response includes all the peer events of participants.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  The search query string. You can search using participant ID, custom participant ID, or display name.

- `sort_by: optional "joinedAt" or "duration"`

  - `"joinedAt"`

  - `"duration"`

- `sort_order: optional "ASC" or "DESC"`

  - `"ASC"`

  - `"DESC"`

- `view: optional "raw" or "consolidated"`

  In breakout room sessions, the view parameter can be set to `raw` for session specific duration for participants or `consolidated` to accumulate breakout room durations.

  - `"raw"`

  - `"consolidated"`

### Returns

- `data: optional object { participants }`

  - `participants: optional array of object { id, created_at, custom_participant_id, 8 more }`

    - `id: optional string`

      Participant ID. This maps to the corresponding peerId.

    - `created_at: optional string`

      timestamp when this participant was created.

    - `custom_participant_id: optional string`

      ID passed by client to create this participant.

    - `display_name: optional string`

      Display name of participant when joining the session.

    - `duration: optional number`

      number of minutes for which the participant was in the session.

    - `joined_at: optional string`

      timestamp at which participant joined the session.

    - `left_at: optional string`

      timestamp at which participant left the session.

    - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

      Connection lifecycle events for the participant's peer. Only included when `include_peer_events` is true.

      - `id: optional string`

        ID of the peer event.

      - `created_at: optional string`

        Timestamp when this peer event was created.

      - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

        Name of the peer event.

        - `"PEER_CREATED"`

        - `"PEER_JOINING"`

        - `"PEER_LEAVING"`

      - `minutes_consumed: optional number`

        Minutes consumed attributed to this event.

      - `participant_id: optional string`

        ID of the participant this event belongs to.

      - `peer_id: optional string`

        Peer ID this event belongs to.

      - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

        View type of the preset associated with the peer.

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

        - `"CHAT"`

      - `session_id: optional string`

        ID of the session this event belongs to.

      - `socket_session_id: optional string`

        ID of the socket session associated with this event.

      - `updated_at: optional string`

        Timestamp when this peer event was last updated.

    - `preset_name: optional string`

      Name of the preset associated with the participant.

    - `updated_at: optional string`

      timestamp when this participant's data was last updated.

    - `user_id: optional string`

      User id for this participant.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/participants \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "paging": {
      "end_offset": 2,
      "start_offset": 1,
      "total_count": 123
    },
    "participants": [
      {
        "created_at": "2023-02-01T10:51:08.039Z",
        "custom_participant_id": "83qi0i",
        "display_name": "Mark",
        "duration": 5.8097,
        "id": "005f4e0c-4d08-4d4e-a391-a76be75cd296",
        "joined_at": "2023-02-01T10:51:08.030Z",
        "left_at": "2023-02-01T10:56:56.612Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:56:56.618Z",
        "user_id": "0a08343d-a9dc-45f0-9feb-6a64afcc4f81"
      },
      {
        "created_at": "2023-02-01T10:50:36.853Z",
        "custom_participant_id": "3uggr",
        "display_name": "Henry",
        "duration": 6.9263,
        "id": "51fdf95f-d893-471a-922b-7db7adb14453",
        "joined_at": "2023-02-01T10:50:36.846Z\"",
        "left_at": "2023-02-01T10:57:32.424Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:57:32.431Z",
        "user_id": "85e7f0fd-7c16-45e9-9d68-f17ef007c4eb"
      }
    ]
  },
  "success": true
}
```

## Fetch details of a participant

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants/{participant_id}`

Returns details of the given participant ID along with call statistics for the given session ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

- `participant_id: string`

### Query Parameters

- `include_peer_events: optional boolean`

  if true, response includes all the peer events of participant.

### Returns

- `data: optional object { participant }`

  - `participant: optional object { id, created_at, custom_participant_id, 8 more }`

    - `id: optional string`

      Participant ID. This maps to the corresponding peerId.

    - `created_at: optional string`

      timestamp when this participant was created.

    - `custom_participant_id: optional string`

      ID passed by client to create this participant.

    - `display_name: optional string`

      Display name of participant when joining the session.

    - `duration: optional number`

      number of minutes for which the participant was in the session.

    - `joined_at: optional string`

      timestamp at which participant joined the session.

    - `left_at: optional string`

      timestamp at which participant left the session.

    - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

      Connection lifecycle events for the participant's peer. Only included when `include_peer_events` is true.

      - `id: optional string`

        ID of the peer event.

      - `created_at: optional string`

        Timestamp when this peer event was created.

      - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

        Name of the peer event.

        - `"PEER_CREATED"`

        - `"PEER_JOINING"`

        - `"PEER_LEAVING"`

      - `minutes_consumed: optional number`

        Minutes consumed attributed to this event.

      - `participant_id: optional string`

        ID of the participant this event belongs to.

      - `peer_id: optional string`

        Peer ID this event belongs to.

      - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

        View type of the preset associated with the peer.

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

        - `"CHAT"`

      - `session_id: optional string`

        ID of the session this event belongs to.

      - `socket_session_id: optional string`

        ID of the socket session associated with this event.

      - `updated_at: optional string`

        Timestamp when this peer event was last updated.

    - `preset_name: optional string`

      Name of the preset associated with the participant.

    - `updated_at: optional string`

      timestamp when this participant's data was last updated.

    - `user_id: optional string`

      User id for this participant.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/participants/$PARTICIPANT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "participant": {
      "id": "id",
      "created_at": "created_at",
      "custom_participant_id": "custom_participant_id",
      "display_name": "display_name",
      "duration": 0,
      "joined_at": "joined_at",
      "left_at": "left_at",
      "peer_events": [
        {
          "id": "id",
          "created_at": "created_at",
          "event_name": "PEER_CREATED",
          "minutes_consumed": 0,
          "participant_id": "participant_id",
          "peer_id": "peer_id",
          "preset_view_type": "GROUP_CALL",
          "session_id": "session_id",
          "socket_session_id": "socket_session_id",
          "updated_at": "updated_at"
        }
      ],
      "preset_name": "preset_name",
      "updated_at": "updated_at",
      "user_id": "user_id"
    }
  },
  "success": true
}
```

## Fetch all chat messages of a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/chat`

Returns a URL to download all chat messages of the session ID in CSV format.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Returns

- `data: optional object { chat_download_url, chat_download_url_expiry }`

  - `chat_download_url: string`

    URL where the chat logs can be downloaded

  - `chat_download_url_expiry: string`

    Time when the download URL will expire

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/chat \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "chat_download_url": "chat_download_url",
    "chat_download_url_expiry": "chat_download_url_expiry"
  },
  "success": true
}
```

## Fetch the complete transcript for a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/transcript`

Returns a URL to download the transcript for the session ID in CSV format.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Query Parameters

- `format: optional "SRT" or "VTT" or "JSON" or "CSV"`

  Transcript file format to fetch.

  - `"SRT"`

  - `"VTT"`

  - `"JSON"`

  - `"CSV"`

### Returns

- `data: optional object { sessionId, transcript_download_url, transcript_download_url_expiry }`

  - `sessionId: string`

  - `transcript_download_url: string`

    URL where the transcript can be downloaded

  - `transcript_download_url_expiry: string`

    Time when the download URL will expire

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/transcript \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "sessionId": "sessionId",
    "transcript_download_url": "transcript_download_url",
    "transcript_download_url_expiry": "transcript_download_url_expiry"
  },
  "success": true
}
```

## Fetch summary of transcripts for a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary`

Returns a Summary URL to download the Summary of Transcripts for the session ID as plain text.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Returns

- `data: optional object { sessionId, summaryDownloadUrl, summaryDownloadUrlExpiry }`

  - `sessionId: string`

  - `summaryDownloadUrl: string`

    URL where the summary of transcripts can be downloaded

  - `summaryDownloadUrlExpiry: string`

    Time of Expiry before when you need to download the csv file.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "sessionId": "sessionId",
    "summaryDownloadUrl": "summaryDownloadUrl",
    "summaryDownloadUrlExpiry": "summaryDownloadUrlExpiry"
  },
  "success": true
}
```

## Generate summary of Transcripts for the session

**post** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary`

Trigger Summary generation of Transcripts for the session ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Returns

- `data: optional object { session_id, status }`

  - `session_id: optional string`

  - `status: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "status": "status"
  },
  "success": true
}
```

## Fetch details of peer

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/peer-report/{peer_id}`

Returns participant details for the given peer ID along with call statistics.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `peer_id: string`

### Query Parameters

- `filters: optional "device_info" or "ip_information" or "precall_network_information" or 2 more`

  Filter to apply to the peer report.

  - `"device_info"`

  - `"ip_information"`

  - `"precall_network_information"`

  - `"events"`

  - `"quality_stats"`

- `include_peer_events: optional boolean`

  if true, response includes all the peer events of participant.

### Returns

- `data: optional object { participant }`

  - `participant: optional object { id, created_at, custom_participant_id, 10 more }`

    - `id: optional string`

      ID of the participant.

    - `created_at: optional string`

      timestamp when this participant was created.

    - `custom_participant_id: optional string`

      ID passed by client to create this participant.

    - `display_name: optional string`

      Display name of participant when joining the session.

    - `duration: optional number`

      number of minutes for which the participant was in the session.

    - `joined_at: optional string`

      timestamp at which participant joined the session.

    - `left_at: optional string`

      timestamp at which participant left the session.

    - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

      Connection lifecycle events for the participant's peer.

      - `id: optional string`

        ID of the peer event.

      - `created_at: optional string`

        Timestamp when this peer event was created.

      - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

        Name of the peer event.

        - `"PEER_CREATED"`

        - `"PEER_JOINING"`

        - `"PEER_LEAVING"`

      - `minutes_consumed: optional number`

        Minutes consumed attributed to this event.

      - `participant_id: optional string`

        ID of the participant this event belongs to.

      - `peer_id: optional string`

        Peer ID this event belongs to.

      - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

        View type of the preset associated with the peer.

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

        - `"CHAT"`

      - `session_id: optional string`

        ID of the session this event belongs to.

      - `socket_session_id: optional string`

        ID of the socket session associated with this event.

      - `updated_at: optional string`

        Timestamp when this peer event was last updated.

    - `peer_report: optional object { metadata, quality }`

      Peer call statistics report.

      - `metadata: optional object { audio_devices_updates, browser_metadata, candidate_pairs, 12 more }`

        Connection and device metadata for the participant.

        - `audio_devices_updates: optional array of object { added, removed, timestamp }`

          - `added: optional array of object { device_id, kind, label }`

            Devices that became available.

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `removed: optional array of object { device_id, kind, label }`

            Devices that became unavailable.

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `timestamp: optional string`

            Timestamp of the device update.

        - `browser_metadata: optional object { browser, browser_version, engine, 2 more }`

          - `browser: optional string`

          - `browser_version: optional string`

          - `engine: optional string`

          - `user_agent: optional string`

          - `webgl_support: optional boolean`

        - `candidate_pairs: optional object { consuming_transport, producing_transport }`

          - `consuming_transport: optional array of object { available_incoming_bitrate, available_outgoing_bitrate, bytes_discarded_on_send, 25 more }`

            - `available_incoming_bitrate: optional number`

            - `available_outgoing_bitrate: optional number`

            - `bytes_discarded_on_send: optional number`

            - `bytes_received: optional number`

            - `bytes_sent: optional number`

            - `current_round_trip_time: optional number`

            - `last_packet_received_timestamp: optional number`

              Epoch milliseconds when the last packet was received.

            - `last_packet_sent_timestamp: optional number`

              Epoch milliseconds when the last packet was sent.

            - `local_candidate_address: optional string`

            - `local_candidate_id: optional string`

            - `local_candidate_network_type: optional string`

            - `local_candidate_port: optional number`

            - `local_candidate_protocol: optional string`

            - `local_candidate_related_address: optional string`

            - `local_candidate_related_port: optional number`

            - `local_candidate_type: optional string`

            - `local_candidate_url: optional string`

            - `nominated: optional boolean`

            - `packets_discarded_on_send: optional number`

            - `packets_received: optional number`

            - `packets_sent: optional number`

            - `remote_candidate_address: optional string`

            - `remote_candidate_id: optional string`

            - `remote_candidate_port: optional number`

            - `remote_candidate_protocol: optional string`

            - `remote_candidate_type: optional string`

            - `remote_candidate_url: optional string`

            - `total_round_trip_time: optional number`

          - `producing_transport: optional array of object { available_incoming_bitrate, available_outgoing_bitrate, bytes_discarded_on_send, 25 more }`

            - `available_incoming_bitrate: optional number`

            - `available_outgoing_bitrate: optional number`

            - `bytes_discarded_on_send: optional number`

            - `bytes_received: optional number`

            - `bytes_sent: optional number`

            - `current_round_trip_time: optional number`

            - `last_packet_received_timestamp: optional number`

              Epoch milliseconds when the last packet was received.

            - `last_packet_sent_timestamp: optional number`

              Epoch milliseconds when the last packet was sent.

            - `local_candidate_address: optional string`

            - `local_candidate_id: optional string`

            - `local_candidate_network_type: optional string`

            - `local_candidate_port: optional number`

            - `local_candidate_protocol: optional string`

            - `local_candidate_related_address: optional string`

            - `local_candidate_related_port: optional number`

            - `local_candidate_type: optional string`

            - `local_candidate_url: optional string`

            - `nominated: optional boolean`

            - `packets_discarded_on_send: optional number`

            - `packets_received: optional number`

            - `packets_sent: optional number`

            - `remote_candidate_address: optional string`

            - `remote_candidate_id: optional string`

            - `remote_candidate_port: optional number`

            - `remote_candidate_protocol: optional string`

            - `remote_candidate_type: optional string`

            - `remote_candidate_url: optional string`

            - `total_round_trip_time: optional number`

        - `device_info: optional object { cpus, is_mobile, os, os_version }`

          - `cpus: optional number`

          - `is_mobile: optional boolean`

          - `os: optional string`

          - `os_version: optional string`

        - `events: optional array of object { metadata, name, timestamp }`

          - `metadata: optional map[string or number or boolean]`

            Event-specific metadata. Keys vary per event; values are primitive scalars (string, number, boolean, or null).

            - `string`

            - `number`

            - `boolean`

          - `name: optional string`

            Name of the event.

          - `timestamp: optional string`

            Timestamp when the event occurred.

        - `ip_information: optional object { asn, city, country, 4 more }`

          - `asn: optional object { asn, domain, name, 2 more }`

            - `asn: optional string`

            - `domain: optional string`

            - `name: optional string`

            - `route: optional string`

            - `type: optional string`

          - `city: optional string`

          - `country: optional string`

          - `ipv4: optional string`

          - `org: optional string`

          - `region: optional string`

          - `timezone: optional string`

        - `native_metadata: optional object { audio_encoder, video_encoder }`

          - `audio_encoder: optional string`

          - `video_encoder: optional string`

        - `pc_metadata: optional array of object { effective_network_type, reflexive_connectivity, relay_connectivity, 3 more }`

          - `effective_network_type: optional string`

          - `reflexive_connectivity: optional boolean`

          - `relay_connectivity: optional boolean`

          - `sdp: optional array of string`

          - `timestamp: optional string`

          - `turn_connectivity: optional boolean`

        - `room_view_type: optional string`

        - `sdk_name: optional string`

        - `sdk_type: optional string`

        - `sdk_version: optional string`

        - `selected_device_updates: optional array of object { device, timestamp }`

          - `device: optional object { device_id, kind, label }`

            A media device (camera, microphone, or speaker).

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `timestamp: optional string`

        - `speaker_devices_updates: optional array of object { added, removed, timestamp }`

          - `added: optional array of object { device_id, kind, label }`

            Devices that became available.

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `removed: optional array of object { device_id, kind, label }`

            Devices that became unavailable.

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `timestamp: optional string`

            Timestamp of the device update.

        - `video_devices_updates: optional array of object { added, removed, timestamp }`

          - `added: optional array of object { device_id, kind, label }`

            Devices that became available.

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `removed: optional array of object { device_id, kind, label }`

            Devices that became unavailable.

            - `device_id: optional string`

              ID of the device.

            - `kind: optional string`

              Kind of device, for example audioinput or videoinput.

            - `label: optional string`

              Human-readable label of the device.

          - `timestamp: optional string`

            Timestamp of the device update.

      - `quality: optional object { audio_consumer, audio_consumer_cumulative, audio_producer, 13 more }`

        Media quality statistics for the participant.

        - `audio_consumer: optional array of object { bytes_received, concealment_events, consumer_id, 11 more }`

          - `bytes_received: optional number`

          - `concealment_events: optional number`

          - `consumer_id: optional string`

          - `jitter: optional number`

          - `jitter_buffer_delay: optional number`

          - `jitter_buffer_emitted_count: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_received: optional number`

          - `peer_id: optional string`

          - `producer_id: optional string`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `audio_consumer_cumulative: optional object { jitter_buffer_delay, packet_loss, quality_mos }`

          Aggregated inbound (consumer) audio statistics for the session.

          - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

        - `audio_producer: optional array of object { bytes_sent, jitter, mid, 7 more }`

          - `bytes_sent: optional number`

          - `jitter: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_sent: optional number`

          - `producer_id: optional string`

          - `rtt: optional number`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `audio_producer_cumulative: optional object { packet_loss, quality_mos, rtt }`

          Aggregated outbound (producer) audio statistics for the session.

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

        - `screenshare_audio_consumer: optional array of object { bytes_received, concealment_events, consumer_id, 11 more }`

          - `bytes_received: optional number`

          - `concealment_events: optional number`

          - `consumer_id: optional string`

          - `jitter: optional number`

          - `jitter_buffer_delay: optional number`

          - `jitter_buffer_emitted_count: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_received: optional number`

          - `peer_id: optional string`

          - `producer_id: optional string`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `screenshare_audio_consumer_cumulative: optional object { jitter_buffer_delay, packet_loss, quality_mos }`

          Aggregated inbound (consumer) audio statistics for the session.

          - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

        - `screenshare_audio_producer: optional array of object { bytes_sent, jitter, mid, 7 more }`

          - `bytes_sent: optional number`

          - `jitter: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_sent: optional number`

          - `producer_id: optional string`

          - `rtt: optional number`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `screenshare_audio_producer_cumulative: optional object { packet_loss, quality_mos, rtt }`

          Aggregated outbound (producer) audio statistics for the session.

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

        - `screenshare_video_consumer: optional array of object { bytes_received, consumer_id, fir_count, 17 more }`

          - `bytes_received: optional number`

          - `consumer_id: optional string`

          - `fir_count: optional number`

          - `frame_height: optional number`

          - `frame_width: optional number`

          - `frames_decoded: optional number`

          - `frames_dropped: optional number`

          - `frames_per_second: optional number`

          - `jitter: optional number`

          - `jitter_buffer_delay: optional number`

          - `jitter_buffer_emitted_count: optional number`

          - `key_frames_decoded: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_received: optional number`

          - `peer_id: optional string`

          - `producer_id: optional string`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `screenshare_video_consumer_cumulative: optional object { frame_per_second, frame_width, issues, 4 more }`

          Aggregated inbound (consumer) video statistics for the session.

          - `frame_per_second: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `frame_width: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `issues: optional object { lag_fraction, no_video_fraction, poor_resolution_fraction }`

            - `lag_fraction: optional number`

            - `no_video_fraction: optional number`

            - `poor_resolution_fraction: optional number`

          - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `key_frames_decoded_fraction: optional number`

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

        - `screenshare_video_producer: optional array of object { bytes_sent, fir_count, frame_height, 17 more }`

          - `bytes_sent: optional number`

          - `fir_count: optional number`

          - `frame_height: optional number`

          - `frame_width: optional number`

          - `frames_encoded: optional number`

          - `frames_per_second: optional number`

          - `jitter: optional number`

          - `key_frames_encoded: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_sent: optional number`

          - `pli_count: optional number`

          - `producer_id: optional string`

          - `quality_limitation_durations: optional object { bandwidth, cpu, none, other }`

            - `bandwidth: optional number`

            - `cpu: optional number`

            - `none: optional number`

            - `other: optional number`

          - `quality_limitation_reason: optional "cpu" or "bandwidth" or "none" or "other"`

            - `"cpu"`

            - `"bandwidth"`

            - `"none"`

            - `"other"`

          - `quality_limitation_resolution_changes: optional number`

          - `rtt: optional number`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `screenshare_video_producer_cumulative: optional object { frame_per_second, frame_width, high_negative_feedback_fraction, 5 more }`

          Aggregated outbound (producer) video statistics for the session.

          - `frame_per_second: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `frame_width: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `high_negative_feedback_fraction: optional number`

          - `issues: optional object { bandwidth_quality_limitation_fraction, cpu_quality_limitation_fraction, no_video_fraction, 2 more }`

            - `bandwidth_quality_limitation_fraction: optional number`

            - `cpu_quality_limitation_fraction: optional number`

            - `no_video_fraction: optional number`

            - `poor_resolution_fraction: optional number`

            - `quality_limitation_fraction: optional number`

          - `key_frames_encoded_fraction: optional number`

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

        - `video_consumer: optional array of object { bytes_received, consumer_id, fir_count, 17 more }`

          - `bytes_received: optional number`

          - `consumer_id: optional string`

          - `fir_count: optional number`

          - `frame_height: optional number`

          - `frame_width: optional number`

          - `frames_decoded: optional number`

          - `frames_dropped: optional number`

          - `frames_per_second: optional number`

          - `jitter: optional number`

          - `jitter_buffer_delay: optional number`

          - `jitter_buffer_emitted_count: optional number`

          - `key_frames_decoded: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_received: optional number`

          - `peer_id: optional string`

          - `producer_id: optional string`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `video_consumer_cumulative: optional object { frame_per_second, frame_width, issues, 4 more }`

          Aggregated inbound (consumer) video statistics for the session.

          - `frame_per_second: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `frame_width: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `issues: optional object { lag_fraction, no_video_fraction, poor_resolution_fraction }`

            - `lag_fraction: optional number`

            - `no_video_fraction: optional number`

            - `poor_resolution_fraction: optional number`

          - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `key_frames_decoded_fraction: optional number`

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

        - `video_producer: optional array of object { bytes_sent, fir_count, frame_height, 17 more }`

          - `bytes_sent: optional number`

          - `fir_count: optional number`

          - `frame_height: optional number`

          - `frame_width: optional number`

          - `frames_encoded: optional number`

          - `frames_per_second: optional number`

          - `jitter: optional number`

          - `key_frames_encoded: optional number`

          - `mid: optional string`

          - `mos_quality: optional number`

          - `packets_lost: optional number`

          - `packets_sent: optional number`

          - `pli_count: optional number`

          - `producer_id: optional string`

          - `quality_limitation_durations: optional object { bandwidth, cpu, none, other }`

            - `bandwidth: optional number`

            - `cpu: optional number`

            - `none: optional number`

            - `other: optional number`

          - `quality_limitation_reason: optional "cpu" or "bandwidth" or "none" or "other"`

            - `"cpu"`

            - `"bandwidth"`

            - `"none"`

            - `"other"`

          - `quality_limitation_resolution_changes: optional number`

          - `rtt: optional number`

          - `ssrc: optional number`

          - `timestamp: optional string`

        - `video_producer_cumulative: optional object { frame_per_second, frame_width, high_negative_feedback_fraction, 5 more }`

          Aggregated outbound (producer) video statistics for the session.

          - `frame_per_second: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `frame_width: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `high_negative_feedback_fraction: optional number`

          - `issues: optional object { bandwidth_quality_limitation_fraction, cpu_quality_limitation_fraction, no_video_fraction, 2 more }`

            - `bandwidth_quality_limitation_fraction: optional number`

            - `cpu_quality_limitation_fraction: optional number`

            - `no_video_fraction: optional number`

            - `poor_resolution_fraction: optional number`

            - `quality_limitation_fraction: optional number`

          - `key_frames_encoded_fraction: optional number`

          - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

            Cumulative packet loss distribution.

            - `"10_or_greater_event_fraction": optional number`

            - `"25_or_greater_event_fraction": optional number`

            - `"5_or_greater_event_fraction": optional number`

            - `"50_or_greater_event_fraction": optional number`

            - `avg: optional number`

          - `quality_mos: optional object { avg, p50, p75, p90 }`

            Distribution summary with average and percentiles.

            - `avg: optional number`

            - `p50: optional number`

            - `p75: optional number`

            - `p90: optional number`

          - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

            Cumulative latency distribution (milliseconds-based thresholds).

            - `"100ms_or_greater_event_fraction": optional number`

            - `"250ms_or_greater_event_fraction": optional number`

            - `"500ms_or_greater_event_fraction": optional number`

            - `avg: optional number`

    - `role: optional string`

      Name of the preset associated with the participant.

    - `session_id: optional string`

    - `updated_at: optional string`

      timestamp when this participant's data was last updated.

    - `user_id: optional string`

      User id for this participant.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/peer-report/$PEER_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "participant": {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "created_at",
      "custom_participant_id": "custom_participant_id",
      "display_name": "display_name",
      "duration": 0,
      "joined_at": "joined_at",
      "left_at": "left_at",
      "peer_events": [
        {
          "id": "id",
          "created_at": "created_at",
          "event_name": "PEER_CREATED",
          "minutes_consumed": 0,
          "participant_id": "participant_id",
          "peer_id": "peer_id",
          "preset_view_type": "GROUP_CALL",
          "session_id": "session_id",
          "socket_session_id": "socket_session_id",
          "updated_at": "updated_at"
        }
      ],
      "peer_report": {
        "metadata": {
          "audio_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ],
          "browser_metadata": {
            "browser": "browser",
            "browser_version": "browser_version",
            "engine": "engine",
            "user_agent": "user_agent",
            "webgl_support": true
          },
          "candidate_pairs": {
            "consuming_transport": [
              {
                "available_incoming_bitrate": 0,
                "available_outgoing_bitrate": 0,
                "bytes_discarded_on_send": 0,
                "bytes_received": 0,
                "bytes_sent": 0,
                "current_round_trip_time": 0,
                "last_packet_received_timestamp": 0,
                "last_packet_sent_timestamp": 0,
                "local_candidate_address": "local_candidate_address",
                "local_candidate_id": "local_candidate_id",
                "local_candidate_network_type": "local_candidate_network_type",
                "local_candidate_port": 0,
                "local_candidate_protocol": "local_candidate_protocol",
                "local_candidate_related_address": "local_candidate_related_address",
                "local_candidate_related_port": 0,
                "local_candidate_type": "local_candidate_type",
                "local_candidate_url": "local_candidate_url",
                "nominated": true,
                "packets_discarded_on_send": 0,
                "packets_received": 0,
                "packets_sent": 0,
                "remote_candidate_address": "remote_candidate_address",
                "remote_candidate_id": "remote_candidate_id",
                "remote_candidate_port": 0,
                "remote_candidate_protocol": "remote_candidate_protocol",
                "remote_candidate_type": "remote_candidate_type",
                "remote_candidate_url": "remote_candidate_url",
                "total_round_trip_time": 0
              }
            ],
            "producing_transport": [
              {
                "available_incoming_bitrate": 0,
                "available_outgoing_bitrate": 0,
                "bytes_discarded_on_send": 0,
                "bytes_received": 0,
                "bytes_sent": 0,
                "current_round_trip_time": 0,
                "last_packet_received_timestamp": 0,
                "last_packet_sent_timestamp": 0,
                "local_candidate_address": "local_candidate_address",
                "local_candidate_id": "local_candidate_id",
                "local_candidate_network_type": "local_candidate_network_type",
                "local_candidate_port": 0,
                "local_candidate_protocol": "local_candidate_protocol",
                "local_candidate_related_address": "local_candidate_related_address",
                "local_candidate_related_port": 0,
                "local_candidate_type": "local_candidate_type",
                "local_candidate_url": "local_candidate_url",
                "nominated": true,
                "packets_discarded_on_send": 0,
                "packets_received": 0,
                "packets_sent": 0,
                "remote_candidate_address": "remote_candidate_address",
                "remote_candidate_id": "remote_candidate_id",
                "remote_candidate_port": 0,
                "remote_candidate_protocol": "remote_candidate_protocol",
                "remote_candidate_type": "remote_candidate_type",
                "remote_candidate_url": "remote_candidate_url",
                "total_round_trip_time": 0
              }
            ]
          },
          "device_info": {
            "cpus": 0,
            "is_mobile": true,
            "os": "os",
            "os_version": "os_version"
          },
          "events": [
            {
              "metadata": {
                "foo": "string"
              },
              "name": "name",
              "timestamp": "timestamp"
            }
          ],
          "ip_information": {
            "asn": {
              "asn": "asn",
              "domain": "domain",
              "name": "name",
              "route": "route",
              "type": "type"
            },
            "city": "city",
            "country": "country",
            "ipv4": "ipv4",
            "org": "org",
            "region": "region",
            "timezone": "timezone"
          },
          "native_metadata": {
            "audio_encoder": "audio_encoder",
            "video_encoder": "video_encoder"
          },
          "pc_metadata": [
            {
              "effective_network_type": "effective_network_type",
              "reflexive_connectivity": true,
              "relay_connectivity": true,
              "sdp": [
                "string"
              ],
              "timestamp": "timestamp",
              "turn_connectivity": true
            }
          ],
          "room_view_type": "room_view_type",
          "sdk_name": "sdk_name",
          "sdk_type": "sdk_type",
          "sdk_version": "sdk_version",
          "selected_device_updates": [
            {
              "device": {
                "device_id": "device_id",
                "kind": "kind",
                "label": "label"
              },
              "timestamp": "timestamp"
            }
          ],
          "speaker_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ],
          "video_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ]
        },
        "quality": {
          "audio_consumer": [
            {
              "bytes_received": 0,
              "concealment_events": 0,
              "consumer_id": "consumer_id",
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "audio_consumer_cumulative": {
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "audio_producer": [
            {
              "bytes_sent": 0,
              "jitter": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "producer_id": "producer_id",
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "audio_producer_cumulative": {
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "screenshare_audio_consumer": [
            {
              "bytes_received": 0,
              "concealment_events": 0,
              "consumer_id": "consumer_id",
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_audio_consumer_cumulative": {
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "screenshare_audio_producer": [
            {
              "bytes_sent": 0,
              "jitter": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "producer_id": "producer_id",
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_audio_producer_cumulative": {
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "screenshare_video_consumer": [
            {
              "bytes_received": 0,
              "consumer_id": "consumer_id",
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_decoded": 0,
              "frames_dropped": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "key_frames_decoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_video_consumer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "issues": {
              "lag_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0
            },
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "key_frames_decoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "screenshare_video_producer": [
            {
              "bytes_sent": 0,
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_encoded": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "key_frames_encoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "pli_count": 0,
              "producer_id": "producer_id",
              "quality_limitation_durations": {
                "bandwidth": 0,
                "cpu": 0,
                "none": 0,
                "other": 0
              },
              "quality_limitation_reason": "cpu",
              "quality_limitation_resolution_changes": 0,
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_video_producer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "high_negative_feedback_fraction": 0,
            "issues": {
              "bandwidth_quality_limitation_fraction": 0,
              "cpu_quality_limitation_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0,
              "quality_limitation_fraction": 0
            },
            "key_frames_encoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "video_consumer": [
            {
              "bytes_received": 0,
              "consumer_id": "consumer_id",
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_decoded": 0,
              "frames_dropped": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "key_frames_decoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "video_consumer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "issues": {
              "lag_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0
            },
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "key_frames_decoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "video_producer": [
            {
              "bytes_sent": 0,
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_encoded": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "key_frames_encoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "pli_count": 0,
              "producer_id": "producer_id",
              "quality_limitation_durations": {
                "bandwidth": 0,
                "cpu": 0,
                "none": 0,
                "other": 0
              },
              "quality_limitation_reason": "cpu",
              "quality_limitation_resolution_changes": 0,
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "video_producer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "high_negative_feedback_fraction": 0,
            "issues": {
              "bandwidth_quality_limitation_fraction": 0,
              "cpu_quality_limitation_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0,
              "quality_limitation_fraction": 0
            },
            "key_frames_encoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          }
        }
      },
      "role": "role",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "updated_at": "updated_at",
      "user_id": "user_id"
    }
  },
  "success": true
}
```

## Domain Types

### Session Get Sessions Response

- `SessionGetSessionsResponse object { data, paging, success }`

  - `data: optional object { sessions }`

    - `sessions: optional array of object { id, associated_id, created_at, 11 more }`

      - `id: string`

        ID of the session

      - `associated_id: string`

        ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

      - `created_at: string`

        timestamp when session created

      - `live_participants: number`

        number of participants currently in the session

      - `max_concurrent_participants: number`

        number of maximum participants that were in the session

      - `meeting_display_name: string`

        Title of the meeting this session belongs to

      - `minutes_consumed: number`

        number of minutes consumed since the session started

      - `organization_id: string`

        App id that hosted this session

      - `started_at: string`

        timestamp when session started

      - `status: "LIVE" or "ENDED"`

        current status of session

        - `"LIVE"`

        - `"ENDED"`

      - `type: "meeting" or "livestream" or "participant"`

        type of session

        - `"meeting"`

        - `"livestream"`

        - `"participant"`

      - `updated_at: string`

        timestamp when session was last updated

      - `breakout_rooms: optional array of unknown`

      - `ended_at: optional string`

        timestamp when session ended

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

  - `success: optional boolean`

### Session Get Session Details Response

- `SessionGetSessionDetailsResponse object { data, success }`

  - `data: optional object { id, associated_id, created_at, 11 more }`

    - `id: string`

      ID of the session

    - `associated_id: string`

      ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

    - `created_at: string`

      timestamp when session created

    - `live_participants: number`

      number of participants currently in the session

    - `max_concurrent_participants: number`

      number of maximum participants that were in the session

    - `meeting_display_name: string`

      Title of the meeting this session belongs to

    - `minutes_consumed: number`

      number of minutes consumed since the session started

    - `organization_id: string`

      App id that hosted this session

    - `started_at: string`

      timestamp when session started

    - `status: "LIVE" or "ENDED"`

      current status of session

      - `"LIVE"`

      - `"ENDED"`

    - `type: "meeting" or "livestream" or "participant"`

      type of session

      - `"meeting"`

      - `"livestream"`

      - `"participant"`

    - `updated_at: string`

      timestamp when session was last updated

    - `breakout_rooms: optional array of unknown`

    - `ended_at: optional string`

      timestamp when session ended

  - `success: optional boolean`

### Session Get Session Participants Response

- `SessionGetSessionParticipantsResponse object { data, success }`

  - `data: optional object { participants }`

    - `participants: optional array of object { id, created_at, custom_participant_id, 8 more }`

      - `id: optional string`

        Participant ID. This maps to the corresponding peerId.

      - `created_at: optional string`

        timestamp when this participant was created.

      - `custom_participant_id: optional string`

        ID passed by client to create this participant.

      - `display_name: optional string`

        Display name of participant when joining the session.

      - `duration: optional number`

        number of minutes for which the participant was in the session.

      - `joined_at: optional string`

        timestamp at which participant joined the session.

      - `left_at: optional string`

        timestamp at which participant left the session.

      - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

        Connection lifecycle events for the participant's peer. Only included when `include_peer_events` is true.

        - `id: optional string`

          ID of the peer event.

        - `created_at: optional string`

          Timestamp when this peer event was created.

        - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

          Name of the peer event.

          - `"PEER_CREATED"`

          - `"PEER_JOINING"`

          - `"PEER_LEAVING"`

        - `minutes_consumed: optional number`

          Minutes consumed attributed to this event.

        - `participant_id: optional string`

          ID of the participant this event belongs to.

        - `peer_id: optional string`

          Peer ID this event belongs to.

        - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

          View type of the preset associated with the peer.

          - `"GROUP_CALL"`

          - `"WEBINAR"`

          - `"AUDIO_ROOM"`

          - `"LIVESTREAM"`

          - `"CHAT"`

        - `session_id: optional string`

          ID of the session this event belongs to.

        - `socket_session_id: optional string`

          ID of the socket session associated with this event.

        - `updated_at: optional string`

          Timestamp when this peer event was last updated.

      - `preset_name: optional string`

        Name of the preset associated with the participant.

      - `updated_at: optional string`

        timestamp when this participant's data was last updated.

      - `user_id: optional string`

        User id for this participant.

  - `success: optional boolean`

### Session Get Session Participant Details Response

- `SessionGetSessionParticipantDetailsResponse object { data, success }`

  - `data: optional object { participant }`

    - `participant: optional object { id, created_at, custom_participant_id, 8 more }`

      - `id: optional string`

        Participant ID. This maps to the corresponding peerId.

      - `created_at: optional string`

        timestamp when this participant was created.

      - `custom_participant_id: optional string`

        ID passed by client to create this participant.

      - `display_name: optional string`

        Display name of participant when joining the session.

      - `duration: optional number`

        number of minutes for which the participant was in the session.

      - `joined_at: optional string`

        timestamp at which participant joined the session.

      - `left_at: optional string`

        timestamp at which participant left the session.

      - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

        Connection lifecycle events for the participant's peer. Only included when `include_peer_events` is true.

        - `id: optional string`

          ID of the peer event.

        - `created_at: optional string`

          Timestamp when this peer event was created.

        - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

          Name of the peer event.

          - `"PEER_CREATED"`

          - `"PEER_JOINING"`

          - `"PEER_LEAVING"`

        - `minutes_consumed: optional number`

          Minutes consumed attributed to this event.

        - `participant_id: optional string`

          ID of the participant this event belongs to.

        - `peer_id: optional string`

          Peer ID this event belongs to.

        - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

          View type of the preset associated with the peer.

          - `"GROUP_CALL"`

          - `"WEBINAR"`

          - `"AUDIO_ROOM"`

          - `"LIVESTREAM"`

          - `"CHAT"`

        - `session_id: optional string`

          ID of the session this event belongs to.

        - `socket_session_id: optional string`

          ID of the socket session associated with this event.

        - `updated_at: optional string`

          Timestamp when this peer event was last updated.

      - `preset_name: optional string`

        Name of the preset associated with the participant.

      - `updated_at: optional string`

        timestamp when this participant's data was last updated.

      - `user_id: optional string`

        User id for this participant.

  - `success: optional boolean`

### Session Get Session Chat Response

- `SessionGetSessionChatResponse object { data, success }`

  - `data: optional object { chat_download_url, chat_download_url_expiry }`

    - `chat_download_url: string`

      URL where the chat logs can be downloaded

    - `chat_download_url_expiry: string`

      Time when the download URL will expire

  - `success: optional boolean`

### Session Get Session Transcripts Response

- `SessionGetSessionTranscriptsResponse object { data, success }`

  - `data: optional object { sessionId, transcript_download_url, transcript_download_url_expiry }`

    - `sessionId: string`

    - `transcript_download_url: string`

      URL where the transcript can be downloaded

    - `transcript_download_url_expiry: string`

      Time when the download URL will expire

  - `success: optional boolean`

### Session Get Session Summary Response

- `SessionGetSessionSummaryResponse object { data, success }`

  - `data: optional object { sessionId, summaryDownloadUrl, summaryDownloadUrlExpiry }`

    - `sessionId: string`

    - `summaryDownloadUrl: string`

      URL where the summary of transcripts can be downloaded

    - `summaryDownloadUrlExpiry: string`

      Time of Expiry before when you need to download the csv file.

  - `success: optional boolean`

### Session Generate Summary Of Transcripts Response

- `SessionGenerateSummaryOfTranscriptsResponse object { data, success }`

  - `data: optional object { session_id, status }`

    - `session_id: optional string`

    - `status: optional string`

  - `success: optional boolean`

### Session Get Participant Data From Peer ID Response

- `SessionGetParticipantDataFromPeerIDResponse object { data, success }`

  - `data: optional object { participant }`

    - `participant: optional object { id, created_at, custom_participant_id, 10 more }`

      - `id: optional string`

        ID of the participant.

      - `created_at: optional string`

        timestamp when this participant was created.

      - `custom_participant_id: optional string`

        ID passed by client to create this participant.

      - `display_name: optional string`

        Display name of participant when joining the session.

      - `duration: optional number`

        number of minutes for which the participant was in the session.

      - `joined_at: optional string`

        timestamp at which participant joined the session.

      - `left_at: optional string`

        timestamp at which participant left the session.

      - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

        Connection lifecycle events for the participant's peer.

        - `id: optional string`

          ID of the peer event.

        - `created_at: optional string`

          Timestamp when this peer event was created.

        - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

          Name of the peer event.

          - `"PEER_CREATED"`

          - `"PEER_JOINING"`

          - `"PEER_LEAVING"`

        - `minutes_consumed: optional number`

          Minutes consumed attributed to this event.

        - `participant_id: optional string`

          ID of the participant this event belongs to.

        - `peer_id: optional string`

          Peer ID this event belongs to.

        - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

          View type of the preset associated with the peer.

          - `"GROUP_CALL"`

          - `"WEBINAR"`

          - `"AUDIO_ROOM"`

          - `"LIVESTREAM"`

          - `"CHAT"`

        - `session_id: optional string`

          ID of the session this event belongs to.

        - `socket_session_id: optional string`

          ID of the socket session associated with this event.

        - `updated_at: optional string`

          Timestamp when this peer event was last updated.

      - `peer_report: optional object { metadata, quality }`

        Peer call statistics report.

        - `metadata: optional object { audio_devices_updates, browser_metadata, candidate_pairs, 12 more }`

          Connection and device metadata for the participant.

          - `audio_devices_updates: optional array of object { added, removed, timestamp }`

            - `added: optional array of object { device_id, kind, label }`

              Devices that became available.

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `removed: optional array of object { device_id, kind, label }`

              Devices that became unavailable.

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `timestamp: optional string`

              Timestamp of the device update.

          - `browser_metadata: optional object { browser, browser_version, engine, 2 more }`

            - `browser: optional string`

            - `browser_version: optional string`

            - `engine: optional string`

            - `user_agent: optional string`

            - `webgl_support: optional boolean`

          - `candidate_pairs: optional object { consuming_transport, producing_transport }`

            - `consuming_transport: optional array of object { available_incoming_bitrate, available_outgoing_bitrate, bytes_discarded_on_send, 25 more }`

              - `available_incoming_bitrate: optional number`

              - `available_outgoing_bitrate: optional number`

              - `bytes_discarded_on_send: optional number`

              - `bytes_received: optional number`

              - `bytes_sent: optional number`

              - `current_round_trip_time: optional number`

              - `last_packet_received_timestamp: optional number`

                Epoch milliseconds when the last packet was received.

              - `last_packet_sent_timestamp: optional number`

                Epoch milliseconds when the last packet was sent.

              - `local_candidate_address: optional string`

              - `local_candidate_id: optional string`

              - `local_candidate_network_type: optional string`

              - `local_candidate_port: optional number`

              - `local_candidate_protocol: optional string`

              - `local_candidate_related_address: optional string`

              - `local_candidate_related_port: optional number`

              - `local_candidate_type: optional string`

              - `local_candidate_url: optional string`

              - `nominated: optional boolean`

              - `packets_discarded_on_send: optional number`

              - `packets_received: optional number`

              - `packets_sent: optional number`

              - `remote_candidate_address: optional string`

              - `remote_candidate_id: optional string`

              - `remote_candidate_port: optional number`

              - `remote_candidate_protocol: optional string`

              - `remote_candidate_type: optional string`

              - `remote_candidate_url: optional string`

              - `total_round_trip_time: optional number`

            - `producing_transport: optional array of object { available_incoming_bitrate, available_outgoing_bitrate, bytes_discarded_on_send, 25 more }`

              - `available_incoming_bitrate: optional number`

              - `available_outgoing_bitrate: optional number`

              - `bytes_discarded_on_send: optional number`

              - `bytes_received: optional number`

              - `bytes_sent: optional number`

              - `current_round_trip_time: optional number`

              - `last_packet_received_timestamp: optional number`

                Epoch milliseconds when the last packet was received.

              - `last_packet_sent_timestamp: optional number`

                Epoch milliseconds when the last packet was sent.

              - `local_candidate_address: optional string`

              - `local_candidate_id: optional string`

              - `local_candidate_network_type: optional string`

              - `local_candidate_port: optional number`

              - `local_candidate_protocol: optional string`

              - `local_candidate_related_address: optional string`

              - `local_candidate_related_port: optional number`

              - `local_candidate_type: optional string`

              - `local_candidate_url: optional string`

              - `nominated: optional boolean`

              - `packets_discarded_on_send: optional number`

              - `packets_received: optional number`

              - `packets_sent: optional number`

              - `remote_candidate_address: optional string`

              - `remote_candidate_id: optional string`

              - `remote_candidate_port: optional number`

              - `remote_candidate_protocol: optional string`

              - `remote_candidate_type: optional string`

              - `remote_candidate_url: optional string`

              - `total_round_trip_time: optional number`

          - `device_info: optional object { cpus, is_mobile, os, os_version }`

            - `cpus: optional number`

            - `is_mobile: optional boolean`

            - `os: optional string`

            - `os_version: optional string`

          - `events: optional array of object { metadata, name, timestamp }`

            - `metadata: optional map[string or number or boolean]`

              Event-specific metadata. Keys vary per event; values are primitive scalars (string, number, boolean, or null).

              - `string`

              - `number`

              - `boolean`

            - `name: optional string`

              Name of the event.

            - `timestamp: optional string`

              Timestamp when the event occurred.

          - `ip_information: optional object { asn, city, country, 4 more }`

            - `asn: optional object { asn, domain, name, 2 more }`

              - `asn: optional string`

              - `domain: optional string`

              - `name: optional string`

              - `route: optional string`

              - `type: optional string`

            - `city: optional string`

            - `country: optional string`

            - `ipv4: optional string`

            - `org: optional string`

            - `region: optional string`

            - `timezone: optional string`

          - `native_metadata: optional object { audio_encoder, video_encoder }`

            - `audio_encoder: optional string`

            - `video_encoder: optional string`

          - `pc_metadata: optional array of object { effective_network_type, reflexive_connectivity, relay_connectivity, 3 more }`

            - `effective_network_type: optional string`

            - `reflexive_connectivity: optional boolean`

            - `relay_connectivity: optional boolean`

            - `sdp: optional array of string`

            - `timestamp: optional string`

            - `turn_connectivity: optional boolean`

          - `room_view_type: optional string`

          - `sdk_name: optional string`

          - `sdk_type: optional string`

          - `sdk_version: optional string`

          - `selected_device_updates: optional array of object { device, timestamp }`

            - `device: optional object { device_id, kind, label }`

              A media device (camera, microphone, or speaker).

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `timestamp: optional string`

          - `speaker_devices_updates: optional array of object { added, removed, timestamp }`

            - `added: optional array of object { device_id, kind, label }`

              Devices that became available.

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `removed: optional array of object { device_id, kind, label }`

              Devices that became unavailable.

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `timestamp: optional string`

              Timestamp of the device update.

          - `video_devices_updates: optional array of object { added, removed, timestamp }`

            - `added: optional array of object { device_id, kind, label }`

              Devices that became available.

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `removed: optional array of object { device_id, kind, label }`

              Devices that became unavailable.

              - `device_id: optional string`

                ID of the device.

              - `kind: optional string`

                Kind of device, for example audioinput or videoinput.

              - `label: optional string`

                Human-readable label of the device.

            - `timestamp: optional string`

              Timestamp of the device update.

        - `quality: optional object { audio_consumer, audio_consumer_cumulative, audio_producer, 13 more }`

          Media quality statistics for the participant.

          - `audio_consumer: optional array of object { bytes_received, concealment_events, consumer_id, 11 more }`

            - `bytes_received: optional number`

            - `concealment_events: optional number`

            - `consumer_id: optional string`

            - `jitter: optional number`

            - `jitter_buffer_delay: optional number`

            - `jitter_buffer_emitted_count: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_received: optional number`

            - `peer_id: optional string`

            - `producer_id: optional string`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `audio_consumer_cumulative: optional object { jitter_buffer_delay, packet_loss, quality_mos }`

            Aggregated inbound (consumer) audio statistics for the session.

            - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

          - `audio_producer: optional array of object { bytes_sent, jitter, mid, 7 more }`

            - `bytes_sent: optional number`

            - `jitter: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_sent: optional number`

            - `producer_id: optional string`

            - `rtt: optional number`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `audio_producer_cumulative: optional object { packet_loss, quality_mos, rtt }`

            Aggregated outbound (producer) audio statistics for the session.

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

          - `screenshare_audio_consumer: optional array of object { bytes_received, concealment_events, consumer_id, 11 more }`

            - `bytes_received: optional number`

            - `concealment_events: optional number`

            - `consumer_id: optional string`

            - `jitter: optional number`

            - `jitter_buffer_delay: optional number`

            - `jitter_buffer_emitted_count: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_received: optional number`

            - `peer_id: optional string`

            - `producer_id: optional string`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `screenshare_audio_consumer_cumulative: optional object { jitter_buffer_delay, packet_loss, quality_mos }`

            Aggregated inbound (consumer) audio statistics for the session.

            - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

          - `screenshare_audio_producer: optional array of object { bytes_sent, jitter, mid, 7 more }`

            - `bytes_sent: optional number`

            - `jitter: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_sent: optional number`

            - `producer_id: optional string`

            - `rtt: optional number`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `screenshare_audio_producer_cumulative: optional object { packet_loss, quality_mos, rtt }`

            Aggregated outbound (producer) audio statistics for the session.

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

          - `screenshare_video_consumer: optional array of object { bytes_received, consumer_id, fir_count, 17 more }`

            - `bytes_received: optional number`

            - `consumer_id: optional string`

            - `fir_count: optional number`

            - `frame_height: optional number`

            - `frame_width: optional number`

            - `frames_decoded: optional number`

            - `frames_dropped: optional number`

            - `frames_per_second: optional number`

            - `jitter: optional number`

            - `jitter_buffer_delay: optional number`

            - `jitter_buffer_emitted_count: optional number`

            - `key_frames_decoded: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_received: optional number`

            - `peer_id: optional string`

            - `producer_id: optional string`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `screenshare_video_consumer_cumulative: optional object { frame_per_second, frame_width, issues, 4 more }`

            Aggregated inbound (consumer) video statistics for the session.

            - `frame_per_second: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `frame_width: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `issues: optional object { lag_fraction, no_video_fraction, poor_resolution_fraction }`

              - `lag_fraction: optional number`

              - `no_video_fraction: optional number`

              - `poor_resolution_fraction: optional number`

            - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `key_frames_decoded_fraction: optional number`

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

          - `screenshare_video_producer: optional array of object { bytes_sent, fir_count, frame_height, 17 more }`

            - `bytes_sent: optional number`

            - `fir_count: optional number`

            - `frame_height: optional number`

            - `frame_width: optional number`

            - `frames_encoded: optional number`

            - `frames_per_second: optional number`

            - `jitter: optional number`

            - `key_frames_encoded: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_sent: optional number`

            - `pli_count: optional number`

            - `producer_id: optional string`

            - `quality_limitation_durations: optional object { bandwidth, cpu, none, other }`

              - `bandwidth: optional number`

              - `cpu: optional number`

              - `none: optional number`

              - `other: optional number`

            - `quality_limitation_reason: optional "cpu" or "bandwidth" or "none" or "other"`

              - `"cpu"`

              - `"bandwidth"`

              - `"none"`

              - `"other"`

            - `quality_limitation_resolution_changes: optional number`

            - `rtt: optional number`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `screenshare_video_producer_cumulative: optional object { frame_per_second, frame_width, high_negative_feedback_fraction, 5 more }`

            Aggregated outbound (producer) video statistics for the session.

            - `frame_per_second: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `frame_width: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `high_negative_feedback_fraction: optional number`

            - `issues: optional object { bandwidth_quality_limitation_fraction, cpu_quality_limitation_fraction, no_video_fraction, 2 more }`

              - `bandwidth_quality_limitation_fraction: optional number`

              - `cpu_quality_limitation_fraction: optional number`

              - `no_video_fraction: optional number`

              - `poor_resolution_fraction: optional number`

              - `quality_limitation_fraction: optional number`

            - `key_frames_encoded_fraction: optional number`

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

          - `video_consumer: optional array of object { bytes_received, consumer_id, fir_count, 17 more }`

            - `bytes_received: optional number`

            - `consumer_id: optional string`

            - `fir_count: optional number`

            - `frame_height: optional number`

            - `frame_width: optional number`

            - `frames_decoded: optional number`

            - `frames_dropped: optional number`

            - `frames_per_second: optional number`

            - `jitter: optional number`

            - `jitter_buffer_delay: optional number`

            - `jitter_buffer_emitted_count: optional number`

            - `key_frames_decoded: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_received: optional number`

            - `peer_id: optional string`

            - `producer_id: optional string`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `video_consumer_cumulative: optional object { frame_per_second, frame_width, issues, 4 more }`

            Aggregated inbound (consumer) video statistics for the session.

            - `frame_per_second: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `frame_width: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `issues: optional object { lag_fraction, no_video_fraction, poor_resolution_fraction }`

              - `lag_fraction: optional number`

              - `no_video_fraction: optional number`

              - `poor_resolution_fraction: optional number`

            - `jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `key_frames_decoded_fraction: optional number`

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

          - `video_producer: optional array of object { bytes_sent, fir_count, frame_height, 17 more }`

            - `bytes_sent: optional number`

            - `fir_count: optional number`

            - `frame_height: optional number`

            - `frame_width: optional number`

            - `frames_encoded: optional number`

            - `frames_per_second: optional number`

            - `jitter: optional number`

            - `key_frames_encoded: optional number`

            - `mid: optional string`

            - `mos_quality: optional number`

            - `packets_lost: optional number`

            - `packets_sent: optional number`

            - `pli_count: optional number`

            - `producer_id: optional string`

            - `quality_limitation_durations: optional object { bandwidth, cpu, none, other }`

              - `bandwidth: optional number`

              - `cpu: optional number`

              - `none: optional number`

              - `other: optional number`

            - `quality_limitation_reason: optional "cpu" or "bandwidth" or "none" or "other"`

              - `"cpu"`

              - `"bandwidth"`

              - `"none"`

              - `"other"`

            - `quality_limitation_resolution_changes: optional number`

            - `rtt: optional number`

            - `ssrc: optional number`

            - `timestamp: optional string`

          - `video_producer_cumulative: optional object { frame_per_second, frame_width, high_negative_feedback_fraction, 5 more }`

            Aggregated outbound (producer) video statistics for the session.

            - `frame_per_second: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `frame_width: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `high_negative_feedback_fraction: optional number`

            - `issues: optional object { bandwidth_quality_limitation_fraction, cpu_quality_limitation_fraction, no_video_fraction, 2 more }`

              - `bandwidth_quality_limitation_fraction: optional number`

              - `cpu_quality_limitation_fraction: optional number`

              - `no_video_fraction: optional number`

              - `poor_resolution_fraction: optional number`

              - `quality_limitation_fraction: optional number`

            - `key_frames_encoded_fraction: optional number`

            - `packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }`

              Cumulative packet loss distribution.

              - `"10_or_greater_event_fraction": optional number`

              - `"25_or_greater_event_fraction": optional number`

              - `"5_or_greater_event_fraction": optional number`

              - `"50_or_greater_event_fraction": optional number`

              - `avg: optional number`

            - `quality_mos: optional object { avg, p50, p75, p90 }`

              Distribution summary with average and percentiles.

              - `avg: optional number`

              - `p50: optional number`

              - `p75: optional number`

              - `p90: optional number`

            - `rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }`

              Cumulative latency distribution (milliseconds-based thresholds).

              - `"100ms_or_greater_event_fraction": optional number`

              - `"250ms_or_greater_event_fraction": optional number`

              - `"500ms_or_greater_event_fraction": optional number`

              - `avg: optional number`

      - `role: optional string`

        Name of the preset associated with the participant.

      - `session_id: optional string`

      - `updated_at: optional string`

        timestamp when this participant's data was last updated.

      - `user_id: optional string`

        User id for this participant.

  - `success: optional boolean`

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

# Webhooks

## Fetch all webhooks details

**get** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks`

Returns details of all webhooks for an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Returns

- `data: array of object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
      "created_at": "2022-05-28T07:01:53.075Z",
      "enabled": true,
      "events": [
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary"
      ],
      "name": "All events webhook",
      "updated_at": "2022-05-28T07:01:53.075Z",
      "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
    }
  ],
  "success": true
}
```

## Add a webhook

**post** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks`

Adds a new webhook to an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

  Events that this webhook will get triggered by

  - `"meeting.started"`

  - `"meeting.ended"`

  - `"meeting.participantJoined"`

  - `"meeting.participantLeft"`

  - `"meeting.chatSynced"`

  - `"recording.statusUpdate"`

  - `"livestreaming.statusUpdate"`

  - `"meeting.transcript"`

  - `"meeting.summary"`

- `name: string`

  Name of the webhook

- `url: string`

  URL this webhook will send events to

- `enabled: optional boolean`

  Set whether or not the webhook should be active when created

### Returns

- `data: object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "events": [
            "meeting.started",
            "meeting.ended",
            "meeting.participantJoined",
            "meeting.participantLeft",
            "meeting.chatSynced",
            "recording.statusUpdate",
            "livestreaming.statusUpdate",
            "meeting.transcript",
            "meeting.summary"
          ],
          "name": "All events webhook",
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

#### Response

```json
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

## Fetch details of a webhook

**get** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Returns webhook details for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Returns

- `data: object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

## Replace a webhook

**put** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Replace all details for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Body Parameters

- `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

  Events that this webhook will get triggered by

  - `"meeting.started"`

  - `"meeting.ended"`

  - `"meeting.participantJoined"`

  - `"meeting.participantLeft"`

  - `"meeting.chatSynced"`

  - `"recording.statusUpdate"`

  - `"livestreaming.statusUpdate"`

  - `"meeting.transcript"`

  - `"meeting.summary"`

- `name: string`

  Name of the webhook

- `url: string`

  URL this webhook will send events to

- `enabled: optional boolean`

  Set whether or not the webhook should be active when created

### Returns

- `data: object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "events": [
            "meeting.started",
            "meeting.ended",
            "meeting.participantJoined",
            "meeting.participantLeft",
            "meeting.chatSynced",
            "recording.statusUpdate",
            "livestreaming.statusUpdate",
            "meeting.transcript",
            "meeting.summary"
          ],
          "name": "All events webhook",
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

#### Response

```json
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

## Edit a webhook

**patch** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Edits the webhook details for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Body Parameters

- `enabled: optional boolean`

- `events: optional array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

  Events that the webhook will get triggered by

  - `"meeting.started"`

  - `"meeting.ended"`

  - `"meeting.participantJoined"`

  - `"meeting.participantLeft"`

  - `"recording.statusUpdate"`

  - `"livestreaming.statusUpdate"`

  - `"meeting.chatSynced"`

  - `"meeting.transcript"`

  - `"meeting.summary"`

- `name: optional string`

  Name of the webhook

- `url: optional string`

  URL the webhook will send events to

### Returns

- `data: object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

#### Response

```json
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

## Delete a webhook

**delete** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Removes a webhook for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Returns

- `data: object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
    "created_at": "2022-05-28T07:01:53.075Z",
    "enabled": true,
    "events": [
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary"
    ],
    "name": "All events webhook",
    "updated_at": "2022-05-28T07:01:53.075Z",
    "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
  },
  "success": true
}
```

## Domain Types

### Webhook Get Webhooks Response

- `WebhookGetWebhooksResponse object { data, success }`

  - `data: array of object { id, created_at, enabled, 4 more }`

    - `id: string`

      ID of the webhook

    - `created_at: string`

      Timestamp when this webhook was created

    - `enabled: boolean`

      Set to true if the webhook is active

    - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

      Events this webhook will send updates for

      - `"meeting.started"`

      - `"meeting.ended"`

      - `"meeting.participantJoined"`

      - `"meeting.participantLeft"`

      - `"meeting.chatSynced"`

      - `"recording.statusUpdate"`

      - `"livestreaming.statusUpdate"`

      - `"meeting.transcript"`

      - `"meeting.summary"`

    - `name: string`

      Name of the webhook

    - `updated_at: string`

      Timestamp when this webhook was updated

    - `url: string`

      URL the webhook will send events to

  - `success: boolean`

### Webhook Create Webhook Response

- `WebhookCreateWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

    - `id: string`

      ID of the webhook

    - `created_at: string`

      Timestamp when this webhook was created

    - `enabled: boolean`

      Set to true if the webhook is active

    - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

      Events this webhook will send updates for

      - `"meeting.started"`

      - `"meeting.ended"`

      - `"meeting.participantJoined"`

      - `"meeting.participantLeft"`

      - `"meeting.chatSynced"`

      - `"recording.statusUpdate"`

      - `"livestreaming.statusUpdate"`

      - `"meeting.transcript"`

      - `"meeting.summary"`

    - `name: string`

      Name of the webhook

    - `updated_at: string`

      Timestamp when this webhook was updated

    - `url: string`

      URL the webhook will send events to

  - `success: boolean`

### Webhook Get Webhook By ID Response

- `WebhookGetWebhookByIDResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

    - `id: string`

      ID of the webhook

    - `created_at: string`

      Timestamp when this webhook was created

    - `enabled: boolean`

      Set to true if the webhook is active

    - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

      Events this webhook will send updates for

      - `"meeting.started"`

      - `"meeting.ended"`

      - `"meeting.participantJoined"`

      - `"meeting.participantLeft"`

      - `"meeting.chatSynced"`

      - `"recording.statusUpdate"`

      - `"livestreaming.statusUpdate"`

      - `"meeting.transcript"`

      - `"meeting.summary"`

    - `name: string`

      Name of the webhook

    - `updated_at: string`

      Timestamp when this webhook was updated

    - `url: string`

      URL the webhook will send events to

  - `success: boolean`

### Webhook Replace Webhook Response

- `WebhookReplaceWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

    - `id: string`

      ID of the webhook

    - `created_at: string`

      Timestamp when this webhook was created

    - `enabled: boolean`

      Set to true if the webhook is active

    - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

      Events this webhook will send updates for

      - `"meeting.started"`

      - `"meeting.ended"`

      - `"meeting.participantJoined"`

      - `"meeting.participantLeft"`

      - `"meeting.chatSynced"`

      - `"recording.statusUpdate"`

      - `"livestreaming.statusUpdate"`

      - `"meeting.transcript"`

      - `"meeting.summary"`

    - `name: string`

      Name of the webhook

    - `updated_at: string`

      Timestamp when this webhook was updated

    - `url: string`

      URL the webhook will send events to

  - `success: boolean`

### Webhook Edit Webhook Response

- `WebhookEditWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

    - `id: string`

      ID of the webhook

    - `created_at: string`

      Timestamp when this webhook was created

    - `enabled: boolean`

      Set to true if the webhook is active

    - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

      Events this webhook will send updates for

      - `"meeting.started"`

      - `"meeting.ended"`

      - `"meeting.participantJoined"`

      - `"meeting.participantLeft"`

      - `"meeting.chatSynced"`

      - `"recording.statusUpdate"`

      - `"livestreaming.statusUpdate"`

      - `"meeting.transcript"`

      - `"meeting.summary"`

    - `name: string`

      Name of the webhook

    - `updated_at: string`

      Timestamp when this webhook was updated

    - `url: string`

      URL the webhook will send events to

  - `success: boolean`

### Webhook Delete Webhook Response

- `WebhookDeleteWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

    - `id: string`

      ID of the webhook

    - `created_at: string`

      Timestamp when this webhook was created

    - `enabled: boolean`

      Set to true if the webhook is active

    - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

      Events this webhook will send updates for

      - `"meeting.started"`

      - `"meeting.ended"`

      - `"meeting.participantJoined"`

      - `"meeting.participantLeft"`

      - `"meeting.chatSynced"`

      - `"recording.statusUpdate"`

      - `"livestreaming.statusUpdate"`

      - `"meeting.transcript"`

      - `"meeting.summary"`

    - `name: string`

      Name of the webhook

    - `updated_at: string`

      Timestamp when this webhook was updated

    - `url: string`

      URL the webhook will send events to

  - `success: boolean`

# Active Session

## Fetch details of an active session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session`

Returns details of an ongoing active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { id, associated_id, created_at, 11 more }`

  - `id: string`

    ID of the session

  - `associated_id: string`

    ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

  - `created_at: string`

    timestamp when session created

  - `live_participants: number`

    number of participants currently in the session

  - `max_concurrent_participants: number`

    number of maximum participants that were in the session

  - `meeting_display_name: string`

    Title of the meeting this session belongs to

  - `minutes_consumed: number`

    number of minutes consumed since the session started

  - `organization_id: string`

    App id that hosted this session

  - `started_at: string`

    timestamp when session started

  - `status: "LIVE" or "ENDED"`

    current status of session

    - `"LIVE"`

    - `"ENDED"`

  - `type: "meeting" or "livestream" or "participant"`

    type of session

    - `"meeting"`

    - `"livestream"`

    - `"participant"`

  - `updated_at: string`

    timestamp when session was last updated

  - `breakout_rooms: optional array of unknown`

  - `ended_at: optional string`

    timestamp when session ended

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "associated_id": "associated_id",
    "created_at": "created_at",
    "live_participants": 0,
    "max_concurrent_participants": 0,
    "meeting_display_name": "meeting_display_name",
    "minutes_consumed": 0,
    "organization_id": "organization_id",
    "started_at": "started_at",
    "status": "LIVE",
    "type": "meeting",
    "updated_at": "updated_at",
    "breakout_rooms": [
      {}
    ],
    "ended_at": "ended_at"
  },
  "success": true
}
```

## Kick participants from an active session

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick`

Kicks one or more participants from an active session using user ID or custom participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `custom_participant_ids: array of string`

- `participant_ids: array of string`

### Returns

- `data: optional object { action, participants }`

  - `action: optional string`

  - `participants: optional array of object { id, created_at, updated_at, 3 more }`

    - `id: string`

      ID of the session participant

    - `created_at: string`

    - `updated_at: string`

    - `email: optional string`

      Email of the session participant.

    - `name: optional string`

      Name of the session participant.

    - `picture: optional string`

      A URL pointing to a picture of the participant.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_participant_ids": [
            "string"
          ],
          "participant_ids": [
            "string"
          ]
        }'
```

#### Response

```json
{
  "data": {
    "action": "action",
    "participants": [
      {
        "id": "id",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "email": "email",
        "name": "name",
        "picture": "picture"
      }
    ]
  },
  "success": true
}
```

## Kick all participants

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick-all`

Kicks all participants from an active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { action, kicked_participants_count }`

  - `action: optional string`

  - `kicked_participants_count: optional number`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick-all \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "action": "action",
    "kicked_participants_count": 0
  },
  "success": true
}
```

## Create a poll

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/poll`

Creates a new poll in an active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `options: array of string`

  Different options for the question

- `question: string`

  Question of the poll

- `anonymous: optional boolean`

  if voters on a poll are anonymous

- `hide_votes: optional boolean`

  if votes on an option are visible before a person votes

### Returns

- `data: optional object { action, poll }`

  - `action: optional string`

  - `poll: optional object { id, options, question, 4 more }`

    - `id: string`

      ID of the poll

    - `options: array of object { count, text, votes }`

      Answer options

      - `count: number`

      - `text: string`

        Text of the answer option

      - `votes: array of object { id, name }`

        - `id: string`

        - `name: string`

    - `question: string`

      Question asked by the poll

    - `anonymous: optional boolean`

    - `created_by: optional string`

    - `hide_votes: optional boolean`

    - `voted: optional array of string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/poll \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "options": [
            "string"
          ],
          "question": "question"
        }'
```

#### Response

```json
{
  "data": {
    "action": "action",
    "poll": {
      "id": "id",
      "options": [
        {
          "count": 0,
          "text": "text",
          "votes": [
            {
              "id": "id",
              "name": "name"
            }
          ]
        }
      ],
      "question": "question",
      "anonymous": true,
      "created_by": "created_by",
      "hide_votes": true,
      "voted": [
        "string"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Active Session Get Active Session Response

- `ActiveSessionGetActiveSessionResponse object { data, success }`

  - `data: optional object { id, associated_id, created_at, 11 more }`

    - `id: string`

      ID of the session

    - `associated_id: string`

      ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

    - `created_at: string`

      timestamp when session created

    - `live_participants: number`

      number of participants currently in the session

    - `max_concurrent_participants: number`

      number of maximum participants that were in the session

    - `meeting_display_name: string`

      Title of the meeting this session belongs to

    - `minutes_consumed: number`

      number of minutes consumed since the session started

    - `organization_id: string`

      App id that hosted this session

    - `started_at: string`

      timestamp when session started

    - `status: "LIVE" or "ENDED"`

      current status of session

      - `"LIVE"`

      - `"ENDED"`

    - `type: "meeting" or "livestream" or "participant"`

      type of session

      - `"meeting"`

      - `"livestream"`

      - `"participant"`

    - `updated_at: string`

      timestamp when session was last updated

    - `breakout_rooms: optional array of unknown`

    - `ended_at: optional string`

      timestamp when session ended

  - `success: optional boolean`

### Active Session Kick Participants Response

- `ActiveSessionKickParticipantsResponse object { data, success }`

  - `data: optional object { action, participants }`

    - `action: optional string`

    - `participants: optional array of object { id, created_at, updated_at, 3 more }`

      - `id: string`

        ID of the session participant

      - `created_at: string`

      - `updated_at: string`

      - `email: optional string`

        Email of the session participant.

      - `name: optional string`

        Name of the session participant.

      - `picture: optional string`

        A URL pointing to a picture of the participant.

  - `success: optional boolean`

### Active Session Kick All Participants Response

- `ActiveSessionKickAllParticipantsResponse object { data, success }`

  - `data: optional object { action, kicked_participants_count }`

    - `action: optional string`

    - `kicked_participants_count: optional number`

  - `success: optional boolean`

### Active Session Create Poll Response

- `ActiveSessionCreatePollResponse object { data, success }`

  - `data: optional object { action, poll }`

    - `action: optional string`

    - `poll: optional object { id, options, question, 4 more }`

      - `id: string`

        ID of the poll

      - `options: array of object { count, text, votes }`

        Answer options

        - `count: number`

        - `text: string`

          Text of the answer option

        - `votes: array of object { id, name }`

          - `id: string`

          - `name: string`

      - `question: string`

        Question asked by the poll

      - `anonymous: optional boolean`

      - `created_by: optional string`

      - `hide_votes: optional boolean`

      - `voted: optional array of string`

  - `success: optional boolean`

# Livestreams

## Create an independent livestream

**post** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams`

Creates a livestream for the given App ID and returns ingest server, stream key, and playback URL. You can pass custom input to the ingest server and stream key, and freely distribute the content using the playback URL on any player that supports HLS/LHLS.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `name: optional string`

  Name of the livestream

### Returns

- `data: optional object { id, disabled, ingest_server, 5 more }`

  - `id: optional string`

    The livestream ID.

  - `disabled: optional boolean`

    Specifies if the livestream was disabled.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder should send the video and audio data.

  - `meeting_id: optional string`

  - `name: optional string`

  - `playback_url: optional string`

    The web address that viewers can use to watch the livestream.

  - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

    - `"LIVE"`

    - `"IDLE"`

    - `"ERRORED"`

    - `"INVOKED"`

  - `stream_key: optional string`

    Unique key for accessing each livestream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "data": {
    "disabled": false,
    "id": "78dd0b50-4147-4bb8-88d3-2ccc2e98bff0",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "meeting_id": null,
    "name": "Livestreaming-Demo",
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "INVOKED",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4"
  },
  "success": true
}
```

## Fetch all livestreams

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams`

Returns details of livestreams associated with the given App ID. It includes livestreams created by your App and RealtimeKit meetings that are livestreamed by your App. If you only want details of livestreams created by your App and not RealtimeKit meetings, you can use the `exclude_meetings` query parameter.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional string`

  Specify the end time range in ISO format to access the live stream.

- `exclude_meetings: optional boolean`

  Exclude the RealtimeKit meetings that are livestreamed.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page.

- `sort_order: optional "ASC" or "DSC"`

  Specifies the sorting order for the results.

  - `"ASC"`

  - `"DSC"`

- `start_time: optional string`

  Specify the start time range in ISO format to access the live stream.

- `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

  Specifies the status of the operation.

  - `"LIVE"`

  - `"IDLE"`

  - `"ERRORED"`

  - `"INVOKED"`

### Returns

- `data: optional object { id, created_at, disabled, 8 more }`

  - `id: optional string`

    The ID of the livestream.

  - `created_at: optional string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `disabled: optional string`

    Specifies if the livestream was disabled.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `meeting_id: optional string`

    ID of the meeting.

  - `name: optional string`

    Name of the livestream.

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

  - `playback_url: optional string`

    The web address that viewers can use to watch the livestream.

  - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

    - `"LIVE"`

    - `"IDLE"`

    - `"ERRORED"`

    - `"INVOKED"`

  - `stream_key: optional string`

    Unique key for accessing each livestream.

  - `updated_at: optional string`

    Timestamp the object was updated at. The time is returned in ISO format.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "3fd739f4-3c41-456e-bfba-6ebd51e16d2d",
    "created_at": "2023-07-15T11:48:34.753Z",
    "disabled": "disabled",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "meeting_id": "meeting_id",
    "name": "test",
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "LIVE",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4",
    "updated_at": "2023-07-15T11:48:34.753Z"
  },
  "success": true
}
```

## Stop livestreaming a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream/stop`

Stops the active livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { message }`

  - `message: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream/stop \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "message": "Stopped live stream successfully"
  },
  "success": true
}
```

## Start livestreaming a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestreams`

Starts livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `name: optional string`

- `video_config: optional object { height, width }`

  - `height: optional number`

    Height of the livestreaming video in pixels

  - `width: optional number`

    Width of the livestreaming video in pixels

### Returns

- `data: optional object { id, ingest_server, playback_url, 2 more }`

  - `id: optional string`

    The livestream ID.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `playback_url: optional string`

    The web address that viewers can use to watch the livestream.

  - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

    - `"LIVE"`

    - `"IDLE"`

    - `"ERRORED"`

    - `"INVOKED"`

  - `stream_key: optional string`

    Unique key for accessing each livestream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/livestreams \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "data": {
    "id": "7088bba8-f522-49a8-b59b-3cd0e946bbb0",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "INVOKED",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4"
  },
  "success": true
}
```

## Fetch complete analytics data for your livestreams

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/overall`

Returns livestream analytics for the specified time range.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional number`

  Specify the end time as a Unix timestamp in seconds to access the livestream analytics.

- `filters: optional string`

  Optional filters for livestream analytics.

- `start_time: optional number`

  Specify the start time as a Unix timestamp in seconds to access the livestream analytics.

### Returns

- `data: optional object { count, total_ingest_seconds, total_viewer_seconds }`

  - `count: optional number`

    Count of total livestreams.

  - `total_ingest_seconds: optional number`

    Total time duration for which the input was given or the meeting was streamed.

  - `total_viewer_seconds: optional number`

    Total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/livestreams/overall \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "count": 4,
    "total_ingest_seconds": 531,
    "total_viewer_seconds": 116
  },
  "success": true
}
```

## Fetch day-wise analytics data for your livestreams

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/daywise`

Returns day-wise livestream analytics for the specified time range.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional number`

  Specify the end time as a Unix timestamp in seconds to access the livestream analytics.

- `filters: optional string`

  Optional filters for livestream analytics.

- `start_time: optional number`

  Specify the start time as a Unix timestamp in seconds to access the livestream analytics.

### Returns

- `data: optional array of object { count, date, total_ingest_seconds, total_viewer_seconds }`

  - `count: optional number`

    Count of total livestream sessions.

  - `date: optional string`

    Analytics date.

  - `total_ingest_seconds: optional number`

    Total time duration for which the input was given or the meeting was streamed.

  - `total_viewer_seconds: optional number`

    Total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/livestreams/daywise \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "count": 4,
      "date": "2023-07-15",
      "total_ingest_seconds": 531,
      "total_viewer_seconds": 116
    }
  ],
  "success": true
}
```

## Fetch day-wise session and recording analytics data for an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/daywise`

Returns day-wise session and recording analytics data of an App for the specified time range start_date to end_date. If start_date and end_date are not provided, the default time range is set from 30 days ago to the current date.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_date: optional string`

  end date in YYYY-MM-DD format

- `start_date: optional string`

  start date in YYYY-MM-DD format

### Returns

- `data: optional object { recording_stats, session_stats }`

  - `recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }`

    Recording statistics of an App during the range specified

    - `day_stats: optional array of object { day, total_recording_minutes, total_recordings }`

      Day wise recording stats

      - `day: optional string`

      - `total_recording_minutes: optional number`

        Total recording minutes for a specific day

      - `total_recordings: optional number`

        Total number of recordings for a specific day

    - `recording_count: optional number`

      Total number of recordings during the range specified

    - `recording_minutes_consumed: optional number`

      Total recording minutes during the range specified

  - `session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }`

    Session statistics of an App during the range specified

    - `day_stats: optional array of object { day, total_session_minutes, total_sessions }`

      Day wise session stats

      - `day: optional string`

      - `total_session_minutes: optional number`

        Total session minutes for a specific day

      - `total_sessions: optional number`

        Total number of sessions for a specific day

    - `sessions_count: optional number`

      Total number of sessions during the range specified

    - `sessions_minutes_consumed: optional number`

      Total session minutes during the range specified

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/daywise \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "recording_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_recording_minutes": 0,
          "total_recordings": 0
        }
      ],
      "recording_count": 0,
      "recording_minutes_consumed": 0
    },
    "session_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_session_minutes": 0,
          "total_sessions": 0
        }
      ],
      "sessions_count": 0,
      "sessions_minutes_consumed": 0
    }
  },
  "success": true
}
```

## Fetch active livestreams for a meeting

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream`

Returns details of all active livestreams for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { id, created_at, disabled, 7 more }`

  - `id: optional string`

    The livestream ID.

  - `created_at: optional string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `disabled: optional string`

    Specifies if the livestream was disabled.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `meeting_id: optional string`

  - `name: optional string`

    Name of the livestream.

  - `playback_url: optional string`

    The web address that viewers can use to watch the livestream.

  - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

    - `"LIVE"`

    - `"IDLE"`

    - `"ERRORED"`

    - `"INVOKED"`

  - `stream_key: optional string`

    Unique key for accessing each livestream.

  - `updated_at: optional string`

    Timestamp the object was updated at. The time is returned in ISO format.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "disabled": "disabled",
    "ingest_server": "ingest_server",
    "meeting_id": "meeting_id",
    "name": "name",
    "playback_url": "playback_url",
    "status": "LIVE",
    "stream_key": "stream_key",
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Fetch livestream session details using livestream session ID

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams/sessions/{livestream-session-id}`

Returns livestream session details for the given livestream session ID. Retrieve the `livestream_session_id`using the `Fetch livestream session details using a session ID` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `"livestream-session-id": string`

### Returns

- `data: optional object { id, created_at, err_message, 6 more }`

  - `id: optional string`

    The livestream ID.

  - `created_at: optional string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `err_message: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `ingest_seconds: optional number`

    Name of the livestream.

  - `livestream_id: optional string`

  - `started_time: optional string`

    Unique key for accessing each livestream.

  - `stopped_time: optional string`

    The web address that viewers can use to watch the livestream.

  - `updated_at: optional string`

    Timestamp the object was updated at. The time is returned in ISO format.

  - `viewer_seconds: optional number`

    Specifies if the livestream was disabled.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/sessions/$LIVESTREAM_SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "err_message": "err_message",
    "ingest_seconds": 0,
    "livestream_id": "livestream_id",
    "started_time": "started_time",
    "stopped_time": "stopped_time",
    "updated_at": "updated_at",
    "viewer_seconds": 0
  },
  "success": true
}
```

## Fetch active livestream session details

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}/active-livestream-session`

Returns details of all active livestreams for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `livestream_id: string`

### Returns

- `data: optional object { livestream, session }`

  - `livestream: optional object { id, created_at, disabled, 7 more }`

    - `id: optional string`

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `disabled: optional string`

      Specifies if the livestream was disabled.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `meeting_id: optional string`

      ID of the meeting.

    - `name: optional string`

      Name of the livestream.

    - `playback_url: optional string`

      The web address that viewers can use to watch the livestream.

    - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

      - `"LIVE"`

      - `"IDLE"`

      - `"ERRORED"`

      - `"INVOKED"`

    - `stream_key: optional string`

      Unique key for accessing each livestream.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

  - `session: optional object { id, created_at, err_message, 7 more }`

    - `id: optional string`

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `err_message: optional string`

    - `ingest_seconds: optional string`

      The time duration for which the input was given or the meeting was streamed.

    - `invoked_time: optional string`

      Timestamp the object was invoked. The time is returned in ISO format.

    - `livestream_id: optional string`

    - `started_time: optional string`

      Timestamp the object was started. The time is returned in ISO format.

    - `stopped_time: optional string`

      Timestamp the object was stopped. The time is returned in ISO format.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `viewer_seconds: optional string`

      The total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/$LIVESTREAM_ID/active-livestream-session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "livestream": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "disabled": "disabled",
      "ingest_server": "ingest_server",
      "meeting_id": "meeting_id",
      "name": "name",
      "playback_url": "playback_url",
      "status": "LIVE",
      "stream_key": "stream_key",
      "updated_at": "2019-12-27T18:11:19.117Z"
    },
    "session": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "err_message": "err_message",
      "ingest_seconds": "ingest_seconds",
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "livestream_id": "livestream_id",
      "started_time": "2019-12-27T18:11:19.117Z",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "viewer_seconds": "viewer_seconds"
    }
  },
  "success": true
}
```

## Fetch livestream details using livestream ID

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}`

Returns details of a livestream with sessions for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `livestream_id: string`

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page.

### Returns

- `data: optional object { livestream, paging, session }`

  - `livestream: optional object { id, created_at, disabled, 7 more }`

    - `id: optional string`

      ID of the livestream.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `disabled: optional string`

      Specifies if the livestream was disabled.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `meeting_id: optional string`

      The ID of the meeting.

    - `name: optional string`

      Name of the livestream.

    - `playback_url: optional string`

      The web address that viewers can use to watch the livestream.

    - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

      - `"LIVE"`

      - `"IDLE"`

      - `"ERRORED"`

      - `"INVOKED"`

    - `stream_key: optional string`

      Unique key for accessing each livestream.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

  - `session: optional object { id, created_at, err_message, 7 more }`

    - `id: optional string`

      ID of the session.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `err_message: optional string`

    - `ingest_seconds: optional number`

      The time duration for which the input was given or the meeting was streamed.

    - `invoked_time: optional string`

      Timestamp the object was invoked. The time is returned in ISO format.

    - `livestream_id: optional string`

    - `started_time: optional string`

      Timestamp the object was started. The time is returned in ISO format.

    - `stopped_time: optional string`

      Timestamp the object was stopped. The time is returned in ISO format.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `viewer_seconds: optional number`

      The total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/$LIVESTREAM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "livestream": {
      "id": "id",
      "created_at": "created_at",
      "disabled": "disabled",
      "ingest_server": "ingest_server",
      "meeting_id": "meeting_id",
      "name": "name",
      "playback_url": "playback_url",
      "status": "LIVE",
      "stream_key": "stream_key",
      "updated_at": "updated_at"
    },
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "session": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "err_message": "err_message",
      "ingest_seconds": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "livestream_id": "livestream_id",
      "started_time": "2019-12-27T18:11:19.117Z",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "viewer_seconds": 0
    }
  },
  "success": true
}
```

## Domain Types

### Livestream Create Independent Livestream Response

- `LivestreamCreateIndependentLivestreamResponse object { data, success }`

  - `data: optional object { id, disabled, ingest_server, 5 more }`

    - `id: optional string`

      The livestream ID.

    - `disabled: optional boolean`

      Specifies if the livestream was disabled.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder should send the video and audio data.

    - `meeting_id: optional string`

    - `name: optional string`

    - `playback_url: optional string`

      The web address that viewers can use to watch the livestream.

    - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

      - `"LIVE"`

      - `"IDLE"`

      - `"ERRORED"`

      - `"INVOKED"`

    - `stream_key: optional string`

      Unique key for accessing each livestream.

  - `success: optional boolean`

### Livestream Get All Livestreams Response

- `LivestreamGetAllLivestreamsResponse object { data, success }`

  - `data: optional object { id, created_at, disabled, 8 more }`

    - `id: optional string`

      The ID of the livestream.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `disabled: optional string`

      Specifies if the livestream was disabled.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `meeting_id: optional string`

      ID of the meeting.

    - `name: optional string`

      Name of the livestream.

    - `paging: optional object { end_offset, start_offset, total_count }`

      - `end_offset: optional number`

      - `start_offset: optional number`

      - `total_count: optional number`

    - `playback_url: optional string`

      The web address that viewers can use to watch the livestream.

    - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

      - `"LIVE"`

      - `"IDLE"`

      - `"ERRORED"`

      - `"INVOKED"`

    - `stream_key: optional string`

      Unique key for accessing each livestream.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

  - `success: optional boolean`

### Livestream Stop Livestreaming A Meeting Response

- `LivestreamStopLivestreamingAMeetingResponse object { data, success }`

  - `data: optional object { message }`

    - `message: optional string`

  - `success: optional boolean`

### Livestream Start Livestreaming A Meeting Response

- `LivestreamStartLivestreamingAMeetingResponse object { data, success }`

  - `data: optional object { id, ingest_server, playback_url, 2 more }`

    - `id: optional string`

      The livestream ID.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `playback_url: optional string`

      The web address that viewers can use to watch the livestream.

    - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

      - `"LIVE"`

      - `"IDLE"`

      - `"ERRORED"`

      - `"INVOKED"`

    - `stream_key: optional string`

      Unique key for accessing each livestream.

  - `success: optional boolean`

### Livestream Get Livestream Analytics Complete Response

- `LivestreamGetLivestreamAnalyticsCompleteResponse object { data, success }`

  - `data: optional object { count, total_ingest_seconds, total_viewer_seconds }`

    - `count: optional number`

      Count of total livestreams.

    - `total_ingest_seconds: optional number`

      Total time duration for which the input was given or the meeting was streamed.

    - `total_viewer_seconds: optional number`

      Total view time for which the viewers watched the stream.

  - `success: optional boolean`

### Livestream Get Livestream Analytics Daywise Response

- `LivestreamGetLivestreamAnalyticsDaywiseResponse object { data, success }`

  - `data: optional array of object { count, date, total_ingest_seconds, total_viewer_seconds }`

    - `count: optional number`

      Count of total livestream sessions.

    - `date: optional string`

      Analytics date.

    - `total_ingest_seconds: optional number`

      Total time duration for which the input was given or the meeting was streamed.

    - `total_viewer_seconds: optional number`

      Total view time for which the viewers watched the stream.

  - `success: optional boolean`

### Livestream Get Org Analytics Response

- `LivestreamGetOrgAnalyticsResponse object { data, success }`

  - `data: optional object { recording_stats, session_stats }`

    - `recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }`

      Recording statistics of an App during the range specified

      - `day_stats: optional array of object { day, total_recording_minutes, total_recordings }`

        Day wise recording stats

        - `day: optional string`

        - `total_recording_minutes: optional number`

          Total recording minutes for a specific day

        - `total_recordings: optional number`

          Total number of recordings for a specific day

      - `recording_count: optional number`

        Total number of recordings during the range specified

      - `recording_minutes_consumed: optional number`

        Total recording minutes during the range specified

    - `session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }`

      Session statistics of an App during the range specified

      - `day_stats: optional array of object { day, total_session_minutes, total_sessions }`

        Day wise session stats

        - `day: optional string`

        - `total_session_minutes: optional number`

          Total session minutes for a specific day

        - `total_sessions: optional number`

          Total number of sessions for a specific day

      - `sessions_count: optional number`

        Total number of sessions during the range specified

      - `sessions_minutes_consumed: optional number`

        Total session minutes during the range specified

  - `success: optional boolean`

### Livestream Get Meeting Active Livestreams Response

- `LivestreamGetMeetingActiveLivestreamsResponse object { data, success }`

  - `data: optional object { id, created_at, disabled, 7 more }`

    - `id: optional string`

      The livestream ID.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `disabled: optional string`

      Specifies if the livestream was disabled.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `meeting_id: optional string`

    - `name: optional string`

      Name of the livestream.

    - `playback_url: optional string`

      The web address that viewers can use to watch the livestream.

    - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

      - `"LIVE"`

      - `"IDLE"`

      - `"ERRORED"`

      - `"INVOKED"`

    - `stream_key: optional string`

      Unique key for accessing each livestream.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

  - `success: optional boolean`

### Livestream Get Livestream Session Details For Session ID Response

- `LivestreamGetLivestreamSessionDetailsForSessionIDResponse object { data, success }`

  - `data: optional object { id, created_at, err_message, 6 more }`

    - `id: optional string`

      The livestream ID.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `err_message: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `ingest_seconds: optional number`

      Name of the livestream.

    - `livestream_id: optional string`

    - `started_time: optional string`

      Unique key for accessing each livestream.

    - `stopped_time: optional string`

      The web address that viewers can use to watch the livestream.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `viewer_seconds: optional number`

      Specifies if the livestream was disabled.

  - `success: optional boolean`

### Livestream Get Active Livestreams For Livestream ID Response

- `LivestreamGetActiveLivestreamsForLivestreamIDResponse object { data, success }`

  - `data: optional object { livestream, session }`

    - `livestream: optional object { id, created_at, disabled, 7 more }`

      - `id: optional string`

      - `created_at: optional string`

        Timestamp the object was created at. The time is returned in ISO format.

      - `disabled: optional string`

        Specifies if the livestream was disabled.

      - `ingest_server: optional string`

        The server URL to which the RTMP encoder sends the video and audio data.

      - `meeting_id: optional string`

        ID of the meeting.

      - `name: optional string`

        Name of the livestream.

      - `playback_url: optional string`

        The web address that viewers can use to watch the livestream.

      - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

        - `"LIVE"`

        - `"IDLE"`

        - `"ERRORED"`

        - `"INVOKED"`

      - `stream_key: optional string`

        Unique key for accessing each livestream.

      - `updated_at: optional string`

        Timestamp the object was updated at. The time is returned in ISO format.

    - `session: optional object { id, created_at, err_message, 7 more }`

      - `id: optional string`

      - `created_at: optional string`

        Timestamp the object was created at. The time is returned in ISO format.

      - `err_message: optional string`

      - `ingest_seconds: optional string`

        The time duration for which the input was given or the meeting was streamed.

      - `invoked_time: optional string`

        Timestamp the object was invoked. The time is returned in ISO format.

      - `livestream_id: optional string`

      - `started_time: optional string`

        Timestamp the object was started. The time is returned in ISO format.

      - `stopped_time: optional string`

        Timestamp the object was stopped. The time is returned in ISO format.

      - `updated_at: optional string`

        Timestamp the object was updated at. The time is returned in ISO format.

      - `viewer_seconds: optional string`

        The total view time for which the viewers watched the stream.

  - `success: optional boolean`

### Livestream Get Livestream Session For Livestream ID Response

- `LivestreamGetLivestreamSessionForLivestreamIDResponse object { data, success }`

  - `data: optional object { livestream, paging, session }`

    - `livestream: optional object { id, created_at, disabled, 7 more }`

      - `id: optional string`

        ID of the livestream.

      - `created_at: optional string`

        Timestamp the object was created at. The time is returned in ISO format.

      - `disabled: optional string`

        Specifies if the livestream was disabled.

      - `ingest_server: optional string`

        The server URL to which the RTMP encoder sends the video and audio data.

      - `meeting_id: optional string`

        The ID of the meeting.

      - `name: optional string`

        Name of the livestream.

      - `playback_url: optional string`

        The web address that viewers can use to watch the livestream.

      - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

        - `"LIVE"`

        - `"IDLE"`

        - `"ERRORED"`

        - `"INVOKED"`

      - `stream_key: optional string`

        Unique key for accessing each livestream.

      - `updated_at: optional string`

        Timestamp the object was updated at. The time is returned in ISO format.

    - `paging: optional object { end_offset, start_offset, total_count }`

      - `end_offset: optional number`

      - `start_offset: optional number`

      - `total_count: optional number`

    - `session: optional object { id, created_at, err_message, 7 more }`

      - `id: optional string`

        ID of the session.

      - `created_at: optional string`

        Timestamp the object was created at. The time is returned in ISO format.

      - `err_message: optional string`

      - `ingest_seconds: optional number`

        The time duration for which the input was given or the meeting was streamed.

      - `invoked_time: optional string`

        Timestamp the object was invoked. The time is returned in ISO format.

      - `livestream_id: optional string`

      - `started_time: optional string`

        Timestamp the object was started. The time is returned in ISO format.

      - `stopped_time: optional string`

        Timestamp the object was stopped. The time is returned in ISO format.

      - `updated_at: optional string`

        Timestamp the object was updated at. The time is returned in ISO format.

      - `viewer_seconds: optional number`

        The total view time for which the viewers watched the stream.

  - `success: optional boolean`

# Analytics

## Fetch day-wise session and recording analytics data for an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/daywise`

Returns day-wise session and recording analytics data of an App for the specified time range start_date to end_date. If start_date and end_date are not provided, the default time range is set from 30 days ago to the current date.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_date: optional string`

  end date in YYYY-MM-DD format

- `start_date: optional string`

  start date in YYYY-MM-DD format

### Returns

- `data: optional object { recording_stats, session_stats }`

  - `recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }`

    Recording statistics of an App during the range specified

    - `day_stats: optional array of object { day, total_recording_minutes, total_recordings }`

      Day wise recording stats

      - `day: optional string`

      - `total_recording_minutes: optional number`

        Total recording minutes for a specific day

      - `total_recordings: optional number`

        Total number of recordings for a specific day

    - `recording_count: optional number`

      Total number of recordings during the range specified

    - `recording_minutes_consumed: optional number`

      Total recording minutes during the range specified

  - `session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }`

    Session statistics of an App during the range specified

    - `day_stats: optional array of object { day, total_session_minutes, total_sessions }`

      Day wise session stats

      - `day: optional string`

      - `total_session_minutes: optional number`

        Total session minutes for a specific day

      - `total_sessions: optional number`

        Total number of sessions for a specific day

    - `sessions_count: optional number`

      Total number of sessions during the range specified

    - `sessions_minutes_consumed: optional number`

      Total session minutes during the range specified

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/daywise \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "recording_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_recording_minutes": 0,
          "total_recordings": 0
        }
      ],
      "recording_count": 0,
      "recording_minutes_consumed": 0
    },
    "session_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_session_minutes": 0,
          "total_sessions": 0
        }
      ],
      "sessions_count": 0,
      "sessions_minutes_consumed": 0
    }
  },
  "success": true
}
```

## Domain Types

### Analytics Get Org Analytics Response

- `AnalyticsGetOrgAnalyticsResponse object { data, success }`

  - `data: optional object { recording_stats, session_stats }`

    - `recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }`

      Recording statistics of an App during the range specified

      - `day_stats: optional array of object { day, total_recording_minutes, total_recordings }`

        Day wise recording stats

        - `day: optional string`

        - `total_recording_minutes: optional number`

          Total recording minutes for a specific day

        - `total_recordings: optional number`

          Total number of recordings for a specific day

      - `recording_count: optional number`

        Total number of recordings during the range specified

      - `recording_minutes_consumed: optional number`

        Total recording minutes during the range specified

    - `session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }`

      Session statistics of an App during the range specified

      - `day_stats: optional array of object { day, total_session_minutes, total_sessions }`

        Day wise session stats

        - `day: optional string`

        - `total_session_minutes: optional number`

          Total session minutes for a specific day

        - `total_sessions: optional number`

          Total number of sessions for a specific day

      - `sessions_count: optional number`

        Total number of sessions during the range specified

      - `sessions_minutes_consumed: optional number`

        Total session minutes during the range specified

  - `success: optional boolean`
