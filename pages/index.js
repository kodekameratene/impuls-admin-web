import Layout from "../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import React from "react";
import {baseUrl} from "../helpers/appsettings";

const Index = props => (
    <Layout>
        <h1>Arrangements</h1>
        {props.arrangements.map(arrangement => {
            const startTime = arrangement.startTime
                ? new Date(arrangement.startTime).toLocaleString()
                : "No startTime set";
            const endTime = arrangement.endTime
                ? new Date(arrangement.endTime).toLocaleString()
                : "No endTime set";
            return (
                <div key={arrangement.id}>
                    <Link href="/events/[id]" as={`/events/${arrangement.id}`}>
                        <div className={'arrangement'}>
                            <div>
                                <h2>{arrangement.title}</h2>
                                <p>{arrangement.location}</p>
                                <p>Fra: {startTime}</p>
                                <p>Til: {endTime}</p>
                            </div>
                            <img src={arrangement.image}/>
                            <style jsx>{`
              .arrangement {
                border: 1px solid lightgray;
                border-radius: 4px;
                padding:10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: 200px;
              }
              img{
              width:300px;
              object-fit: contain;
              }
              
            `}</style>
                        </div>
                    </Link>
                </div>
            );
        })}
    </Layout>
);

Index.getInitialProps = async function () {
    const res = await fetch(`${baseUrl()}/arrangements`);
    const arrangements = await res.json();

    return {
        arrangements
    };
};

export default Index;
