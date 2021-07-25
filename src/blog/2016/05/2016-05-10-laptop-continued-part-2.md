---
layout: post
title: Laptop Continued Part 2
date: 2016-05-10
tags: archived
---

Last night I was watching a movie on my desktop at around 11 and decided to move to my bed and my laptop. Since it was a horror movie I thought it was best to plug in a pair of headphones. When I did that, my laptop immediately shut off. It was so immediate, and journalctl was so devoid of clues that it seemed at first like a hardware problem, a short or something.

After convincing myself to try it with it plugged into AC power, I was surprised that it didn't instantly crash. This let me back again to a recurring theme here: _power management_.

I disabled two settings in tlp that seemed that they would be related, and sure enough it doesn't crash anymore when I plug headphones in.

The two lines I changed:

    SOUND_POWER_SAVE_ON_BAT=0
    SOUND_POWER_SAVE_CONTROLLER=N

The former equates to [this line][1] if you're doing things manually, though I'm not sure the equivalent for the latter. Anyway, another annoyance solved.

Now if only I could get my wifi to work on my work's network.

[1]: https://wiki.archlinux.org/index.php/Power_management#Audio
