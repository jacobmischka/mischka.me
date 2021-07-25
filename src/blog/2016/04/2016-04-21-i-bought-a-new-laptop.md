---
layout: post
title: I bought a new laptop
date: 2016-04-21
tags: archived
---

![Acer Aspire E 15 E5-574G-52QU](../laptop.jpg){:style="width: 100%;"}

I've never had a new laptop before. I was in college when I got my first laptop, a used some Dell that I forget the name of, a rugged business laptop. It was heavy and slow but it did the job. I've always had a desktop, so I never needed a particularly good notebook. The Dell was enough to browse the web and edit text files for college classes, and that's all I needed.

Before too long, however, the hinges on the display began to die. I had to keep the display at a 90 degree angle or gravity would take control. Once I got sick of this, I purchased a laptop from a classmate. It was nearly new, but it was a terrible piece of hardware. The CPU was far from a workhorse, its touchpad worked on every other boot (?), and its wireless card simply would not work on WPA2 networks without disconnecting before 5 minutes. It was miserable to use, but hey at least it had a touchscreen!!

About a year and a half later I bought my then-just-former roommate's laptop. It was by no means a bad laptop, it had 8GB of memory and an i5. Certainly enough to do anything I needed from it. It was beginning to show its age however, its 5 year old GPU and 17-inch 1600x900 display resulted in a heavy and large 7.5 pound beast. After almost a year of that and several weeks of casual searching for a replacement, I finally decided it was time for me to get my own brand new laptop.

This was last week, and I decided on an [Acer Aspire E 15 E5-574G-52QU][1]. Here are my thoughts on it after a few days. I'm running Arch Linux on it, and I have replaced the 1TB hard drive with a [250GB SSD][2].

## Installation

The installation process itself took me longer than it should. I've never installed Arch on a UEFI system using systemd-boot before, and I forgot to mount the boot partition before bootstrapping. I did make sure to set a supervisor password in the BIOS and disable secure boot, and installation would have gone perfectly were it not for my own mistakes.

Almost everything worked out of the box, except the ath10k wireless radio. A quick search revealed I needed [some firmware][3] that isn't yet included in the kernel, and would wait to do that after I had a working desktop environment. I installed GNOME, and the intel and the nouveau nvidia drivers for graphics. GNOME installation worked without issues, the touchpad worked in GDM, because it uses Wayland, but I had to install synaptics myself before it was working in X. After doing that and installing the firmware I had a fully functioning laptop.

## Post-install

Since then I've had a few minor issues.

### Nvidia card

The 940M did not seem to work at all with nouveau drivers, it wasn't detected by xrandr and I coudn't find anything obvious to do to fix that. Since the proprietary drivers perform better and [PRIME works pretty poorly in GNOME][4] anyway, it didn't take much convincing to install them. [Bumblebee][5] installed and works fine, and gives pleasant performance with [optiprime][6].

### Battery consumption

This has been my primary headache. I initially had installed and configured [laptop-mode-tools][7], which seemed at the time to work. However, I didn't realize that lmt wasn't properly reenabling itself on boot, even though it was enabled in systemd. Instead of manually enabling it after every boot, I gave up and installed [tlp][8] instead, which properly enables itself and seems to give about the same results. One of these results is that the display occasionally flickers. It's only mildly annoying, but if I get sick enough of it I may sacrifice some battery life for a perfect display.

I had also forgotten to install [bbswitch][9] when getting bumblebee set up, so I then did that, which further increased my battery life.

However, neither of these solutions alleviated my real problem, which was that too much power is being used during suspend. I'm actually still not sure what's causing this. As per Arch wiki's suggestions on [this laptop's predecessor's page][10], I have begun using systemd hooks to power down the nonboot CPUs on suspend and reenabling them upon waking. Even though the issue described in the wiki is different from the one I'm having, I figure it's worth a shot. I've only just done this, so it's too soon to tell whether this has done anything.

If it hasn't, which I suspect is the case, I suppose I'll just manually hibernate whenever I know I'll be going a few hours without using it. It's a bit of a pain, and shouldn't really be necessary, but it's not the end of the world.

## Final thoughts

Overall, I'm pretty happy with my purchase. The better display, smaller and lighter body, and 21st century touchpad have been welcome improvements. And despite my power troubles, the battery life is much better than my previous laptop, even if that one did properly sleep.

[1]: http://www.amazon.com/Acer-Aspire-E5-574G-52QU-15-6-inch-Notebook/dp/B019G7VOSO
[2]: http://www.amazon.com/Samsung-2-5-Inch-Internal-MZ-75E250B-AM/dp/B00OAJ412U
[3]: https://github.com/kvalo/ath10k-firmware
[4]: https://wiki.archlinux.org/index.php/PRIME#Black_screen_with_GL-based_compositors
[5]: http://www.bumblebee-project.org/
[6]: https://wiki.archlinux.org/index.php/bumblebee#Primusrun_mouse_delay.2Fdisable_VSYNC
[7]: https://github.com/rickysarraf/laptop-mode-tools
[8]: https://github.com/linrunner/TLP
[9]: https://github.com/Bumblebee-Project/bbswitch
[10]: https://wiki.archlinux.org/index.php/Acer_Aspire_E5-573#Unsupported_Hardware_.26_Features_.26_Worarounds

\*[lmt]:laptop-mode-tools
