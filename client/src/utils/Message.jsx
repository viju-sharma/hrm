import { Message } from "semantic-ui-react";
const MessageResponse = (props) => {
  const header = props.header;
  const content = props.content;
  const color = props.color;
  return (
    <Message size="mini" color={color} header={header} content={content} />
  );
};

export default MessageResponse;
