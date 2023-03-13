import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { objActions } from "../store/obj-slice";
import useMail from "../../hooks/use-Mail";


const MailInbox = () => {
  const history = useHistory();

  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch = useDispatch();
  const inbox = useSelector((currState) => currState.array.inbox);
  useMail(false);

  // const getdata = async () => {
  //   const get = await fetch(
  //     `https://mail-box-e2dc8-default-rtdb.firebaseio.com/${loggedEmail}/inbox.json`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await get.json();
  //   console.log(data);
  //   let newArray = [];
  //   if (!!data) {
  //     newArray = Object.keys(data).map((mail) => {
  //       return {
  //         id: mail,
  //         email: data[mail].email,
  //         body: data[mail].body,
  //         read: data[mail].read,
  //       };
  //     });
  //     dispatch(
  //       inboxActions.inboxHandler({
  //         newArray: newArray,
  //       })
  //     );
  //     dispatch(inboxActions.inboxMailRead(newArray));
  //   }
  // };
 
 // useEffect(() => {
  //   const interval= setInterval(() => {
  //   getdata();
  //   }, 2000);
    
  //   return ()=> clearInterval (interval)
  //   }, []);

  const inboxMailReadFetching = (mail) => {
    const updateData = async (mail) => {
      try {
        const response = await fetch(
          `https://mail-box-e2dc8-default-rtdb.firebaseio.com/${loggedEmail}/inbox/${mail.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...mail,
              read: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    updateData(mail);
  };

  const openMailHandler = (obj) => {
    dispatch(objActions.objHandler(obj));
  
    inboxMailReadFetching(obj);
    history.replace("/MailDetail");
  };

  const deleteHandler = async (obj) => {
    
    try {
      const del = await fetch(
        `https://mail-box-e2dc8-default-rtdb.firebaseio.com/${loggedEmail}/inbox/${obj.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await del.json();
      // getdata();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center">INBOX</h1>
      <ul>
        {inbox.map((obj) => (
          <div  key={obj.id}>
            <table className="table">
              <tbody>
                <tr>
                  <td>{obj.email}</td>
                  <td>{obj.subject}</td>
                  <td onClick={openMailHandler.bind(null, obj)}>{obj.body}</td>
                  <td>{!!obj.read ? "read" : <b>"Unread"</b>}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={deleteHandler.bind(null, obj)}
                    >
                      del
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </ul>
    </Fragment>
  );
};

export default MailInbox;