import Layout from "../../components/MyLayout";
import fetch from "isomorphic-unfetch";
import React from "react";
import {baseUrl} from "../../helpers/appsettings";
import ReactMarkdown from "react-markdown";

const Event = props => {
    const {image, location, title, description} = props.event;

    return (
        <Layout>
            <h1>{title}</h1>
            <p>{location}</p>
            <ReactMarkdown source={description}/>
            {image ? <img src={image} alt={title}/> : null}
            <style jsx>{`
              img{
              width:90%;
              border-radius: 8px;
              }
            `}
            </style>
            <button>Update</button>
            {/*<button>Delete event</button>*/}
        </Layout>
    );
};

Event.getInitialProps = async function (context) {
    const {id} = context.query;
    console.log("ID", id);
    const res = await fetch(`${baseUrl()}/events/${id}`);
    const event = await res.json();

    console.log(event);

    return {event};
};

export default Event;
