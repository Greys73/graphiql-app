import { TAreas } from '@src/lib/types/types';
import CodeArea from '@src/components/CodeArea';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

function BoxAdvanced({ areas }: { areas: TAreas }) {
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList>
        <Tab>Variables</Tab>
        <Tab>Headers</Tab>
      </TabList>
      <TabPanels h='100%'>
        <TabPanel>
          <CodeArea options={areas.variables} />
        </TabPanel>
        <TabPanel>
          <CodeArea options={areas.headers} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default BoxAdvanced;
