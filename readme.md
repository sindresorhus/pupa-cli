# pupa-cli

> Simple micro templating


## Install

```
$ npm install --global pupa-cli
```


## Usage

```
$ pupa --help

  Examples
    $ echo 'The mobile number of {name} is {mobile}' | pupa --name=Sindre --mobile='609 24 363'
    The mobile number of Sindre is 609 24 363

    $ echo 'I like {0} and {1}' | pupa 🦄 🐮
    I like 🦄 and 🐮

    $ echo 'Hello {{0}}' | pupa '<b>World</b>'
    Hello &lt;b&gt;World&lt;/b&gt;
```


## Related

- [pupa](https://github.com/sindresorhus/pupa) - API for this module
