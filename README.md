# pubsub-watcher

[![NPM version][npm-image]][npm-url]
![CI](https://github.com/node-casbin/pubsub-watcher/workflows/CI/badge.svg)

[npm-image]: https://img.shields.io/npm/v/@casbin/pubsub-watcher.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@casbin/pubsub-watcher

Google Cloud Pub/Sub watcher for node-casbin

# Installation

```shell script
# NPM
npm install --save @casbin/pubsub-watcher

# Yarn
yarn add @casbin/pubsub-watcher
```

# Simple Example

```typescript
import { PubsubWatcher } from '@casbin/pubsub-watcher';
import { newEnforcer } from 'casbin';

// Initialize the watcher.
// You need to create Pubsub topic and subscription(per casbin instance) first
const watcher = await PubsubWatcher.newWatcher();

// Initialize the enforcer.
const enforcer = await newEnforcer('examples/authz_model.conf', 'examples/authz_policy.csv');

enforcer.setWatcher(watcher);

// By default, the watcher's callback is automatically set to the
// enforcer's loadPolicy() in the setWatcher() call.
// We can change it by explicitly setting a callback.
watcher.setUpdateCallback(() => console.log('Casbin need update'));
```

# Test

Set `GOOGLE_APPLICATION_CREDENTIALS` in environment variable and `npm run test`

Test uses [Pub/Sub emulator](https://cloud.google.com/pubsub/docs/emulator)

```sh
gcloud beta emulators pubsub start --project=casbin
PUBSUB_EMULATOR_HOST=localhost:8085 PUBSUB_PROJECT_ID=casbin npm run test
```
