const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const axios = require("axios")
const crypto = require("crypto")
var fs = require("fs")

exports.sourceNodes = async ({ actions }, configOptions) => {
  const API_KEY = configOptions.apiKey
  if (!API_KEY) throw new Error("No Hubspot API key provided")
  try {
    const { createNode } = actions
    const fetchAllFormNodes = await axios.get(
      `https://api.hubapi.com/forms/v2/forms`,
        {headers: {Authorization: `Bearer ${API_KEY}`}}
    )
    const response = await fetchAllFormNodes.data

    response.map((item, index) => {
      const formNode = {
        id: item.guid,
        children: [],
        parent: `__SOURCE__`,
        internal: {
          type: `HubspotForm`,
        },
        ...item
      }
      console.log(`Creating Hubspot Form: ${item.name}`)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(formNode))
        .digest(`hex`)
      formNode.internal.contentDigest = contentDigest
      createNode(formNode)
    })
  } catch (err) {
    throw new Error(err)
  }
}
