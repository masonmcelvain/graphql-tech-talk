# graphql-tech-talk
Adapted from https://www.howtographql.com/graphql-js/1-getting-started/

## Setup
* Install dependencies: `npm install`
* Start the GraphQL server: `node src/index.js`

## Some sample queries

```graphql
# Get all links
query Query {
  feed {
    id
    description
    url
  }
}

# Get a specific link
query Query($linkId: ID!) {
  link(id: $linkId) {
    id
    description
    url
  }
}

# Create new link
mutation {
  postLink(
    url: "www.ifixit.com",
    description: "Repair guides for everything"
  ) {
    id
  }
}

# Update existing link
mutation {
  updateLink(
    id: "link-3",
    url: "www.cominor.com",
    description: "Reloading assets..."
  ) {
    id
    description
    url
  }
}

# Delete a link
mutation DeleteLinkMutation($linkId: ID!) {
  deleteLink(id: $linkId) {
    id
  }
}
```
