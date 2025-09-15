#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import getStdin from 'get-stdin';
import pupa from 'pupa';

const cli = meow(`
	Usage
	  $ pupa [options]

	Options
	  --filters, -f <object>  JavaScript object literal with filter functions

	Examples
	  $ echo 'The mobile number of {name} is {mobile}' | pupa --name=Sindre --mobile='609 24 363'
	  The mobile number of Sindre is 609 24 363

	  $ echo 'I like {0} and {1}' | pupa 🦄 🐮
	  I like 🦄 and 🐮

	  $ echo 'Hello {{0}}' | pupa '<b>World</b>'
	  Hello &lt;b&gt;World&lt;/b&gt;

	  Using custom filters:
	  $ echo 'Hello {name | uppercase}' | pupa --name=world --filters='{uppercase: v => v.toUpperCase()}'
	  Hello WORLD

	  $ echo '{text | trim | reverse}' | pupa --text=' hello ' --filters='{trim: v => v.trim(), reverse: v => [...v].reverse().join("")}'
	  olleh
`, {
	importMeta: import.meta,
	flags: {
		filters: {
			type: 'string',
			shortFlag: 'f',
		},
	},
});

const template = await getStdin();

if (!template) {
	console.error('No input provided');
	process.exit(1);
}

const options = {};
const {filters, ...data} = cli.flags;

if (filters) {
	try {
		// eslint-disable-next-line no-new-func
		options.filters = new Function(`return ${filters}`)();
	} catch (error) {
		console.error('Invalid filters:', error.message);
		process.exit(1);
	}
}

console.log(pupa(template, cli.input.length > 0 ? cli.input : data, options));
