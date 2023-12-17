import { TAreas } from '@src/lib/types/types';
import CodeArea from '@src/components/CodeArea';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

function BoxAdvanced({ areas }: { areas: TAreas }) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton bg='lightgrey' _expanded={{ bg: 'white' }}>
            <Box as='span' flex='1' textAlign='left'>
              Advanced
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default BoxAdvanced;
