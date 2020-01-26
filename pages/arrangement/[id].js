import Layout from "../../components/MyLayout";
import fetch from "isomorphic-unfetch";
import {baseUrl} from "../../helpers/appsettings";

const Arrangement = props => (
    <Layout>
        <div>

            <h1>{props.arrangement.title}</h1>
            <p>{props.arrangement.location}</p>
            {props.arrangement.image ? <img src={props.arrangement.image}/> : null}
        </div>
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
              border-radius: 4px;
              }
              
            `}</style>
    </Layout>
);

Arrangement.getInitialProps = async function (context) {
    const {id} = context.query;
    const res = await fetch(`${baseUrl()}/arrangements/${id}`);
    const arrangement = await res.json();

    console.log(arrangement);
    console.log(`Fetched show: ${arrangement.title}`);

    return {arrangement};
};

export default Arrangement;
