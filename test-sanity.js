const { createClient } = require('@sanity/client');
require('dotenv').config({path: '.env.local'});
const client = createClient({ 
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: 'production', 
  apiVersion: '2024-01-01', 
  useCdn: true 
});
Promise.all([
  client.fetch('*[_type == "homePage"][0]'), 
  client.fetch('*[_type == "portfolioItem"]')
]).then(console.log).catch(console.error);
