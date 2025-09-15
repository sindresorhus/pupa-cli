# pupa-cli

> Simple micro templating

## Install

```sh
npm install --global pupa-cli
```

## Usage

```
$ pupa --help

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
```

## Filters

Filters allow you to transform template values using the pipe syntax: `{value | filter}`. You can chain multiple filters: `{value | filter1 | filter2}`.

Define filters using the `--filters` option with a JavaScript object literal:

```sh
$ echo '{name | uppercase | reverse}' | pupa --name=hello --filters='{uppercase: v => v.toUpperCase(), reverse: v => [...v].reverse().join("")}'
OLLEH
```

### Common Filter Examples

```js
{
	uppercase: v => v.toUpperCase(),
	lowercase: v => v.toLowerCase(),
	trim: v => v.trim(),
	reverse: v => [...v].reverse().join(''),
	length: v => v.length.toString()
}
```

## Related

- [pupa](https://github.com/sindresorhus/pupa) - API for this package
