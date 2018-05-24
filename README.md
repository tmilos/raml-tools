# Raml CLI Tools
CLI RAML and Swagger tools - generate flat RAML, generate swagger from RAML, generate swagger ui

# Install

```bash
$ npm install -g raml-tools
```

# Usage

```bash
$ raml-tools help
```

## Flat

Generates flat RAML file from the given RAML file. If `--save destination` option is used, generated flat RAML file
will be saved to the given *destination*, otherwise it will be printed to screen. 

```bash
$ raml-tools flat file [--save destination]
```

## Swagger

Generates swagger.json file from the given flat RAML file. 

```bash
$ raml-tools swagger file [options]
```

Options:
* **--save** _destination_ - Save flatten RAML into specified *destination* file.
* **-c**, **--clear-server** - Clears any servers defined in RAML, so the result will contain only those added with -s option
* **-s**, **--server* _serverUrl_ - Additional server url(s). Can be repeated multiple times.
* **-b**, **--base-uri* _defaultValue_ - Add server url as variable with the given value.


## UI

Generates swagger ui in the given directory

```bash
$ raml-tools ui [options]
```

Options:
* **-s**, **--source* _swaggerJsonFile_ - Swagger file to use in UI.
* **-d**, **--destination* _dir_ - Destination directory where to generate swagger UI.
* **-o**, **--open* - Start http server and open generated swagger UI.


## Http

Runs static http serevr on given directory

```bash
$ raml-tools http [options]
```

Options:
* **-d**, **--destination* _dir_ - Directory to use as server root.
* **-o**, **--open* - Open browser automatically


## Mock

Runs mock API serevr for the given flat RAML file

```bash
$ raml-tools mock [options]
```

Options:
* **-f**, **--file* _ramlFile_ - Flat RAML file to mock.
* **-p**, **--port* - Port to run server on, defaults to 3001
