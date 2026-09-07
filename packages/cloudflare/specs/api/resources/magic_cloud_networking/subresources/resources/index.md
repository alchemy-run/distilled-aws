# Resources

## List Resources

**get** `/accounts/{account_id}/magic/cloud/resources`

List resources in the Resource Catalog (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `cloudflare: optional boolean`

- `desc: optional boolean`

- `managed: optional boolean`

- `order_by: optional string`

  One of ["id", "resource_type", "region"].

- `page: optional number`

- `per_page: optional number`

- `provider_id: optional string`

- `region: optional string`

- `resource_group: optional string`

- `resource_id: optional array of string`

- `resource_type: optional array of "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

  - `"aws_customer_gateway"`

  - `"aws_egress_only_internet_gateway"`

  - `"aws_internet_gateway"`

  - `"aws_instance"`

  - `"aws_network_interface"`

  - `"aws_route"`

  - `"aws_route_table"`

  - `"aws_route_table_association"`

  - `"aws_subnet"`

  - `"aws_vpc"`

  - `"aws_vpc_ipv4_cidr_block_association"`

  - `"aws_vpn_connection"`

  - `"aws_vpn_connection_route"`

  - `"aws_vpn_gateway"`

  - `"aws_security_group"`

  - `"aws_vpc_security_group_ingress_rule"`

  - `"aws_vpc_security_group_egress_rule"`

  - `"aws_ec2_managed_prefix_list"`

  - `"aws_ec2_transit_gateway"`

  - `"aws_ec2_transit_gateway_prefix_list_reference"`

  - `"aws_ec2_transit_gateway_vpc_attachment"`

  - `"azurerm_application_security_group"`

  - `"azurerm_lb"`

  - `"azurerm_lb_backend_address_pool"`

  - `"azurerm_lb_nat_pool"`

  - `"azurerm_lb_nat_rule"`

  - `"azurerm_lb_rule"`

  - `"azurerm_local_network_gateway"`

  - `"azurerm_network_interface"`

  - `"azurerm_network_interface_application_security_group_association"`

  - `"azurerm_network_interface_backend_address_pool_association"`

  - `"azurerm_network_interface_security_group_association"`

  - `"azurerm_network_security_group"`

  - `"azurerm_public_ip"`

  - `"azurerm_route"`

  - `"azurerm_route_table"`

  - `"azurerm_subnet"`

  - `"azurerm_subnet_route_table_association"`

  - `"azurerm_virtual_machine"`

  - `"azurerm_virtual_network_gateway_connection"`

  - `"azurerm_virtual_network"`

  - `"azurerm_virtual_network_gateway"`

  - `"google_compute_network"`

  - `"google_compute_subnetwork"`

  - `"google_compute_vpn_gateway"`

  - `"google_compute_vpn_tunnel"`

  - `"google_compute_route"`

  - `"google_compute_address"`

  - `"google_compute_global_address"`

  - `"google_compute_router"`

  - `"google_compute_interconnect_attachment"`

  - `"google_compute_ha_vpn_gateway"`

  - `"google_compute_forwarding_rule"`

  - `"google_compute_network_firewall_policy"`

  - `"google_compute_network_firewall_policy_rule"`

  - `"cloudflare_static_route"`

  - `"cloudflare_ipsec_tunnel"`

- `search: optional array of string`

- `v2: optional boolean`

### Returns

- `errors: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `result: array of object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

    The number of items in the current result set.

  - `page: number`

    The current page (starts from zero).

  - `per_page: number`

    The maximum number of items per page.

  - `total_count: number`

    The total number of items in the entire result set.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "account_id": "account_id",
      "cloud_type": "AWS",
      "config": {
        "foo": "bar"
      },
      "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "managed": true,
      "monthly_cost_estimate": {
        "currency": "currency",
        "monthly_cost": 0
      },
      "name": "name",
      "native_id": "native_id",
      "observations": {
        "foo": {
          "first_observed_at": "first_observed_at",
          "last_observed_at": "last_observed_at",
          "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        }
      },
      "provider_ids": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "provider_names_by_id": {
        "foo": "string"
      },
      "region": "region",
      "resource_group": "resource_group",
      "resource_type": "aws_customer_gateway",
      "sections": [
        {
          "hidden_items": [
            {
              "helpText": "helpText",
              "name": "name",
              "value": {
                "item_type": "item_type",
                "string": "string"
              }
            }
          ],
          "name": "name",
          "visible_items": [
            {
              "helpText": "helpText",
              "name": "name",
              "value": {
                "item_type": "item_type",
                "string": "string"
              }
            }
          ],
          "help_text": "help_text"
        }
      ],
      "state": {
        "foo": "bar"
      },
      "tags": {
        "foo": "string"
      },
      "updated_at": "updated_at",
      "url": "url",
      "managed_by": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
          "name": "name"
        }
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 200
  }
}
```

## Read Resource

**get** `/accounts/{account_id}/magic/cloud/resources/{resource_id}`

Read an resource from the Resource Catalog (Closed Beta).

### Path Parameters

- `account_id: string`

- `resource_id: string`

### Query Parameters

- `v2: optional boolean`

### Returns

- `errors: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `result: object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/$RESOURCE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_id": "account_id",
    "cloud_type": "AWS",
    "config": {
      "foo": "bar"
    },
    "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "managed": true,
    "monthly_cost_estimate": {
      "currency": "currency",
      "monthly_cost": 0
    },
    "name": "name",
    "native_id": "native_id",
    "observations": {
      "foo": {
        "first_observed_at": "first_observed_at",
        "last_observed_at": "last_observed_at",
        "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    },
    "provider_ids": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "provider_names_by_id": {
      "foo": "string"
    },
    "region": "region",
    "resource_group": "resource_group",
    "resource_type": "aws_customer_gateway",
    "sections": [
      {
        "hidden_items": [
          {
            "helpText": "helpText",
            "name": "name",
            "value": {
              "item_type": "item_type",
              "string": "string"
            }
          }
        ],
        "name": "name",
        "visible_items": [
          {
            "helpText": "helpText",
            "name": "name",
            "value": {
              "item_type": "item_type",
              "string": "string"
            }
          }
        ],
        "help_text": "help_text"
      }
    ],
    "state": {
      "foo": "bar"
    },
    "tags": {
      "foo": "string"
    },
    "updated_at": "updated_at",
    "url": "url",
    "managed_by": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
        "name": "name"
      }
    ]
  },
  "success": true
}
```

## Export Resources

**get** `/accounts/{account_id}/magic/cloud/resources/export`

Export resources in the Resource Catalog as a JSON file (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `desc: optional boolean`

- `order_by: optional string`

  One of ["id", "resource_type", "region"].

- `provider_id: optional string`

- `region: optional string`

- `resource_group: optional string`

- `resource_id: optional array of string`

- `resource_type: optional array of "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

  - `"aws_customer_gateway"`

  - `"aws_egress_only_internet_gateway"`

  - `"aws_internet_gateway"`

  - `"aws_instance"`

  - `"aws_network_interface"`

  - `"aws_route"`

  - `"aws_route_table"`

  - `"aws_route_table_association"`

  - `"aws_subnet"`

  - `"aws_vpc"`

  - `"aws_vpc_ipv4_cidr_block_association"`

  - `"aws_vpn_connection"`

  - `"aws_vpn_connection_route"`

  - `"aws_vpn_gateway"`

  - `"aws_security_group"`

  - `"aws_vpc_security_group_ingress_rule"`

  - `"aws_vpc_security_group_egress_rule"`

  - `"aws_ec2_managed_prefix_list"`

  - `"aws_ec2_transit_gateway"`

  - `"aws_ec2_transit_gateway_prefix_list_reference"`

  - `"aws_ec2_transit_gateway_vpc_attachment"`

  - `"azurerm_application_security_group"`

  - `"azurerm_lb"`

  - `"azurerm_lb_backend_address_pool"`

  - `"azurerm_lb_nat_pool"`

  - `"azurerm_lb_nat_rule"`

  - `"azurerm_lb_rule"`

  - `"azurerm_local_network_gateway"`

  - `"azurerm_network_interface"`

  - `"azurerm_network_interface_application_security_group_association"`

  - `"azurerm_network_interface_backend_address_pool_association"`

  - `"azurerm_network_interface_security_group_association"`

  - `"azurerm_network_security_group"`

  - `"azurerm_public_ip"`

  - `"azurerm_route"`

  - `"azurerm_route_table"`

  - `"azurerm_subnet"`

  - `"azurerm_subnet_route_table_association"`

  - `"azurerm_virtual_machine"`

  - `"azurerm_virtual_network_gateway_connection"`

  - `"azurerm_virtual_network"`

  - `"azurerm_virtual_network_gateway"`

  - `"google_compute_network"`

  - `"google_compute_subnetwork"`

  - `"google_compute_vpn_gateway"`

  - `"google_compute_vpn_tunnel"`

  - `"google_compute_route"`

  - `"google_compute_address"`

  - `"google_compute_global_address"`

  - `"google_compute_router"`

  - `"google_compute_interconnect_attachment"`

  - `"google_compute_ha_vpn_gateway"`

  - `"google_compute_forwarding_rule"`

  - `"google_compute_network_firewall_policy"`

  - `"google_compute_network_firewall_policy_rule"`

  - `"cloudflare_static_route"`

  - `"cloudflare_ipsec_tunnel"`

- `search: optional array of string`

- `v2: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/export \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Preview Rego Query

**post** `/accounts/{account_id}/magic/cloud/resources/policy-preview`

Preview Rego query result against the latest resource catalog (Closed Beta).

### Path Parameters

- `account_id: string`

### Body Parameters

- `policy: string`

### Returns

- `errors: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `result: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/policy-preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "policy": "policy"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "result": "result",
  "success": true
}
```

## Domain Types

### Resource List Response

- `ResourceListResponse object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

### Resource Get Response

- `ResourceGetResponse object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

### Resource Policy Preview Response

- `ResourcePolicyPreviewResponse = string`
