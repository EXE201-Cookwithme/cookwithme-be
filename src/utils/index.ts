import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';

export const getLLM = (model: string) => {
  const configService = new ConfigService();
  const apiKey = configService.get<string>('OPENAI_API_KEY');
  return new ChatOpenAI({
    model: model,
    configuration: {
      baseURL: 'https://api.openai.com/v1',
      apiKey: apiKey,
    },
  });
};

export const getMarkdownMessage = (msg: string) => {
  const matches = msg.match(/```markdown([\s\S]*?)```/);
  if (matches) {
    return matches[1];
  }
  return msg;
};
