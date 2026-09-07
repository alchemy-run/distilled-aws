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
