#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const pupa = require('pupa');

const cli = meow(`
	Examples
	  $ echo 'The mobile number of {name} is {mobile}' | pupa --name=Sindre --mobile='609 24 363'
	  The mobile number of Sindre is 609 24 363

	  $ echo 'I like {0} and {1}' | pupa 🦄 🐮
	  I like 🦄 and 🐮

	  $ echo 'Hello {{0}}' | pupa '<b>World</b>'
	  Hello &lt;b&gt;World&lt;/b&gt;
`);

(async () => {
	const stdin = await getStdin();
	console.log(pupa(stdin, cli.input.length > 0 ? cli.input : cli.flags));
})();
