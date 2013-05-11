#Automating with Grunt.js

This is the code used for my grunt.js talk at [scotland.js 2013](http://http://scotlandjs.com/)

##presentations

If you want to walk through the commits as in the presentation follow these steps

- Install git-presenter from rubygems, gem install git-presenter
- create a file called .presentation and paste the following code
```
---

slides:

- slide:

    commit: eac64f9687b989001a91f4eb6c5796ed01a9751c
    message: added initial project
- slide:
    commit: 58cc5528ba5804380aa8104199e7b92976cab031
    message: blank grunt file
- slide:
    commit: f220bf1a341edcedb2856957559f2ac5c6e7dd3b
    message: add jshint
- slide:
    commit: 02df076a47b418e82cd7ab406df2f8f161482343
    message: fix jshint errors
- slide:
    commit: fa4df341b14c8ebecd3f210065778dab364bdfc7
    message: added tests
- slide:
    commit: 11361650ebd78ee618f50434388e1cfa0854447b
    message: fixed jasmine test
- slide:
    commit: 702e2a6c61a54dc72f68738e1e1a9af1dbac96fe
    message: combined tasks
- slide:
    commit: c4f0d7eef585d190f75fc9d794b089161ed558f8
    message: added watches for test and lint
- slide:
    commit: b93d50606f17c6553bd4bd10b85c6b45a56d91bf
    message: added livereload
- slide:
    commit: ded1745aada284f992bc0c6f1899270bbe01f55d
    message: added staging deploy
- slide:
    commit: 97d4d9128ea1709557d9ee4f507ee29a15c4a487
    message: added production release
- slide:
    commit: b2046728e8f47869222b9b2b70c3126122e3956a
    message: refactied to use package.json
```
- run the presentation with git-presenter start

##git-presenter
For more info on [git presenter](http://github.com/pythonandchips/git-presenter)
