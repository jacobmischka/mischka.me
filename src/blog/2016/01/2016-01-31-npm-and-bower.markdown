---
layout: post
title: Npm and Bower
date: 2016-01-31
tags: archived
---

I spent a lot of this week trying to understand npm and bower, the differences between them, and how to implement them. I just could not grasp the usefulness of either, when to use each one, or which one is considered better.

> How can searching their package lists be any easier than searching for the libraries' websites on Google or their files on a CDN?

> Why are there so many package managers that do the same thing?

> Why can't I find a blog post or Stack Overflow answer that just tells me what I should use?

At the end of the week, I have no additional features to show for it, but I finally believe I grasp the two primary solutions for front-end dependency management. And since I couldn't find a decent writeup anywhere, I decided I should make one that would have helped me.

## [Npm][1]

> Recursive bacronymic abbreviation for "npm is not an acronym"

There's a lot of misinformation about npm on the Internet. Contrary to what many people think, [npm is **not** just for Node packages][2]. It's a very good package manager, and it's what you use to install bower itself.

To use npm modules in the browser, you will need a tool like [browserify][3] or [webpack][4]. You can include and manipulate the downloaded files in `node_modules` yourself if you wish, but doing so is contrary to npm's modular nature, [and isn't recommended][5].

The primary technical difference between the two package managers is their handling of dependencies. Npm's module dependencies are saved in a tree. If `module A` depends on `module C@1.0.0` and `module B` depends on `module C@2.0.0`, both versions of `module C` will be installed and `A` and `B` will each use their own copies. This can take a lot of space, but it is safer and an overall better method.

## [Bower][6]

> The package manager for the web

Unlike npm, bower was designed specifically for the browser. It does one simple thing and does it pretty well: download files. It doesn't do anything particularly special, it downloads what you tell it to along with any dependencies, and you do whatever you want with them.

Because web browsers operate in a flat dependency model, so does bower. If multiple versions of a package are installed, it just asks which you want to use. Using the previous example, when bower detects that `A` and `B` both depend on `C` of different versions, it will ask you which you want to use, and both `A` and `B` will use the version you selected. This can be problematic and packages `A` and `B` might not behave properly, but it's a simple way to appeal to browsers' flat nature.

## My project

In this instance, I was working on a traditional Laravel site, which is really more of a website than a webapp. I needed to write JavaScript directly inside views to pass PHP variables to JavaScript.

The JavaScript code base for the site is not large or complex. It's used to retrieve JSON data and manipulate the DOM with [jQuery][7], create some [Bootstrap][8] elements, mark up data tables with [DataTables][9], draw charts with [Chart.js][10], and enhance input fields with [select2][11] and [multiselect][12]. Essential logic is being done server-side with PHP, and I'm pretty far away from dependency hell.

Until this point, I had been using CDNs to include the libraries I was using. I spent several hours refactoring my code to work well with browserify before I decided it wasn't worth it and decided on bower.

## Summary

Bower will make it easy and simple to download JavaScript and CSS libraries and integrate them with your website. You tell it what packages to install, and you include them in your pages in the same way JavaScript and CSS has always worked.

Npm will require more work to integrate it with the browser. You need a bundler like browserify or webpack. Your JavaScript will be cleaner, safer, and more efficient. But it's harder to integrate with an existing site, doesn't play quite as well with traditional view-based web pages, and might not be worth it if your project is relatively small.

## If still don't know which you want to use

If you're starting a new project, write modular JavaScript and use npm and browserify, your code will be better and easier to manage. If you're considering porting an existing project, especially one that uses a lot of globals like jQuery, it just depends on how much work it will take and how worth it is to you. For me this time, it wasn't worth it yet.

Bower is a simple package manager for the current web, npm is the package manager for JavaScript and the future web, but takes just a bit more work.

[1]: https://www.npmjs.com/
[2]: http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging
[3]: http://browserify.org/
[4]: https://webpack.github.io/
[5]: http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm
[6]: http://bower.io/
[7]: https://jquery.com/
[8]: http://getbootstrap.com/
[9]: http://datatables.net/
[10]: http://www.chartjs.org/
[11]: https://select2.github.io/
[12]: http://loudev.com/
