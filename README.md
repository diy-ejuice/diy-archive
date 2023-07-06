# DIY Archive

This is a Gatsby site which mirrors the old Reddit /r/DIY_eJuice.

## Prerequisites

- Latest stable [NodeJS](https://nodejs.org/en/download/current/)

## Data

To build this site, you will need to prepare data for Gatsby.

1. Run `node parseData.mjs` to download and parse the subreddit data.

## Setup

Run `npm install` from this directory.

## Usage

You can use the following commands to develop, build, and deploy this project.

- npm start - starts a live-reloading dev server at <http://localhost:8000/>
- npm run serve - starts a production server at <http://localhost:8000/>
- npm run build - builds a production bundle at `./dist`
- npm run deploy - deploys a production bundle to the `gh-pages` branch of this repository
