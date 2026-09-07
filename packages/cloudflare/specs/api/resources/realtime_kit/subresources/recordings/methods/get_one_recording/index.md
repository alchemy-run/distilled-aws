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
