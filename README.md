# gatsby-source-hubspot-forms

[![npm version](https://badge.fury.io/js/gatsby-source-hubspot.svg)](https://badge.fury.io/js/gatsby-source-hubspot)

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
