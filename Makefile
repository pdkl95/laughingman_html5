

laughingman.html: laughingman.m4 main.js style.css
	m4 -P laughingman.m4 > laughingman.html

main.js: main.coffee
	coffee --bare -c main.coffee

style.css: style.scss
	scss --unix-newlines --force --style=expanded --no-cache style.scss style.css

clean:
	rm -f laughingman.html
	rm -f main.js
	rm -f style.css

install: laughingman.html
	cp laughingman.html /home/endymion/static/html/


remake:
	make clean
	make install
