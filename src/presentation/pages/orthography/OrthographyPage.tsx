import { useState } from "react"
import { ChatMessageBox, GptMessages, GptOrthographyMessage, MyMessage, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const {ok, errors, message, userScore} = await orthographyUseCase(text);
    
    if(!ok){
      setMessages ((prev)=>[...prev, {text:'No se pudo realizar la correcion', isGpt:true}]);
    } else{
      setMessages((prev)=>[...prev, {text: message, isGpt:true,
      info:{ errors, message, userScore }
      }]);
    }
    
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
                (<GptOrthographyMessage key={index} {...message.info!}/>)
                :
                (<MyMessage key={index} text={message.text} />)
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
        disableCorrections
      /> 

     

    </div>
  )
}
