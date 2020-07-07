# gatsby-source-hubspot-forms

This source plugin for Gatsby will provide you with a skeleton of your created hubspot forms in graphql queries

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
        apKey: "YOUR_HUBSPOT_API_KEY",
      },
    },
  ],
}
```
