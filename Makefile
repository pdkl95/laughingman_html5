TARGET      = laughingman.html
INSTALL_DIR = /home/endymion/static/html/

SRC    = laughingman.m4
JSOBJ  = main.js
CSSOBJ = style.css

FLAG_COFFEE = --bare
FLAG_SCSS   = --unix-newlines --force --style=expanded --no-cache
FLAG_M4     = -P

COFFEE  = coffee
SCSS    = scss
M4      = m4 -P
INSTALL = install -c -m 644

all: rebuild
.PHONY: rebuild clean install

### Depends

$(TARGET): $(SRC) $(JSOBJ) $(CSSOBJ)

### Rules

%.html: %.m4
	$(M4) $(FLAG_M4) $< > $@

%.js: %.coffee
	$(COFFEE) $(FLAG_COFFEE) -c $<

%.css: %.scss
	$(SCSS) $(FLAG_SCSS) $< $@

### Housekeeping

clean:
	rm -f $(TARGET) $(JSOBJ) $(CSSOBJ)

install: $(TARGET)
	$(INSTALL) $(TARGET) $(INSTALL_DIR)

rebuild:
	make clean
	make install


