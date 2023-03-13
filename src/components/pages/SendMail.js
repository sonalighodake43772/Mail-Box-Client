import React, { Fragment} from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./SendMail.module.css";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SendMail = () => {

  const currEmail = useSelector((currState) => currState.auth.email);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const history =useHistory();
  
   let content;

    const onEditorStateChange = (event) => {
        content = event.getCurrentContent().getPlainText()
    }

  const sendEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const sendsubjectHandler = (e) => {
    setSubject(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
    body:content,
    subject:subject,
    };
    const regex = /[.@]/g;
    const emailId = obj.email.replace(regex, "");

    const postData = async () => {
      const sent = await fetch(
        `https://mail-box-e2dc8-default-rtdb.firebaseio.com/${currEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            body:content,
            subject:subject,
            read:false
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await sent.json();
      console.log(data);

      const inbox = await fetch(
        `https://mail-box-e2dc8-default-rtdb.firebaseio.com/${emailId}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            email: currEmail,
           body:content,
           subject:subject,
           read:false
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await inbox.json();
      console.log(data2);
    };
    postData();
    setEmail("");
    setSubject("");
    history.replace("/Sent");
    
    
  };
  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>SEND EMAIL:</h1>
      <Form onSubmit={submitHandler} className={classes.box}>
        <div>
          <p>From: {currEmail}</p>
        </div>
        <div>
          <Form.Group controlId="To">
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={sendEmailHandler}
              required
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="subject">
            <Form.Label>subject:</Form.Label>
            <Form.Control
              type="text"
              placeholder="subject"
              value={subject}
              onChange={sendsubjectHandler}
              required
            />
          </Form.Group>
        </div>
        <br />
        <div>
          <label htmlFor="text ">Compose email:</label>
          <Editor
                    //  editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                />
        </div>
        <br />
        <div>
          <Button type="submit">Send</Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SendMail;