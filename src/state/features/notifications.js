import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const notifySlack = createAsyncThunk(
  "users/notifySlack",

  async (data) => {
    debugger
    let payload
    if (data.formSubmission) {
      const text = `Has submitted an interest form for ${data.toSentence()}.\nUse ${
        data.contact.email
      } to get in touch.`;
      payload = {
        icon_emoji: ":pencil2:",
        message: data.contact.message,
        username: data.contact.name,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${text}\n\nMessage: ${data.contact.message}`,
            },
          },
        ],
      };
    } else {
      payload = {
        icon_emoji: ":rocket:",
        username: "Notification Bot",
        text: `There is a new ${data.actionType} from ${data.user.email}`,
      };
    }
    debuggare
    console.warn("ENV PROD?: "+ import.meta.env.PROD)
    if (import.meta.env.PROD) {
      // production code
      const token = import.meta.env.VITE_SLACK_TOKEN
      const resp = await axios.post(
        `https://hooks.slack.com/services/${
          token
        }`,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return true;
    } else {
      // dev code
      return true;
    }
  }
);
