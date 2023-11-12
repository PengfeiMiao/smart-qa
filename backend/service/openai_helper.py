import logging
import re

from openai import OpenAI, AsyncOpenAI

from ..config.config import OPENAI_KEY, OPENAI_ORG


class OpenAIHelper:
    def __init__(self):
        try:
            self.model = "gpt-3.5-turbo"
            self.client = OpenAI(
                organization=OPENAI_ORG,
                api_key=OPENAI_KEY
            )
            print(self.client.models.list())
        except Exception as e:
            logging.error(f"Failed to Connect OpenAI: {e}")
            # sys.exit(1)

    def completions(self, message, prompts=None):
        if prompts is None:
            prompts = [{"role": "user", "content": message}]
        else:
            for prompt in prompts:
                prompt['content'] = re.sub(r"{question.*?}", message, prompt['content'])
        try:
            stream = self.client.chat.completions.create(
                model=self.model,
                messages=prompts,
                temperature=0,
                stream=True,
            )
            for event in stream:
                if event.choices[0].delta.content:
                    yield event.choices[0].delta.content
        except Exception as e:
            logging.error(f"Failed to Connect OpenAI: {e}")
            yield f"Service is unavailable"
