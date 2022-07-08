# Restaurant Orders Management

This repository is an *Online Orders Management System* made specifically for your restaurant built mainly using the [SvelteKit](https://kit.svelte.dev/) framework, [TailwindCSS](https://tailwindcss.com/), [Sanity.io](https://www.sanity.io/)'s CMS and [Firebase](https://firebase.google.com) backend for authentication and real-time Cloud Firestore's updates.

## Launch App

**[Click Here to Launch the App](https://pizzahome.vercel.app)**

  

**Admin Email**: *test@pizzahome.com*

  

**Admin Password**: _4c696275_

> These credentials are for *Test Mode* only which restricts making any real changes to the actual website.

  

You can customize it and make it yours within minutes and deploy it within seconds with Vercel's one-click automatic build and deploy using the comprehensive step-by-step guide given below.

  

## Features

  

- Responsive and Intuitive

- Supports *Dark Mode*

- PWA

- Server-side rendered

- Fully Customizable Menu

- Landing page

- Adding/Deleting User Reviews

- "Chat with Us" box

- No registration required for Users

- [Admin Panel](https://pizzahome.vercel.app/admin) (Accessible under the same domain to manage orders)

- Strict Security Rules for secure access

- [Deals Generator](https://pizzahome.vercel.app/admin/dashboard/deals)

- Advanced orders search

- Restrict orders placement after Closing hours

- End-to-end testing with _Cypress_

## Setting Up Guide

Start by cloning the git repository locally and installing the dependencies.

  

	git clone https://github.com/raz0229/restaurant-orders-management.git
	cd restaurant-orders-management
	npm install
	
Other packages:

    npm i -g @sanity/cli firebase cypress
## Configuration

Start up a ``firebase`` project locally and by running ``firebase init``.

[Get Started with Firebase CLI](https://firebase.google.com/docs/cli)

Place your Firebase Configuration  settings in *`src/lib/config/app.js`.* in `firebaseConfig` object.
After setting up your firebase project, enable ``Firebase Authentication`` with Email and Password from the web interface and copy the UID of a user you intend to make the Admin.
> All other users created under the same project will be running under *Test Mode* i.e they will able to login and view orders but not have access to make any changes in your Firestore database.

In your local, `firestore.rules` files, paste these rules and replace the UID with the one you copied:

    rules_version =  '2';
	service  cloud.firestore {
		match /databases/{database}/documents {

		  // match docs in orders collection
		  match /orders/{document=**} {
			allow  create;
			allow  read: if  request.auth.uid  !=  	null;
			allow  update, delete: if  request.auth.uid  ==  '<YOUR UID>';
		  }
		  
		  match /deals/{document=**} {
			allow  read;
			allow  write: if  request.auth.uid  ==  '<YOUR UID>';
		  }
		
		  match /reviews/{any} {
			allow  read, create;
			allow  update, delete: if  request.auth.uid  ==  '<YOUR UID>';
		  }
		  
		  match /settings/{document=**} {
			allow  read;
			allow  write: if  request.auth.uid  ==  '<YOUR UID>';
		  }

		}
	}
