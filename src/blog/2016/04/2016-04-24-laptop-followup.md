---
layout: post
title: Laptop followup
date: 2016-04-24
tags: archived
---

I've discovered what was causing my battery to drain so quickly during suspend, it was the dedicated GPU. Bbswitch, the module responsible for powering the card on and off as it's being used, is supposed to power the card on before suspend. If the card is not powered on before suspend it won't function upon resume, so this is by design. However, for some reason, my laptop didn't actually cut power to the card once it suspended, so it was just running the entire time.

So now I'm just left with a choice between a fully functioning dedicated GPU and a fully functioning suspend. Since I don't use the dedicated GPU that much, the choice wasn't very difficult. I've worked around the issue by stopping the bbswitch module before suspend, so it doesn't have a chance to power the card on. The only thing I have to worry about now is rebooting before I try using the Nvidia card.

## Systemd sleep hooks

These are the hooks I used to disable and reenable bbswitch before and after suspend.

`stop-bbswitch.service`

    [Unit]
    Description=Disable bbswitch
    Before=sleep.target

    [Service]
    Type=simple
    ExecStart=/usr/bin/rmmod bbswitch

    [Install]
    WantedBy=sleep.target

`start-bbswitch.service`

    [Unit]
    Description=Enable bbswitch
    After=suspend.target

    [Service]
    Type=simple
    ExecStart=/usr/bin/modprobe bbswitch

    [Install]
    WantedBy=suspend.target

Still not perfect, but better than before since I use suspend every day and the GPU once a month.
