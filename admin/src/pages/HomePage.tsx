import { Page, useFetchClient, useNotification } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { Layouts } from '../components/Layouts/Layout';
import { Box, Button, Flex, Grid, Main, Typography } from '@strapi/design-system';
import { ArrowClockwise, Trash } from '@strapi/icons';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';

interface CacheKeyApiResponse {
  keys: string[];
}

const HomePage = () => {
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toggleNotification } = useNotification();

  const { get, del } = useFetchClient();

  const fetchCacheKeys = async () => {
    setLoading(true);
    try {
      const resp = await get<CacheKeyApiResponse>('/api/cache');
      setCacheKeys(resp.data.keys);
      toggleNotification({
        type: "success",
        message: "Cache Key Refreshed"
      })
    } catch (error) {
      console.error('Cache API call failed:', error);
      toggleNotification({
        type: "warning",
        message: error as string || "Cache API Call Failed"
      })
    }
    setLoading(false);
  };

  const purgeCache = async () => {
    setLoading(true);
    try {
      await del('/api/cache');
      setCacheKeys([]);
      toggleNotification({
        type: "success",
        message: "Cache Cleared"
      })
    } catch (error) {
      console.error('Cache Purge failed:', error);
      toggleNotification({
        type: "warning",
        message: error as string || "Cache Clear API Call Failed"
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCacheKeys();
  }, []);

  return (
    <Layouts.Root>
      <Page.Title>Cache Manager</Page.Title>
      <Main>
        <Box padding={10}>
          <Grid.Root>
            <Grid.Item col={8} s={12} direction="column" alignItems="stretch">
              <div>
                <Box paddingLeft={6} paddingBottom={10}>
                  <Flex direction="column" alignItems="flex-start" gap={5}>
                    <Typography tag="h1" variant="alpha">
                      Cache Manager
                    </Typography>
                  </Flex>
                </Box>
              </div>
            </Grid.Item>
          </Grid.Root>
          <Grid.Root gap={6}>
            <Grid.Item col={8} s={12} direction="column" alignItems="stretch">
              <Table colCount={1} rowCount={cacheKeys.length}>
                <Tbody>
                  {cacheKeys.map((key, idx) => (
                    <Tr key={key}>
                      <Td>
                        <Typography variant="delta" textColor="neutral800">
                          {key}
                        </Typography>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Grid.Item>
            <Grid.Item col={4} s={12} direction="column" alignItems="stretch">
              <Button
                size="L"
                disabled={loading}
                onClick={fetchCacheKeys}
                loading={loading}
                variant="default"
                startIcon={<ArrowClockwise />}
              >
                Refresh
              </Button>
              <Button
                size="L"
                disabled={loading || cacheKeys.length == 0}
                onClick={purgeCache}
                loading={loading}
                variant="danger"
                startIcon={<Trash />}
              >
                Purge Cache
              </Button>
              {/* strat here */}
              {/* <Flex
                tag="aside"
                direction="column"
                aria-labelledby="join-the-community"
                background="neutral0"
                hasRadius
                paddingRight={5}
                paddingLeft={5}
                paddingTop={6}
                paddingBottom={6}
                shadow="tableShadow"
                gap={7}
              >
                <Flex direction="column" alignItems="stretch" gap={5}>
                  <Flex direction="column" alignItems="stretch" gap={3}>
                    <Typography variant="delta" tag="h2" id="join-the-community">
                      {formatMessage({
                        id: 'app.components.HomePage.community',
                        defaultMessage: 'Join the community',
                      })}
                    </Typography>
                    <Typography textColor="neutral600">
                      {formatMessage({
                        id: 'app.components.HomePage.community.content',
                        defaultMessage:
                          'Discuss with team members, contributors and developers on different channels',
                      })}
                    </Typography>
                  </Flex>
                  <Link href="https://feedback.strapi.io/" isExternal endIcon={<ExternalLink />}>
                    {formatMessage({
                      id: 'app.components.HomePage.roadmap',
                      defaultMessage: 'See our road map',
                    })}
                  </Link>
                </Flex>
                <GridGap>
                  {socialLinksExtended.map(({ icon, link, name }) => {
                    return (
                      <Grid.Item
                        col={6}
                        s={12}
                        key={name.id}
                        direction="column"
                        alignItems="stretch"
                      >
                        <LinkCustom
                          size="L"
                          startIcon={icon}
                          variant="tertiary"
                          href={link}
                          isExternal
                        >
                          {formatMessage(name)}
                        </LinkCustom>
                      </Grid.Item>
                    );
                  })}
                </GridGap>
              </Flex> */}
              {/* end here */}
            </Grid.Item>
          </Grid.Root>
        </Box>
      </Main>
    </Layouts.Root>
  );
};

export { HomePage };
