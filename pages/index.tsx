import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Hoge } from '../components/atoms/hoge';
import { Thumbnail } from '../components/molecules/thumbnail';
import { listEvents } from '../store/events';
import { useAppDispatch } from '../store';
import { useSelector, shallowEqual } from 'react-redux';
import { eventsSelector } from '../store/events';
import { useEffect } from 'react';
import { Events } from '../components/molecules/events';
import { PostEvents } from '../components/molecules/post-events';
import { PostEvents2 } from '../components/molecules/post-events2';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);
  const events = useSelector(eventsSelector, shallowEqual);

  return (
    <>
      <Hoge />
      <hr />
      <h3>reduxを通してapiを叩くテスト</h3>
      <div
        css={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}
      >
        {Object.values(events)?.map((item) => {
          return (
            <Thumbnail
              key={item.id}
              title={item.title}
              outline={item.releaseYear}
            />
          );
        })}
      </div>
      <hr />
      <div>
        <h3>直接apiを叩くテスト</h3>
        <Events />
      </div>
      <hr />
      <PostEvents />
      <hr />
      <PostEvents2 />
    </>
  );
};

export default Home;
