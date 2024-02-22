import { useState } from "react"
import { GptMessages, MyMessage, TypingLoader, ChatMessageBox } from "../components";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async( text: string) =>{
    setLoading(true);
    setMessages((prev) =>[...prev,  {text: text, isGpt:false}]);

    //TODO USECASE

    setLoading(false);

    //TODO: agregar de isGPT true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-19 gap-y-2">
          <GptMessages text="Hola, puedes escribir tu texto y te ayudare con las correciones!" />

          {
            messages.map((message, index) => (
              message.isGpt ?
                (<GptMessages key={index} text="OpenAI" />)
                :
                (<MyMessage key={index} text={message.text} />
                )
            ))
          }
          {
            loading && (
            <div className="fade-in">
              <TypingLoader className="fade-in" />
            </div>) 
          }

        </div>
      </div>
      <ChatMessageBox
        onSendMessage={handlePost}
        placeholder="Texto..."
        disableCorrections={true}
      />

    </div>
  )
}
