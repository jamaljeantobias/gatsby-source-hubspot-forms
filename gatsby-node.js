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
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    )
    const response = await fetchAllFormNodes.data

    response.map((item, index) => {
      const formNode = {
        id: item.guid,
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
        metaData: item.metaData,
        inlineMessage: item.inlineMessage,
        isPublished: item.isPublished,
        thankYouMessageJson: item.thankYouMessageJson,
        children: [],
        parent: `__SOURCE__`,
        internal: {
          type: `HubspotForm`,
        },
      }
      console.log(` ${index + 1} :Creating Hubspot Form  ${item.name}`)
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
