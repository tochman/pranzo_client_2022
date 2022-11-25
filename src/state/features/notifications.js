import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const slackApi = axios.create()

export const notifySlack = createAsyncThunk(
  "users/notifySlack",
  async (data) => {
    const payload = {
      icon_emoji: ":pencil2:",
      username: "Pranzo.se",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${data.data.name} just ${data.action} with Pranzo.se`,
          }
        }
      ]
    };
    const token = import.meta.env.VITE_SLACK_TOKEN;
    await slackApi.post(`https://hooks.slack.com/services/${token}`, payload, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    // debugger
    // let payload
    // if (data.formSubmission) {
    //   const text = `Has submitted an interest form for ${data.toSentence()}.\nUse ${
    //     data.contact.email
    //   } to get in touch.`;
    //   payload = {
    //     icon_emoji: ":pencil2:",
    //     message: data.contact.message,
    //     username: data.contact.name,
    //     blocks: [
    //       {
    //         type: "section",
    //         text: {
    //           type: "mrkdwn",
    //           text: `${text}\n\nMessage: ${data.contact.message}`,
    //         },
    //       },
    //     ],
    //   };
    // } else {
    //   payload = {
    //     icon_emoji: ":rocket:",
    //     username: "Notification Bot",
    //     text: `There is a new ${data.actionType} from ${data.user.email}`,
    //   };
    // }
    // console.warn("ENV PROD?: "+ import.meta.env.PROD)
    // if (import.meta.env.PROD) {
    //   // production code
    //   const token = import.meta.env.VITE_SLACK_TOKEN
    //   const resp = await axios.post(
    //     `https://hooks.slack.com/services/${
    //       token
    //     }`,
    //     payload,
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     }
    //   );
    //   return true;
    // } else {
    //   // dev code
    //   debugger
    //   return true;
    // }
  }
);
