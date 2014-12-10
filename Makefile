
test:
	@TZ=UTC ./node_modules/.bin/mocha \
		--reporter spec

.PHONY: test