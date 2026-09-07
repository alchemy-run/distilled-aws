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
