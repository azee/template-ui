Template UI
===========

A template to create one page Java Script UI based on BackBone
Best use with REST API (github.com/azee/template-api)


Description
=================

Introducing a project featuring all you need to build your Single Page Interface.
Some base features are already implemented - navigation and header view, filtered items lists and pagers (backend for the pager can be found here github.com/azee/template-api), session model and tests.

Build
=================

The project can be build by maven and can be installed just as a WAR.
All you need is just configure your web server (e.g. NGINX) like this:

'''
location / {
    root /usr/share/MyUI;
}
'''
