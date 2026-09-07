# Categories

## List categories

**get** `/accounts/{account_id}/gateway/categories`

List all categories.

### Path Parameters

- `account_id: string`

  Provide the identifier string.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of Category`

  - `id: optional number`

    Identify this category. Only one category per ID.

  - `beta: optional boolean`

    Indicate whether the category is in beta and subject to change.

  - `class: optional "free" or "premium" or "blocked" or 2 more`

    Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

    - `"free"`

    - `"premium"`

    - `"blocked"`

    - `"removalPending"`

    - `"noBlock"`

  - `description: optional string`

    Provide a short summary of domains in the category.

  - `name: optional string`

    Specify the category name.

  - `subcategories: optional array of object { id, beta, class, 2 more }`

    Provide all subcategories for this category.

    - `id: optional number`

      Identify this category. Only one category per ID.

    - `beta: optional boolean`

      Indicate whether the category is in beta and subject to change.

    - `class: optional "free" or "premium" or "blocked" or 2 more`

      Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

      - `"free"`

      - `"premium"`

      - `"blocked"`

      - `"removalPending"`

      - `"noBlock"`

    - `description: optional string`

      Provide a short summary of domains in the category.

    - `name: optional string`

      Specify the category name.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": 0,
      "beta": false,
      "class": "premium",
      "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
      "name": "Education",
      "subcategories": [
        {
          "id": 0,
          "beta": false,
          "class": "premium",
          "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
          "name": "Education"
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Category

- `Category object { id, beta, class, 3 more }`

  - `id: optional number`

    Identify this category. Only one category per ID.

  - `beta: optional boolean`

    Indicate whether the category is in beta and subject to change.

  - `class: optional "free" or "premium" or "blocked" or 2 more`

    Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

    - `"free"`

    - `"premium"`

    - `"blocked"`

    - `"removalPending"`

    - `"noBlock"`

  - `description: optional string`

    Provide a short summary of domains in the category.

  - `name: optional string`

    Specify the category name.

  - `subcategories: optional array of object { id, beta, class, 2 more }`

    Provide all subcategories for this category.

    - `id: optional number`

      Identify this category. Only one category per ID.

    - `beta: optional boolean`

      Indicate whether the category is in beta and subject to change.

    - `class: optional "free" or "premium" or "blocked" or 2 more`

      Specify which account types can create policies for this category. `blocked` Blocks unconditionally for all accounts. `removalPending` Allows removal from policies but disables addition. `noBlock` Prevents blocking.

      - `"free"`

      - `"premium"`

      - `"blocked"`

      - `"removalPending"`

      - `"noBlock"`

    - `description: optional string`

      Provide a short summary of domains in the category.

    - `name: optional string`

      Specify the category name.
