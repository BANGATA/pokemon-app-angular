# Hi there!

## This is a pokemon app built using angular ionic

### How to run the app
1. Install NodeJS (v18.20.5 or higher), *Ionic CLI (optional), and *Angular CLI (optional)
2. Clone the project using this command `git clone https://github.com/BANGATA/pokemon-app-angular`
3. Open the code using your favorite code editor (e.g Visual Studio Code)
4. Open your terminal in the root project and install all modules using this command `npm i`
5. All set, you are good to go!

### List of command
1. Run project `npm run start` or `ionic serve` (if you don't have ionic cli use `npx ionic serve`)
2. Build project `npm run build`
3. Create android `ionic cap add [android | ios]`
4. Sync project `ionic cap sync`

### Creating the APK
1. Build your project and make sure it generates www folder containing your build
2. Create android using command number 3
3. Sync your project with your android using command number 4
4. Open your Android Studio and open your android folder
5. Wait until gradle finish it's build
6. Go to Build > Generate Signed App Bundle / APK
7. Choose the APK
8. Generate new keystore (if you don't have any)
9. Choose build type `debug | release`
10. Wait until gradle finish again
11. Locate your apk in `android/app/[debug | release]/app-release.apk`
12. You are done! Just install it into your android device
