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
