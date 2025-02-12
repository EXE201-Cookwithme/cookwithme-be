import { Injectable, Logger } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { LLM, RoleChat } from 'src/constants';
import { getLLM, getMarkdownMessage } from 'src/utils';
import { StringOutputParser } from '@langchain/core/dist/output_parsers';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  async chat(
    promptDto: string,
    conversationDto: MessageDto[],
    summaryDto: string,
  ) {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a professional chef, and your task is to answer users' questions related to cooking with the following requirements:
        1. The language used in the answer must be the same as the language used in the user's input.
        2. Answers must follow a specific structured format.
        3. If there are documents context, you are only allowed to answer using the knowledge contained in the documents and relevant cooking knowledge. Absolutely do not arbitrarily create answers.
        4. The answer must be in Markdown format.

        {context}`,
      ],
      new MessagesPlaceholder('chatHistory'),
      ['user', '{input}'],
    ]);
    const llm = getLLM(LLM);
    const chain = prompt.pipe(llm).pipe(new StringOutputParser());

    const res = await chain.invoke({
      input: promptDto,
      chatHistory: conversationDto.map((message) => {
        if (message.role === RoleChat.USER) {
          return new HumanMessage(message.content);
        } else {
          return new AIMessage(message.content);
        }
      }),
      summaryDto,
    });
    this.logger.log(`Chat response: ${res}`);
    return getMarkdownMessage(res);
  }
}
