# pubsub-watcher

Google Cloud Pub/Sub watcher for node-casbin

# Installation

```shell script
# NPM
npm install --save pubsub-watcher

# Yarn
yarn add pubsub-watcher
```

# Simple Example

```typescript
import { PubsubWatcher } from 'pubsub-watcher';
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
