all: install build run

install:
	npm install

build:
	opa build -t wasm -e 'example/hello' ./example.rego
	tar xzf bundle.tar.gz /policy.wasm

run:
	node app.js '{"message": "world"}'
	node app.js '{"message": "not-world"}'
