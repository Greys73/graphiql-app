import { TAreas } from '@src/lib/types/types';
import CodeArea from '@src/components/CodeArea';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useContext } from 'react';
import LangContext from '@src/lib/LangContext';

function BoxAdvanced({ areas }: { areas: TAreas }) {
  const {
    lang: {
      texts: { editor },
    },
  } = useContext(LangContext);
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList>
        <Tab>{editor.variables}</Tab>
        <Tab>{editor.headers}</Tab>
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
