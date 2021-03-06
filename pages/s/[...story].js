import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import Storyblock from '@components/Storyblock';

import { useAppContext } from '@context/AppContext';

const Story = () => {
  let { state, send } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    let trailingPath = router.asPath.substring(
      router.asPath.length - state.event.type.length
    );

    if (trailingPath !== state.event.type) {
      router.push(`/s/start`);
    }
  }, []);

  return (
    <Layout story>
      <Storyblock>{state.meta[`spookydev.${state.value}`].story}</Storyblock>

      {state.nextEvents
        .filter((eventType) => !eventType.startsWith('xstate'))
        .map((eventType) => {
          return (
            <button
              key={eventType}
              onClick={() => {
                send(eventType);
                if (eventType === 'restart') {
                  router.push(`/s/start`);
                } else {
                  router.push(`${router.asPath}/${eventType}`);
                }
              }}
            >
              {eventType.replace(/-/g, ' ')}
            </button>
          );
        })}
    </Layout>
  );
};

export default Story;
