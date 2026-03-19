---
title: "My Self Hosted Journey - The Beginning"
description: "The start of my self hosting journey"
pubDate: "Mar 19 2026"
---

# Why self host?

It all started with an email... Spotify is increasing the price of my subscription by $2. I've been using Spotify for 5 or 6 years now. I can't remember how many times the subscription price has increased but my guess is two or three. $2 doesn't seem like much, and I admit that Spotify as a service provides a lot of value. This is a matter of principle, and was one factor amongst many others, the last push I needed to start building a home server.

Over the past several months I've been taking stock of my digital footprint. This has included changes like shifting towards physical media, getting rid of some social media, and replacing Google services with alternatives.

For example, I picked up a Switch 2 last year and I've only bought physical cartridges. Most of my Switch 1 games were all digital downloads.

When Amazon announced that in February 2025 you would no longer be able to download copies of your Kindle books, I stopped buying Kindle books and even gotten rid of my Kindle. Nowadays I'm very biased towards physical books, although I do have a BOOX Palma and occasionally purchase e-books from Kobo.

The point is that when you use platforms like Kindle or Spotify, even Steam, you don't own anything. You are paying for the right to use something, a right which can be revoked if licensing agreements fall through. I've seen many stories of Amazon changing e-books, whether that be the book cover or the actual content. Often times when buying a physical copy of a book you would choose an edition you like, with a cover you like, but this stability is not guaranteed with licensed e-books.

Another factor that pushed me towards self-hosting was that I finally got rid of Windows. It's common knowledge Windows continuously gets worse over time, but when I read that it would be either impossible or extremely difficult to disable Copilot, an AI tool that actively spies on you in my opinion, that was reason enough for me to install Ubuntu. The only factor keeping me on Windows was gaming, but Steam's Proton layer is quite good and works well in my experience.

The last hurdle to overcome was acquiring hardware. I don't have an old laptop or PC laying around that I could repurpose as a server. I've done some research on mini PC's or building a NAS, but I wasn't willing to shell out a lot of money. As it turns out I don't really play PC games much these days, and my gaming PC has been collecting dust for a few months. I thought to myself that I could run some services on that machine, and if I wanted to play a game I could stop the services or just use my steam deck. And that's exactly what I did.

# Networking

I'm a programmer by trade, so I'm comfortable with Linux and Docker. The main blocker to setting up a home server was the networking side of things. I knew that I wanted my server to be accessible outside of my home network, but I was concerned about security. I did some research and ended buying a Flint 2 router from GL.iNet. This made my life very easy. I have an old AT&T modem, so my best option was to put it in IP-passthrough mode. That way my router gets the public IP assigned by my ISP.

After that I configured a few settings in the router. I gave my server a static IP, enabled the router's dynamic DNS feature, and turned on the Wireguard VPN server. The Flint 2 provides a free domain name, and if my ISP changes my public IP, the dynamic DNS will automatically update the domain to point to the new IP.

The Wireguard Server page lets you add clients by scanning a QR code. I did this from the Wireguard app on my phone, and now if I want to access my server when I'm not at home, all I need to do is turn on the VPN on my phone. That gives me a secure tunnel into my home network, and I can access my server via its static IP.

# The fun part -- running services

With the networking sorted, it was time to start setting up my server. I mentioned Ubuntu earlier, but I actually had Arch Linux installed at the time because I was trying out omarchy. I landed on using Pop OS for a few reasons: it's gaming focused, it's debian based so I figured it would be easy enough to run some docker containers, and the COSMIC desktop looks nice. That satisfies my requirement of doubling as a server & gaming PC.

With Pop OS installed, the first thing I did was setup SSH. I had to install the OpenSSH server and allow traffic through ufw. That was easy enough, and at this point I could SSH into the server from my laptop and configure everything via the cli.

The next thing I did was setup Samba. That was also quite easy: install it, allow traffic through ufw, and expose the folders I wanted to access in `/etc/samba/smb.conf`. Samba lets me access those folders over my local network, so I can drag and drop files from my laptop.

Finally it was time to run my first docker container: Jellyfin. A media server is a must for any home library, although I don't have many movies or tv shows. Jellyfin also handles music, so I thought it could be a nice all in one solution. I didn't run into any issues, but after some research Navidrome seemed like a better choice for music. It has more features and there are some nice iOS client apps available like Amperfy.

Navidrome also led me down the rabbit hole of ripping CDs with XLD and using Picard to tag music. This is another instance where Samba was useful because I configured Picard, which runs on my laptop, to save files to the music folder on my server.

On a side note, I would advise against ordering CDs from Amazon. Literally half of the CDs I bought had cracked cases and some of the CDs were even scratched.

# Next steps

At this point I've got two containers running on my server, Jellyfin & Navidrome. There are CDs of my favorite albums and artists in the mail and my Spotify subscription has been cancelled. What's next? Well, there are more subscriptions that I'd like to cancel. I use Dropbox as a file backup solution and I plan to replace that with Nextcloud. I also have an Obsidian sync subscription, so I'll either run a LiveSync container or potentially use Nextcloud, although I'm not sure how that would work. I'd also like to replace iCloud with Immich for backing up photos. That takes care of most of my remaining subscriptions. Besides that I'd like to run portainer because it looks cool, and I'm sure I'll come across other interesting software.

Stay tuned for updates!
