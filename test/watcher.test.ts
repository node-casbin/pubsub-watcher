// Copyright 2018 The Casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { newEnforcer } from 'casbin';
import { PubSub } from '@google-cloud/pubsub';
import { PubsubWatcher } from '../src/watcher';

describe('Test', () => {
  const projectId = 'casbin';
  const topicName = 'casbin';
  const subscriptionName1 = 'sub_casbin_1';
  const subscriptionName2 = 'sub_casbin_2';

  let watcher: PubsubWatcher;
  let updater: PubsubWatcher;

  beforeAll(async () => {
    const pubsub = new PubSub({ projectId });
    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);
    await pubsub.topic(topicName).createSubscription(subscriptionName1);
    await pubsub.topic(topicName).createSubscription(subscriptionName2);
  });

  afterAll(async () => {
    const pubsub = new PubSub({ projectId });
    await pubsub.topic(topicName).delete();
    await pubsub.subscription(subscriptionName1).delete();
    await pubsub.subscription(subscriptionName2).delete();
  });

  afterEach(async () => {
    if (watcher) await watcher.close();
    if (updater) await updater.close();
  });

  test('Test1', async (done) => {
    watcher = await PubsubWatcher.newWatcher({ projectId }, topicName, subscriptionName1);
    const enforcer = await newEnforcer('examples/authz_model.conf', 'examples/authz_policy.csv');
    enforcer.setWatcher(watcher);
    watcher.setUpdateCallback(done);
    await enforcer.savePolicy();
  });

  test('Test2', async (done) => {
    watcher = await PubsubWatcher.newWatcher({ projectId }, topicName, subscriptionName1);
    const enforcer = await newEnforcer('examples/authz_model.conf', 'examples/authz_policy.csv');
    enforcer.setWatcher(watcher);
    watcher.setUpdateCallback(done);

    updater = await PubsubWatcher.newWatcher({ projectId }, topicName, subscriptionName2);
    await updater.update();
  });

  afterAll(async () => {});
});
