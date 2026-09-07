# Snapshots

## List Snapshots

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots`

List Snapshots

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Query Parameters

- `from: number`

- `to: number`

- `cursor: optional string`

- `limit: optional number`

### Returns

- `result: object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, t }`

    - `a: number`

      Time the Snapshot was collected (seconds since the Unix epoch)

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "a": 0,
        "t": 0
      }
    ],
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Get Snapshot

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/{snapshot_t}`

Get Snapshot

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

- `snapshot_t: number`

### Returns

- `result: object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

  Snapshot

  - `count_reclaim_failures: number`

    Count of failures to reclaim space

  - `count_reclaimed_paths: number`

    Count of reclaimed paths

  - `count_record_failed: number`

    Count of failed snapshot recordings

  - `count_transmit_failures: number`

    Count of failed snapshot transmissions

  - `t: number`

    Time the Snapshot was recorded (seconds since the Unix epoch)

  - `v: string`

    Version

  - `bonds: optional array of object { name, status }`

    - `name: string`

      Name of the network interface

    - `status: string`

      Current status of the network interface

  - `cpu_count: optional number`

    Count of processors/cores

  - `cpu_pressure_10s: optional number`

    Percentage of time over a 10 second window that tasks were stalled

  - `cpu_pressure_300s: optional number`

    Percentage of time over a 5 minute window that tasks were stalled

  - `cpu_pressure_60s: optional number`

    Percentage of time over a 1 minute window that tasks were stalled

  - `cpu_pressure_total_us: optional number`

    Total stall time (microseconds)

  - `cpu_time_guest_ms: optional number`

    Time spent running a virtual CPU or guest OS (milliseconds)

  - `cpu_time_guest_nice_ms: optional number`

    Time spent running a niced guest (milliseconds)

  - `cpu_time_idle_ms: optional number`

    Time spent in idle state (milliseconds)

  - `cpu_time_iowait_ms: optional number`

    Time spent wait for I/O to complete (milliseconds)

  - `cpu_time_irq_ms: optional number`

    Time spent servicing interrupts (milliseconds)

  - `cpu_time_nice_ms: optional number`

    Time spent in low-priority user mode (milliseconds)

  - `cpu_time_softirq_ms: optional number`

    Time spent servicing softirqs (milliseconds)

  - `cpu_time_steal_ms: optional number`

    Time stolen (milliseconds)

  - `cpu_time_system_ms: optional number`

    Time spent in system mode (milliseconds)

  - `cpu_time_user_ms: optional number`

    Time spent in user mode (milliseconds)

  - `delta: optional number`

    Number of network operations applied during state transition

  - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

    - `client_id: string`

      Client ID of the device the IP Address was leased to

    - `expiry_time: number`

      Expiry time of the DHCP lease (seconds since the Unix epoch)

    - `hostname: string`

      Hostname of the device the IP Address was leased to

    - `interface_name: string`

      Name of the network interface

    - `ip_address: string`

      IP Address that was leased

    - `mac_address: string`

      MAC Address of the device the IP Address was leased to

  - `disks: optional array of object { in_progress, major, merged, 17 more }`

    - `in_progress: number`

      I/Os currently in progress

    - `major: number`

      Device major number

    - `merged: number`

      Reads merged

    - `minor: number`

      Device minor number

    - `name: string`

      Device name

    - `reads: number`

      Reads completed successfully

    - `sectors_read: number`

      Sectors read successfully

    - `sectors_written: number`

      Sectors written successfully

    - `time_in_progress_ms: number`

      Time spent doing I/Os (milliseconds)

    - `time_reading_ms: number`

      Time spent reading (milliseconds)

    - `time_writing_ms: number`

      Time spent writing (milliseconds)

    - `weighted_time_in_progress_ms: number`

      Weighted time spent doing I/Os (milliseconds)

    - `writes: number`

      Writes completed

    - `writes_merged: number`

      Writes merged

    - `discards: optional number`

      Discards completed successfully

    - `discards_merged: optional number`

      Discards merged

    - `flushes: optional number`

      Flushes completed successfully

    - `sectors_discarded: optional number`

      Sectors discarded

    - `time_discarding_ms: optional number`

      Time spent discarding (milliseconds)

    - `time_flushing_ms: optional number`

      Time spent flushing (milliseconds)

  - `epsilon: optional number`

    Simulated number of network operations applied during state transition

  - `ha_state: optional string`

    Name of high availability state

  - `ha_value: optional number`

    Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

  - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

    - `name: string`

      Name of the network interface

    - `operstate: string`

      UP/DOWN state of the network interface

    - `ip_addresses: optional array of object { interface_name, ip_address }`

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP address of the network interface

    - `speed: optional number`

      Speed of the network interface (bits per second)

  - `io_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `io_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `io_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `io_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `io_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `io_pressure_some_300s: optional number`

    Percentage of time over a 3 minute window that some tasks were stalled

  - `io_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `io_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `kernel_btime: optional number`

    Boot time (seconds since Unix epoch)

  - `kernel_ctxt: optional number`

    Number of context switches that the system underwent

  - `kernel_processes: optional number`

    Number of forks since boot

  - `kernel_processes_blocked: optional number`

    Number of processes blocked waiting for I/O

  - `kernel_processes_running: optional number`

    Number of processes in runnable state

  - `load_average_15m: optional number`

    The fifteen-minute load average

  - `load_average_1m: optional number`

    The one-minute load average

  - `load_average_5m: optional number`

    The five-minute load average

  - `load_average_cur: optional number`

    Number of currently runnable kernel scheduling entities

  - `load_average_max: optional number`

    Number of kernel scheduling entities that currently exist on the system

  - `memory_active_bytes: optional number`

    Memory that has been used more recently

  - `memory_anon_hugepages_bytes: optional number`

    Non-file backed huge pages mapped into user-space page tables

  - `memory_anon_pages_bytes: optional number`

    Non-file backed pages mapped into user-space page tables

  - `memory_available_bytes: optional number`

    Estimate of how much memory is available for starting new applications

  - `memory_bounce_bytes: optional number`

    Memory used for block device bounce buffers

  - `memory_buffers_bytes: optional number`

    Relatively temporary storage for raw disk blocks

  - `memory_cached_bytes: optional number`

    In-memory cache for files read from the disk

  - `memory_cma_free_bytes: optional number`

    Free CMA (Contiguous Memory Allocator) pages

  - `memory_cma_total_bytes: optional number`

    Total CMA (Contiguous Memory Allocator) pages

  - `memory_commit_limit_bytes: optional number`

    Total amount of memory currently available to be allocated on the system

  - `memory_committed_as_bytes: optional number`

    Amount of memory presently allocated on the system

  - `memory_dirty_bytes: optional number`

    Memory which is waiting to get written back to the disk

  - `memory_free_bytes: optional number`

    The sum of LowFree and HighFree

  - `memory_high_free_bytes: optional number`

    Amount of free highmem

  - `memory_high_total_bytes: optional number`

    Total amount of highmem

  - `memory_hugepages_free: optional number`

    The number of huge pages in the pool that are not yet allocated

  - `memory_hugepages_rsvd: optional number`

    Number of huge pages for which a commitment has been made, but no allocation has yet been made

  - `memory_hugepages_surp: optional number`

    Number of huge pages in the pool above the threshold

  - `memory_hugepages_total: optional number`

    The size of the pool of huge pages

  - `memory_hugepagesize_bytes: optional number`

    The size of huge pages

  - `memory_inactive_bytes: optional number`

    Memory which has been less recently used

  - `memory_k_reclaimable_bytes: optional number`

    Kernel allocations that the kernel will attempt to reclaim under memory pressure

  - `memory_kernel_stack_bytes: optional number`

    Amount of memory allocated to kernel stacks

  - `memory_low_free_bytes: optional number`

    Amount of free lowmem

  - `memory_low_total_bytes: optional number`

    Total amount of lowmem

  - `memory_mapped_bytes: optional number`

    Files which have been mapped into memory

  - `memory_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_per_cpu_bytes: optional number`

    Memory allocated to the per-cpu alloctor used to back per-cpu allocations

  - `memory_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `memory_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `memory_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `memory_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `memory_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `memory_pressure_some_300s: optional number`

    Percentage of time over a 5 minute window that some tasks were stalled

  - `memory_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `memory_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `memory_s_reclaimable_bytes: optional number`

    Part of slab that can be reclaimed on memory pressure

  - `memory_s_unreclaim_bytes: optional number`

    Part of slab that cannot be reclaimed on memory pressure

  - `memory_secondary_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_shmem_bytes: optional number`

    Amount of memory consumed by tmpfs

  - `memory_shmem_hugepages_bytes: optional number`

    Memory used by shmem and tmpfs, allocated with huge pages

  - `memory_shmem_pmd_mapped_bytes: optional number`

    Shared memory mapped into user space with huge pages

  - `memory_slab_bytes: optional number`

    In-kernel data structures cache

  - `memory_swap_cached_bytes: optional number`

    Memory swapped out and back in while still in swap file

  - `memory_swap_free_bytes: optional number`

    Amount of swap space that is currently unused

  - `memory_swap_total_bytes: optional number`

    Total amount of swap space available

  - `memory_total_bytes: optional number`

    Total usable RAM

  - `memory_vmalloc_chunk_bytes: optional number`

    Largest contiguous block of vmalloc area which is free

  - `memory_vmalloc_total_bytes: optional number`

    Total size of vmalloc memory area

  - `memory_vmalloc_used_bytes: optional number`

    Amount of vmalloc area which is used

  - `memory_writeback_bytes: optional number`

    Memory which is actively being written back to the disk

  - `memory_writeback_tmp_bytes: optional number`

    Memory used by FUSE for temporary writeback buffers

  - `memory_z_swap_bytes: optional number`

    Memory consumed by the zswap backend, compressed

  - `memory_z_swapped_bytes: optional number`

    Amount of anonymous memory stored in zswap, uncompressed

  - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

    - `file_system: string`

      File system on disk (EXT4, NTFS, etc.)

    - `kind: string`

      Kind of disk (HDD, SSD, etc.)

    - `mount_point: string`

      Path where disk is mounted

    - `name: string`

      Name of the disk mount

    - `available_bytes: optional number`

      Available disk size (bytes)

    - `available_inodes: optional number`

      Available inodes on filesystem

    - `is_read_only: optional boolean`

      Determines whether the disk is read-only

    - `is_removable: optional boolean`

      Determines whether the disk is removable

    - `total_bytes: optional number`

      Total disk size (bytes)

    - `total_inodes: optional number`

      Total inodes on filesystem

  - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

    - `name: string`

      Name of the network device

    - `recv_bytes: number`

      Total bytes received

    - `recv_compressed: number`

      Compressed packets received

    - `recv_drop: number`

      Packets dropped

    - `recv_errs: number`

      Bad packets received

    - `recv_fifo: number`

      FIFO overruns

    - `recv_frame: number`

      Frame alignment errors

    - `recv_multicast: number`

      Multicast packets received

    - `recv_packets: number`

      Total packets received

    - `sent_bytes: number`

      Total bytes transmitted

    - `sent_carrier: number`

      Number of packets not sent due to carrier errors

    - `sent_colls: number`

      Number of collisions

    - `sent_compressed: number`

      Number of compressed packets transmitted

    - `sent_drop: number`

      Number of packets dropped during transmission

    - `sent_errs: number`

      Number of transmission errors

    - `sent_fifo: number`

      FIFO overruns

    - `sent_packets: number`

      Total packets transmitted

  - `platform: optional string`

    Platform identifier

  - `snmp_icmp_in_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages received

  - `snmp_icmp_in_addr_masks: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_csum_errors: optional number`

    Number of ICMP messages received with bad checksums

  - `snmp_icmp_in_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages received

  - `snmp_icmp_in_echo_reps: optional number`

    Number of ICMP Echo Reply messages received

  - `snmp_icmp_in_echos: optional number`

    Number of ICMP Echo (request) messages received

  - `snmp_icmp_in_errors: optional number`

    Number of ICMP messages received with ICMP-specific errors

  - `snmp_icmp_in_msgs: optional number`

    Number of ICMP messages received

  - `snmp_icmp_in_parm_probs: optional number`

    Number of ICMP Parameter Problem messages received

  - `snmp_icmp_in_redirects: optional number`

    Number of ICMP Redirect messages received

  - `snmp_icmp_in_src_quenchs: optional number`

    Number of ICMP Source Quench messages received

  - `snmp_icmp_in_time_excds: optional number`

    Number of ICMP Time Exceeded messages received

  - `snmp_icmp_in_timestamp_reps: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_timestamps: optional number`

    Number of ICMP Timestamp (request) messages received

  - `snmp_icmp_out_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages sent

  - `snmp_icmp_out_addr_masks: optional number`

    Number of ICMP Address Mask Request messages sent

  - `snmp_icmp_out_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages sent

  - `snmp_icmp_out_echo_reps: optional number`

    Number of ICMP Echo Reply messages sent

  - `snmp_icmp_out_echos: optional number`

    Number of ICMP Echo (request) messages sent

  - `snmp_icmp_out_errors: optional number`

    Number of ICMP messages which this entity did not send due to ICMP-specific errors

  - `snmp_icmp_out_msgs: optional number`

    Number of ICMP messages attempted to send

  - `snmp_icmp_out_parm_probs: optional number`

    Number of ICMP Parameter Problem messages sent

  - `snmp_icmp_out_redirects: optional number`

    Number of ICMP Redirect messages sent

  - `snmp_icmp_out_src_quenchs: optional number`

    Number of ICMP Source Quench messages sent

  - `snmp_icmp_out_time_excds: optional number`

    Number of ICMP Time Exceeded messages sent

  - `snmp_icmp_out_timestamp_reps: optional number`

    Number of ICMP Timestamp Reply messages sent

  - `snmp_icmp_out_timestamps: optional number`

    Number of ICMP Timestamp (request) messages sent

  - `snmp_ip_default_ttl: optional number`

    Default value of the Time-To-Live field of the IP header

  - `snmp_ip_forw_datagrams: optional number`

    Number of datagrams forwarded to their final destination

  - `snmp_ip_forwarding_enabled: optional boolean`

    Set when acting as an IP gateway

  - `snmp_ip_frag_creates: optional number`

    Number of datagrams generated by fragmentation

  - `snmp_ip_frag_fails: optional number`

    Number of datagrams discarded because fragmentation failed

  - `snmp_ip_frag_oks: optional number`

    Number of datagrams successfully fragmented

  - `snmp_ip_in_addr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP address

  - `snmp_ip_in_delivers: optional number`

    Number of input datagrams successfully delivered to IP user-protocols

  - `snmp_ip_in_discards: optional number`

    Number of input datagrams otherwise discarded

  - `snmp_ip_in_hdr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP header

  - `snmp_ip_in_receives: optional number`

    Number of input datagrams received from interfaces

  - `snmp_ip_in_unknown_protos: optional number`

    Number of input datagrams discarded due unknown or unsupported protocol

  - `snmp_ip_out_discards: optional number`

    Number of output datagrams otherwise discarded

  - `snmp_ip_out_no_routes: optional number`

    Number of output datagrams discarded because no route matched

  - `snmp_ip_out_requests: optional number`

    Number of datagrams supplied for transmission

  - `snmp_ip_reasm_fails: optional number`

    Number of failures detected by the reassembly algorithm

  - `snmp_ip_reasm_oks: optional number`

    Number of datagrams successfully reassembled

  - `snmp_ip_reasm_reqds: optional number`

    Number of fragments received which needed to be reassembled

  - `snmp_ip_reasm_timeout: optional number`

    Number of seconds fragments are held while awaiting reassembly

  - `snmp_tcp_active_opens: optional number`

    Number of times TCP transitions to SYN-SENT from CLOSED

  - `snmp_tcp_attempt_fails: optional number`

    Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

  - `snmp_tcp_curr_estab: optional number`

    Number of TCP connections in ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_estab_resets: optional number`

    Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_in_csum_errors: optional number`

    Number of TCP segments received with checksum errors

  - `snmp_tcp_in_errs: optional number`

    Number of TCP segments received in error

  - `snmp_tcp_in_segs: optional number`

    Number of TCP segments received

  - `snmp_tcp_max_conn: optional number`

    Limit on the total number of TCP connections

  - `snmp_tcp_out_rsts: optional number`

    Number of TCP segments sent with RST flag

  - `snmp_tcp_out_segs: optional number`

    Number of TCP segments sent

  - `snmp_tcp_passive_opens: optional number`

    Number of times TCP transitions to SYN-RCVD from LISTEN

  - `snmp_tcp_retrans_segs: optional number`

    Number of TCP segments retransmitted

  - `snmp_tcp_rto_max: optional number`

    Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_tcp_rto_min: optional number`

    Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_udp_in_datagrams: optional number`

    Number of UDP datagrams delivered to UDP applications

  - `snmp_udp_in_errors: optional number`

    Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

  - `snmp_udp_no_ports: optional number`

    Number of UDP datagrams received for which there was not application at the destination port

  - `snmp_udp_out_datagrams: optional number`

    Number of UDP datagrams sent

  - `system_boot_time_s: optional number`

    Boottime of the system (seconds since the Unix epoch)

  - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

    - `label: string`

      Sensor identifier for the component

    - `critical_celcius: optional number`

      Critical failure temperature of the component (degrees Celsius)

    - `current_celcius: optional number`

      Current temperature of the component (degrees Celsius)

    - `max_celcius: optional number`

      Maximum temperature of the component (degrees Celsius)

  - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

    - `health_state: string`

      Name of tunnel health state (unknown, healthy, degraded, down)

    - `health_value: number`

      Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

    - `interface_name: string`

      The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

    - `tunnel_id: string`

      Tunnel identifier

    - `natd_result: optional string`

      Public socket address returned by the NAT detector

    - `natd_state: optional number`

      Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

    - `natd_target: optional string`

      Target socket address probed by the NAT detector, using the detector source port

    - `probed_mtu: optional number`

      MTU as measured between the two ends of the tunnel

    - `recent_healthy_pings: optional number`

      Number of recent healthy pings for this tunnel

    - `recent_unhealthy_pings: optional number`

      Number of recent unhealthy pings for this tunnel

  - `uptime_idle_ms: optional number`

    Sum of how much time each core has spent idle

  - `uptime_total_ms: optional number`

    Uptime of the system, including time spent in suspend

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots/$SNAPSHOT_T \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count_reclaim_failures": 0,
    "count_reclaimed_paths": 0,
    "count_record_failed": 0,
    "count_transmit_failures": 0,
    "t": 0,
    "v": "v",
    "bonds": [
      {
        "name": "name",
        "status": "status"
      }
    ],
    "cpu_count": 0,
    "cpu_pressure_10s": 0,
    "cpu_pressure_300s": 0,
    "cpu_pressure_60s": 0,
    "cpu_pressure_total_us": 0,
    "cpu_time_guest_ms": 0,
    "cpu_time_guest_nice_ms": 0,
    "cpu_time_idle_ms": 0,
    "cpu_time_iowait_ms": 0,
    "cpu_time_irq_ms": 0,
    "cpu_time_nice_ms": 0,
    "cpu_time_softirq_ms": 0,
    "cpu_time_steal_ms": 0,
    "cpu_time_system_ms": 0,
    "cpu_time_user_ms": 0,
    "delta": 0,
    "dhcp_leases": [
      {
        "client_id": "client_id",
        "expiry_time": 0,
        "hostname": "hostname",
        "interface_name": "interface_name",
        "ip_address": "ip_address",
        "mac_address": "mac_address"
      }
    ],
    "disks": [
      {
        "in_progress": 0,
        "major": 0,
        "merged": 0,
        "minor": 0,
        "name": "name",
        "reads": 0,
        "sectors_read": 0,
        "sectors_written": 0,
        "time_in_progress_ms": 0,
        "time_reading_ms": 0,
        "time_writing_ms": 0,
        "weighted_time_in_progress_ms": 0,
        "writes": 0,
        "writes_merged": 0,
        "discards": 0,
        "discards_merged": 0,
        "flushes": 0,
        "sectors_discarded": 0,
        "time_discarding_ms": 0,
        "time_flushing_ms": 0
      }
    ],
    "epsilon": 0,
    "ha_state": "ha_state",
    "ha_value": 0,
    "interfaces": [
      {
        "name": "name",
        "operstate": "operstate",
        "ip_addresses": [
          {
            "interface_name": "interface_name",
            "ip_address": "ip_address"
          }
        ],
        "speed": 0
      }
    ],
    "io_pressure_full_10s": 0,
    "io_pressure_full_300s": 0,
    "io_pressure_full_60s": 0,
    "io_pressure_full_total_us": 0,
    "io_pressure_some_10s": 0,
    "io_pressure_some_300s": 0,
    "io_pressure_some_60s": 0,
    "io_pressure_some_total_us": 0,
    "kernel_btime": 0,
    "kernel_ctxt": 0,
    "kernel_processes": 0,
    "kernel_processes_blocked": 0,
    "kernel_processes_running": 0,
    "load_average_15m": 0,
    "load_average_1m": 0,
    "load_average_5m": 0,
    "load_average_cur": 0,
    "load_average_max": 0,
    "memory_active_bytes": 0,
    "memory_anon_hugepages_bytes": 0,
    "memory_anon_pages_bytes": 0,
    "memory_available_bytes": 0,
    "memory_bounce_bytes": 0,
    "memory_buffers_bytes": 0,
    "memory_cached_bytes": 0,
    "memory_cma_free_bytes": 0,
    "memory_cma_total_bytes": 0,
    "memory_commit_limit_bytes": 0,
    "memory_committed_as_bytes": 0,
    "memory_dirty_bytes": 0,
    "memory_free_bytes": 0,
    "memory_high_free_bytes": 0,
    "memory_high_total_bytes": 0,
    "memory_hugepages_free": 0,
    "memory_hugepages_rsvd": 0,
    "memory_hugepages_surp": 0,
    "memory_hugepages_total": 0,
    "memory_hugepagesize_bytes": 0,
    "memory_inactive_bytes": 0,
    "memory_k_reclaimable_bytes": 0,
    "memory_kernel_stack_bytes": 0,
    "memory_low_free_bytes": 0,
    "memory_low_total_bytes": 0,
    "memory_mapped_bytes": 0,
    "memory_page_tables_bytes": 0,
    "memory_per_cpu_bytes": 0,
    "memory_pressure_full_10s": 0,
    "memory_pressure_full_300s": 0,
    "memory_pressure_full_60s": 0,
    "memory_pressure_full_total_us": 0,
    "memory_pressure_some_10s": 0,
    "memory_pressure_some_300s": 0,
    "memory_pressure_some_60s": 0,
    "memory_pressure_some_total_us": 0,
    "memory_s_reclaimable_bytes": 0,
    "memory_s_unreclaim_bytes": 0,
    "memory_secondary_page_tables_bytes": 0,
    "memory_shmem_bytes": 0,
    "memory_shmem_hugepages_bytes": 0,
    "memory_shmem_pmd_mapped_bytes": 0,
    "memory_slab_bytes": 0,
    "memory_swap_cached_bytes": 0,
    "memory_swap_free_bytes": 0,
    "memory_swap_total_bytes": 0,
    "memory_total_bytes": 0,
    "memory_vmalloc_chunk_bytes": 0,
    "memory_vmalloc_total_bytes": 0,
    "memory_vmalloc_used_bytes": 0,
    "memory_writeback_bytes": 0,
    "memory_writeback_tmp_bytes": 0,
    "memory_z_swap_bytes": 0,
    "memory_z_swapped_bytes": 0,
    "mounts": [
      {
        "file_system": "file_system",
        "kind": "kind",
        "mount_point": "mount_point",
        "name": "name",
        "available_bytes": 0,
        "available_inodes": 0,
        "is_read_only": true,
        "is_removable": true,
        "total_bytes": 0,
        "total_inodes": 0
      }
    ],
    "netdevs": [
      {
        "name": "name",
        "recv_bytes": 0,
        "recv_compressed": 0,
        "recv_drop": 0,
        "recv_errs": 0,
        "recv_fifo": 0,
        "recv_frame": 0,
        "recv_multicast": 0,
        "recv_packets": 0,
        "sent_bytes": 0,
        "sent_carrier": 0,
        "sent_colls": 0,
        "sent_compressed": 0,
        "sent_drop": 0,
        "sent_errs": 0,
        "sent_fifo": 0,
        "sent_packets": 0
      }
    ],
    "platform": "platform",
    "snmp_icmp_in_addr_mask_reps": 0,
    "snmp_icmp_in_addr_masks": 0,
    "snmp_icmp_in_csum_errors": 0,
    "snmp_icmp_in_dest_unreachs": 0,
    "snmp_icmp_in_echo_reps": 0,
    "snmp_icmp_in_echos": 0,
    "snmp_icmp_in_errors": 0,
    "snmp_icmp_in_msgs": 0,
    "snmp_icmp_in_parm_probs": 0,
    "snmp_icmp_in_redirects": 0,
    "snmp_icmp_in_src_quenchs": 0,
    "snmp_icmp_in_time_excds": 0,
    "snmp_icmp_in_timestamp_reps": 0,
    "snmp_icmp_in_timestamps": 0,
    "snmp_icmp_out_addr_mask_reps": 0,
    "snmp_icmp_out_addr_masks": 0,
    "snmp_icmp_out_dest_unreachs": 0,
    "snmp_icmp_out_echo_reps": 0,
    "snmp_icmp_out_echos": 0,
    "snmp_icmp_out_errors": 0,
    "snmp_icmp_out_msgs": 0,
    "snmp_icmp_out_parm_probs": 0,
    "snmp_icmp_out_redirects": 0,
    "snmp_icmp_out_src_quenchs": 0,
    "snmp_icmp_out_time_excds": 0,
    "snmp_icmp_out_timestamp_reps": 0,
    "snmp_icmp_out_timestamps": 0,
    "snmp_ip_default_ttl": 0,
    "snmp_ip_forw_datagrams": 0,
    "snmp_ip_forwarding_enabled": true,
    "snmp_ip_frag_creates": 0,
    "snmp_ip_frag_fails": 0,
    "snmp_ip_frag_oks": 0,
    "snmp_ip_in_addr_errors": 0,
    "snmp_ip_in_delivers": 0,
    "snmp_ip_in_discards": 0,
    "snmp_ip_in_hdr_errors": 0,
    "snmp_ip_in_receives": 0,
    "snmp_ip_in_unknown_protos": 0,
    "snmp_ip_out_discards": 0,
    "snmp_ip_out_no_routes": 0,
    "snmp_ip_out_requests": 0,
    "snmp_ip_reasm_fails": 0,
    "snmp_ip_reasm_oks": 0,
    "snmp_ip_reasm_reqds": 0,
    "snmp_ip_reasm_timeout": 0,
    "snmp_tcp_active_opens": 0,
    "snmp_tcp_attempt_fails": 0,
    "snmp_tcp_curr_estab": 0,
    "snmp_tcp_estab_resets": 0,
    "snmp_tcp_in_csum_errors": 0,
    "snmp_tcp_in_errs": 0,
    "snmp_tcp_in_segs": 0,
    "snmp_tcp_max_conn": 0,
    "snmp_tcp_out_rsts": 0,
    "snmp_tcp_out_segs": 0,
    "snmp_tcp_passive_opens": 0,
    "snmp_tcp_retrans_segs": 0,
    "snmp_tcp_rto_max": 0,
    "snmp_tcp_rto_min": 0,
    "snmp_udp_in_datagrams": 0,
    "snmp_udp_in_errors": 0,
    "snmp_udp_no_ports": 0,
    "snmp_udp_out_datagrams": 0,
    "system_boot_time_s": 0,
    "thermals": [
      {
        "label": "label",
        "critical_celcius": 0,
        "current_celcius": 0,
        "max_celcius": 0
      }
    ],
    "tunnels": [
      {
        "health_state": "health_state",
        "health_value": 0,
        "interface_name": "interface_name",
        "tunnel_id": "tunnel_id",
        "natd_result": "natd_result",
        "natd_state": 0,
        "natd_target": "natd_target",
        "probed_mtu": 0,
        "recent_healthy_pings": 0,
        "recent_unhealthy_pings": 0
      }
    ],
    "uptime_idle_ms": 0,
    "uptime_total_ms": 0
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Snapshot List Response

- `SnapshotListResponse object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, t }`

    - `a: number`

      Time the Snapshot was collected (seconds since the Unix epoch)

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

### Snapshot Get Response

- `SnapshotGetResponse object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

  Snapshot

  - `count_reclaim_failures: number`

    Count of failures to reclaim space

  - `count_reclaimed_paths: number`

    Count of reclaimed paths

  - `count_record_failed: number`

    Count of failed snapshot recordings

  - `count_transmit_failures: number`

    Count of failed snapshot transmissions

  - `t: number`

    Time the Snapshot was recorded (seconds since the Unix epoch)

  - `v: string`

    Version

  - `bonds: optional array of object { name, status }`

    - `name: string`

      Name of the network interface

    - `status: string`

      Current status of the network interface

  - `cpu_count: optional number`

    Count of processors/cores

  - `cpu_pressure_10s: optional number`

    Percentage of time over a 10 second window that tasks were stalled

  - `cpu_pressure_300s: optional number`

    Percentage of time over a 5 minute window that tasks were stalled

  - `cpu_pressure_60s: optional number`

    Percentage of time over a 1 minute window that tasks were stalled

  - `cpu_pressure_total_us: optional number`

    Total stall time (microseconds)

  - `cpu_time_guest_ms: optional number`

    Time spent running a virtual CPU or guest OS (milliseconds)

  - `cpu_time_guest_nice_ms: optional number`

    Time spent running a niced guest (milliseconds)

  - `cpu_time_idle_ms: optional number`

    Time spent in idle state (milliseconds)

  - `cpu_time_iowait_ms: optional number`

    Time spent wait for I/O to complete (milliseconds)

  - `cpu_time_irq_ms: optional number`

    Time spent servicing interrupts (milliseconds)

  - `cpu_time_nice_ms: optional number`

    Time spent in low-priority user mode (milliseconds)

  - `cpu_time_softirq_ms: optional number`

    Time spent servicing softirqs (milliseconds)

  - `cpu_time_steal_ms: optional number`

    Time stolen (milliseconds)

  - `cpu_time_system_ms: optional number`

    Time spent in system mode (milliseconds)

  - `cpu_time_user_ms: optional number`

    Time spent in user mode (milliseconds)

  - `delta: optional number`

    Number of network operations applied during state transition

  - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

    - `client_id: string`

      Client ID of the device the IP Address was leased to

    - `expiry_time: number`

      Expiry time of the DHCP lease (seconds since the Unix epoch)

    - `hostname: string`

      Hostname of the device the IP Address was leased to

    - `interface_name: string`

      Name of the network interface

    - `ip_address: string`

      IP Address that was leased

    - `mac_address: string`

      MAC Address of the device the IP Address was leased to

  - `disks: optional array of object { in_progress, major, merged, 17 more }`

    - `in_progress: number`

      I/Os currently in progress

    - `major: number`

      Device major number

    - `merged: number`

      Reads merged

    - `minor: number`

      Device minor number

    - `name: string`

      Device name

    - `reads: number`

      Reads completed successfully

    - `sectors_read: number`

      Sectors read successfully

    - `sectors_written: number`

      Sectors written successfully

    - `time_in_progress_ms: number`

      Time spent doing I/Os (milliseconds)

    - `time_reading_ms: number`

      Time spent reading (milliseconds)

    - `time_writing_ms: number`

      Time spent writing (milliseconds)

    - `weighted_time_in_progress_ms: number`

      Weighted time spent doing I/Os (milliseconds)

    - `writes: number`

      Writes completed

    - `writes_merged: number`

      Writes merged

    - `discards: optional number`

      Discards completed successfully

    - `discards_merged: optional number`

      Discards merged

    - `flushes: optional number`

      Flushes completed successfully

    - `sectors_discarded: optional number`

      Sectors discarded

    - `time_discarding_ms: optional number`

      Time spent discarding (milliseconds)

    - `time_flushing_ms: optional number`

      Time spent flushing (milliseconds)

  - `epsilon: optional number`

    Simulated number of network operations applied during state transition

  - `ha_state: optional string`

    Name of high availability state

  - `ha_value: optional number`

    Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

  - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

    - `name: string`

      Name of the network interface

    - `operstate: string`

      UP/DOWN state of the network interface

    - `ip_addresses: optional array of object { interface_name, ip_address }`

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP address of the network interface

    - `speed: optional number`

      Speed of the network interface (bits per second)

  - `io_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `io_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `io_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `io_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `io_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `io_pressure_some_300s: optional number`

    Percentage of time over a 3 minute window that some tasks were stalled

  - `io_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `io_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `kernel_btime: optional number`

    Boot time (seconds since Unix epoch)

  - `kernel_ctxt: optional number`

    Number of context switches that the system underwent

  - `kernel_processes: optional number`

    Number of forks since boot

  - `kernel_processes_blocked: optional number`

    Number of processes blocked waiting for I/O

  - `kernel_processes_running: optional number`

    Number of processes in runnable state

  - `load_average_15m: optional number`

    The fifteen-minute load average

  - `load_average_1m: optional number`

    The one-minute load average

  - `load_average_5m: optional number`

    The five-minute load average

  - `load_average_cur: optional number`

    Number of currently runnable kernel scheduling entities

  - `load_average_max: optional number`

    Number of kernel scheduling entities that currently exist on the system

  - `memory_active_bytes: optional number`

    Memory that has been used more recently

  - `memory_anon_hugepages_bytes: optional number`

    Non-file backed huge pages mapped into user-space page tables

  - `memory_anon_pages_bytes: optional number`

    Non-file backed pages mapped into user-space page tables

  - `memory_available_bytes: optional number`

    Estimate of how much memory is available for starting new applications

  - `memory_bounce_bytes: optional number`

    Memory used for block device bounce buffers

  - `memory_buffers_bytes: optional number`

    Relatively temporary storage for raw disk blocks

  - `memory_cached_bytes: optional number`

    In-memory cache for files read from the disk

  - `memory_cma_free_bytes: optional number`

    Free CMA (Contiguous Memory Allocator) pages

  - `memory_cma_total_bytes: optional number`

    Total CMA (Contiguous Memory Allocator) pages

  - `memory_commit_limit_bytes: optional number`

    Total amount of memory currently available to be allocated on the system

  - `memory_committed_as_bytes: optional number`

    Amount of memory presently allocated on the system

  - `memory_dirty_bytes: optional number`

    Memory which is waiting to get written back to the disk

  - `memory_free_bytes: optional number`

    The sum of LowFree and HighFree

  - `memory_high_free_bytes: optional number`

    Amount of free highmem

  - `memory_high_total_bytes: optional number`

    Total amount of highmem

  - `memory_hugepages_free: optional number`

    The number of huge pages in the pool that are not yet allocated

  - `memory_hugepages_rsvd: optional number`

    Number of huge pages for which a commitment has been made, but no allocation has yet been made

  - `memory_hugepages_surp: optional number`

    Number of huge pages in the pool above the threshold

  - `memory_hugepages_total: optional number`

    The size of the pool of huge pages

  - `memory_hugepagesize_bytes: optional number`

    The size of huge pages

  - `memory_inactive_bytes: optional number`

    Memory which has been less recently used

  - `memory_k_reclaimable_bytes: optional number`

    Kernel allocations that the kernel will attempt to reclaim under memory pressure

  - `memory_kernel_stack_bytes: optional number`

    Amount of memory allocated to kernel stacks

  - `memory_low_free_bytes: optional number`

    Amount of free lowmem

  - `memory_low_total_bytes: optional number`

    Total amount of lowmem

  - `memory_mapped_bytes: optional number`

    Files which have been mapped into memory

  - `memory_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_per_cpu_bytes: optional number`

    Memory allocated to the per-cpu alloctor used to back per-cpu allocations

  - `memory_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `memory_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `memory_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `memory_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `memory_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `memory_pressure_some_300s: optional number`

    Percentage of time over a 5 minute window that some tasks were stalled

  - `memory_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `memory_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `memory_s_reclaimable_bytes: optional number`

    Part of slab that can be reclaimed on memory pressure

  - `memory_s_unreclaim_bytes: optional number`

    Part of slab that cannot be reclaimed on memory pressure

  - `memory_secondary_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_shmem_bytes: optional number`

    Amount of memory consumed by tmpfs

  - `memory_shmem_hugepages_bytes: optional number`

    Memory used by shmem and tmpfs, allocated with huge pages

  - `memory_shmem_pmd_mapped_bytes: optional number`

    Shared memory mapped into user space with huge pages

  - `memory_slab_bytes: optional number`

    In-kernel data structures cache

  - `memory_swap_cached_bytes: optional number`

    Memory swapped out and back in while still in swap file

  - `memory_swap_free_bytes: optional number`

    Amount of swap space that is currently unused

  - `memory_swap_total_bytes: optional number`

    Total amount of swap space available

  - `memory_total_bytes: optional number`

    Total usable RAM

  - `memory_vmalloc_chunk_bytes: optional number`

    Largest contiguous block of vmalloc area which is free

  - `memory_vmalloc_total_bytes: optional number`

    Total size of vmalloc memory area

  - `memory_vmalloc_used_bytes: optional number`

    Amount of vmalloc area which is used

  - `memory_writeback_bytes: optional number`

    Memory which is actively being written back to the disk

  - `memory_writeback_tmp_bytes: optional number`

    Memory used by FUSE for temporary writeback buffers

  - `memory_z_swap_bytes: optional number`

    Memory consumed by the zswap backend, compressed

  - `memory_z_swapped_bytes: optional number`

    Amount of anonymous memory stored in zswap, uncompressed

  - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

    - `file_system: string`

      File system on disk (EXT4, NTFS, etc.)

    - `kind: string`

      Kind of disk (HDD, SSD, etc.)

    - `mount_point: string`

      Path where disk is mounted

    - `name: string`

      Name of the disk mount

    - `available_bytes: optional number`

      Available disk size (bytes)

    - `available_inodes: optional number`

      Available inodes on filesystem

    - `is_read_only: optional boolean`

      Determines whether the disk is read-only

    - `is_removable: optional boolean`

      Determines whether the disk is removable

    - `total_bytes: optional number`

      Total disk size (bytes)

    - `total_inodes: optional number`

      Total inodes on filesystem

  - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

    - `name: string`

      Name of the network device

    - `recv_bytes: number`

      Total bytes received

    - `recv_compressed: number`

      Compressed packets received

    - `recv_drop: number`

      Packets dropped

    - `recv_errs: number`

      Bad packets received

    - `recv_fifo: number`

      FIFO overruns

    - `recv_frame: number`

      Frame alignment errors

    - `recv_multicast: number`

      Multicast packets received

    - `recv_packets: number`

      Total packets received

    - `sent_bytes: number`

      Total bytes transmitted

    - `sent_carrier: number`

      Number of packets not sent due to carrier errors

    - `sent_colls: number`

      Number of collisions

    - `sent_compressed: number`

      Number of compressed packets transmitted

    - `sent_drop: number`

      Number of packets dropped during transmission

    - `sent_errs: number`

      Number of transmission errors

    - `sent_fifo: number`

      FIFO overruns

    - `sent_packets: number`

      Total packets transmitted

  - `platform: optional string`

    Platform identifier

  - `snmp_icmp_in_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages received

  - `snmp_icmp_in_addr_masks: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_csum_errors: optional number`

    Number of ICMP messages received with bad checksums

  - `snmp_icmp_in_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages received

  - `snmp_icmp_in_echo_reps: optional number`

    Number of ICMP Echo Reply messages received

  - `snmp_icmp_in_echos: optional number`

    Number of ICMP Echo (request) messages received

  - `snmp_icmp_in_errors: optional number`

    Number of ICMP messages received with ICMP-specific errors

  - `snmp_icmp_in_msgs: optional number`

    Number of ICMP messages received

  - `snmp_icmp_in_parm_probs: optional number`

    Number of ICMP Parameter Problem messages received

  - `snmp_icmp_in_redirects: optional number`

    Number of ICMP Redirect messages received

  - `snmp_icmp_in_src_quenchs: optional number`

    Number of ICMP Source Quench messages received

  - `snmp_icmp_in_time_excds: optional number`

    Number of ICMP Time Exceeded messages received

  - `snmp_icmp_in_timestamp_reps: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_timestamps: optional number`

    Number of ICMP Timestamp (request) messages received

  - `snmp_icmp_out_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages sent

  - `snmp_icmp_out_addr_masks: optional number`

    Number of ICMP Address Mask Request messages sent

  - `snmp_icmp_out_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages sent

  - `snmp_icmp_out_echo_reps: optional number`

    Number of ICMP Echo Reply messages sent

  - `snmp_icmp_out_echos: optional number`

    Number of ICMP Echo (request) messages sent

  - `snmp_icmp_out_errors: optional number`

    Number of ICMP messages which this entity did not send due to ICMP-specific errors

  - `snmp_icmp_out_msgs: optional number`

    Number of ICMP messages attempted to send

  - `snmp_icmp_out_parm_probs: optional number`

    Number of ICMP Parameter Problem messages sent

  - `snmp_icmp_out_redirects: optional number`

    Number of ICMP Redirect messages sent

  - `snmp_icmp_out_src_quenchs: optional number`

    Number of ICMP Source Quench messages sent

  - `snmp_icmp_out_time_excds: optional number`

    Number of ICMP Time Exceeded messages sent

  - `snmp_icmp_out_timestamp_reps: optional number`

    Number of ICMP Timestamp Reply messages sent

  - `snmp_icmp_out_timestamps: optional number`

    Number of ICMP Timestamp (request) messages sent

  - `snmp_ip_default_ttl: optional number`

    Default value of the Time-To-Live field of the IP header

  - `snmp_ip_forw_datagrams: optional number`

    Number of datagrams forwarded to their final destination

  - `snmp_ip_forwarding_enabled: optional boolean`

    Set when acting as an IP gateway

  - `snmp_ip_frag_creates: optional number`

    Number of datagrams generated by fragmentation

  - `snmp_ip_frag_fails: optional number`

    Number of datagrams discarded because fragmentation failed

  - `snmp_ip_frag_oks: optional number`

    Number of datagrams successfully fragmented

  - `snmp_ip_in_addr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP address

  - `snmp_ip_in_delivers: optional number`

    Number of input datagrams successfully delivered to IP user-protocols

  - `snmp_ip_in_discards: optional number`

    Number of input datagrams otherwise discarded

  - `snmp_ip_in_hdr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP header

  - `snmp_ip_in_receives: optional number`

    Number of input datagrams received from interfaces

  - `snmp_ip_in_unknown_protos: optional number`

    Number of input datagrams discarded due unknown or unsupported protocol

  - `snmp_ip_out_discards: optional number`

    Number of output datagrams otherwise discarded

  - `snmp_ip_out_no_routes: optional number`

    Number of output datagrams discarded because no route matched

  - `snmp_ip_out_requests: optional number`

    Number of datagrams supplied for transmission

  - `snmp_ip_reasm_fails: optional number`

    Number of failures detected by the reassembly algorithm

  - `snmp_ip_reasm_oks: optional number`

    Number of datagrams successfully reassembled

  - `snmp_ip_reasm_reqds: optional number`

    Number of fragments received which needed to be reassembled

  - `snmp_ip_reasm_timeout: optional number`

    Number of seconds fragments are held while awaiting reassembly

  - `snmp_tcp_active_opens: optional number`

    Number of times TCP transitions to SYN-SENT from CLOSED

  - `snmp_tcp_attempt_fails: optional number`

    Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

  - `snmp_tcp_curr_estab: optional number`

    Number of TCP connections in ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_estab_resets: optional number`

    Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_in_csum_errors: optional number`

    Number of TCP segments received with checksum errors

  - `snmp_tcp_in_errs: optional number`

    Number of TCP segments received in error

  - `snmp_tcp_in_segs: optional number`

    Number of TCP segments received

  - `snmp_tcp_max_conn: optional number`

    Limit on the total number of TCP connections

  - `snmp_tcp_out_rsts: optional number`

    Number of TCP segments sent with RST flag

  - `snmp_tcp_out_segs: optional number`

    Number of TCP segments sent

  - `snmp_tcp_passive_opens: optional number`

    Number of times TCP transitions to SYN-RCVD from LISTEN

  - `snmp_tcp_retrans_segs: optional number`

    Number of TCP segments retransmitted

  - `snmp_tcp_rto_max: optional number`

    Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_tcp_rto_min: optional number`

    Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_udp_in_datagrams: optional number`

    Number of UDP datagrams delivered to UDP applications

  - `snmp_udp_in_errors: optional number`

    Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

  - `snmp_udp_no_ports: optional number`

    Number of UDP datagrams received for which there was not application at the destination port

  - `snmp_udp_out_datagrams: optional number`

    Number of UDP datagrams sent

  - `system_boot_time_s: optional number`

    Boottime of the system (seconds since the Unix epoch)

  - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

    - `label: string`

      Sensor identifier for the component

    - `critical_celcius: optional number`

      Critical failure temperature of the component (degrees Celsius)

    - `current_celcius: optional number`

      Current temperature of the component (degrees Celsius)

    - `max_celcius: optional number`

      Maximum temperature of the component (degrees Celsius)

  - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

    - `health_state: string`

      Name of tunnel health state (unknown, healthy, degraded, down)

    - `health_value: number`

      Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

    - `interface_name: string`

      The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

    - `tunnel_id: string`

      Tunnel identifier

    - `natd_result: optional string`

      Public socket address returned by the NAT detector

    - `natd_state: optional number`

      Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

    - `natd_target: optional string`

      Target socket address probed by the NAT detector, using the detector source port

    - `probed_mtu: optional number`

      MTU as measured between the two ends of the tunnel

    - `recent_healthy_pings: optional number`

      Number of recent healthy pings for this tunnel

    - `recent_unhealthy_pings: optional number`

      Number of recent unhealthy pings for this tunnel

  - `uptime_idle_ms: optional number`

    Sum of how much time each core has spent idle

  - `uptime_total_ms: optional number`

    Uptime of the system, including time spent in suspend

# Latest

## Get latest Snapshots

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/latest`

Get latest Snapshots

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `result: object { count, items }`

  - `count: number`

  - `items: array of object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

    - `count_reclaim_failures: number`

      Count of failures to reclaim space

    - `count_reclaimed_paths: number`

      Count of reclaimed paths

    - `count_record_failed: number`

      Count of failed snapshot recordings

    - `count_transmit_failures: number`

      Count of failed snapshot transmissions

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

    - `v: string`

      Version

    - `bonds: optional array of object { name, status }`

      - `name: string`

        Name of the network interface

      - `status: string`

        Current status of the network interface

    - `cpu_count: optional number`

      Count of processors/cores

    - `cpu_pressure_10s: optional number`

      Percentage of time over a 10 second window that tasks were stalled

    - `cpu_pressure_300s: optional number`

      Percentage of time over a 5 minute window that tasks were stalled

    - `cpu_pressure_60s: optional number`

      Percentage of time over a 1 minute window that tasks were stalled

    - `cpu_pressure_total_us: optional number`

      Total stall time (microseconds)

    - `cpu_time_guest_ms: optional number`

      Time spent running a virtual CPU or guest OS (milliseconds)

    - `cpu_time_guest_nice_ms: optional number`

      Time spent running a niced guest (milliseconds)

    - `cpu_time_idle_ms: optional number`

      Time spent in idle state (milliseconds)

    - `cpu_time_iowait_ms: optional number`

      Time spent wait for I/O to complete (milliseconds)

    - `cpu_time_irq_ms: optional number`

      Time spent servicing interrupts (milliseconds)

    - `cpu_time_nice_ms: optional number`

      Time spent in low-priority user mode (milliseconds)

    - `cpu_time_softirq_ms: optional number`

      Time spent servicing softirqs (milliseconds)

    - `cpu_time_steal_ms: optional number`

      Time stolen (milliseconds)

    - `cpu_time_system_ms: optional number`

      Time spent in system mode (milliseconds)

    - `cpu_time_user_ms: optional number`

      Time spent in user mode (milliseconds)

    - `delta: optional number`

      Number of network operations applied during state transition

    - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

      - `client_id: string`

        Client ID of the device the IP Address was leased to

      - `expiry_time: number`

        Expiry time of the DHCP lease (seconds since the Unix epoch)

      - `hostname: string`

        Hostname of the device the IP Address was leased to

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP Address that was leased

      - `mac_address: string`

        MAC Address of the device the IP Address was leased to

    - `disks: optional array of object { in_progress, major, merged, 17 more }`

      - `in_progress: number`

        I/Os currently in progress

      - `major: number`

        Device major number

      - `merged: number`

        Reads merged

      - `minor: number`

        Device minor number

      - `name: string`

        Device name

      - `reads: number`

        Reads completed successfully

      - `sectors_read: number`

        Sectors read successfully

      - `sectors_written: number`

        Sectors written successfully

      - `time_in_progress_ms: number`

        Time spent doing I/Os (milliseconds)

      - `time_reading_ms: number`

        Time spent reading (milliseconds)

      - `time_writing_ms: number`

        Time spent writing (milliseconds)

      - `weighted_time_in_progress_ms: number`

        Weighted time spent doing I/Os (milliseconds)

      - `writes: number`

        Writes completed

      - `writes_merged: number`

        Writes merged

      - `discards: optional number`

        Discards completed successfully

      - `discards_merged: optional number`

        Discards merged

      - `flushes: optional number`

        Flushes completed successfully

      - `sectors_discarded: optional number`

        Sectors discarded

      - `time_discarding_ms: optional number`

        Time spent discarding (milliseconds)

      - `time_flushing_ms: optional number`

        Time spent flushing (milliseconds)

    - `epsilon: optional number`

      Simulated number of network operations applied during state transition

    - `ha_state: optional string`

      Name of high availability state

    - `ha_value: optional number`

      Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

    - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

      - `name: string`

        Name of the network interface

      - `operstate: string`

        UP/DOWN state of the network interface

      - `ip_addresses: optional array of object { interface_name, ip_address }`

        - `interface_name: string`

          Name of the network interface

        - `ip_address: string`

          IP address of the network interface

      - `speed: optional number`

        Speed of the network interface (bits per second)

    - `io_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `io_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `io_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `io_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `io_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `io_pressure_some_300s: optional number`

      Percentage of time over a 3 minute window that some tasks were stalled

    - `io_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `io_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `kernel_btime: optional number`

      Boot time (seconds since Unix epoch)

    - `kernel_ctxt: optional number`

      Number of context switches that the system underwent

    - `kernel_processes: optional number`

      Number of forks since boot

    - `kernel_processes_blocked: optional number`

      Number of processes blocked waiting for I/O

    - `kernel_processes_running: optional number`

      Number of processes in runnable state

    - `load_average_15m: optional number`

      The fifteen-minute load average

    - `load_average_1m: optional number`

      The one-minute load average

    - `load_average_5m: optional number`

      The five-minute load average

    - `load_average_cur: optional number`

      Number of currently runnable kernel scheduling entities

    - `load_average_max: optional number`

      Number of kernel scheduling entities that currently exist on the system

    - `memory_active_bytes: optional number`

      Memory that has been used more recently

    - `memory_anon_hugepages_bytes: optional number`

      Non-file backed huge pages mapped into user-space page tables

    - `memory_anon_pages_bytes: optional number`

      Non-file backed pages mapped into user-space page tables

    - `memory_available_bytes: optional number`

      Estimate of how much memory is available for starting new applications

    - `memory_bounce_bytes: optional number`

      Memory used for block device bounce buffers

    - `memory_buffers_bytes: optional number`

      Relatively temporary storage for raw disk blocks

    - `memory_cached_bytes: optional number`

      In-memory cache for files read from the disk

    - `memory_cma_free_bytes: optional number`

      Free CMA (Contiguous Memory Allocator) pages

    - `memory_cma_total_bytes: optional number`

      Total CMA (Contiguous Memory Allocator) pages

    - `memory_commit_limit_bytes: optional number`

      Total amount of memory currently available to be allocated on the system

    - `memory_committed_as_bytes: optional number`

      Amount of memory presently allocated on the system

    - `memory_dirty_bytes: optional number`

      Memory which is waiting to get written back to the disk

    - `memory_free_bytes: optional number`

      The sum of LowFree and HighFree

    - `memory_high_free_bytes: optional number`

      Amount of free highmem

    - `memory_high_total_bytes: optional number`

      Total amount of highmem

    - `memory_hugepages_free: optional number`

      The number of huge pages in the pool that are not yet allocated

    - `memory_hugepages_rsvd: optional number`

      Number of huge pages for which a commitment has been made, but no allocation has yet been made

    - `memory_hugepages_surp: optional number`

      Number of huge pages in the pool above the threshold

    - `memory_hugepages_total: optional number`

      The size of the pool of huge pages

    - `memory_hugepagesize_bytes: optional number`

      The size of huge pages

    - `memory_inactive_bytes: optional number`

      Memory which has been less recently used

    - `memory_k_reclaimable_bytes: optional number`

      Kernel allocations that the kernel will attempt to reclaim under memory pressure

    - `memory_kernel_stack_bytes: optional number`

      Amount of memory allocated to kernel stacks

    - `memory_low_free_bytes: optional number`

      Amount of free lowmem

    - `memory_low_total_bytes: optional number`

      Total amount of lowmem

    - `memory_mapped_bytes: optional number`

      Files which have been mapped into memory

    - `memory_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_per_cpu_bytes: optional number`

      Memory allocated to the per-cpu alloctor used to back per-cpu allocations

    - `memory_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `memory_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `memory_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `memory_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `memory_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `memory_pressure_some_300s: optional number`

      Percentage of time over a 5 minute window that some tasks were stalled

    - `memory_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `memory_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `memory_s_reclaimable_bytes: optional number`

      Part of slab that can be reclaimed on memory pressure

    - `memory_s_unreclaim_bytes: optional number`

      Part of slab that cannot be reclaimed on memory pressure

    - `memory_secondary_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_shmem_bytes: optional number`

      Amount of memory consumed by tmpfs

    - `memory_shmem_hugepages_bytes: optional number`

      Memory used by shmem and tmpfs, allocated with huge pages

    - `memory_shmem_pmd_mapped_bytes: optional number`

      Shared memory mapped into user space with huge pages

    - `memory_slab_bytes: optional number`

      In-kernel data structures cache

    - `memory_swap_cached_bytes: optional number`

      Memory swapped out and back in while still in swap file

    - `memory_swap_free_bytes: optional number`

      Amount of swap space that is currently unused

    - `memory_swap_total_bytes: optional number`

      Total amount of swap space available

    - `memory_total_bytes: optional number`

      Total usable RAM

    - `memory_vmalloc_chunk_bytes: optional number`

      Largest contiguous block of vmalloc area which is free

    - `memory_vmalloc_total_bytes: optional number`

      Total size of vmalloc memory area

    - `memory_vmalloc_used_bytes: optional number`

      Amount of vmalloc area which is used

    - `memory_writeback_bytes: optional number`

      Memory which is actively being written back to the disk

    - `memory_writeback_tmp_bytes: optional number`

      Memory used by FUSE for temporary writeback buffers

    - `memory_z_swap_bytes: optional number`

      Memory consumed by the zswap backend, compressed

    - `memory_z_swapped_bytes: optional number`

      Amount of anonymous memory stored in zswap, uncompressed

    - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

      - `file_system: string`

        File system on disk (EXT4, NTFS, etc.)

      - `kind: string`

        Kind of disk (HDD, SSD, etc.)

      - `mount_point: string`

        Path where disk is mounted

      - `name: string`

        Name of the disk mount

      - `available_bytes: optional number`

        Available disk size (bytes)

      - `available_inodes: optional number`

        Available inodes on filesystem

      - `is_read_only: optional boolean`

        Determines whether the disk is read-only

      - `is_removable: optional boolean`

        Determines whether the disk is removable

      - `total_bytes: optional number`

        Total disk size (bytes)

      - `total_inodes: optional number`

        Total inodes on filesystem

    - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

      - `name: string`

        Name of the network device

      - `recv_bytes: number`

        Total bytes received

      - `recv_compressed: number`

        Compressed packets received

      - `recv_drop: number`

        Packets dropped

      - `recv_errs: number`

        Bad packets received

      - `recv_fifo: number`

        FIFO overruns

      - `recv_frame: number`

        Frame alignment errors

      - `recv_multicast: number`

        Multicast packets received

      - `recv_packets: number`

        Total packets received

      - `sent_bytes: number`

        Total bytes transmitted

      - `sent_carrier: number`

        Number of packets not sent due to carrier errors

      - `sent_colls: number`

        Number of collisions

      - `sent_compressed: number`

        Number of compressed packets transmitted

      - `sent_drop: number`

        Number of packets dropped during transmission

      - `sent_errs: number`

        Number of transmission errors

      - `sent_fifo: number`

        FIFO overruns

      - `sent_packets: number`

        Total packets transmitted

    - `platform: optional string`

      Platform identifier

    - `snmp_icmp_in_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages received

    - `snmp_icmp_in_addr_masks: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_csum_errors: optional number`

      Number of ICMP messages received with bad checksums

    - `snmp_icmp_in_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages received

    - `snmp_icmp_in_echo_reps: optional number`

      Number of ICMP Echo Reply messages received

    - `snmp_icmp_in_echos: optional number`

      Number of ICMP Echo (request) messages received

    - `snmp_icmp_in_errors: optional number`

      Number of ICMP messages received with ICMP-specific errors

    - `snmp_icmp_in_msgs: optional number`

      Number of ICMP messages received

    - `snmp_icmp_in_parm_probs: optional number`

      Number of ICMP Parameter Problem messages received

    - `snmp_icmp_in_redirects: optional number`

      Number of ICMP Redirect messages received

    - `snmp_icmp_in_src_quenchs: optional number`

      Number of ICMP Source Quench messages received

    - `snmp_icmp_in_time_excds: optional number`

      Number of ICMP Time Exceeded messages received

    - `snmp_icmp_in_timestamp_reps: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_timestamps: optional number`

      Number of ICMP Timestamp (request) messages received

    - `snmp_icmp_out_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages sent

    - `snmp_icmp_out_addr_masks: optional number`

      Number of ICMP Address Mask Request messages sent

    - `snmp_icmp_out_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages sent

    - `snmp_icmp_out_echo_reps: optional number`

      Number of ICMP Echo Reply messages sent

    - `snmp_icmp_out_echos: optional number`

      Number of ICMP Echo (request) messages sent

    - `snmp_icmp_out_errors: optional number`

      Number of ICMP messages which this entity did not send due to ICMP-specific errors

    - `snmp_icmp_out_msgs: optional number`

      Number of ICMP messages attempted to send

    - `snmp_icmp_out_parm_probs: optional number`

      Number of ICMP Parameter Problem messages sent

    - `snmp_icmp_out_redirects: optional number`

      Number of ICMP Redirect messages sent

    - `snmp_icmp_out_src_quenchs: optional number`

      Number of ICMP Source Quench messages sent

    - `snmp_icmp_out_time_excds: optional number`

      Number of ICMP Time Exceeded messages sent

    - `snmp_icmp_out_timestamp_reps: optional number`

      Number of ICMP Timestamp Reply messages sent

    - `snmp_icmp_out_timestamps: optional number`

      Number of ICMP Timestamp (request) messages sent

    - `snmp_ip_default_ttl: optional number`

      Default value of the Time-To-Live field of the IP header

    - `snmp_ip_forw_datagrams: optional number`

      Number of datagrams forwarded to their final destination

    - `snmp_ip_forwarding_enabled: optional boolean`

      Set when acting as an IP gateway

    - `snmp_ip_frag_creates: optional number`

      Number of datagrams generated by fragmentation

    - `snmp_ip_frag_fails: optional number`

      Number of datagrams discarded because fragmentation failed

    - `snmp_ip_frag_oks: optional number`

      Number of datagrams successfully fragmented

    - `snmp_ip_in_addr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP address

    - `snmp_ip_in_delivers: optional number`

      Number of input datagrams successfully delivered to IP user-protocols

    - `snmp_ip_in_discards: optional number`

      Number of input datagrams otherwise discarded

    - `snmp_ip_in_hdr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP header

    - `snmp_ip_in_receives: optional number`

      Number of input datagrams received from interfaces

    - `snmp_ip_in_unknown_protos: optional number`

      Number of input datagrams discarded due unknown or unsupported protocol

    - `snmp_ip_out_discards: optional number`

      Number of output datagrams otherwise discarded

    - `snmp_ip_out_no_routes: optional number`

      Number of output datagrams discarded because no route matched

    - `snmp_ip_out_requests: optional number`

      Number of datagrams supplied for transmission

    - `snmp_ip_reasm_fails: optional number`

      Number of failures detected by the reassembly algorithm

    - `snmp_ip_reasm_oks: optional number`

      Number of datagrams successfully reassembled

    - `snmp_ip_reasm_reqds: optional number`

      Number of fragments received which needed to be reassembled

    - `snmp_ip_reasm_timeout: optional number`

      Number of seconds fragments are held while awaiting reassembly

    - `snmp_tcp_active_opens: optional number`

      Number of times TCP transitions to SYN-SENT from CLOSED

    - `snmp_tcp_attempt_fails: optional number`

      Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

    - `snmp_tcp_curr_estab: optional number`

      Number of TCP connections in ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_estab_resets: optional number`

      Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_in_csum_errors: optional number`

      Number of TCP segments received with checksum errors

    - `snmp_tcp_in_errs: optional number`

      Number of TCP segments received in error

    - `snmp_tcp_in_segs: optional number`

      Number of TCP segments received

    - `snmp_tcp_max_conn: optional number`

      Limit on the total number of TCP connections

    - `snmp_tcp_out_rsts: optional number`

      Number of TCP segments sent with RST flag

    - `snmp_tcp_out_segs: optional number`

      Number of TCP segments sent

    - `snmp_tcp_passive_opens: optional number`

      Number of times TCP transitions to SYN-RCVD from LISTEN

    - `snmp_tcp_retrans_segs: optional number`

      Number of TCP segments retransmitted

    - `snmp_tcp_rto_max: optional number`

      Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_tcp_rto_min: optional number`

      Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_udp_in_datagrams: optional number`

      Number of UDP datagrams delivered to UDP applications

    - `snmp_udp_in_errors: optional number`

      Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

    - `snmp_udp_no_ports: optional number`

      Number of UDP datagrams received for which there was not application at the destination port

    - `snmp_udp_out_datagrams: optional number`

      Number of UDP datagrams sent

    - `system_boot_time_s: optional number`

      Boottime of the system (seconds since the Unix epoch)

    - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

      - `label: string`

        Sensor identifier for the component

      - `critical_celcius: optional number`

        Critical failure temperature of the component (degrees Celsius)

      - `current_celcius: optional number`

        Current temperature of the component (degrees Celsius)

      - `max_celcius: optional number`

        Maximum temperature of the component (degrees Celsius)

    - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

      - `health_state: string`

        Name of tunnel health state (unknown, healthy, degraded, down)

      - `health_value: number`

        Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

      - `interface_name: string`

        The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

      - `tunnel_id: string`

        Tunnel identifier

      - `natd_result: optional string`

        Public socket address returned by the NAT detector

      - `natd_state: optional number`

        Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

      - `natd_target: optional string`

        Target socket address probed by the NAT detector, using the detector source port

      - `probed_mtu: optional number`

        MTU as measured between the two ends of the tunnel

      - `recent_healthy_pings: optional number`

        Number of recent healthy pings for this tunnel

      - `recent_unhealthy_pings: optional number`

        Number of recent unhealthy pings for this tunnel

    - `uptime_idle_ms: optional number`

      Sum of how much time each core has spent idle

    - `uptime_total_ms: optional number`

      Uptime of the system, including time spent in suspend

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots/latest \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "count_reclaim_failures": 0,
        "count_reclaimed_paths": 0,
        "count_record_failed": 0,
        "count_transmit_failures": 0,
        "t": 0,
        "v": "v",
        "bonds": [
          {
            "name": "name",
            "status": "status"
          }
        ],
        "cpu_count": 0,
        "cpu_pressure_10s": 0,
        "cpu_pressure_300s": 0,
        "cpu_pressure_60s": 0,
        "cpu_pressure_total_us": 0,
        "cpu_time_guest_ms": 0,
        "cpu_time_guest_nice_ms": 0,
        "cpu_time_idle_ms": 0,
        "cpu_time_iowait_ms": 0,
        "cpu_time_irq_ms": 0,
        "cpu_time_nice_ms": 0,
        "cpu_time_softirq_ms": 0,
        "cpu_time_steal_ms": 0,
        "cpu_time_system_ms": 0,
        "cpu_time_user_ms": 0,
        "delta": 0,
        "dhcp_leases": [
          {
            "client_id": "client_id",
            "expiry_time": 0,
            "hostname": "hostname",
            "interface_name": "interface_name",
            "ip_address": "ip_address",
            "mac_address": "mac_address"
          }
        ],
        "disks": [
          {
            "in_progress": 0,
            "major": 0,
            "merged": 0,
            "minor": 0,
            "name": "name",
            "reads": 0,
            "sectors_read": 0,
            "sectors_written": 0,
            "time_in_progress_ms": 0,
            "time_reading_ms": 0,
            "time_writing_ms": 0,
            "weighted_time_in_progress_ms": 0,
            "writes": 0,
            "writes_merged": 0,
            "discards": 0,
            "discards_merged": 0,
            "flushes": 0,
            "sectors_discarded": 0,
            "time_discarding_ms": 0,
            "time_flushing_ms": 0
          }
        ],
        "epsilon": 0,
        "ha_state": "ha_state",
        "ha_value": 0,
        "interfaces": [
          {
            "name": "name",
            "operstate": "operstate",
            "ip_addresses": [
              {
                "interface_name": "interface_name",
                "ip_address": "ip_address"
              }
            ],
            "speed": 0
          }
        ],
        "io_pressure_full_10s": 0,
        "io_pressure_full_300s": 0,
        "io_pressure_full_60s": 0,
        "io_pressure_full_total_us": 0,
        "io_pressure_some_10s": 0,
        "io_pressure_some_300s": 0,
        "io_pressure_some_60s": 0,
        "io_pressure_some_total_us": 0,
        "kernel_btime": 0,
        "kernel_ctxt": 0,
        "kernel_processes": 0,
        "kernel_processes_blocked": 0,
        "kernel_processes_running": 0,
        "load_average_15m": 0,
        "load_average_1m": 0,
        "load_average_5m": 0,
        "load_average_cur": 0,
        "load_average_max": 0,
        "memory_active_bytes": 0,
        "memory_anon_hugepages_bytes": 0,
        "memory_anon_pages_bytes": 0,
        "memory_available_bytes": 0,
        "memory_bounce_bytes": 0,
        "memory_buffers_bytes": 0,
        "memory_cached_bytes": 0,
        "memory_cma_free_bytes": 0,
        "memory_cma_total_bytes": 0,
        "memory_commit_limit_bytes": 0,
        "memory_committed_as_bytes": 0,
        "memory_dirty_bytes": 0,
        "memory_free_bytes": 0,
        "memory_high_free_bytes": 0,
        "memory_high_total_bytes": 0,
        "memory_hugepages_free": 0,
        "memory_hugepages_rsvd": 0,
        "memory_hugepages_surp": 0,
        "memory_hugepages_total": 0,
        "memory_hugepagesize_bytes": 0,
        "memory_inactive_bytes": 0,
        "memory_k_reclaimable_bytes": 0,
        "memory_kernel_stack_bytes": 0,
        "memory_low_free_bytes": 0,
        "memory_low_total_bytes": 0,
        "memory_mapped_bytes": 0,
        "memory_page_tables_bytes": 0,
        "memory_per_cpu_bytes": 0,
        "memory_pressure_full_10s": 0,
        "memory_pressure_full_300s": 0,
        "memory_pressure_full_60s": 0,
        "memory_pressure_full_total_us": 0,
        "memory_pressure_some_10s": 0,
        "memory_pressure_some_300s": 0,
        "memory_pressure_some_60s": 0,
        "memory_pressure_some_total_us": 0,
        "memory_s_reclaimable_bytes": 0,
        "memory_s_unreclaim_bytes": 0,
        "memory_secondary_page_tables_bytes": 0,
        "memory_shmem_bytes": 0,
        "memory_shmem_hugepages_bytes": 0,
        "memory_shmem_pmd_mapped_bytes": 0,
        "memory_slab_bytes": 0,
        "memory_swap_cached_bytes": 0,
        "memory_swap_free_bytes": 0,
        "memory_swap_total_bytes": 0,
        "memory_total_bytes": 0,
        "memory_vmalloc_chunk_bytes": 0,
        "memory_vmalloc_total_bytes": 0,
        "memory_vmalloc_used_bytes": 0,
        "memory_writeback_bytes": 0,
        "memory_writeback_tmp_bytes": 0,
        "memory_z_swap_bytes": 0,
        "memory_z_swapped_bytes": 0,
        "mounts": [
          {
            "file_system": "file_system",
            "kind": "kind",
            "mount_point": "mount_point",
            "name": "name",
            "available_bytes": 0,
            "available_inodes": 0,
            "is_read_only": true,
            "is_removable": true,
            "total_bytes": 0,
            "total_inodes": 0
          }
        ],
        "netdevs": [
          {
            "name": "name",
            "recv_bytes": 0,
            "recv_compressed": 0,
            "recv_drop": 0,
            "recv_errs": 0,
            "recv_fifo": 0,
            "recv_frame": 0,
            "recv_multicast": 0,
            "recv_packets": 0,
            "sent_bytes": 0,
            "sent_carrier": 0,
            "sent_colls": 0,
            "sent_compressed": 0,
            "sent_drop": 0,
            "sent_errs": 0,
            "sent_fifo": 0,
            "sent_packets": 0
          }
        ],
        "platform": "platform",
        "snmp_icmp_in_addr_mask_reps": 0,
        "snmp_icmp_in_addr_masks": 0,
        "snmp_icmp_in_csum_errors": 0,
        "snmp_icmp_in_dest_unreachs": 0,
        "snmp_icmp_in_echo_reps": 0,
        "snmp_icmp_in_echos": 0,
        "snmp_icmp_in_errors": 0,
        "snmp_icmp_in_msgs": 0,
        "snmp_icmp_in_parm_probs": 0,
        "snmp_icmp_in_redirects": 0,
        "snmp_icmp_in_src_quenchs": 0,
        "snmp_icmp_in_time_excds": 0,
        "snmp_icmp_in_timestamp_reps": 0,
        "snmp_icmp_in_timestamps": 0,
        "snmp_icmp_out_addr_mask_reps": 0,
        "snmp_icmp_out_addr_masks": 0,
        "snmp_icmp_out_dest_unreachs": 0,
        "snmp_icmp_out_echo_reps": 0,
        "snmp_icmp_out_echos": 0,
        "snmp_icmp_out_errors": 0,
        "snmp_icmp_out_msgs": 0,
        "snmp_icmp_out_parm_probs": 0,
        "snmp_icmp_out_redirects": 0,
        "snmp_icmp_out_src_quenchs": 0,
        "snmp_icmp_out_time_excds": 0,
        "snmp_icmp_out_timestamp_reps": 0,
        "snmp_icmp_out_timestamps": 0,
        "snmp_ip_default_ttl": 0,
        "snmp_ip_forw_datagrams": 0,
        "snmp_ip_forwarding_enabled": true,
        "snmp_ip_frag_creates": 0,
        "snmp_ip_frag_fails": 0,
        "snmp_ip_frag_oks": 0,
        "snmp_ip_in_addr_errors": 0,
        "snmp_ip_in_delivers": 0,
        "snmp_ip_in_discards": 0,
        "snmp_ip_in_hdr_errors": 0,
        "snmp_ip_in_receives": 0,
        "snmp_ip_in_unknown_protos": 0,
        "snmp_ip_out_discards": 0,
        "snmp_ip_out_no_routes": 0,
        "snmp_ip_out_requests": 0,
        "snmp_ip_reasm_fails": 0,
        "snmp_ip_reasm_oks": 0,
        "snmp_ip_reasm_reqds": 0,
        "snmp_ip_reasm_timeout": 0,
        "snmp_tcp_active_opens": 0,
        "snmp_tcp_attempt_fails": 0,
        "snmp_tcp_curr_estab": 0,
        "snmp_tcp_estab_resets": 0,
        "snmp_tcp_in_csum_errors": 0,
        "snmp_tcp_in_errs": 0,
        "snmp_tcp_in_segs": 0,
        "snmp_tcp_max_conn": 0,
        "snmp_tcp_out_rsts": 0,
        "snmp_tcp_out_segs": 0,
        "snmp_tcp_passive_opens": 0,
        "snmp_tcp_retrans_segs": 0,
        "snmp_tcp_rto_max": 0,
        "snmp_tcp_rto_min": 0,
        "snmp_udp_in_datagrams": 0,
        "snmp_udp_in_errors": 0,
        "snmp_udp_no_ports": 0,
        "snmp_udp_out_datagrams": 0,
        "system_boot_time_s": 0,
        "thermals": [
          {
            "label": "label",
            "critical_celcius": 0,
            "current_celcius": 0,
            "max_celcius": 0
          }
        ],
        "tunnels": [
          {
            "health_state": "health_state",
            "health_value": 0,
            "interface_name": "interface_name",
            "tunnel_id": "tunnel_id",
            "natd_result": "natd_result",
            "natd_state": 0,
            "natd_target": "natd_target",
            "probed_mtu": 0,
            "recent_healthy_pings": 0,
            "recent_unhealthy_pings": 0
          }
        ],
        "uptime_idle_ms": 0,
        "uptime_total_ms": 0
      }
    ]
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Latest List Response

- `LatestListResponse object { count, items }`

  - `count: number`

  - `items: array of object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

    - `count_reclaim_failures: number`

      Count of failures to reclaim space

    - `count_reclaimed_paths: number`

      Count of reclaimed paths

    - `count_record_failed: number`

      Count of failed snapshot recordings

    - `count_transmit_failures: number`

      Count of failed snapshot transmissions

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

    - `v: string`

      Version

    - `bonds: optional array of object { name, status }`

      - `name: string`

        Name of the network interface

      - `status: string`

        Current status of the network interface

    - `cpu_count: optional number`

      Count of processors/cores

    - `cpu_pressure_10s: optional number`

      Percentage of time over a 10 second window that tasks were stalled

    - `cpu_pressure_300s: optional number`

      Percentage of time over a 5 minute window that tasks were stalled

    - `cpu_pressure_60s: optional number`

      Percentage of time over a 1 minute window that tasks were stalled

    - `cpu_pressure_total_us: optional number`

      Total stall time (microseconds)

    - `cpu_time_guest_ms: optional number`

      Time spent running a virtual CPU or guest OS (milliseconds)

    - `cpu_time_guest_nice_ms: optional number`

      Time spent running a niced guest (milliseconds)

    - `cpu_time_idle_ms: optional number`

      Time spent in idle state (milliseconds)

    - `cpu_time_iowait_ms: optional number`

      Time spent wait for I/O to complete (milliseconds)

    - `cpu_time_irq_ms: optional number`

      Time spent servicing interrupts (milliseconds)

    - `cpu_time_nice_ms: optional number`

      Time spent in low-priority user mode (milliseconds)

    - `cpu_time_softirq_ms: optional number`

      Time spent servicing softirqs (milliseconds)

    - `cpu_time_steal_ms: optional number`

      Time stolen (milliseconds)

    - `cpu_time_system_ms: optional number`

      Time spent in system mode (milliseconds)

    - `cpu_time_user_ms: optional number`

      Time spent in user mode (milliseconds)

    - `delta: optional number`

      Number of network operations applied during state transition

    - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

      - `client_id: string`

        Client ID of the device the IP Address was leased to

      - `expiry_time: number`

        Expiry time of the DHCP lease (seconds since the Unix epoch)

      - `hostname: string`

        Hostname of the device the IP Address was leased to

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP Address that was leased

      - `mac_address: string`

        MAC Address of the device the IP Address was leased to

    - `disks: optional array of object { in_progress, major, merged, 17 more }`

      - `in_progress: number`

        I/Os currently in progress

      - `major: number`

        Device major number

      - `merged: number`

        Reads merged

      - `minor: number`

        Device minor number

      - `name: string`

        Device name

      - `reads: number`

        Reads completed successfully

      - `sectors_read: number`

        Sectors read successfully

      - `sectors_written: number`

        Sectors written successfully

      - `time_in_progress_ms: number`

        Time spent doing I/Os (milliseconds)

      - `time_reading_ms: number`

        Time spent reading (milliseconds)

      - `time_writing_ms: number`

        Time spent writing (milliseconds)

      - `weighted_time_in_progress_ms: number`

        Weighted time spent doing I/Os (milliseconds)

      - `writes: number`

        Writes completed

      - `writes_merged: number`

        Writes merged

      - `discards: optional number`

        Discards completed successfully

      - `discards_merged: optional number`

        Discards merged

      - `flushes: optional number`

        Flushes completed successfully

      - `sectors_discarded: optional number`

        Sectors discarded

      - `time_discarding_ms: optional number`

        Time spent discarding (milliseconds)

      - `time_flushing_ms: optional number`

        Time spent flushing (milliseconds)

    - `epsilon: optional number`

      Simulated number of network operations applied during state transition

    - `ha_state: optional string`

      Name of high availability state

    - `ha_value: optional number`

      Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

    - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

      - `name: string`

        Name of the network interface

      - `operstate: string`

        UP/DOWN state of the network interface

      - `ip_addresses: optional array of object { interface_name, ip_address }`

        - `interface_name: string`

          Name of the network interface

        - `ip_address: string`

          IP address of the network interface

      - `speed: optional number`

        Speed of the network interface (bits per second)

    - `io_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `io_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `io_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `io_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `io_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `io_pressure_some_300s: optional number`

      Percentage of time over a 3 minute window that some tasks were stalled

    - `io_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `io_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `kernel_btime: optional number`

      Boot time (seconds since Unix epoch)

    - `kernel_ctxt: optional number`

      Number of context switches that the system underwent

    - `kernel_processes: optional number`

      Number of forks since boot

    - `kernel_processes_blocked: optional number`

      Number of processes blocked waiting for I/O

    - `kernel_processes_running: optional number`

      Number of processes in runnable state

    - `load_average_15m: optional number`

      The fifteen-minute load average

    - `load_average_1m: optional number`

      The one-minute load average

    - `load_average_5m: optional number`

      The five-minute load average

    - `load_average_cur: optional number`

      Number of currently runnable kernel scheduling entities

    - `load_average_max: optional number`

      Number of kernel scheduling entities that currently exist on the system

    - `memory_active_bytes: optional number`

      Memory that has been used more recently

    - `memory_anon_hugepages_bytes: optional number`

      Non-file backed huge pages mapped into user-space page tables

    - `memory_anon_pages_bytes: optional number`

      Non-file backed pages mapped into user-space page tables

    - `memory_available_bytes: optional number`

      Estimate of how much memory is available for starting new applications

    - `memory_bounce_bytes: optional number`

      Memory used for block device bounce buffers

    - `memory_buffers_bytes: optional number`

      Relatively temporary storage for raw disk blocks

    - `memory_cached_bytes: optional number`

      In-memory cache for files read from the disk

    - `memory_cma_free_bytes: optional number`

      Free CMA (Contiguous Memory Allocator) pages

    - `memory_cma_total_bytes: optional number`

      Total CMA (Contiguous Memory Allocator) pages

    - `memory_commit_limit_bytes: optional number`

      Total amount of memory currently available to be allocated on the system

    - `memory_committed_as_bytes: optional number`

      Amount of memory presently allocated on the system

    - `memory_dirty_bytes: optional number`

      Memory which is waiting to get written back to the disk

    - `memory_free_bytes: optional number`

      The sum of LowFree and HighFree

    - `memory_high_free_bytes: optional number`

      Amount of free highmem

    - `memory_high_total_bytes: optional number`

      Total amount of highmem

    - `memory_hugepages_free: optional number`

      The number of huge pages in the pool that are not yet allocated

    - `memory_hugepages_rsvd: optional number`

      Number of huge pages for which a commitment has been made, but no allocation has yet been made

    - `memory_hugepages_surp: optional number`

      Number of huge pages in the pool above the threshold

    - `memory_hugepages_total: optional number`

      The size of the pool of huge pages

    - `memory_hugepagesize_bytes: optional number`

      The size of huge pages

    - `memory_inactive_bytes: optional number`

      Memory which has been less recently used

    - `memory_k_reclaimable_bytes: optional number`

      Kernel allocations that the kernel will attempt to reclaim under memory pressure

    - `memory_kernel_stack_bytes: optional number`

      Amount of memory allocated to kernel stacks

    - `memory_low_free_bytes: optional number`

      Amount of free lowmem

    - `memory_low_total_bytes: optional number`

      Total amount of lowmem

    - `memory_mapped_bytes: optional number`

      Files which have been mapped into memory

    - `memory_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_per_cpu_bytes: optional number`

      Memory allocated to the per-cpu alloctor used to back per-cpu allocations

    - `memory_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `memory_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `memory_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `memory_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `memory_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `memory_pressure_some_300s: optional number`

      Percentage of time over a 5 minute window that some tasks were stalled

    - `memory_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `memory_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `memory_s_reclaimable_bytes: optional number`

      Part of slab that can be reclaimed on memory pressure

    - `memory_s_unreclaim_bytes: optional number`

      Part of slab that cannot be reclaimed on memory pressure

    - `memory_secondary_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_shmem_bytes: optional number`

      Amount of memory consumed by tmpfs

    - `memory_shmem_hugepages_bytes: optional number`

      Memory used by shmem and tmpfs, allocated with huge pages

    - `memory_shmem_pmd_mapped_bytes: optional number`

      Shared memory mapped into user space with huge pages

    - `memory_slab_bytes: optional number`

      In-kernel data structures cache

    - `memory_swap_cached_bytes: optional number`

      Memory swapped out and back in while still in swap file

    - `memory_swap_free_bytes: optional number`

      Amount of swap space that is currently unused

    - `memory_swap_total_bytes: optional number`

      Total amount of swap space available

    - `memory_total_bytes: optional number`

      Total usable RAM

    - `memory_vmalloc_chunk_bytes: optional number`

      Largest contiguous block of vmalloc area which is free

    - `memory_vmalloc_total_bytes: optional number`

      Total size of vmalloc memory area

    - `memory_vmalloc_used_bytes: optional number`

      Amount of vmalloc area which is used

    - `memory_writeback_bytes: optional number`

      Memory which is actively being written back to the disk

    - `memory_writeback_tmp_bytes: optional number`

      Memory used by FUSE for temporary writeback buffers

    - `memory_z_swap_bytes: optional number`

      Memory consumed by the zswap backend, compressed

    - `memory_z_swapped_bytes: optional number`

      Amount of anonymous memory stored in zswap, uncompressed

    - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

      - `file_system: string`

        File system on disk (EXT4, NTFS, etc.)

      - `kind: string`

        Kind of disk (HDD, SSD, etc.)

      - `mount_point: string`

        Path where disk is mounted

      - `name: string`

        Name of the disk mount

      - `available_bytes: optional number`

        Available disk size (bytes)

      - `available_inodes: optional number`

        Available inodes on filesystem

      - `is_read_only: optional boolean`

        Determines whether the disk is read-only

      - `is_removable: optional boolean`

        Determines whether the disk is removable

      - `total_bytes: optional number`

        Total disk size (bytes)

      - `total_inodes: optional number`

        Total inodes on filesystem

    - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

      - `name: string`

        Name of the network device

      - `recv_bytes: number`

        Total bytes received

      - `recv_compressed: number`

        Compressed packets received

      - `recv_drop: number`

        Packets dropped

      - `recv_errs: number`

        Bad packets received

      - `recv_fifo: number`

        FIFO overruns

      - `recv_frame: number`

        Frame alignment errors

      - `recv_multicast: number`

        Multicast packets received

      - `recv_packets: number`

        Total packets received

      - `sent_bytes: number`

        Total bytes transmitted

      - `sent_carrier: number`

        Number of packets not sent due to carrier errors

      - `sent_colls: number`

        Number of collisions

      - `sent_compressed: number`

        Number of compressed packets transmitted

      - `sent_drop: number`

        Number of packets dropped during transmission

      - `sent_errs: number`

        Number of transmission errors

      - `sent_fifo: number`

        FIFO overruns

      - `sent_packets: number`

        Total packets transmitted

    - `platform: optional string`

      Platform identifier

    - `snmp_icmp_in_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages received

    - `snmp_icmp_in_addr_masks: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_csum_errors: optional number`

      Number of ICMP messages received with bad checksums

    - `snmp_icmp_in_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages received

    - `snmp_icmp_in_echo_reps: optional number`

      Number of ICMP Echo Reply messages received

    - `snmp_icmp_in_echos: optional number`

      Number of ICMP Echo (request) messages received

    - `snmp_icmp_in_errors: optional number`

      Number of ICMP messages received with ICMP-specific errors

    - `snmp_icmp_in_msgs: optional number`

      Number of ICMP messages received

    - `snmp_icmp_in_parm_probs: optional number`

      Number of ICMP Parameter Problem messages received

    - `snmp_icmp_in_redirects: optional number`

      Number of ICMP Redirect messages received

    - `snmp_icmp_in_src_quenchs: optional number`

      Number of ICMP Source Quench messages received

    - `snmp_icmp_in_time_excds: optional number`

      Number of ICMP Time Exceeded messages received

    - `snmp_icmp_in_timestamp_reps: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_timestamps: optional number`

      Number of ICMP Timestamp (request) messages received

    - `snmp_icmp_out_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages sent

    - `snmp_icmp_out_addr_masks: optional number`

      Number of ICMP Address Mask Request messages sent

    - `snmp_icmp_out_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages sent

    - `snmp_icmp_out_echo_reps: optional number`

      Number of ICMP Echo Reply messages sent

    - `snmp_icmp_out_echos: optional number`

      Number of ICMP Echo (request) messages sent

    - `snmp_icmp_out_errors: optional number`

      Number of ICMP messages which this entity did not send due to ICMP-specific errors

    - `snmp_icmp_out_msgs: optional number`

      Number of ICMP messages attempted to send

    - `snmp_icmp_out_parm_probs: optional number`

      Number of ICMP Parameter Problem messages sent

    - `snmp_icmp_out_redirects: optional number`

      Number of ICMP Redirect messages sent

    - `snmp_icmp_out_src_quenchs: optional number`

      Number of ICMP Source Quench messages sent

    - `snmp_icmp_out_time_excds: optional number`

      Number of ICMP Time Exceeded messages sent

    - `snmp_icmp_out_timestamp_reps: optional number`

      Number of ICMP Timestamp Reply messages sent

    - `snmp_icmp_out_timestamps: optional number`

      Number of ICMP Timestamp (request) messages sent

    - `snmp_ip_default_ttl: optional number`

      Default value of the Time-To-Live field of the IP header

    - `snmp_ip_forw_datagrams: optional number`

      Number of datagrams forwarded to their final destination

    - `snmp_ip_forwarding_enabled: optional boolean`

      Set when acting as an IP gateway

    - `snmp_ip_frag_creates: optional number`

      Number of datagrams generated by fragmentation

    - `snmp_ip_frag_fails: optional number`

      Number of datagrams discarded because fragmentation failed

    - `snmp_ip_frag_oks: optional number`

      Number of datagrams successfully fragmented

    - `snmp_ip_in_addr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP address

    - `snmp_ip_in_delivers: optional number`

      Number of input datagrams successfully delivered to IP user-protocols

    - `snmp_ip_in_discards: optional number`

      Number of input datagrams otherwise discarded

    - `snmp_ip_in_hdr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP header

    - `snmp_ip_in_receives: optional number`

      Number of input datagrams received from interfaces

    - `snmp_ip_in_unknown_protos: optional number`

      Number of input datagrams discarded due unknown or unsupported protocol

    - `snmp_ip_out_discards: optional number`

      Number of output datagrams otherwise discarded

    - `snmp_ip_out_no_routes: optional number`

      Number of output datagrams discarded because no route matched

    - `snmp_ip_out_requests: optional number`

      Number of datagrams supplied for transmission

    - `snmp_ip_reasm_fails: optional number`

      Number of failures detected by the reassembly algorithm

    - `snmp_ip_reasm_oks: optional number`

      Number of datagrams successfully reassembled

    - `snmp_ip_reasm_reqds: optional number`

      Number of fragments received which needed to be reassembled

    - `snmp_ip_reasm_timeout: optional number`

      Number of seconds fragments are held while awaiting reassembly

    - `snmp_tcp_active_opens: optional number`

      Number of times TCP transitions to SYN-SENT from CLOSED

    - `snmp_tcp_attempt_fails: optional number`

      Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

    - `snmp_tcp_curr_estab: optional number`

      Number of TCP connections in ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_estab_resets: optional number`

      Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_in_csum_errors: optional number`

      Number of TCP segments received with checksum errors

    - `snmp_tcp_in_errs: optional number`

      Number of TCP segments received in error

    - `snmp_tcp_in_segs: optional number`

      Number of TCP segments received

    - `snmp_tcp_max_conn: optional number`

      Limit on the total number of TCP connections

    - `snmp_tcp_out_rsts: optional number`

      Number of TCP segments sent with RST flag

    - `snmp_tcp_out_segs: optional number`

      Number of TCP segments sent

    - `snmp_tcp_passive_opens: optional number`

      Number of times TCP transitions to SYN-RCVD from LISTEN

    - `snmp_tcp_retrans_segs: optional number`

      Number of TCP segments retransmitted

    - `snmp_tcp_rto_max: optional number`

      Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_tcp_rto_min: optional number`

      Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_udp_in_datagrams: optional number`

      Number of UDP datagrams delivered to UDP applications

    - `snmp_udp_in_errors: optional number`

      Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

    - `snmp_udp_no_ports: optional number`

      Number of UDP datagrams received for which there was not application at the destination port

    - `snmp_udp_out_datagrams: optional number`

      Number of UDP datagrams sent

    - `system_boot_time_s: optional number`

      Boottime of the system (seconds since the Unix epoch)

    - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

      - `label: string`

        Sensor identifier for the component

      - `critical_celcius: optional number`

        Critical failure temperature of the component (degrees Celsius)

      - `current_celcius: optional number`

        Current temperature of the component (degrees Celsius)

      - `max_celcius: optional number`

        Maximum temperature of the component (degrees Celsius)

    - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

      - `health_state: string`

        Name of tunnel health state (unknown, healthy, degraded, down)

      - `health_value: number`

        Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

      - `interface_name: string`

        The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

      - `tunnel_id: string`

        Tunnel identifier

      - `natd_result: optional string`

        Public socket address returned by the NAT detector

      - `natd_state: optional number`

        Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

      - `natd_target: optional string`

        Target socket address probed by the NAT detector, using the detector source port

      - `probed_mtu: optional number`

        MTU as measured between the two ends of the tunnel

      - `recent_healthy_pings: optional number`

        Number of recent healthy pings for this tunnel

      - `recent_unhealthy_pings: optional number`

        Number of recent unhealthy pings for this tunnel

    - `uptime_idle_ms: optional number`

      Sum of how much time each core has spent idle

    - `uptime_total_ms: optional number`

      Uptime of the system, including time spent in suspend
