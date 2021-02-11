import React, { useState } from 'react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

import Head from 'next/head';
import D3Chart from '@/components/D3Chart';
import Recharts from '@/components/Recharts';
import styles from '@/styles/Home.module.scss';

const Home = ({ data }) => {
  const [open, setOpen] = useState(0);
  const launches = [];

  data.map((launch) => {
    launches.push({
      date: new Date(launch['launch_date_local']).toLocaleDateString('en-US'),
      totalPayload: launch['rocket']['second_stage']['payloads']
        .map((item) => item['payload_mass_kg'])
        .reduce((a, b) => a + b),
    });
  });

  return (
    <div>
      <Head>
        <title>D3 Graph</title>
      </Head>
      <main>
        <div className={styles.wrapper}>
          <h1>Total SpaceX launch payloads</h1>
          <div>
            <label>
              <input
                type="radio"
                name="d3js"
                checked={open === 0}
                onChange={(e) => setOpen(0)}
              />
              D3JS library
            </label>
            <label>
              <input
                type="radio"
                name="chartjs"
                checked={open === 1}
                onChange={(e) => setOpen(1)}
              />
              Recharts library
            </label>
          </div>
          {open === 0 && <D3Chart data={launches} />}
          {open === 1 && <Recharts data={launches} />}
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache(),
  });

  const {
    data: { launchesPast },
  } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 100) {
          launch_date_local
          rocket {
            second_stage {
              payloads {
                payload_mass_kg
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      data: launchesPast,
    },
  };
}
