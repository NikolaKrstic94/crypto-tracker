# Crypto Tracker Documentation

Table of Content:

1. **Introduction**
    - Brief overview of the app
    - Key features
2. **For non-technical personell** 
    - Accessing the app
3. Setting up Development enviroment
    - Prerequisites (e.g., Node.js, Angular CLI)
    - Installation steps
4. **Project Overview**
    - Project structure
5. Codebase Highlights and Challenges
    - Generation of External Library endpoints support for Angular
    - Key Angular components and services
6. **Usage Guide**
    - How to track currencies/assets
    - Managing different profiles
    - Searching and pagination
    - Using the currency conversion feature
7. Known Issues and Future Plans
    - Known Issues
    - Planned features
8. Contribution

## 1. Introduction

### Brief overview of the app

Crypto Tracker is a small single page web-app that helps you track your favorite cryptocurrency assets and their prices in realtime. It’s designed to be straightforward and easy-to-use, with mobile support in mind. It’s using [coincap.io](http://coinCap.io) and its API as a base. It has 

### Key features

- Add assets to your personalized dashboard for easier tracking of your favorite assets, from a pool of 2000 available assets!
- Easy removal from the dashboard when a certain asset is no longer of interest.
- Multiple profiles management - it’s possible to group assets based on preferences and give name to a profile to represent that group. Easily switch between different profiles to track different groups of assets that you’ve previously chosen.
- Currency Conversion - possibility to directly convert the prices of all assets to your favorite fiat (country) currency. there are over 150+ currencies available.

## 2. For non-technical personell

I’m giving this a second place in this README, because I know how it feels to have to scour through tons of technical information just to see how to use this app. So here we are:

### Accessing the app

Clicking on this link will lead you to the Crypto Tracker App
[https://nikolakrstic94.github.io/crypto-tracker/](https://nikolakrstic94.github.io/crypto-tracker/)

## 3. Setting up Development Enviroment

### Prerequisites:

- [Node.js](https://nodejs.org/en/download/) installed
- **[Angular CLI](https://angular.io/cli) globally installed (or using npx command to run locally installed version)**
- A code editor of choice, mine is [Visual Studio Code](https://code.visualstudio.com)
- [Git](https://git-scm.com/) installed on your OS

### Installation steps

1. **Install Node.js and npm:**
    - Download and install the latest LTS version of Node.js from the [official Node.js website](https://nodejs.org/). This will also install npm.
2. **Install Angular CLI:**
    - Open your terminal or command prompt and install Angular CLI globally using npm:
        
        ```bash
        npm install -g @angular/cli
        ```
        
3. Git clone from a github repository:
    - Open [https://github.com/NikolaKrstic94/crypto-tracker](https://github.com/NikolaKrstic94/crypto-tracker)
    - Navigate to code button:
        
        ![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled.png)
        
    - Copy the link and open your terminal and type `git clone copied_link_here`
    - This should create a new folder in your currency directory
    - Navigate to it and again, in terminal do `npm install` to install dependencies for this project
    
    **4. Run the Development Server:**
    
    - If all went well, run `ng serve` if you installed angular-cli  globally like mentioned above
    and it should run a command and give you a link to open the website.
    - By default, **`ng serve`** will launch the server on **`http://localhost:4200/`**. Open this URL in your web browser to view the application.
    - Voila, Crypto Tracker is now in your developer hands!
    

## 4. Project Overview

Even though it’s a small app, I’ve structured it in a way that it can easily be expanded, or as we developer like to say, it’s built for scalability. That means it honors good design patterns when it comes to reusability of components, separation of concerns, which basically means business logic should be in services, and components should have smart/dumb parts and only be concerned about getting the right data to display in that component. 

With that being said, there can always be improvements and more separation, but we should know when we’re overengineering things, because if we split the project as much  as possible, we’re losing out on readability and simplicity. 

I like to believe that I struck a good balance, with some exceptions that will be mentioned in 

Known Issues and Future Plans section.

### Project Structure

This tree represents an overview of the project structure:

```markdown
app
├── app.component.{html,scss,spec.ts,ts}
├── app.config.ts
├── app.routes.ts
├── shared
│   ├── open-api-spec
│   │   ├── .gitignore
│   │   ├── .openapi-generator
│   │   │   ├── FILES
│   │   │   └── VERSION
│   │   ├── .openapi-generator-ignore
│   │   ├── README.md
│   │   ├── api
│   │   │   ├── {api,assets.service,
│		│		│				 candles.service,exchanges.service,
│		│		│				 markets.service,
│		│		│				 rESTfulAPIDocumentation.service,
│		│		│				 rates.service}.ts
│   │   ├── api.module.ts
│   │   ├── configuration.ts
│   │   ├── encoder.ts
│   │   ├── git_push.sh
│   │   ├── index.ts
│   │   ├── model
│   │   │   ├── {response models for api endpoints}.ts
│   │   ├── openapi.json
│   │   ├── openapitools.json
│   │   ├── param.ts
│   │   └── variables.ts
│   ├── services
│   │   ├── asset-list-and-profiles-management
│   │   │   ├── asset-list-and-profiles-management.service.{spec.ts,ts}
│   │   ├── assets-management
│   │   │   ├── assets-management.service.{spec.ts,ts}
│   │   ├── assets-price-update
│   │   │   ├── assets-price-update.service.{spec.ts,ts}
│   │   └── rates-management
│   │       ├── rates-management.service.{spec.ts,ts}
│   └── types
│       ├── {add-profile-dialog-data,
│				│	   asset-display-mode,
│				│	   asset-user-profile,assets-service-options,
│				│	   currency,page-size-and-page-options,
│				│	   rates-service-options}.ts
└── shell
    ├── footer
    │   ├── footer.component.{html,scss,spec.ts,ts}
    ├── main
    │   ├── dashboard
    │   │   ├── asset-grid-container
    │   │   │   ├── asset-grid-container.component.{html,scss,spec.ts,ts}
    │   │   │   └── asset-grid-representation
    │   │   │       ├── asset-card
    │   │   │       │   ├── asset-card.component.{html,scss,spec.ts,ts}
    │   │   │       ├── asset-grid-representation.component.{html,scss,spec.ts,ts}
    │   │   ├── dashboard.component.{html,scss,spec.ts,ts}
    │   │   └── profile-list
    │   │       ├── add-profile-dialog
    │   │       │   ├── add-profile-dialog.component.{html,scss,spec.ts,ts}
    │   │       ├── profile-list.component.{html,scss,spec.ts,ts}
    │   ├── main.component.{html,scss,spec.ts,ts}
    ├── nav
    │   ├── nav.component.{html,scss,spec.ts,ts}
    ├── shell.component.{html,scss,spec.ts,ts}
```

## 5. Codebase Highlights and Challenges

### Generation of External Library endpoints support for Angular

This one was big for me, because I knew there’s no way I’ll manually write methods to target Coincap’s API,. Even though very few were needed to make this app work, remember, I wanted to build this app for scalability and I wanted full support for all endpoints in case I further expand and improve this app, that will also be easiliy maintanable in case Backend changes, just so you have an idea what the heck I’m talking about, here is one screenshot:

![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%201.png)

All of this is automatically generated with openapi generator tool that takes in a openapi.json file which is a spec file and generates support for various frameworks. 

And here’s an example of an auto-generated support inside `assets.service.ts`:

![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%202.png)

which is one of many endpoints in that file. 

So how did I achieve this? 

- Go go [https://docs.coincap.io/](https://docs.coincap.io/)

![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%203.png)

- Run it in postman and export:

![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%204.png)

- run the collection.json file through this website:
[https://kevinswiber.github.io/postman2openapi/](https://kevinswiber.github.io/postman2openapi/)
    
    To get the openApi spec file, copy text content into openapi.json file
    
- Install:

```
npm install @openapitools/openapi-generator-cli -g
```

then 

```markdown
npx openapi-generator-cli generate -i openapi.json -g typescript-angular -o ./openapi
```

This will create a new folder that will be your open api spec  angular support!

### Key Angular components and services

**Main services** responsible for fetching  and manipulating data are:

![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%205.png)

- Asset-list-and-profiles-management: Is the main service when it comes to managing profiles and a list of assets that assigned to those profiles, along with CRUD operations for profiles.
- Assets-management: is a simple bridge service that references the open-api get methods while adding custom methods for better naming and usability of those endpoints
- Assets-price-update: is responsible for updating prices

Components:

Main structure is divided into:

- Nav: contains currency conversion html element that right now isn’t an Angular component but it should be, I’ll change that asap.
- Main
    - Dashboard: Main Window displaying the assets table and Profile List
        - Asset Grid Container: a smart component displaying currently selected assets when in dashboard view but when in Add Assst dialog view, it displays all available (not yet added/selected/tracked) assets.
        - Profile List: contains views for displaying and interacting with `asset-list-and-profile-management.service` to create, read, select and remove profiles from the list.
            - Add Profile dialog: responsible for adding a new profile
- Footer: Is just a sticky static mat-toolbar that doesn’t show any information as of now.

## 6. App Usage Guide

I like to think that’s the app is pretty intuitive but it doesn’t hurt to mention its features and how to navigate around the app. 

### How to track currencies/assets

When we first start up the app, we get a default profile and 1 asset that’s being tracked: Bitcoin.  
To add more assets to the dashboard, please click on “Add Asset” button, this will open a dialog and display all avaialable assets you can add to your dashboard for your current profile. 

### Managing different profiles

Profiles are just groups of tracked assets, used to make our tracked assets a bit easier to navigate.

### Searching and pagination

Throughout the app, search and pagination tools are available, they are intended speed up searching through around 2000 assets with ease. Just start typing and it will show you all symbols that match the serached term. 

### Using the currency conversion feature

Another feature that I hope will suit you well is Currency Conversion, by that I mean, it converts all asset prices to your favorite currency (EUR, USD, AED, etc.)
There are over 180 currencies availablel and you can search for them and select them as your desired currency in a dropdown in the top right corner.

![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%206.png)

## Known Issues and Future Plans

Ouch, where do I start? There are many things that I’d like to improve upon!
and make better! 
Splitting it into two categories:

### Known Issues

Performance and data optimization:

- Currently crypto tracker app is getting all available assets live prices and updating assets that aren’t even visible or added to the dashboard. This is a big waste of data as the end user doesn’t benefit from this in any way + it slows down the entire application.
    
    Strategy to resolve:  I plan on taking the live price updates only for currently selected assets, or even better, current page on a dashboard/asset list. For that I’d need to extend my assets-price-update.service.ts to close and re-open websocket connection with different parameters based on the before-mentioned asset list that is reflecting the list that the end-user sees, that way I ensure that no data is wasted. 
    
- Currency Conversion Dropdown should be its own component, as it could be reusable elsewhere (maybe, for a list of calculated prices based on multiple currencies, or similar)
- Path Imports are wonky, by wonky I mean
    
     `import { RatesManagementService } from '../../../../../../shared/services/rates-management/rates-management.service';`
    
    So I’ll have to use “path” property inside compilerOptions in tsconfig.json to set up my own paths, that way code will be much more readable and not as prone to errors (even though it’s done automatically now by VSCode)
    
- Missing a close button for Add Asset Dialog to make for better UX
- Padding issues with some media queries for Profile List Section
- Visual glitch because of a fast changing signal when switching between dashboard and add asset, button “ADD” and “Remove” change much faster than the animation so for a split second it glitches
    
    ![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled%207.png)
    
- Bad styling for “Enter Profile Name” when creating a new profile:
    
    ![Untitled](Crypto%20Tracker%20Documentation%20fc899ecc088448bbbe799847b9782036/Untitled.jpeg)
    
- Testing, I did learn about the types of tests and what they should be doing in general, but I have yet to implement them in this project. 
My plan is to go over a course I paid from Monsterlessons Academy because the course itself seemed pretty nice.
    
      [https://monsterlessons-academy.com/courses/angular-testing-unit-testing-angular-and-e2e-testing](https://monsterlessons-academy.com/courses/angular-testing-unit-testing-angular-and-e2e-testing)
    Here it is. I will try to focus on testing components, services, inputs and outputs and in general clicking actions for remove, delete, select etc. 
    
    I set up the project to have Jest which will be the new adopted framework for testing, because Karma is getting deprecated. But at the time I lacked the knowledge to fix out-of-the-box bugs like and a few more. Tried using chatGPT but it kept spinning me in circles because I didn’t even have enough knowledge to catch what might be wrong.
    
    ```
    AssetGridRepresentationComponent › should create
    NG05105: Unexpected synthetic property @transitionMessages found. Please make sure that:
      - Either `BrowserAnimationsModule` or `NoopAnimationsModule` are imported in your application.
      - There is corresponding configuration for the animation named `@transitionMessages` defined in the `animations` field of the `@Component` decorator (see <https://angular.io/api/core/Component#animations>).
    
    ```
    

### Planned Features

- More Info for assets present in a asset card:
    - change percentage in the last 24h
    - green arrow up if the price is rising and red arrow down if it’s falling
- Grab some other api endpoint for news on a particular asset, or at least some facts about it
    
    and displaying it as a dialog when you click on a ℹ️ icon on the card.
    
- Batch remove of all assets button
- Editing Profile Name and confirmation dialog on profile deletion
- Mobile version should have a nav that will bring up the profile list instead of always being there and taking precious space away from our tiny screens
- Currency conversion persitence and also addition to each individual profile

## Contribution

You can contribute by trying out the app and giving me your 100% honest feedback! That’s a great way for me to improve and see things through a different lens. 

Thank you!
