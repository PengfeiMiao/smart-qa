import logging

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

    def completions(self, message, prompt='You are a helpful assistant.'):
        try:
            stream = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "user", "content": message},
                    {"role": "system", "content": prompt},
                ],
                temperature=0,
                stream=True,
            )
            for event in stream:
                if event.choices[0].delta.content:
                    yield event.choices[0].delta.content
        except Exception as e:
            logging.error(f"Failed to Connect OpenAI: {e}")
            yield f"Service is unavailable"
