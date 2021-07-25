---
layout: post
title: 'Custom Resolutions on Linux'
date: 2016-02-28
tags: ['archived', 'vacation']
---

It's the year of the Linux Desktop and adding a custom or unrecognized resolution is still much harder than it should be.

For some reason, my monitor doesn't list 1600x900 as a resolution it can display, so a lot of games don't list that resolution as an option, even when trying to run the game in a window at that size. So here's how I fixed that. I'm running Arch Linux and an Nvidia GTX 970 using proprietary drivers.

## 1. Disable ModeValidation

### 1. Add this line to your `"Device"` section of your Xorg config<sup>[1][1]</sup>

    Option "ModeValidation" "AllowNon60hzmodesDFPModes, NoEDIDDFPMaxSizeCheck, NoVertRefreshCheck, NoHorizSyncCheck, NoDFPNativeResolutionCheck, NoMaxSizeCheck, NoMaxPClkCheck,  AllowNonEdidModes, NoEdidMaxPClkCheck"

After doing so mine looked like this

    Section "Device"
    	Identifier     "Device0"
    	Driver         "nvidia"
    	VendorName     "NVIDIA Corporation"
    	BoardName      "GeForce GTX 970"
    	Option         "ModeValidation" "AllowNon60hzmodesDFPModes, NoEDIDDFPMaxSizeCheck, NoVertRefreshCheck, NoHorizSyncCheck, NoDFPNativeResolutionCheck, NoMaxSizeCheck, NoMaxPClkCheck,  AllowNonEdidModes, NoEdidMaxPClkCheck"
    EndSection

Now you should be able to manually add a resolution without default validation preventing you from doing so.

### 2. Reboot

## 2. Add resolution using `xrandr`<sup>[2][2]</sup>

### 1. Run `cvt` or `gtf` to get the Modeline

    $ cvt 1600 900
    # 1600x900 59.95 Hz (CVT 1.44M9) hsync: 55.99 kHz; pclk: 118.25 MHz
    Modeline "1600x900_60.00"  118.25  1600 1696 1856 2112  900 903 908 934 -hsync +vsync

### 2. Create mode

    $ xrandr --newmode "1600x900_60.00"  118.25  1600 1696 1856 2112  900 903 908 934 -hsync +vsync

### 3. Add mode to monitor

    $ xrandr --addmode DP-4 1600x900_60.00

With any luck you should be able to select the new resolution.

If it worked, you can persist the new mode by adding the **Modeline** from step 2.1 to your Xorg.<sup>[3][3]</sup>

    Section "Monitor"
    	# HorizSync source: edid, VertRefresh source: edid
    	Identifier     "Monitor0"
    	VendorName     "Unknown"
    	ModelName      "Ancor Communications Inc ASUS VE278"
    	HorizSync       24.0 - 92.0
    	VertRefresh     50.0 - 85.0
    	Modeline       "1600x900_60.00"  118.25  1600 1696 1856 2112  900 903 908 934 -hsync +vsync
    	Option         "DPMS"
    EndSection

    Section "Device"
    	Identifier     "Device0"
    	Driver         "nvidia"
    	VendorName     "NVIDIA Corporation"
    	BoardName      "GeForce GTX 970"
    	Option         "ModeValidation" "AllowNon60hzmodesDFPModes, NoEDIDDFPMaxSizeCheck, NoVertRefreshCheck, NoHorizSyncCheck, NoDFPNativeResolutionCheck, NoMaxSizeCheck, NoMaxPClkCheck,  AllowNonEdidModes, NoEdidMaxPClkCheck"
    EndSection

    Section "Screen"
    	Identifier     "Screen0"
    	Device         "Device0"
    	Monitor        "Monitor0"
    	DefaultDepth    24
    	SubSection     "Display"
    		Modes	   "1600x900_60.00"
    		Depth       24
    	EndSubSection
    EndSection

If it didn't work, remove the mode and try using the other option in step 2.1

    $ xrandr --rmmode "1600x900_60.00"

[1]: http://ubuntuforums.org/showthread.php?t=2164924&p=12743326#post12743326
[2]: https://wiki.archlinux.org/index.php/xrandr#Adding_undetected_resolutions
[3]: https://wiki.archlinux.org/index.php/xrandr#Permanently_adding_undetected_resolutions
