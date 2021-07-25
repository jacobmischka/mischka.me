---
layout: post
title: Laptop update update
date: 2016-04-26
tags: archived
---

I believe I've found the cause of the flickering I mentioned when on battery. It seems I was right, it was a power-saving issue, though not a direct problem with TLP or any other power management suite.

I didn't realize my system's chipset was Skylake, which still isn't entirely bug-free on Linux, it seems. [The Arch wiki][1] suggests two solutions to various GPU issues, disabling hardware acceleration, and disabling rc6 power saving. I didn't even try disabling hardware acceleration, because I want hardware acceleration, but disabling the power saving I did try.

It seems to have worked and totally stopped the flickering, which must have been sub-second GPU hangs.

Unfortunately, however, it nearly doubles my power consumption. I think I can deal with the flickering for now, hopefully some progress with the drivers is made soon.

[1]: https://wiki.archlinux.org/index.php/intel_graphics#Skylake_Support
