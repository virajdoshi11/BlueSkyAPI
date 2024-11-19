// import { AtpAgent, AtpSessionEvent, AtpSessionData } from '@atproto/api';

// const agent = new AtpAgent({ service: 'https://example.com' })
import { config } from "dotenv";
config();
import { AtpAgent, RichText } from "@atproto/api";

async function bskyLogin() {
  const agent = new AtpAgent({ service: "https://bsky.social" });

  try {
    await agent.login({
      identifier: "" + process.env.BSKY_ID,
      password: "" + process.env.BSKY_PASSWORD
    });
  } catch(err) {
    console.log("Agent is: ====");
    console.log(agent);
    console.log("======");
    console.log("Could not login");
    return -1;
  }

  return agent;
}

async function sendPost(agent, text) {
  await agent.post({ text });
  console.log("Post has bee made");
}

/**
 * @param {AtpAgent} agent
 * @param {string} text The text you want to post with any mentions or links
 */
async function sendRichText(agent, text) {
  const richText = new RichText({ text });
  await richText.detectFacets(agent);

  await agent.post({
    text: richText.text,
    facets: richText.facets
  });
  console.log("The richtext post has been made");
}

let agent = await bskyLogin();

if(agent != -1) {
  sendPost(agent, "Hello again from the bsky API!")
} else {
  console.log(process.env.BSKY_ID, process.env.BSKY_PASSWORD);
  console.log("Wrong credentials!", agent);
}