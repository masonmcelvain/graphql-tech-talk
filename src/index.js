const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

// Dummy data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => findLinkById(args.id)
  },

  Mutation: {
    postLink: (parent, args) => {
      const link = {
        id: `link-${links.length + 1}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (parent, args) => {
      const index = findLinkIndexById(args.id)
      if (index === -1) {
        return null
      }
      const newLink = args
      links[index] = newLink
      return newLink
    },

    deleteLink: (parent, args) => {
      const index = findLinkIndexById(args.id)
      if (index === -1) {
        return null
      }
      const link = links[index]
      links.splice(index, 1)
      return link
    }
  },
}

function findLinkById(id) {
  return links.find((link) => link.id === id)
}

function findLinkIndexById(id) {
  return links.findIndex((link) => link.id === id)
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
