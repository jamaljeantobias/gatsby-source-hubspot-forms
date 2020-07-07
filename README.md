# gatsby-source-hubspot-forms

This source plugin for Gatsby will provide you with the associated fields for each applicable form created in Hubspot.

## Installation

```sh
# Install the plugin
npm i gatsby-source-hubspot-forms
```

## Configuration

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-hubspot-forms",
      options: {
        apiKey: "YOUR_HUBSPOT_API_KEY",
      },
    },
  ],
}
```

## Querying Hubspot Forms

Once the plugin is configured, two new queries are available in GraphQL: `allHubspotForm` and `HubspotForm`.

Here’s an example query to load 10 forms:

```gql
query HubSpotFormQuery {
  allHubspotForms(limit: 10) {
    edges {
      node {
        portalId
        name
        submitText
        redirect
        formFieldGroups {
          fields {
            label
            name
            required
            fieldType
          }
        }
      }
    }
  }
}
```

See the [Hubspot forms API docs](https://legacydocs.hubspot.com/docs/methods/forms/v2/get_forms) or the GraphiQL UI for info on all returned fields.
