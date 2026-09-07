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
