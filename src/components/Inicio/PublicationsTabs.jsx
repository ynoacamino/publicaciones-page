'use client';

import {
  Tabs, Tab, Card, CardBody,
} from '@nextui-org/react';

export default function PublicationsTabs({ pub }) {
  return (
    <Tabs aria-label="Options">
      <Tab title="Photos">
        <Card>
          <CardBody>
            aaa
          </CardBody>
        </Card>
      </Tab>
      <Tab title="Music">
        <Card>
          <CardBody>
            {pub.article.preview}
          </CardBody>
        </Card>
      </Tab>
      <Tab title="Videos">
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
