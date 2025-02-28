import { Injectable, Logger } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { LLM, RoleChat } from 'src/constants';
import { getLLM, getMarkdownMessage } from 'src/utils';
import { DocumentInterface } from '@langchain/core/documents';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
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
  
  1. **Determine the language of the user's input before answering.** If the input contains multiple languages, prioritize the majority language in the sentence.
  2. The answer **must be in the same language** as the user's input.
  3. Answers must follow a specific structured format.
  4. If there are documents context, you are only allowed to answer using the knowledge contained in the documents and relevant cooking knowledge. Absolutely do not arbitrarily create answers.
  5. The answer must be in Markdown format.
  
  **Note:** Do not explicitly mention the detected language in the response; just respond in the appropriate language.
  
  {context}`,
      ],
      new MessagesPlaceholder('chatHistory'),
      ['user', '{input}'],
    ]);
    const llm = getLLM(LLM);
    const chain = prompt.pipe(llm).pipe(new StringOutputParser());
    let context: DocumentInterface<Record<string, any>>[] = [];
    if (summaryDto.trim().length > 0) {
      context.push({
        pageContent: summaryDto,
        metadata: {
          source: 'summary',
        },
      });
    }
    const res = await chain.invoke({
      input:
        promptDto.trim().length > 0
          ? promptDto
          : 'Tóm tắt tài liệu này, ngôn ngữ của nội dung nấu ăn sẽ giống như ngôn ngữ của tài liệu.',
      chatHistory: conversationDto.map((message) => {
        if (message.role === RoleChat.USER) {
          return new HumanMessage(message.content);
        } else {
          return new AIMessage(message.content);
        }
      }),
      context,
    });
    this.logger.log(`Chat response: ${res}`);
    return getMarkdownMessage(res);
  }
}
