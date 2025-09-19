### The core components for this extension would include:

- **Content scripts**: to be injected into each active tab to observe and modify the DOM
- **Background script**: Handles network level filtering and communication with content scripts
- **Network interception**: Use browser APIs to block HTTP/request before ad asset are downloaded

In context of a ad blocker, scripts are required and are in two levels

- Background Level [Blocking http request]
- Content Level [Interact with the DOM]
