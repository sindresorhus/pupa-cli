import test from 'ava';
import execa from 'execa';

test('named', async t => {
	const {stdout} = await execa('./cli.js', ['--unicorn=🦄'], {input: 'Unicorn {unicorn}'});
	t.is(stdout, 'Unicorn 🦄');
});

test('positional', async t => {
	const {stdout} = await execa('./cli.js', ['🦄'], {input: 'Unicorn {0}'});
	t.is(stdout, 'Unicorn 🦄');
});
