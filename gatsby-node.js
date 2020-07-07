const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const axios = require("axios")
const crypto = require("crypto")
var fs = require("fs")

exports.sourceNodes = async ({ boundActionCreators }, configOptions) => {
  try {
    const API_KEY = configOptions.apiKey
    if (!API_KEY) throw new Error("No Hubspot API key provided")
    const { createNode } = boundActionCreators
    const fetchAllFormNodes = await axios.get(
      `https://api.hubapi.com/forms/v2/forms?hapikey=${API_KEY}`
    )
    const response = await fetchAllFormNodes.data

    response.map((item, index) => {
      const formNode = {
        id: item.portalId.toString(),
        portalId: item.portalId.toString(),
        guid: item.guid,
        name: item.name,
        action: item.action,
        method: item.method,
        cssClass: item.cssClass,
        redirect: item.redirect,
        submitText: item.submitText,
        followUpId: item.followUpId,
        notifyRecipients: item.notifyRecipients,
        leadNurturingCampaignId: item.leadNurturingCampaignId,
        formFieldGroups: item.formFieldGroups,
        children: [],
        parent: `__SOURCE__`,
        internal: {
          type: `hubspotForms`,
        },
      }
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(formNode))
        .digest(`hex`)
      formNode.internal.contentDigest = contentDigest
      createNode(formNode)
    })
    return
  } catch (err) {
    throw new Error(err)
  }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /webfontloader/,
      loader: "null-loader",
    })
  }
}
