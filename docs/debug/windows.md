# Documentation
- [Installing Root Certificate (macOS)](#installing-root-certificate-macos)
- [Edit Your Host File (macOS)](#edit-your-host-file-macos)
- [Installing Root Certificate (Windows)](#installing-root-certificate-windows)
- [Edit Your Host File (Windows)](#edit-your-host-file-windows)

## Installing Root Certificate (macOS)

We need to add the root certificate to any laptops, desktops, tablets, and phones that will be accessing our HTTPS sites. This can be a bit of a pain, but the good news is that we only have to do it once. Once our root certificate is on each device, it will be good until it expires.

### Adding the Root Certificate to macOS Keychain

1. Open the macOS Keychain app
1. Go to File > Import Items…
1. Select your root certificate file (i.e. myCA.pem)
1. Search for whatever you answered as the Common Name name above
![Root Certificate](assets/Screen-Shot-2017-07-21-at-8.44.48-PM-1540x1039.png)
1. Double click on your root certificate in the list
1. Expand the Trust section
1. Change the When using this certificate: select box to “Always Trust”
![Root Certificate](assets/Screen-Shot-2017-07-21-at-8.46.58-PM.png)
1. Close the certificate window
1. It will ask you to enter your password (or scan your finger), do that
1. 🎉 Celebrate!

## Edit Your Host File (macOS)

1. Open File /etc/hosts
1. Add the line `127.0.0.1 development`
![Root Certificate](assets/Screenshot%202020-04-23%20at%2016.44.02.png)

## Compile Project (windows)
1. Run `npm run serve`
1. [Install root certificate](#installing-root-certificate-windows) 
1. [Edit your host file](#edit-your-host-file-windows) 
1. Add the interactive [dev_env.zip](assets/dev_env.zip) to your instance
1. Launch the app and open the interactive
1. Enjoy!!

### Debugging

Either attach the application in VisualStudio for the JavaScript console and DOM explorer or add VorlonJS to your `index.html`.

#### Add VorlonJS

1. Replace your_project and add the script tag: `<script src="https://vorlonjs.pitcher.com/vorlon.js/your_project"></script>`
1. Replace your_project and navigate to `https://vorlonjs.pitcher.com/dashboard/your_project`

![VorlonJS](assets/Screenshot%202020-04-24%20at%2010.39.12.png)

## Installing Root Certificate (Windows)

We need to add the root certificate to any laptops, desktops, tablets, and phones that will be accessing our HTTPS sites. This can be a bit of a pain, but the good news is that we only have to do it once. Once our root certificate is on each device, it will be good until it expires.

### Adding the Root Certificate to Windows certificates

1. Open start menu
1. Open Manage computer certificates
1. Open Trusted Root Certification Authorities > Certificates
1. Go to menu: Action > All Tasks > Import…
1. Select your root certificate file (i.e. myCA.pem)
![Root Certificate](assets/Screenshot%202020-04-23%20at%2016.35.14.png)
1. Click Next
1. Select the trusted root store
![Root Certificate](assets/Screenshot%202020-04-23%20at%2016.35.52.png)
1. Click Next
1. Click Finish
1. 🎉 Celebrate!


## Edit Your Host File (Windows)

1. Open start menu
1. Type Notepad
1. Right-click Notepad and select Run as Administrator
1. Go to File > Open
1. Enter File name: `C:\Windows\system32\drivers\etc\hosts`
1. Click Open
1. Add a new line with your IP address: `192.168.1.101	development`
![Root Certificate](assets/Screenshot%202020-04-23%20at%2016.46.38.png)
