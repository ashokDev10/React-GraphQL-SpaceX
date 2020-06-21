import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

// graphql using hooks concept

const LaunchesHooks = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, {});

  if (loading) return <h3>Loading...</h3>;
  if (error) {
    console.log("Error= " + error);
    console.log("DATA= " + data);

    return <h3>test</h3>;
  }
  console.log(data);
  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>

      {data.launches.map((launch) => (
        <>
          <h2>Flight Num: {launch.flight_number}</h2>
          <h2>Mission Name {launch.mission_name}</h2>
          <h2>Launch Date: {launch.launch_date_local}</h2>
          <h2>Launch Success: {launch.launch_success}</h2>
          <hr style={{ background: "red" }} />
        </>
      ))}
    </div>
  );
};

// graphql class component

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">
          Launches data Fetching using class component
        </h1>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h3>Loading...</h3>;
            if (error) {
              console.log("Error: " + error);
              return <h3>Error: {error}</h3>;
            }
            return (
              <Fragment>
                {data.launches.map((launch) => (
                  <LaunchItem
                    launch={launch}
                    key={launch.flight_number}
                    mission_name={launch.mission_name}
                    launch_date={launch.launch_date_local}
                    launch_success={launch.launch_success}
                  />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;

// const ChaalNormal = () => (
//   <Query query={GetChaalQuery}>
//     {({ loading, error, data }) => {
//       if (loading) return "Loading...";
//       if (error) return `Error! ${error.message}`;

//       return <p>Normal Query : {data.chaal}</p>;
//     }}
//   </Query>
// );
