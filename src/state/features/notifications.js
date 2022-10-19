import { createAsyncThunk } from "@reduxjs/toolkit";

export const notifySlack = createAsyncThunk(
  "users/notifySlack",

  async (data) => {
    if (data.formSubmission) {
      const text = `Has submitted an interest form for ${data.toSentence()}.\nUse ${
        data.contact.email
      } to get in touch.`;
      const payload = {
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
      const payload = {
        icon_emoji: ":rocket:",
        username: "Notification Bot",
        text: `There is a new ${data.actionType} from ${data.user.email}`,
      };
    }

    if (import.meta.env.PROD) {
      debugger;
      // production code
      await axios.post(
        `https://hooks.slack.com/services/${
          import.meta.env.REACT_APP_SLACK_TOKEN
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
