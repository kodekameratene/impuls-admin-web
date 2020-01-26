import Layout from "../../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import {baseUrl} from "../../helpers/appsettings";

const Events = props => {
    console.log(props);
    return (
        <Layout>
            {props.events.map(event => {
                const startTime = event.startTime
                    ? new Date(event.startTime).toLocaleString()
                    : "No startTime set";
                const endTime = event.endTime
                    ? new Date(event.endTime).toLocaleString()
                    : "No endTime set";
                return (
                    <div key={event.id}>
                        <Link href="/event/[id]" as={`/event/${event.id}`}>
                            <div className={'event'}>
                                <div>
                                    <h2>{event.title}</h2>
                                    <p>{event.location}</p>
                                    <p>{event.description}</p>
                                    <p>Fra: {startTime}</p>
                                    <p>Til: {endTime}</p>
                                </div>
                                {event.image ? <img src={event.image}/> : null}
                            </div>
                        </Link>
                        <style jsx>{`
              .event {
                border: 1px solid lightgray;
                border-radius: 4px;
                padding:10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 250px;
              }
              img{
              width:300px;
              object-fit: contain;
              }
              `}</style>
                    </div>
                );
            })}

            <button>Add new event</button>
        </Layout>
    );
};

Events.getInitialProps = async function (context) {
    const {id} = context.query;
    const res = await fetch(`${baseUrl()}/events/?arrangement=${id}`);
    const events = await res.json();

    return {
        events
    };
};

export default Events;
