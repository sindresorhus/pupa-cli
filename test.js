import test from 'ava';
import {execa} from 'execa';

test('basic templating with named arguments', async t => {
	const {stdout} = await execa('./cli.js', ['--name=Sindre', '--mobile=609 24 363'], {input: 'The mobile number of {name} is {mobile}'});
	t.is(stdout, 'The mobile number of Sindre is 609 24 363');
});

test('basic templating with positional arguments', async t => {
	const {stdout} = await execa('./cli.js', ['🦄', '🐮'], {input: 'I like {0} and {1}'});
	t.is(stdout, 'I like 🦄 and 🐮');
});

test('HTML escaping with double braces', async t => {
	const {stdout} = await execa('./cli.js', ['<b>World</b>'], {input: 'Hello {{0}}'});
	t.is(stdout, 'Hello &lt;b&gt;World&lt;/b&gt;');
});

test('filters with single and chained transformations', async t => {
	// Single filter
	const {stdout: single} = await execa('./cli.js', ['--name=world', '--filters={uppercase: v => v.toUpperCase()}'], {input: 'Hello {name | uppercase}!'});
	t.is(single, 'Hello WORLD!');

	// Chained filters
	const filters = '{trim: v => v.trim(), uppercase: v => v.toUpperCase()}';
	const {stdout: chained} = await execa('./cli.js', ['--text=  hello  ', `--filters=${filters}`], {input: '{text | trim | uppercase}'});
	t.is(chained, 'HELLO');
});

test('error handling for empty input', async t => {
	const {stderr, exitCode} = await execa('./cli.js', [], {input: '', reject: false});
	t.is(exitCode, 1);
	t.is(stderr, 'No input provided');
});

test('error handling for invalid filters', async t => {
	const {stderr, exitCode} = await execa('./cli.js', ['--filters=invalid syntax'], {input: 'test', reject: false});
	t.is(exitCode, 1);
	t.true(stderr.includes('Invalid filters'));
});
