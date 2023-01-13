import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const slackApi = axios.create();

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
          },
        },
      ],
    };
    const token = import.meta.env.VITE_SLACK_TOKEN;
    await slackApi.post(`https://hooks.slack.com/services/${token}`, payload, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
  }
);
