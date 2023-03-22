import { config } from 'dotenv';
config();
import { Configuration, OpenAIApi } from 'openai';

export default class Chat {
  constructor() {
    this.openAi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
      })
    );
  }
  getResponse = async (input) => {
    const response = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
    });
    return response.data.choices[0].message.content;
  };
}
